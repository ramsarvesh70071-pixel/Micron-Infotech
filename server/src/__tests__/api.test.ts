import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";
import { createApp } from "../app.js";
import { connectDB } from "../config/db.js";

const app = createApp();

describe("Micron InfoTech Enterprise API Test Suite", () => {
  let adminToken = "";
  let generatedTicketNumber = "";

  beforeAll(async () => {
    await connectDB();
    // Authenticate as Superadmin
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "admin@microninfotech.com",
        password: "Admin@123456"
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.token).toBeDefined();
    adminToken = res.body.token;
  });

  // 1. Health Endpoint
  it("GET /api/health - should return UP status and database info", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("UP");
    expect(res.body.name).toContain("Micron InfoTech");
    expect(res.body.database).toBeDefined();
  });

  // 2. Authentication
  it("POST /api/auth/login - should reject invalid credentials", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "admin@microninfotech.com",
        password: "WrongPassword123"
      });
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it("GET /api/auth/me - should return authenticated admin profile", async () => {
    const res = await request(app)
      .get("/api/auth/me")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.user.email).toBe("admin@microninfotech.com");
    expect(res.body.user.role).toBe("superadmin");
  });

  // 3. Courses API
  it("GET /api/courses - should return active courses list", async () => {
    const res = await request(app).get("/api/courses");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it("POST /api/courses - should allow admin to create a new course", async () => {
    const newCourse = {
      title: "Cyber Security & Ethical Hacking Masterclass",
      category: "Cyber Security",
      duration: "3 Months",
      price: 29999,
      badge: "In Demand",
      highlights: ["CompTIA Security+", "Live Penetration Labs"],
      syllabus: [
        { title: "Module 1: Network Defense", topics: ["TCP/IP", "Wireshark", "Firewalls"] }
      ]
    };

    const res = await request(app)
      .post("/api/courses")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(newCourse);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toBe(newCourse.title);
  });

  // 4. Enquiries API
  it("POST /api/enquiries - should accept public lead submission", async () => {
    const lead = {
      name: "Siddharth Menon",
      email: "siddharth.menon@example.com",
      phone: "+91 98450 99887",
      course: "AWS Cloud & DevOps",
      mode: "Classroom",
      branch: "BTM Layout",
      comments: "Interested in upcoming demo batch."
    };

    const res = await request(app).post("/api/enquiries").send(lead);
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toBe(lead.name);
  });

  it("POST /api/enquiries - should reject submission with invalid email", async () => {
    const res = await request(app).post("/api/enquiries").send({
      name: "Test",
      email: "not-an-email",
      phone: "123"
    });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it("GET /api/enquiries - should return enquiries to admin", async () => {
    const res = await request(app)
      .get("/api/enquiries")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  // 5. Trainer & Franchise Applications
  it("POST /api/applications - should accept trainer application", async () => {
    const trainerApp = {
      type: "trainer",
      name: "Ramesh Iyer",
      email: "ramesh.iyer@example.com",
      phone: "+91 97890 12345",
      technology: "MERN Stack & Next.js",
      experience: "8 Years",
      currentCompany: "Wipro Technologies",
      mode: "Weekend Online"
    };

    const res = await request(app).post("/api/applications").send(trainerApp);
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.type).toBe("trainer");
  });

  // 6. Support Tickets & Tracking
  it("POST /api/support - should generate ticket number and save ticket", async () => {
    const ticket = {
      name: "Harish Kumar",
      email: "harish.k@example.com",
      phone: "+91 99001 22334",
      studentId: "MIC-2026-905",
      category: "Course Curriculum & Projects",
      priority: "Normal",
      description: "Need guidance on submitting capstone project 2."
    };

    const res = await request(app).post("/api/support").send(ticket);
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.ticketNumber).toMatch(/^MIC-\d{6}$/);
    generatedTicketNumber = res.body.ticketNumber;
  });

  it("GET /api/support/track/:ticketNumber - should allow student to track status", async () => {
    expect(generatedTicketNumber).toBeTruthy();
    const res = await request(app).get(`/api/support/track/${generatedTicketNumber}`);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.ticketNumber).toBe(generatedTicketNumber);
    expect(res.body.data.status).toBe("Open");
  });

  // 7. Dashboard Analytics
  it("GET /api/dashboard/stats - should compute live dashboard statistics", async () => {
    const res = await request(app)
      .get("/api/dashboard/stats")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.totals.enquiries).toBeGreaterThan(0);
    expect(res.body.data.totals.courses).toBeGreaterThan(0);
    expect(res.body.data.systemStatus).toBeDefined();
    expect(res.body.data.systemStatus.databaseConnected).toBe(true);
  });
});
