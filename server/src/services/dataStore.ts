import { User, IUser } from "../models/User.js";
import { Course, ICourse } from "../models/Course.js";
import { Enquiry, IEnquiry } from "../models/Enquiry.js";
import { Application, IApplication } from "../models/Application.js";
import { JobPosting, IJobPosting } from "../models/JobPosting.js";
import { Review, IReview } from "../models/Review.js";
import { Branch, IBranch } from "../models/Branch.js";
import { BlogPost, IBlogPost } from "../models/BlogPost.js";
import { SupportTicket, ISupportTicket } from "../models/SupportTicket.js";
import { getDbStatus } from "../config/db.js";
import bcrypt from "bcryptjs";

// In-Memory store arrays for resilient zero-config fallback
class MemoryStore {
  users: any[] = [];
  courses: any[] = [];
  enquiries: any[] = [];
  applications: any[] = [];
  jobs: any[] = [];
  reviews: any[] = [];
  branches: any[] = [];
  blogs: any[] = [];
  supportTickets: any[] = [];
  seeded: boolean = false;

  generateId(): string {
    return Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
  }

  async seedInitialData() {
    if (this.seeded) return;
    this.seeded = true;

    // Default Superadmin & Editor
    const superadminPassword = await bcrypt.hash("Admin@123456", 10);
    const editorPassword = await bcrypt.hash("Editor@123456", 10);

    this.users = [
      {
        _id: "usr_superadmin",
        name: "Micron Super Admin",
        email: "admin@microninfotech.com",
        password: superadminPassword,
        role: "superadmin",
        isActive: true,
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        phone: "+91 98450 12345",
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: "usr_editor",
        name: "Content Editor",
        email: "editor@microninfotech.com",
        password: editorPassword,
        role: "editor",
        isActive: true,
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        phone: "+91 98450 67890",
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // Seed Courses
    this.courses = [
      {
        _id: "crs_1",
        title: "AWS Cloud & DevOps Engineering",
        slug: "aws-cloud-devops-training",
        category: "Cloud & DevOps",
        badge: "Trending #1",
        rating: 4.9,
        reviewsCount: 384,
        duration: "3.5 Months",
        mode: "Classroom & Live Online",
        price: 29999,
        popular: true,
        active: true,
        order: 1,
        highlights: ["100% Placement Support", "15+ Live Cloud Labs", "AWS Certified Trainer", "Real CI/CD Pipelines"],
        syllabus: [
          { title: "Module 1: Linux & Shell Scripting", topics: ["Linux Architecture", "Bash Scripting", "User & Permission Management"] },
          { title: "Module 2: AWS Core Services", topics: ["EC2, VPC, Subnets", "S3 Storage & IAM Security", "Load Balancers & Auto-scaling"] },
          { title: "Module 3: DevOps & Automation", topics: ["Git & GitHub", "Docker & Kubernetes", "Jenkins CI/CD", "Terraform Infrastructure as Code"] }
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: "crs_2",
        title: "Full Stack Web Development (MERN)",
        slug: "full-stack-web-development-mern",
        category: "Software Development",
        badge: "Highest Placements",
        rating: 4.9,
        reviewsCount: 450,
        duration: "4 Months",
        mode: "Classroom & Live Online",
        price: 34999,
        popular: true,
        active: true,
        order: 2,
        highlights: ["Build 4 Production Projects", "Frontend & Backend Mastery", "DSA & System Design", "Mock Technical Interviews"],
        syllabus: [
          { title: "Module 1: Modern JavaScript & TypeScript", topics: ["ES6+ Features", "Async/Await", "TypeScript Types & Interfaces"] },
          { title: "Module 2: React.js & State Management", topics: ["React Hooks", "Redux Toolkit", "Next.js Basics", "Tailwind CSS"] },
          { title: "Module 3: Node.js, Express & MongoDB", topics: ["REST APIs", "Mongoose ORM", "JWT Authentication", "Cloud Deployment"] }
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: "crs_3",
        title: "Data Science, Machine Learning & Generative AI",
        slug: "data-science-machine-learning-generative-ai",
        category: "Data Science & AI",
        badge: "High Demand",
        rating: 4.8,
        reviewsCount: 312,
        duration: "4.5 Months",
        mode: "Classroom & Live Online",
        price: 39999,
        popular: true,
        active: true,
        order: 3,
        highlights: ["Python, Pandas & Scikit-Learn", "Deep Learning & NLP", "LLMs, LangChain & OpenAI API", "Kaggle Competitions"],
        syllabus: [
          { title: "Module 1: Python for Data Science", topics: ["NumPy, Pandas, Matplotlib", "Exploratory Data Analysis", "Feature Engineering"] },
          { title: "Module 2: Machine Learning Algorithms", topics: ["Regression & Classification", "Random Forests & XGBoost", "Clustering & PCA"] },
          { title: "Module 3: GenAI & LLM Fine-tuning", topics: ["HuggingFace Transformers", "LangChain & Vector Databases", "Prompt Engineering"] }
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: "crs_4",
        title: "Master Software Automation Testing (Selenium, Java, Playwright)",
        slug: "software-testing-selenium-automation",
        category: "Software Testing",
        badge: "Guaranteed Interviews",
        rating: 4.8,
        reviewsCount: 290,
        duration: "3 Months",
        mode: "Classroom & Online",
        price: 24999,
        popular: false,
        active: true,
        order: 4,
        highlights: ["Manual + Automation Testing", "Selenium WebDriver & Java", "API Testing with Postman & RestAssured", "Cucumber BDD Framework"],
        syllabus: [
          { title: "Module 1: QA Fundamentals & Manual Testing", topics: ["STLC, SDLC", "Test Case Writing", "JIRA Bug Tracking"] },
          { title: "Module 2: Automation with Selenium & Java", topics: ["Locators & WebElements", "TestNG Framework", "Page Object Model (POM)"] },
          { title: "Module 3: API & Modern Tools", topics: ["Postman Automation", "RestAssured", "Playwright Fundamentals"] }
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: "crs_5",
        title: "Digital Marketing & Performance Marketing Masterclass",
        slug: "digital-marketing-seo-course",
        category: "Digital Marketing",
        badge: "Agency Level",
        rating: 4.7,
        reviewsCount: 195,
        duration: "2.5 Months",
        mode: "Classroom & Online",
        price: 19999,
        popular: false,
        active: true,
        order: 5,
        highlights: ["Google Ads & Meta Ads Live Budgets", "SEO Technical Audits", "Content & Email Marketing", "Google Analytics 4 & Tag Manager"],
        syllabus: [
          { title: "Module 1: Search Engine Optimization (SEO)", topics: ["Keyword Research", "On-Page & Off-Page SEO", "Technical SEO Audits"] },
          { title: "Module 2: Paid Ads (PPC & Social)", topics: ["Google Search & Display Ads", "Meta Facebook & Instagram Ads", "LinkedIn B2B Ads"] },
          { title: "Module 3: Analytics & Conversion Optimization", topics: ["GA4 Setup & Reporting", "A/B Testing", "Email Automation"] }
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // Seed Reviews
    this.reviews = [
      {
        _id: "rev_1",
        name: "Kavitha R.",
        role: "DevOps Engineer",
        company: "Amazon Web Services (AWS)",
        rating: 5,
        reviewText: "I joined Micron InfoTech with 8 LPA as a basic sysadmin. The hands-on Kubernetes, Terraform and AWS live infrastructure labs gave me the confidence to crack Amazon's bar-raiser interviews. Secured a 400% jump to 38 LPA!",
        course: "AWS Cloud & DevOps",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
        hike: "375% Hike",
        packageLpa: "38 LPA",
        isApproved: true,
        isFeatured: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: "rev_2",
        name: "Rahul Verma",
        role: "Full Stack Engineer",
        company: "Paytm Payments",
        rating: 5,
        reviewText: "Micron InfoTech transformed my career from non-IT support to a MERN full stack developer. The live project deployment and weekly mock interviews made all the difference.",
        course: "Full Stack Web Development",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
        hike: "240% Hike",
        packageLpa: "14.5 LPA",
        isApproved: true,
        isFeatured: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: "rev_3",
        name: "Pooja Hegde",
        role: "Data Scientist",
        company: "Flipkart",
        rating: 5,
        reviewText: "The GenAI and Deep Learning modules covered real LLM fine-tuning and prompt engineering that matched top tech companies' interview benchmarks. Truly top-tier mentorship!",
        course: "Data Science & Generative AI",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
        hike: "180% Hike",
        packageLpa: "22 LPA",
        isApproved: true,
        isFeatured: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // Seed Branches
    this.branches = [
      {
        _id: "br_1",
        name: "BTM Layout (Headquarters)",
        city: "Bangalore",
        address: "No. 687, 1st Floor, 16th Main Road, BTM Layout 2nd Stage, Bangalore - 560076",
        phone: "+91 98450 22323",
        email: "btm@microninfotech.com",
        googleMapsUrl: "https://maps.google.com/?q=BTM+Layout+Bangalore",
        timings: "Mon - Sat: 8:00 AM - 8:30 PM | Sunday: 9:00 AM - 6:00 PM",
        isHeadquarter: true,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: "br_2",
        name: "Marathahalli Center",
        city: "Bangalore",
        address: "No. 43, 2nd Floor, Outer Ring Road, Marathahalli (Opp. Kalamandir), Bangalore - 560037",
        phone: "+91 98450 33434",
        email: "marathahalli@microninfotech.com",
        googleMapsUrl: "https://maps.google.com/?q=Marathahalli+Bangalore",
        timings: "Mon - Sat: 8:00 AM - 8:30 PM | Sunday: 9:00 AM - 6:00 PM",
        isHeadquarter: false,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: "br_3",
        name: "Rajajinagar Center",
        city: "Bangalore",
        address: "1st Block, Near Rajajinagar Metro Station, Bangalore - 560010",
        phone: "+91 98450 44545",
        email: "rajajinagar@microninfotech.com",
        googleMapsUrl: "https://maps.google.com/?q=Rajajinagar+Bangalore",
        timings: "Mon - Sat: 8:30 AM - 8:00 PM | Sunday: 9:00 AM - 5:00 PM",
        isHeadquarter: false,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: "br_4",
        name: "OMR & Velachery Center",
        city: "Chennai",
        address: "Rajiv Gandhi Salai, OMR IT Corridor, Chennai - 600096",
        phone: "+91 98450 55656",
        email: "chennai@microninfotech.com",
        googleMapsUrl: "https://maps.google.com/?q=OMR+Chennai",
        timings: "Mon - Sat: 8:30 AM - 8:00 PM | Sunday: 9:00 AM - 5:00 PM",
        isHeadquarter: false,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // Seed Enquiries
    this.enquiries = [
      {
        _id: "enq_1",
        name: "Vikas Sharma",
        email: "vikas.sharma@example.com",
        phone: "+91 98765 43210",
        course: "AWS Cloud & DevOps",
        mode: "Classroom",
        branch: "BTM Layout",
        comments: "Interested in the upcoming weekend batch. Please share fee structure and scholarship details.",
        type: "enrollment",
        status: "new",
        notes: "Callback scheduled for 11:00 AM.",
        createdAt: new Date(Date.now() - 3600000 * 2),
        updatedAt: new Date(Date.now() - 3600000 * 2)
      },
      {
        _id: "enq_2",
        name: "Ananya Deshmukh",
        email: "ananya.d@example.com",
        phone: "+91 91234 56789",
        course: "Data Science & Generative AI",
        mode: "Online",
        branch: "Online Campus",
        comments: "Looking for 1-on-1 mentorship for LLM fine-tuning.",
        type: "enrollment",
        status: "contacted",
        notes: "Shared course syllabus and demo link.",
        createdAt: new Date(Date.now() - 3600000 * 6),
        updatedAt: new Date(Date.now() - 3600000 * 3)
      },
      {
        _id: "enq_3",
        name: "Infosys Cloud Ops Team",
        email: "cloud.training@infosys-partner.com",
        phone: "+91 80 2852 0261",
        course: "Corporate Kubernetes & DevOps",
        mode: "Corporate Hybrid",
        branch: "Bangalore",
        comments: "Requesting custom 40-hour upskilling RFP for 35 DevOps engineers.",
        type: "corporate",
        status: "in_progress",
        companyName: "Infosys Ltd",
        teamSize: "30-50 Employees",
        notes: "Commercial quote submitted to HR L&D department.",
        createdAt: new Date(Date.now() - 86400000),
        updatedAt: new Date(Date.now() - 3600000)
      }
    ];

    // Seed Applications
    this.applications = [
      {
        _id: "app_1",
        type: "trainer",
        name: "Dr. Arvind Sundaram",
        email: "arvind.sundaram@gmail.com",
        phone: "+91 99887 76655",
        status: "shortlisted",
        technology: "Kubernetes & Cloud Native Security",
        experience: "12+ Years",
        currentCompany: "Cisco Systems",
        mode: "Weekend Online",
        linkedin: "https://linkedin.com/in/arvind-sundaram",
        message: "Passionate about mentoring young engineers and teaching real-world cloud architectures.",
        notes: "Technical demo session passed with 9.5/10 score.",
        createdAt: new Date(Date.now() - 86400000 * 2),
        updatedAt: new Date(Date.now() - 86400000)
      },
      {
        _id: "app_2",
        type: "franchise",
        name: "Suresh Balaji",
        email: "suresh.balaji@capitalgrowth.in",
        phone: "+91 98401 23456",
        status: "reviewed",
        city: "Hyderabad",
        state: "Telangana",
        capital: "₹25 - ₹40 Lakhs",
        space: "2,500 sq ft near HITEC City",
        background: "Managing IT training academies for 8 years in Secunderabad.",
        notes: "Feasibility study initiated for HITEC City branch expansion.",
        createdAt: new Date(Date.now() - 86400000 * 3),
        updatedAt: new Date(Date.now() - 86400000 * 2)
      }
    ];

    // Seed Jobs
    this.jobs = [
      {
        _id: "job_1",
        companyName: "Razorpay Software",
        recruiterName: "Priyanka Sen",
        officialEmail: "priyanka.sen@razorpay.com",
        phone: "+91 98765 00112",
        jobTitle: "Associate DevOps & SRE Engineer",
        openings: "5 Positions",
        experience: "0 - 2 Years",
        ctcRange: "8 - 14 LPA",
        skills: "AWS, Docker, Kubernetes, Linux, Terraform, Python",
        location: "Bangalore / Hybrid",
        description: "Hiring trained freshers and junior DevOps engineers for our payments infrastructure team.",
        status: "active",
        createdAt: new Date(Date.now() - 86400000),
        updatedAt: new Date(Date.now() - 86400000)
      }
    ];

    // Seed Blogs
    this.blogs = [
      {
        _id: "blg_1",
        title: "Top 10 High-Paying IT Skills in Demand for 2026",
        slug: "top-10-high-paying-it-skills-2026",
        excerpt: "Discover the critical technology skills in Cloud, AI, and Full Stack that command salaries above 25 LPA in India's top tech hubs.",
        content: "The tech industry in 2026 has witnessed unprecedented demand for multi-skilled engineers capable of orchestrating cloud infrastructure, deploying large language models, and developing robust microservices. In this comprehensive guide, we unpack the highest-demand career paths and the exact roadmap to master them.",
        author: "Micron Technical Board",
        category: "Career Roadmap",
        tags: ["DevOps", "AI", "Cloud", "Career Growth"],
        readTime: "6 min read",
        isPublished: true,
        publishedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: "blg_2",
        title: "How to Transition from Non-IT Support to Cloud DevOps Engineer",
        slug: "how-to-transition-from-non-it-to-devops",
        excerpt: "A step-by-step practical guide for professionals with non-technical or support backgrounds seeking rewarding engineering roles.",
        content: "Transitioning to DevOps does not require a computer science degree; it requires structured discipline, strong command of Linux fundamentals, containerization, and hands-on lab practice.",
        author: "DevOps Placement Cell",
        category: "Success Stories",
        tags: ["DevOps", "Transition", "Career Shift"],
        readTime: "8 min read",
        isPublished: true,
        publishedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // Seed Support Tickets
    this.supportTickets = [
      {
        _id: "tkt_1",
        ticketNumber: "MIC-782410",
        name: "Abhishek Patil",
        email: "abhishek.patil@example.com",
        phone: "+91 97654 32109",
        studentId: "MIC-2026-881",
        category: "Batch Timing & Schedule",
        priority: "Normal",
        description: "Requesting batch transfer from Weekday Morning to Weekend Batch due to new office timings.",
        status: "In Progress",
        responseNotes: "Assigned to BTM center coordinator. Weekend batch seat confirmed starting next Saturday.",
        createdAt: new Date(Date.now() - 3600000 * 5),
        updatedAt: new Date(Date.now() - 3600000 * 2)
      },
      {
        _id: "tkt_2",
        ticketNumber: "MIC-910243",
        name: "Sneha Nair",
        email: "sneha.nair@example.com",
        phone: "+91 98801 23450",
        studentId: "MIC-2026-642",
        category: "LMS & Video Recordings Access",
        priority: "High",
        description: "Unable to access Docker and Kubernetes Module 3 recorded lectures in student portal.",
        status: "Resolved",
        responseNotes: "LMS access token refreshed. Student verified access successfully.",
        resolvedAt: new Date(Date.now() - 3600000),
        createdAt: new Date(Date.now() - 86400000),
        updatedAt: new Date(Date.now() - 3600000)
      }
    ];

    console.log("[DataStore] In-Memory seed data initialized successfully.");
  }
}

export const memoryStore = new MemoryStore();
// Initialize seed data immediately
memoryStore.seedInitialData();
