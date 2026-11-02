import { Router, Request, Response } from "express";
import { Enquiry } from "../models/Enquiry.js";
import { memoryStore } from "../services/dataStore.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { validateEnquiry } from "../middleware/validation.js";
import { getDbStatus } from "../config/db.js";

const router = Router();

// POST /api/enquiries (Public form submission)
router.post("/", validateEnquiry, async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, course, mode, branch, comments, type, companyName, teamSize } = req.body;
    const dbStatus = getDbStatus();

    const enquiryData = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      course: course || "General Consultation",
      mode: mode || "Classroom",
      branch: branch || "BTM Layout",
      comments: comments || "",
      type: type || "enrollment",
      status: "new",
      companyName: companyName || "",
      teamSize: teamSize || "",
      notes: "Auto-logged from website portal.",
      createdAt: new Date(),
      updatedAt: new Date()
    };

    if (dbStatus.connected && !dbStatus.isMemoryFallback) {
      const enquiry = new Enquiry(enquiryData);
      await enquiry.save();
      res.status(201).json({
        success: true,
        message: "Your inquiry has been submitted successfully. A career mentor will connect with you shortly.",
        data: enquiry
      });
    } else {
      const newEnquiry = {
        _id: memoryStore.generateId(),
        ...enquiryData
      };
      memoryStore.enquiries.unshift(newEnquiry);
      res.status(201).json({
        success: true,
        message: "Your inquiry has been submitted successfully. A career mentor will connect with you shortly.",
        data: newEnquiry
      });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/enquiries (Admin listing with filters and search)
router.get("/", requireAuth, requireRole(["superadmin", "admin", "editor"]), async (req: Request, res: Response): Promise<void> => {
  try {
    const { type, status, search, course, limit = 50, page = 1 } = req.query;
    const dbStatus = getDbStatus();

    let enquiries: any[] = [];
    let total = 0;

    if (dbStatus.connected && !dbStatus.isMemoryFallback) {
      const filter: any = {};
      if (type && type !== "all") filter.type = type;
      if (status && status !== "all") filter.status = status;
      if (course && course !== "all") filter.course = course;
      if (search) {
        filter.$or = [
          { name: { $regex: search as string, $options: "i" } },
          { email: { $regex: search as string, $options: "i" } },
          { phone: { $regex: search as string, $options: "i" } },
          { course: { $regex: search as string, $options: "i" } }
        ];
      }

      total = await Enquiry.countDocuments(filter);
      enquiries = await Enquiry.find(filter)
        .sort({ createdAt: -1 })
        .skip((Number(page) - 1) * Number(limit))
        .limit(Number(limit));
    } else {
      let filtered = [...memoryStore.enquiries];
      if (type && type !== "all") filtered = filtered.filter(e => e.type === type);
      if (status && status !== "all") filtered = filtered.filter(e => e.status === status);
      if (course && course !== "all") filtered = filtered.filter(e => e.course === course);
      if (search) {
        const s = (search as string).toLowerCase();
        filtered = filtered.filter(e => 
          e.name.toLowerCase().includes(s) || 
          e.email.toLowerCase().includes(s) || 
          e.phone.includes(s) ||
          e.course?.toLowerCase().includes(s)
        );
      }

      total = filtered.length;
      enquiries = filtered.slice((Number(page) - 1) * Number(limit), Number(page) * Number(limit));
    }

    res.json({
      success: true,
      total,
      page: Number(page),
      limit: Number(limit),
      data: enquiries
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/enquiries/export/csv (Admin CSV export)
router.get("/export/csv", requireAuth, requireRole(["superadmin", "admin"]), async (_req: Request, res: Response): Promise<void> => {
  try {
    const dbStatus = getDbStatus();
    let enquiries: any[] = [];

    if (dbStatus.connected && !dbStatus.isMemoryFallback) {
      enquiries = await Enquiry.find().sort({ createdAt: -1 });
    } else {
      enquiries = memoryStore.enquiries;
    }

    // Generate CSV string
    const headers = ["ID", "Name", "Email", "Phone", "Course", "Mode", "Branch", "Type", "Status", "Created At", "Notes"];
    const rows = enquiries.map(e => [
      `"${e._id || e.id}"`,
      `"${(e.name || "").replace(/"/g, '""')}"`,
      `"${(e.email || "").replace(/"/g, '""')}"`,
      `"${(e.phone || "").replace(/"/g, '""')}"`,
      `"${(e.course || "").replace(/"/g, '""')}"`,
      `"${(e.mode || "").replace(/"/g, '""')}"`,
      `"${(e.branch || "").replace(/"/g, '""')}"`,
      `"${e.type}"`,
      `"${e.status}"`,
      `"${new Date(e.createdAt).toISOString()}"`,
      `"${(e.notes || "").replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\r\n");

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename=micron-enquiries-${Date.now()}.csv`);
    res.status(200).send(csvContent);
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PATCH /api/enquiries/:id (Admin update status or notes)
router.patch("/:id", requireAuth, requireRole(["superadmin", "admin", "editor"]), async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status, notes, assignedTo } = req.body;
    const dbStatus = getDbStatus();

    if (dbStatus.connected && !dbStatus.isMemoryFallback) {
      const updated = await Enquiry.findByIdAndUpdate(
        id,
        { 
          ...(status && { status }),
          ...(notes !== undefined && { notes }),
          ...(assignedTo !== undefined && { assignedTo }),
          updatedAt: new Date()
        },
        { new: true }
      );
      if (!updated) {
        res.status(404).json({ success: false, message: "Enquiry not found." });
        return;
      }
      res.json({ success: true, message: "Enquiry updated successfully", data: updated });
    } else {
      const index = memoryStore.enquiries.findIndex(e => e._id === id);
      if (index === -1) {
        res.status(404).json({ success: false, message: "Enquiry not found." });
        return;
      }
      if (status) memoryStore.enquiries[index].status = status;
      if (notes !== undefined) memoryStore.enquiries[index].notes = notes;
      if (assignedTo !== undefined) memoryStore.enquiries[index].assignedTo = assignedTo;
      memoryStore.enquiries[index].updatedAt = new Date();

      res.json({ success: true, message: "Enquiry updated successfully", data: memoryStore.enquiries[index] });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/enquiries/:id (Admin)
router.delete("/:id", requireAuth, requireRole(["superadmin", "admin"]), async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const dbStatus = getDbStatus();

    if (dbStatus.connected && !dbStatus.isMemoryFallback) {
      const deleted = await Enquiry.findByIdAndDelete(id);
      if (!deleted) {
        res.status(404).json({ success: false, message: "Enquiry not found." });
        return;
      }
    } else {
      const index = memoryStore.enquiries.findIndex(e => e._id === id);
      if (index === -1) {
        res.status(404).json({ success: false, message: "Enquiry not found." });
        return;
      }
      memoryStore.enquiries.splice(index, 1);
    }

    res.json({ success: true, message: "Enquiry deleted successfully." });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
