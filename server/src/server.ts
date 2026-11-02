import dotenv from "dotenv";
dotenv.config();

import { createApp } from "./app.js";
import { connectDB, getDbStatus } from "./config/db.js";
import { User } from "./models/User.js";
import { Course } from "./models/Course.js";
import { Review } from "./models/Review.js";
import { Branch } from "./models/Branch.js";
import { BlogPost } from "./models/BlogPost.js";
import { memoryStore } from "./services/dataStore.js";

const PORT = process.env.PORT || 5000;

const autoSeedIfEmpty = async () => {
  try {
    const dbStatus = getDbStatus();
    if (dbStatus.connected && !dbStatus.isMemoryFallback) {
      const userCount = await User.countDocuments();
      if (userCount === 0) {
        console.log("[AutoSeed] Initializing default admin and collections in MongoDB...");
        await User.create([
          {
            name: "Micron Super Admin",
            email: "admin@microninfotech.com",
            password: "Admin@123456",
            role: "superadmin",
            isActive: true,
            phone: "+91 98450 12345"
          },
          {
            name: "Content Editor",
            email: "editor@microninfotech.com",
            password: "Editor@123456",
            role: "editor",
            isActive: true,
            phone: "+91 98450 67890"
          }
        ]);
        if (memoryStore.courses?.length) await Course.insertMany(memoryStore.courses.map(({ _id, ...c }) => c));
        if (memoryStore.reviews?.length) await Review.insertMany(memoryStore.reviews.map(({ _id, ...r }) => r));
        if (memoryStore.branches?.length) await Branch.insertMany(memoryStore.branches.map(({ _id, ...b }) => b));
        if (memoryStore.blogs?.length) await BlogPost.insertMany(memoryStore.blogs.map(({ _id, ...b }) => b));
        console.log("[AutoSeed] Default admin and collections seeded successfully.");
      }
    }
  } catch (err: any) {
    console.warn("[AutoSeed] Notice:", err.message);
  }
};

const startServer = async () => {
  try {
    // Connect to Database (real MongoDB or automatic memory fallback)
    await connectDB();
    await autoSeedIfEmpty();

    const app = createApp();

    const server = app.listen(PORT, () => {
      console.log(`====================================================`);
      console.log(`🚀 Micron InfoTech API Server running on port ${PORT}`);
      console.log(`🌐 API Health Endpoint: http://localhost:${PORT}/api/health`);
      console.log(`🔑 Superadmin: admin@microninfotech.com / Admin@123456`);
      console.log(`⚙️  Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(`====================================================`);
    });

    const shutdown = async () => {
      console.log("\n[Server] Graceful shutdown initiated...");
      server.close(() => {
        console.log("[Server] HTTP server closed.");
        process.exit(0);
      });
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (error: any) {
    console.error(`[Server] Failed to start server:`, error);
    process.exit(1);
  }
};

startServer();
