import { Router, Request, Response } from "express";
import { Review } from "../models/Review.js";
import { memoryStore } from "../services/dataStore.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { getDbStatus } from "../config/db.js";

const router = Router();

// GET /api/reviews (Public approved reviews)
router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const { course, featured } = req.query;
    const dbStatus = getDbStatus();

    let reviewsList: any[] = [];

    if (dbStatus.connected && !dbStatus.isMemoryFallback) {
      const query: any = { isApproved: true };
      if (course && course !== "All") query.course = { $regex: course as string, $options: "i" };
      if (featured === "true") query.isFeatured = true;
      reviewsList = await Review.find(query).sort({ createdAt: -1 });
    } else {
      reviewsList = memoryStore.reviews.filter(r => {
        if (!r.isApproved) return false;
        if (course && course !== "All" && !r.course.toLowerCase().includes((course as string).toLowerCase())) return false;
        if (featured === "true" && !r.isFeatured) return false;
        return true;
      });
    }

    res.json({ success: true, count: reviewsList.length, data: reviewsList });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/reviews/admin (Admin - all reviews including pending)
router.get("/admin", requireAuth, requireRole(["superadmin", "admin", "editor"]), async (_req: Request, res: Response): Promise<void> => {
  try {
    const dbStatus = getDbStatus();
    let reviewsList: any[] = [];

    if (dbStatus.connected && !dbStatus.isMemoryFallback) {
      reviewsList = await Review.find().sort({ createdAt: -1 });
    } else {
      reviewsList = memoryStore.reviews;
    }

    res.json({ success: true, count: reviewsList.length, data: reviewsList });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/reviews (Public review submission)
router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, role, company, rating, reviewText, course, avatar, hike, packageLpa } = req.body;
    if (!name || !role || !company || !reviewText || !course) {
      res.status(400).json({ success: false, message: "Name, role, company, review text, and course are required." });
      return;
    }

    const dbStatus = getDbStatus();
    const reviewData = {
      name: name.trim(),
      role: role.trim(),
      company: company.trim(),
      rating: rating ? Math.min(5, Math.max(1, Number(rating))) : 5,
      reviewText: reviewText.trim(),
      course: course.trim(),
      avatar: avatar || "",
      hike: hike || "",
      packageLpa: packageLpa || "",
      isApproved: true, // Auto-approve for public display with admin moderation
      isFeatured: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    if (dbStatus.connected && !dbStatus.isMemoryFallback) {
      const review = new Review(reviewData);
      await review.save();
      res.status(201).json({ success: true, message: "Thank you! Your testimonial has been posted.", data: review });
    } else {
      const newReview = {
        _id: memoryStore.generateId(),
        ...reviewData
      };
      memoryStore.reviews.unshift(newReview);
      res.status(201).json({ success: true, message: "Thank you! Your testimonial has been posted.", data: newReview });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PATCH /api/reviews/:id/approve (Admin toggle approval)
router.patch("/:id/approve", requireAuth, requireRole(["superadmin", "admin", "editor"]), async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { isApproved, isFeatured } = req.body;
    const dbStatus = getDbStatus();

    if (dbStatus.connected && !dbStatus.isMemoryFallback) {
      const review = await Review.findById(id);
      if (!review) {
        res.status(404).json({ success: false, message: "Review not found." });
        return;
      }
      if (typeof isApproved === "boolean") review.isApproved = isApproved;
      if (typeof isFeatured === "boolean") review.isFeatured = isFeatured;
      review.updatedAt = new Date();
      await review.save();
      res.json({ success: true, message: "Review updated successfully", data: review });
    } else {
      const review = memoryStore.reviews.find(r => r._id === id);
      if (!review) {
        res.status(404).json({ success: false, message: "Review not found." });
        return;
      }
      if (typeof isApproved === "boolean") review.isApproved = isApproved;
      if (typeof isFeatured === "boolean") review.isFeatured = isFeatured;
      review.updatedAt = new Date();
      res.json({ success: true, message: "Review updated successfully", data: review });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/reviews/:id (Admin)
router.delete("/:id", requireAuth, requireRole(["superadmin", "admin"]), async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const dbStatus = getDbStatus();

    if (dbStatus.connected && !dbStatus.isMemoryFallback) {
      const deleted = await Review.findByIdAndDelete(id);
      if (!deleted) {
        res.status(404).json({ success: false, message: "Review not found." });
        return;
      }
    } else {
      const index = memoryStore.reviews.findIndex(r => r._id === id);
      if (index === -1) {
        res.status(404).json({ success: false, message: "Review not found." });
        return;
      }
      memoryStore.reviews.splice(index, 1);
    }

    res.json({ success: true, message: "Review deleted successfully." });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
