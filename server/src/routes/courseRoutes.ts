import { Router, Request, Response } from "express";
import { Course } from "../models/Course.js";
import { memoryStore } from "../services/dataStore.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { getDbStatus } from "../config/db.js";

const router = Router();

// Helper to slugify
const slugify = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

// GET /api/courses (Public)
router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, search, popular, all } = req.query;
    const dbStatus = getDbStatus();

    let coursesList: any[] = [];

    if (dbStatus.connected && !dbStatus.isMemoryFallback) {
      const query: any = {};
      if (all !== "true") query.active = true;
      if (category && category !== "All") query.category = category;
      if (popular === "true") query.popular = true;
      if (search) {
        query.$or = [
          { title: { $regex: search as string, $options: "i" } },
          { category: { $regex: search as string, $options: "i" } },
          { highlights: { $regex: search as string, $options: "i" } }
        ];
      }
      coursesList = await Course.find(query).sort({ order: 1, createdAt: -1 });
    } else {
      coursesList = memoryStore.courses.filter(c => {
        if (all !== "true" && !c.active) return false;
        if (category && category !== "All" && c.category.toLowerCase() !== (category as string).toLowerCase()) return false;
        if (popular === "true" && !c.popular) return false;
        if (search) {
          const s = (search as string).toLowerCase();
          const matchTitle = c.title.toLowerCase().includes(s);
          const matchCat = c.category.toLowerCase().includes(s);
          const matchHighlights = c.highlights?.some((h: string) => h.toLowerCase().includes(s));
          if (!matchTitle && !matchCat && !matchHighlights) return false;
        }
        return true;
      });
    }

    res.json({ success: true, count: coursesList.length, data: coursesList });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/courses/:slugOrId (Public)
router.get("/:slugOrId", async (req: Request, res: Response): Promise<void> => {
  try {
    const slugOrId = String(req.params.slugOrId);
    const dbStatus = getDbStatus();
    let course: any = null;

    if (dbStatus.connected && !dbStatus.isMemoryFallback) {
      course = await Course.findOne({
        $or: [{ slug: slugOrId }, { _id: slugOrId.match(/^[0-9a-fA-F]{24}$/) ? slugOrId : undefined }]
      });
    } else {
      course = memoryStore.courses.find(c => c.slug === slugOrId || c._id === slugOrId);
    }

    if (!course) {
      res.status(404).json({ success: false, message: "Course not found." });
      return;
    }

    res.json({ success: true, data: course });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/courses (Admin)
router.post("/", requireAuth, requireRole(["superadmin", "admin"]), async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, category, badge, duration, mode, price, syllabus, highlights, popular, active } = req.body;
    if (!title || !category || !duration) {
      res.status(400).json({ success: false, message: "Title, category, and duration are required." });
      return;
    }

    const baseSlug = slugify(title);
    let slug = baseSlug;
    const dbStatus = getDbStatus();

    if (dbStatus.connected && !dbStatus.isMemoryFallback) {
      let counter = 1;
      while (await Course.exists({ slug })) {
        slug = `${baseSlug}-${counter++}`;
      }
      const course = new Course({
        title,
        slug,
        category,
        badge: badge || "",
        duration,
        mode: mode || "Classroom & Live Online",
        price: price ? Number(price) : 24999,
        syllabus: syllabus || [],
        highlights: highlights || [],
        popular: popular === true,
        active: active !== false,
        rating: 4.8,
        reviewsCount: 100
      });
      await course.save();
      res.status(201).json({ success: true, message: "Course created successfully", data: course });
    } else {
      let counter = 1;
      while (memoryStore.courses.some(c => c.slug === slug)) {
        slug = `${baseSlug}-${counter++}`;
      }
      const newCourse = {
        _id: memoryStore.generateId(),
        title,
        slug,
        category,
        badge: badge || "",
        duration,
        mode: mode || "Classroom & Live Online",
        price: price ? Number(price) : 24999,
        syllabus: syllabus || [],
        highlights: highlights || [],
        popular: popular === true,
        active: active !== false,
        rating: 4.8,
        reviewsCount: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      memoryStore.courses.push(newCourse);
      res.status(201).json({ success: true, message: "Course created successfully", data: newCourse });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/courses/:id (Admin)
router.put("/:id", requireAuth, requireRole(["superadmin", "admin"]), async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    if (updateData.title && !updateData.slug) {
      updateData.slug = slugify(updateData.title);
    }

    const dbStatus = getDbStatus();

    if (dbStatus.connected && !dbStatus.isMemoryFallback) {
      const updated = await Course.findByIdAndUpdate(id, updateData, { new: true });
      if (!updated) {
        res.status(404).json({ success: false, message: "Course not found." });
        return;
      }
      res.json({ success: true, message: "Course updated successfully", data: updated });
    } else {
      const index = memoryStore.courses.findIndex(c => c._id === id);
      if (index === -1) {
        res.status(404).json({ success: false, message: "Course not found." });
        return;
      }
      memoryStore.courses[index] = {
        ...memoryStore.courses[index],
        ...updateData,
        updatedAt: new Date()
      };
      res.json({ success: true, message: "Course updated successfully", data: memoryStore.courses[index] });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/courses/:id (Admin)
router.delete("/:id", requireAuth, requireRole(["superadmin", "admin"]), async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const dbStatus = getDbStatus();

    if (dbStatus.connected && !dbStatus.isMemoryFallback) {
      const deleted = await Course.findByIdAndDelete(id);
      if (!deleted) {
        res.status(404).json({ success: false, message: "Course not found." });
        return;
      }
    } else {
      const index = memoryStore.courses.findIndex(c => c._id === id);
      if (index === -1) {
        res.status(404).json({ success: false, message: "Course not found." });
        return;
      }
      memoryStore.courses.splice(index, 1);
    }

    res.json({ success: true, message: "Course deleted successfully." });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
