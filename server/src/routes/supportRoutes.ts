import { Router, Request, Response } from "express";
import { SupportTicket } from "../models/SupportTicket.js";
import { memoryStore } from "../services/dataStore.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { validateSupportTicket } from "../middleware/validation.js";
import { getDbStatus } from "../config/db.js";

const router = Router();

// POST /api/support (Public submit ticket)
router.post("/", validateSupportTicket, async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, studentId, category, priority, description } = req.body;
    const ticketNumber = `MIC-${Math.floor(100000 + Math.random() * 900000)}`;
    const dbStatus = getDbStatus();

    const ticketData = {
      ticketNumber,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone ? phone.trim() : "",
      studentId: studentId ? studentId.trim() : "",
      category: category || "Batch Timing & Schedule",
      priority: priority || "Normal",
      description: description.trim(),
      status: "Open",
      responseNotes: "Ticket created. Assigned to student support desk.",
      createdAt: new Date(),
      updatedAt: new Date()
    };

    if (dbStatus.connected && !dbStatus.isMemoryFallback) {
      const ticket = new SupportTicket(ticketData);
      await ticket.save();
      res.status(201).json({
        success: true,
        message: "Support ticket raised successfully.",
        ticketNumber,
        data: ticket
      });
    } else {
      const newTicket = {
        _id: memoryStore.generateId(),
        ...ticketData
      };
      memoryStore.supportTickets.unshift(newTicket);
      res.status(201).json({
        success: true,
        message: "Support ticket raised successfully.",
        ticketNumber,
        data: newTicket
      });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/support/track/:ticketNumber (Public ticket tracking)
router.get("/track/:ticketNumber", async (req: Request, res: Response): Promise<void> => {
  try {
    const ticketNumber = String(req.params.ticketNumber);
    const dbStatus = getDbStatus();
    let ticket: any = null;

    if (dbStatus.connected && !dbStatus.isMemoryFallback) {
      ticket = await SupportTicket.findOne({ ticketNumber: ticketNumber.toUpperCase() });
    } else {
      ticket = memoryStore.supportTickets.find(t => t.ticketNumber.toUpperCase() === ticketNumber.toUpperCase());
    }

    if (!ticket) {
      res.status(404).json({ success: false, message: `Ticket ${ticketNumber} not found.` });
      return;
    }

    res.json({
      success: true,
      data: {
        ticketNumber: ticket.ticketNumber,
        name: ticket.name,
        category: ticket.category,
        priority: ticket.priority,
        status: ticket.status,
        description: ticket.description,
        responseNotes: ticket.responseNotes,
        createdAt: ticket.createdAt,
        updatedAt: ticket.updatedAt
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/support (Admin listing)
router.get("/", requireAuth, requireRole(["superadmin", "admin", "editor"]), async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, priority, search } = req.query;
    const dbStatus = getDbStatus();
    let tickets: any[] = [];

    if (dbStatus.connected && !dbStatus.isMemoryFallback) {
      const filter: any = {};
      if (status && status !== "all") filter.status = status;
      if (priority && priority !== "all") filter.priority = priority;
      if (search) {
        filter.$or = [
          { ticketNumber: { $regex: search as string, $options: "i" } },
          { name: { $regex: search as string, $options: "i" } },
          { email: { $regex: search as string, $options: "i" } },
          { studentId: { $regex: search as string, $options: "i" } }
        ];
      }
      tickets = await SupportTicket.find(filter).sort({ createdAt: -1 });
    } else {
      let filtered = [...memoryStore.supportTickets];
      if (status && status !== "all") filtered = filtered.filter(t => t.status === status);
      if (priority && priority !== "all") filtered = filtered.filter(t => t.priority === priority);
      if (search) {
        const s = (search as string).toLowerCase();
        filtered = filtered.filter(t => 
          t.ticketNumber.toLowerCase().includes(s) || 
          t.name.toLowerCase().includes(s) || 
          t.email.toLowerCase().includes(s) ||
          t.studentId?.toLowerCase().includes(s)
        );
      }
      tickets = filtered;
    }

    res.json({ success: true, count: tickets.length, data: tickets });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PATCH /api/support/:id (Admin update status or notes)
router.patch("/:id", requireAuth, requireRole(["superadmin", "admin", "editor"]), async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status, responseNotes } = req.body;
    const dbStatus = getDbStatus();

    const updateFields: any = { updatedAt: new Date() };
    if (status) updateFields.status = status;
    if (responseNotes !== undefined) updateFields.responseNotes = responseNotes;
    if (status === "Resolved" || status === "Closed") updateFields.resolvedAt = new Date();

    if (dbStatus.connected && !dbStatus.isMemoryFallback) {
      const updated = await SupportTicket.findByIdAndUpdate(id, updateFields, { new: true });
      if (!updated) {
        res.status(404).json({ success: false, message: "Ticket not found." });
        return;
      }
      res.json({ success: true, message: "Ticket updated successfully", data: updated });
    } else {
      const index = memoryStore.supportTickets.findIndex(t => t._id === id);
      if (index === -1) {
        res.status(404).json({ success: false, message: "Ticket not found." });
        return;
      }
      if (status) memoryStore.supportTickets[index].status = status;
      if (responseNotes !== undefined) memoryStore.supportTickets[index].responseNotes = responseNotes;
      if (status === "Resolved" || status === "Closed") memoryStore.supportTickets[index].resolvedAt = new Date();
      memoryStore.supportTickets[index].updatedAt = new Date();

      res.json({ success: true, message: "Ticket updated successfully", data: memoryStore.supportTickets[index] });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/support/:id (Admin)
router.delete("/:id", requireAuth, requireRole(["superadmin", "admin"]), async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const dbStatus = getDbStatus();

    if (dbStatus.connected && !dbStatus.isMemoryFallback) {
      const deleted = await SupportTicket.findByIdAndDelete(id);
      if (!deleted) {
        res.status(404).json({ success: false, message: "Ticket not found." });
        return;
      }
    } else {
      const index = memoryStore.supportTickets.findIndex(t => t._id === id);
      if (index === -1) {
        res.status(404).json({ success: false, message: "Ticket not found." });
        return;
      }
      memoryStore.supportTickets.splice(index, 1);
    }

    res.json({ success: true, message: "Ticket deleted successfully." });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
