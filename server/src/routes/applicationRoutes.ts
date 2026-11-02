import { Router, Request, Response } from "express";
import { Application } from "../models/Application.js";
import { memoryStore } from "../services/dataStore.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { validateApplication } from "../middleware/validation.js";
import { getDbStatus } from "../config/db.js";

const router = Router();

// POST /api/applications (Public trainer or franchise application submission)
router.post("/", validateApplication, async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      type, name, email, phone,
      // Trainer
      technology, experience, currentCompany, mode, linkedin, message,
      // Franchise
      city, state, capital, space, background
    } = req.body;

    const dbStatus = getDbStatus();

    const appData = {
      type,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      status: "new",
      technology: technology || "",
      experience: experience || "",
      currentCompany: currentCompany || "",
      mode: mode || "",
      linkedin: linkedin || "",
      message: message || "",
      city: city || "",
      state: state || "",
      capital: capital || "",
      space: space || "",
      background: background || "",
      notes: "Submitted via online application form.",
      createdAt: new Date(),
      updatedAt: new Date()
    };

    if (dbStatus.connected && !dbStatus.isMemoryFallback) {
      const application = new Application(appData);
      await application.save();
      res.status(201).json({
        success: true,
        message: type === "trainer" 
          ? "Thank you! Your trainer application has been received. Our academic director will review your profile." 
          : "Thank you! Your franchise partnership request has been submitted. Our business development team will contact you.",
        data: application
      });
    } else {
      const newApp = {
        _id: memoryStore.generateId(),
        ...appData
      };
      memoryStore.applications.unshift(newApp);
      res.status(201).json({
        success: true,
        message: type === "trainer" 
          ? "Thank you! Your trainer application has been received. Our academic director will review your profile." 
          : "Thank you! Your franchise partnership request has been submitted. Our business development team will contact you.",
        data: newApp
      });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/applications (Admin)
router.get("/", requireAuth, requireRole(["superadmin", "admin", "editor"]), async (req: Request, res: Response): Promise<void> => {
  try {
    const { type, status, search } = req.query;
    const dbStatus = getDbStatus();

    let applications: any[] = [];

    if (dbStatus.connected && !dbStatus.isMemoryFallback) {
      const filter: any = {};
      if (type && type !== "all") filter.type = type;
      if (status && status !== "all") filter.status = status;
      if (search) {
        filter.$or = [
          { name: { $regex: search as string, $options: "i" } },
          { email: { $regex: search as string, $options: "i" } },
          { phone: { $regex: search as string, $options: "i" } },
          { technology: { $regex: search as string, $options: "i" } },
          { city: { $regex: search as string, $options: "i" } }
        ];
      }
      applications = await Application.find(filter).sort({ createdAt: -1 });
    } else {
      let filtered = [...memoryStore.applications];
      if (type && type !== "all") filtered = filtered.filter(a => a.type === type);
      if (status && status !== "all") filtered = filtered.filter(a => a.status === status);
      if (search) {
        const s = (search as string).toLowerCase();
        filtered = filtered.filter(a => 
          a.name.toLowerCase().includes(s) || 
          a.email.toLowerCase().includes(s) || 
          a.phone.includes(s) ||
          a.technology?.toLowerCase().includes(s) ||
          a.city?.toLowerCase().includes(s)
        );
      }
      applications = filtered;
    }

    res.json({ success: true, count: applications.length, data: applications });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PATCH /api/applications/:id (Admin update status or notes)
router.patch("/:id", requireAuth, requireRole(["superadmin", "admin", "editor"]), async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    const dbStatus = getDbStatus();

    if (dbStatus.connected && !dbStatus.isMemoryFallback) {
      const updated = await Application.findByIdAndUpdate(
        id,
        { 
          ...(status && { status }),
          ...(notes !== undefined && { notes }),
          updatedAt: new Date()
        },
        { new: true }
      );
      if (!updated) {
        res.status(404).json({ success: false, message: "Application not found." });
        return;
      }
      res.json({ success: true, message: "Application updated successfully", data: updated });
    } else {
      const index = memoryStore.applications.findIndex(a => a._id === id);
      if (index === -1) {
        res.status(404).json({ success: false, message: "Application not found." });
        return;
      }
      if (status) memoryStore.applications[index].status = status;
      if (notes !== undefined) memoryStore.applications[index].notes = notes;
      memoryStore.applications[index].updatedAt = new Date();

      res.json({ success: true, message: "Application updated successfully", data: memoryStore.applications[index] });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/applications/:id (Admin)
router.delete("/:id", requireAuth, requireRole(["superadmin", "admin"]), async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const dbStatus = getDbStatus();

    if (dbStatus.connected && !dbStatus.isMemoryFallback) {
      const deleted = await Application.findByIdAndDelete(id);
      if (!deleted) {
        res.status(404).json({ success: false, message: "Application not found." });
        return;
      }
    } else {
      const index = memoryStore.applications.findIndex(a => a._id === id);
      if (index === -1) {
        res.status(404).json({ success: false, message: "Application not found." });
        return;
      }
      memoryStore.applications.splice(index, 1);
    }

    res.json({ success: true, message: "Application deleted successfully." });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
