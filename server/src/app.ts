import express, { Express, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

// Routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import branchRoutes from "./routes/branchRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import supportRoutes from "./routes/supportRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

// Middleware
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import { getDbStatus } from "./config/db.js";

export const createApp = (): Express => {
  const app = express();

  // Security Headers
  app.use(helmet({
    contentSecurityPolicy: false, // allows React dev integration
    crossOriginResourcePolicy: { policy: "cross-origin" }
  }));

  // CORS Configuration
  const allowedOrigins = process.env.ALLOWED_ORIGINS 
    ? process.env.ALLOWED_ORIGINS.split(",") 
    : ["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173", "http://localhost:5000"];

  app.use(cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, postman)
      if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== "production") {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
  }));

  // Request Rate Limiting
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // Limit each IP to 1000 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: "Too many requests from this IP, please try again later." }
  });
  app.use("/api/", apiLimiter);

  // Stricter rate limit on Auth endpoints
  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
    message: { success: false, message: "Too many login attempts, please try again after 15 minutes." }
  });
  app.use("/api/auth/login", authLimiter);

  // Logging
  if (process.env.NODE_ENV !== "test") {
    app.use(morgan("dev"));
  }

  // Body Parsing
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  // Root / Health check endpoint
  app.get("/api/health", (_req: Request, res: Response) => {
    const dbStatus = getDbStatus();
    res.json({
      status: "UP",
      name: "Micron InfoTech Enterprise Backend API",
      version: "1.0.0",
      database: dbStatus,
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    });
  });

  // Mount API modules
  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/courses", courseRoutes);
  app.use("/api/enquiries", enquiryRoutes);
  app.use("/api/applications", applicationRoutes);
  app.use("/api/jobs", jobRoutes);
  app.use("/api/reviews", reviewRoutes);
  app.use("/api/branches", branchRoutes);
  app.use("/api/blogs", blogRoutes);
  app.use("/api/support", supportRoutes);
  app.use("/api/dashboard", dashboardRoutes);

  // 404 Handler
  app.use(notFoundHandler);

  // Centralized Error Handler
  app.use(errorHandler);

  return app;
};
