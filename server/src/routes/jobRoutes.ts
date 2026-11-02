import { Router, Request, Response } from "express";
import { JobPosting } from "../models/JobPosting.js";
import { memoryStore } from "../services/dataStore.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { validateJobPosting } from "../middleware/validation.js";
import { getDbStatus } from "../config/db.js";

const router = Router();

// POST /api/jobs (Public recruiter job posting)
router.post("/", validateJobPosting, async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      companyName, recruiterName, officialEmail, phone,
      jobTitle, openings, experience, ctcRange, skills, location, description
    } = req.body;

    const dbStatus = getDbStatus();

    const jobData = {
      companyName: companyName.trim(),
      recruiterName: recruiterName.trim(),
      officialEmail: officialEmail.toLowerCase().trim(),
      phone: phone.trim(),
      jobTitle: jobTitle.trim(),
      openings: openings || "1-3 Positions",
      experience: experience || "Freshers (0 - 1 Year)",
      ctcRange: ctcRange || "4 - 7 LPA",
      skills: skills.trim(),
      location: location || "Bangalore",
      description: description || "",
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date()
    };

    if (dbStatus.connected && !dbStatus.isMemoryFallback) {
      const job = new JobPosting(jobData);
      await job.save();
      res.status(201).json({
        success: true,
        message: "Job vacancy posted successfully! Our placement team will review and share with matching candidates.",
        data: job
      });
    } else {
      const newJob = {
        _id: memoryStore.generateId(),
        ...jobData
      };
      memoryStore.jobs.unshift(newJob);
      res.status(201).json({
        success: true,
        message: "Job vacancy posted successfully! Our placement team will review and share with matching candidates.",
        data: newJob
      });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/jobs (Public & Admin list)
router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, search } = req.query;
    const dbStatus = getDbStatus();

    let jobsList: any[] = [];

    if (dbStatus.connected && !dbStatus.isMemoryFallback) {
      const filter: any = {};
      if (status && status !== "all") filter.status = status;
      if (search) {
        filter.$or = [
          { jobTitle: { $regex: search as string, $options: "i" } },
          { companyName: { $regex: search as string, $options: "i" } },
          { skills: { $regex: search as string, $options: "i" } },
          { location: { $regex: search as string, $options: "i" } }
        ];
      }
      jobsList = await JobPosting.find(filter).sort({ createdAt: -1 });
    } else {
      let filtered = [...memoryStore.jobs];
      if (status && status !== "all") filtered = filtered.filter(j => j.status === status);
      if (search) {
        const s = (search as string).toLowerCase();
        filtered = filtered.filter(j => 
          j.jobTitle.toLowerCase().includes(s) || 
          j.companyName.toLowerCase().includes(s) || 
          j.skills.toLowerCase().includes(s) ||
          j.location.toLowerCase().includes(s)
        );
      }
      jobsList = filtered;
    }

    res.json({ success: true, count: jobsList.length, data: jobsList });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PATCH /api/jobs/:id (Admin update status)
router.patch("/:id", requireAuth, requireRole(["superadmin", "admin", "editor"]), async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const dbStatus = getDbStatus();

    if (dbStatus.connected && !dbStatus.isMemoryFallback) {
      const updated = await JobPosting.findByIdAndUpdate(
        id,
        { ...(status && { status }), updatedAt: new Date() },
        { new: true }
      );
      if (!updated) {
        res.status(404).json({ success: false, message: "Job posting not found." });
        return;
      }
      res.json({ success: true, message: "Job status updated successfully", data: updated });
    } else {
      const index = memoryStore.jobs.findIndex(j => j._id === id);
      if (index === -1) {
        res.status(404).json({ success: false, message: "Job posting not found." });
        return;
      }
      if (status) memoryStore.jobs[index].status = status;
      memoryStore.jobs[index].updatedAt = new Date();

      res.json({ success: true, message: "Job status updated successfully", data: memoryStore.jobs[index] });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/jobs/:id (Admin)
router.delete("/:id", requireAuth, requireRole(["superadmin", "admin"]), async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const dbStatus = getDbStatus();

    if (dbStatus.connected && !dbStatus.isMemoryFallback) {
      const deleted = await JobPosting.findByIdAndDelete(id);
      if (!deleted) {
        res.status(404).json({ success: false, message: "Job posting not found." });
        return;
      }
    } else {
      const index = memoryStore.jobs.findIndex(j => j._id === id);
      if (index === -1) {
        res.status(404).json({ success: false, message: "Job posting not found." });
        return;
      }
      memoryStore.jobs.splice(index, 1);
    }

    res.json({ success: true, message: "Job posting deleted successfully." });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
