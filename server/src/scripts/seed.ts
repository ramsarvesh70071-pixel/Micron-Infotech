import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
import { Course } from "../models/Course.js";
import { Enquiry } from "../models/Enquiry.js";
import { Application } from "../models/Application.js";
import { JobPosting } from "../models/JobPosting.js";
import { Review } from "../models/Review.js";
import { Branch } from "../models/Branch.js";
import { BlogPost } from "../models/BlogPost.js";
import { SupportTicket } from "../models/SupportTicket.js";
import { memoryStore } from "../services/dataStore.js";

const seedDatabase = async () => {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/micron_infotech";
  console.log(`[Seed] Connecting to MongoDB at ${uri}...`);

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log("[Seed] Connected to MongoDB. Clearing existing collections...");

    await Promise.all([
      User.deleteMany({}),
      Course.deleteMany({}),
      Enquiry.deleteMany({}),
      Application.deleteMany({}),
      JobPosting.deleteMany({}),
      Review.deleteMany({}),
      Branch.deleteMany({}),
      BlogPost.deleteMany({}),
      SupportTicket.deleteMany({})
    ]);

    console.log("[Seed] Seeding Admin users...");
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

    console.log("[Seed] Seeding Courses...");
    await Course.insertMany(memoryStore.courses.map(({ _id, ...c }) => c));

    console.log("[Seed] Seeding Reviews...");
    await Review.insertMany(memoryStore.reviews.map(({ _id, ...r }) => r));

    console.log("[Seed] Seeding Branches...");
    await Branch.insertMany(memoryStore.branches.map(({ _id, ...b }) => b));

    console.log("[Seed] Seeding Enquiries...");
    await Enquiry.insertMany(memoryStore.enquiries.map(({ _id, ...e }) => e));

    console.log("[Seed] Seeding Applications...");
    await Application.insertMany(memoryStore.applications.map(({ _id, ...a }) => a));

    console.log("[Seed] Seeding Jobs...");
    await JobPosting.insertMany(memoryStore.jobs.map(({ _id, ...j }) => j));

    console.log("[Seed] Seeding Blogs...");
    await BlogPost.insertMany(memoryStore.blogs.map(({ _id, ...b }) => b));

    console.log("[Seed] Seeding Support Tickets...");
    await SupportTicket.insertMany(memoryStore.supportTickets.map(({ _id, ...t }) => t));

    console.log("=================================================");
    console.log("✅ Seed completed successfully in MongoDB!");
    console.log("👤 Superadmin: admin@microninfotech.com / Admin@123456");
    console.log("👤 Editor:     editor@microninfotech.com / Editor@123456");
    console.log("=================================================");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error: any) {
    console.error("[Seed] Error seeding database:", error.message);
    process.exit(1);
  }
};

seedDatabase();
