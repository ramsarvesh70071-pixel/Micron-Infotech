import { Router, Request, Response } from "express";
import { BlogPost } from "../models/BlogPost.js";
import { memoryStore } from "../services/dataStore.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { getDbStatus } from "../config/db.js";

const router = Router();

const slugify = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

// GET /api/blogs (Public published posts)
router.get("/", async (_req: Request, res: Response): Promise<void> => {
  try {
    const dbStatus = getDbStatus();
    let blogsList: any[] = [];

    if (dbStatus.connected && !dbStatus.isMemoryFallback) {
      blogsList = await BlogPost.find({ isPublished: true }).sort({ publishedAt: -1, createdAt: -1 });
    } else {
      blogsList = memoryStore.blogs.filter(b => b.isPublished);
    }

    res.json({ success: true, count: blogsList.length, data: blogsList });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/blogs/:slugOrId (Public single post)
router.get("/:slugOrId", async (req: Request, res: Response): Promise<void> => {
  try {
    const slugOrId = String(req.params.slugOrId);
    const dbStatus = getDbStatus();
    let post: any = null;

    if (dbStatus.connected && !dbStatus.isMemoryFallback) {
      post = await BlogPost.findOne({
        $or: [{ slug: slugOrId }, { _id: slugOrId.match(/^[0-9a-fA-F]{24}$/) ? slugOrId : undefined }]
      });
    } else {
      post = memoryStore.blogs.find(b => b.slug === slugOrId || b._id === slugOrId);
    }

    if (!post) {
      res.status(404).json({ success: false, message: "Blog post not found." });
      return;
    }

    res.json({ success: true, data: post });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/blogs/admin/all (Admin all posts)
router.get("/admin/all", requireAuth, requireRole(["superadmin", "admin", "editor"]), async (_req: Request, res: Response): Promise<void> => {
  try {
    const dbStatus = getDbStatus();
    let blogsList: any[] = [];

    if (dbStatus.connected && !dbStatus.isMemoryFallback) {
      blogsList = await BlogPost.find().sort({ createdAt: -1 });
    } else {
      blogsList = memoryStore.blogs;
    }

    res.json({ success: true, count: blogsList.length, data: blogsList });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/blogs (Admin/Editor create)
router.post("/", requireAuth, requireRole(["superadmin", "admin", "editor"]), async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, excerpt, content, author, category, tags, coverImage, readTime, isPublished } = req.body;
    if (!title || !excerpt || !content) {
      res.status(400).json({ success: false, message: "Title, excerpt, and content are required." });
      return;
    }

    const slug = slugify(title);
    const dbStatus = getDbStatus();

    const blogData = {
      title: title.trim(),
      slug,
      excerpt: excerpt.trim(),
      content: content.trim(),
      author: author || "Micron Editorial Board",
      category: category || "Tech & Careers",
      tags: tags || ["Technology"],
      coverImage: coverImage || "",
      readTime: readTime || "5 min read",
      isPublished: isPublished !== false,
      publishedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    if (dbStatus.connected && !dbStatus.isMemoryFallback) {
      const blog = new BlogPost(blogData);
      await blog.save();
      res.status(201).json({ success: true, message: "Blog published successfully", data: blog });
    } else {
      const newBlog = {
        _id: memoryStore.generateId(),
        ...blogData
      };
      memoryStore.blogs.unshift(newBlog);
      res.status(201).json({ success: true, message: "Blog published successfully", data: newBlog });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/blogs/:id (Admin/Editor update)
router.put("/:id", requireAuth, requireRole(["superadmin", "admin", "editor"]), async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    if (updateData.title && !updateData.slug) {
      updateData.slug = slugify(updateData.title);
    }
    const dbStatus = getDbStatus();

    if (dbStatus.connected && !dbStatus.isMemoryFallback) {
      const updated = await BlogPost.findByIdAndUpdate(id, updateData, { new: true });
      if (!updated) {
        res.status(404).json({ success: false, message: "Blog post not found." });
        return;
      }
      res.json({ success: true, message: "Blog post updated successfully", data: updated });
    } else {
      const index = memoryStore.blogs.findIndex(b => b._id === id);
      if (index === -1) {
        res.status(404).json({ success: false, message: "Blog post not found." });
        return;
      }
      memoryStore.blogs[index] = {
        ...memoryStore.blogs[index],
        ...updateData,
        updatedAt: new Date()
      };
      res.json({ success: true, message: "Blog post updated successfully", data: memoryStore.blogs[index] });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/blogs/:id (Admin)
router.delete("/:id", requireAuth, requireRole(["superadmin", "admin"]), async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const dbStatus = getDbStatus();

    if (dbStatus.connected && !dbStatus.isMemoryFallback) {
      const deleted = await BlogPost.findByIdAndDelete(id);
      if (!deleted) {
        res.status(404).json({ success: false, message: "Blog post not found." });
        return;
      }
    } else {
      const index = memoryStore.blogs.findIndex(b => b._id === id);
      if (index === -1) {
        res.status(404).json({ success: false, message: "Blog post not found." });
        return;
      }
      memoryStore.blogs.splice(index, 1);
    }

    res.json({ success: true, message: "Blog post deleted successfully." });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
