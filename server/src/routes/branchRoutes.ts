import { Router, Request, Response } from "express";
import { Branch } from "../models/Branch.js";
import { memoryStore } from "../services/dataStore.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { getDbStatus } from "../config/db.js";

const router = Router();

// GET /api/branches (Public)
router.get("/", async (_req: Request, res: Response): Promise<void> => {
  try {
    const dbStatus = getDbStatus();
    let branchesList: any[] = [];

    if (dbStatus.connected && !dbStatus.isMemoryFallback) {
      branchesList = await Branch.find({ active: true }).sort({ isHeadquarter: -1, createdAt: 1 });
    } else {
      branchesList = memoryStore.branches.filter(b => b.active);
    }

    res.json({ success: true, count: branchesList.length, data: branchesList });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/branches (Admin)
router.post("/", requireAuth, requireRole(["superadmin", "admin"]), async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, city, address, phone, email, googleMapsUrl, timings, isHeadquarter } = req.body;
    if (!name || !city || !address || !phone || !email) {
      res.status(400).json({ success: false, message: "Name, city, address, phone, and email are required." });
      return;
    }

    const dbStatus = getDbStatus();
    const branchData = {
      name: name.trim(),
      city: city.trim(),
      address: address.trim(),
      phone: phone.trim(),
      email: email.trim(),
      googleMapsUrl: googleMapsUrl || "",
      timings: timings || "Mon - Sat: 8:00 AM - 8:30 PM | Sunday: 9:00 AM - 6:00 PM",
      isHeadquarter: isHeadquarter === true,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    if (dbStatus.connected && !dbStatus.isMemoryFallback) {
      const branch = new Branch(branchData);
      await branch.save();
      res.status(201).json({ success: true, message: "Branch added successfully", data: branch });
    } else {
      const newBranch = {
        _id: memoryStore.generateId(),
        ...branchData
      };
      memoryStore.branches.push(newBranch);
      res.status(201).json({ success: true, message: "Branch added successfully", data: newBranch });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/branches/:id (Admin)
router.put("/:id", requireAuth, requireRole(["superadmin", "admin"]), async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const dbStatus = getDbStatus();

    if (dbStatus.connected && !dbStatus.isMemoryFallback) {
      const updated = await Branch.findByIdAndUpdate(id, updateData, { new: true });
      if (!updated) {
        res.status(404).json({ success: false, message: "Branch not found." });
        return;
      }
      res.json({ success: true, message: "Branch updated successfully", data: updated });
    } else {
      const index = memoryStore.branches.findIndex(b => b._id === id);
      if (index === -1) {
        res.status(404).json({ success: false, message: "Branch not found." });
        return;
      }
      memoryStore.branches[index] = {
        ...memoryStore.branches[index],
        ...updateData,
        updatedAt: new Date()
      };
      res.json({ success: true, message: "Branch updated successfully", data: memoryStore.branches[index] });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/branches/:id (Admin)
router.delete("/:id", requireAuth, requireRole(["superadmin", "admin"]), async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const dbStatus = getDbStatus();

    if (dbStatus.connected && !dbStatus.isMemoryFallback) {
      const deleted = await Branch.findByIdAndDelete(id);
      if (!deleted) {
        res.status(404).json({ success: false, message: "Branch not found." });
        return;
      }
    } else {
      const index = memoryStore.branches.findIndex(b => b._id === id);
      if (index === -1) {
        res.status(404).json({ success: false, message: "Branch not found." });
        return;
      }
      memoryStore.branches.splice(index, 1);
    }

    res.json({ success: true, message: "Branch deleted successfully." });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
