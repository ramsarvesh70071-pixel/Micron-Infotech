import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User, IUser } from "../models/User.js";
import { memoryStore } from "../services/dataStore.js";
import { generateToken, requireAuth, AuthRequest } from "../middleware/auth.js";
import { validateLogin } from "../middleware/validation.js";
import { getDbStatus } from "../config/db.js";

const router = Router();

// POST /api/auth/login
router.post("/login", validateLogin, async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const dbStatus = getDbStatus();

    let user: any = null;

    if (dbStatus.connected && !dbStatus.isMemoryFallback) {
      user = await User.findOne({ email: email.toLowerCase() });
    } else {
      user = memoryStore.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    }

    if (!user) {
      res.status(401).json({ success: false, message: "Invalid email or password." });
      return;
    }

    if (!user.isActive) {
      res.status(403).json({ success: false, message: "This account has been deactivated. Please contact administrator." });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ success: false, message: "Invalid email or password." });
      return;
    }

    // Update lastLogin
    user.lastLogin = new Date();
    if (dbStatus.connected && !dbStatus.isMemoryFallback) {
      await user.save();
    }

    const token = generateToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
      name: user.name
    });

    const userObj = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      phone: user.phone,
      lastLogin: user.lastLogin
    };

    res.json({
      success: true,
      message: "Authentication successful",
      token,
      user: userObj
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/auth/me
router.get("/me", requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const dbStatus = getDbStatus();
    let user: any = null;

    if (dbStatus.connected && !dbStatus.isMemoryFallback) {
      user = await User.findById(req.user?.id).select("-password");
    } else {
      const found = memoryStore.users.find(u => u._id.toString() === req.user?.id);
      if (found) {
        const { password, ...safeUser } = found;
        user = safeUser;
      }
    }

    if (!user) {
      res.status(404).json({ success: false, message: "User profile not found." });
      return;
    }

    res.json({
      success: true,
      user: {
        id: user._id?.toString() || user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        phone: user.phone,
        lastLogin: user.lastLogin
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/auth/profile
router.put("/profile", requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, phone, avatar, newPassword, currentPassword } = req.body;
    const dbStatus = getDbStatus();

    let user: any = null;

    if (dbStatus.connected && !dbStatus.isMemoryFallback) {
      user = await User.findById(req.user?.id);
    } else {
      user = memoryStore.users.find(u => u._id.toString() === req.user?.id);
    }

    if (!user) {
      res.status(404).json({ success: false, message: "User not found." });
      return;
    }

    if (name) user.name = name.trim();
    if (phone) user.phone = phone.trim();
    if (avatar) user.avatar = avatar.trim();

    if (newPassword) {
      if (!currentPassword) {
        res.status(400).json({ success: false, message: "Current password is required to set a new password." });
        return;
      }
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        res.status(400).json({ success: false, message: "Current password does not match." });
        return;
      }
      user.password = await bcrypt.hash(newPassword, 10);
    }

    user.updatedAt = new Date();
    if (dbStatus.connected && !dbStatus.isMemoryFallback) {
      await user.save();
    }

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        phone: user.phone
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
