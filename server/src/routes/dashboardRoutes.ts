import { Router, Request, Response } from "express";
import { Enquiry } from "../models/Enquiry.js";
import { Application } from "../models/Application.js";
import { Course } from "../models/Course.js";
import { Review } from "../models/Review.js";
import { SupportTicket } from "../models/SupportTicket.js";
import { JobPosting } from "../models/JobPosting.js";
import { memoryStore } from "../services/dataStore.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { getDbStatus } from "../config/db.js";

const router = Router();

// GET /api/dashboard/stats (Real computed metrics)
router.get("/stats", requireAuth, requireRole(["superadmin", "admin", "editor"]), async (_req: Request, res: Response): Promise<void> => {
  try {
    const dbStatus = getDbStatus();

    let totalEnquiries = 0;
    let newEnquiries = 0;
    let totalApplications = 0;
    let totalCourses = 0;
    let totalReviews = 0;
    let openTickets = 0;
    let totalJobs = 0;
    let recentEnquiries: any[] = [];
    let statusBreakdown: Record<string, number> = {
      new: 0,
      contacted: 0,
      in_progress: 0,
      converted: 0,
      closed: 0
    };
    let courseDistribution: Record<string, number> = {};

    if (dbStatus.connected && !dbStatus.isMemoryFallback) {
      totalEnquiries = await Enquiry.countDocuments();
      newEnquiries = await Enquiry.countDocuments({ status: "new" });
      totalApplications = await Application.countDocuments();
      totalCourses = await Course.countDocuments({ active: true });
      totalReviews = await Review.countDocuments({ isApproved: true });
      openTickets = await SupportTicket.countDocuments({ status: { $in: ["Open", "In Progress"] } });
      totalJobs = await JobPosting.countDocuments({ status: "active" });

      recentEnquiries = await Enquiry.find().sort({ createdAt: -1 }).limit(6);

      const allEnquiries = await Enquiry.find();
      allEnquiries.forEach(e => {
        statusBreakdown[e.status] = (statusBreakdown[e.status] || 0) + 1;
        const c = e.course || "General Consultation";
        courseDistribution[c] = (courseDistribution[c] || 0) + 1;
      });
    } else {
      totalEnquiries = memoryStore.enquiries.length;
      newEnquiries = memoryStore.enquiries.filter(e => e.status === "new").length;
      totalApplications = memoryStore.applications.length;
      totalCourses = memoryStore.courses.filter(c => c.active).length;
      totalReviews = memoryStore.reviews.filter(r => r.isApproved).length;
      openTickets = memoryStore.supportTickets.filter(t => t.status === "Open" || t.status === "In Progress").length;
      totalJobs = memoryStore.jobs.filter(j => j.status === "active").length;

      recentEnquiries = memoryStore.enquiries.slice(0, 6);

      memoryStore.enquiries.forEach(e => {
        statusBreakdown[e.status] = (statusBreakdown[e.status] || 0) + 1;
        const c = e.course || "General Consultation";
        courseDistribution[c] = (courseDistribution[c] || 0) + 1;
      });
    }

    // Calculate conversion rate
    const converted = statusBreakdown.converted || 0;
    const conversionRate = totalEnquiries > 0 ? ((converted / totalEnquiries) * 100).toFixed(1) : "0.0";

    // Format course breakdown array for charts
    const courseStats = Object.keys(courseDistribution).map(name => ({
      name,
      count: courseDistribution[name]
    })).sort((a, b) => b.count - a.count).slice(0, 5);

    res.json({
      success: true,
      data: {
        totals: {
          enquiries: totalEnquiries,
          newEnquiries,
          applications: totalApplications,
          courses: totalCourses,
          reviews: totalReviews,
          openTickets,
          activeJobs: totalJobs,
          conversionRate: `${conversionRate}%`
        },
        statusDistribution: statusBreakdown,
        courseDistribution: courseStats,
        recentEnquiries,
        systemStatus: {
          databaseConnected: dbStatus.connected,
          engine: dbStatus.isMemoryFallback ? "In-Memory Embedded Engine" : "MongoDB (Mongoose Connected)",
          host: dbStatus.host,
          databaseName: dbStatus.name,
          serverUptimeSeconds: Math.floor(process.uptime()),
          nodeVersion: process.version,
          timestamp: new Date().toISOString()
        }
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
