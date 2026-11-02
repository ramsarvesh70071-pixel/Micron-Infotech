import { Router, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
import { memoryStore } from "../services/dataStore.js";
import { requireAuth, requireRole, AuthRequest } from "../middleware/auth.js";
import { getDbStatus } from "../config/db.js";

const router = Router();

// All user management routes require Superadmin role
router.use(requireAuth);
router.use(requireRole("superadmin"));

// GET /api/users
router.get("/", async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const dbStatus = getDbStatus();
    let usersList: any[] = [];

    if (dbStatus.connected && !dbStatus.isMemoryFallback) {
      usersList = await User.find().select("-password").sort({ createdAt: -1 });
    } else {
      usersList = memoryStore.users.map(({ password, ...u }) => u);
    }

    res.json({ success: true, count: usersList.length, data: usersList });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/users
router.post("/", async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, email, password, role, phone, avatar } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ success: false, message: "Name, email, and password are required." });
      return;
    }

    const dbStatus = getDbStatus();
    const cleanEmail = email.toLowerCase().trim();

    if (dbStatus.connected && !dbStatus.isMemoryFallback) {
      const existing = await User.findOne({ email: cleanEmail });
      if (existing) {
        res.status(400).json({ success: false, message: "A user with this email already exists." });
        return;
      }

      const newUser = new User({
        name: name.trim(),
        email: cleanEmail,
        password,
        role: role || "admin",
        phone: phone || "",
        avatar: avatar || ""
      });
      await newUser.save();
      res.status(201).json({ success: true, message: "User created successfully", data: newUser.toSafeObject() });
    } else {
      const existing = memoryStore.users.find(u => u.email.toLowerCase() === cleanEmail);
      if (existing) {
        res.status(400).json({ success: false, message: "A user with this email already exists." });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        _id: memoryStore.generateId(),
        name: name.trim(),
        email: cleanEmail,
        password: hashedPassword,
        role: role || "admin",
        isActive: true,
        phone: phone || "",
        avatar: avatar || "",
        createdAt: new Date(),
        updatedAt: new Date()
      };
      memoryStore.users.push(newUser);
      const { password: _, ...safeUser } = newUser;
      res.status(201).json({ success: true, message: "User created successfully", data: safeUser });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/users/:id
router.put("/:id", async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, role, isActive, phone } = req.body;
    const dbStatus = getDbStatus();

    if (dbStatus.connected && !dbStatus.isMemoryFallback) {
      const user = await User.findById(id);
      if (!user) {
        res.status(404).json({ success: false, message: "User not found." });
        return;
      }
      if (name) user.name = name;
      if (role) user.role = role;
      if (typeof isActive === "boolean") user.isActive = isActive;
      if (phone !== undefined) user.phone = phone;
      await user.save();
      res.json({ success: true, message: "User updated successfully", data: user.toSafeObject() });
    } else {
      const user = memoryStore.users.find(u => u._id === id);
      if (!user) {
        res.status(404).json({ success: false, message: "User not found." });
        return;
      }
      if (name) user.name = name;
      if (role) user.role = role;
      if (typeof isActive === "boolean") user.isActive = isActive;
      if (phone !== undefined) user.phone = phone;
      user.updatedAt = new Date();
      const { password: _, ...safeUser } = user;
      res.json({ success: true, message: "User updated successfully", data: safeUser });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/users/:id
router.delete("/:id", async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (id === req.user?.id) {
      res.status(400).json({ success: false, message: "You cannot delete your own account." });
      return;
    }

    const dbStatus = getDbStatus();
    if (dbStatus.connected && !dbStatus.isMemoryFallback) {
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        res.status(404).json({ success: false, message: "User not found." });
        return;
      }
    } else {
      const index = memoryStore.users.findIndex(u => u._id === id);
      if (index === -1) {
        res.status(404).json({ success: false, message: "User not found." });
        return;
      }
      memoryStore.users.splice(index, 1);
    }

    res.json({ success: true, message: "User deleted successfully." });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
