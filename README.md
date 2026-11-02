# 🚀 Micron InfoTech - Enterprise Training & Placement Platform

A full-stack enterprise web application and management platform for **Micron InfoTech**, built with modern web technologies, automated workflows, CRM lead management, and live student support tracking.

---

## 🌟 Key Features

### 🌐 Public Portal
- **Interactive Landing & Course Explorer**: Comprehensive course catalog with search, category filtering, syllabus breakdown, and instant admission enquiries.
- **Placement & Success Stories**: Real student testimonials, company logos, salary metrics, and placement statistics.
- **Enterprise Corporate Training**: Customized training solutions, impact case studies, and corporate enquiry pipelines.
- **Partner & Trainer Programs**: Dedicated application workflows for hiring partners, franchises, and industry mentors.
- **Student Support & Live Tracking**: Real-time ticket submission and tracking portal (`#TKT-...`).
- **Tech Blog & Articles**: In-depth industry guides, tutorials, and career roadmaps.

### 🛡️ Admin CRM & Operations Dashboard (`/admin`)
- **Secure Authentication**: Role-based access control (`superadmin` & `editor`) powered by JWT.
- **Lead & Enquiry Pipeline**: Track and transition prospective student enquiries through active CRM stages.
- **Course & Curriculum CMS**: Complete CRUD management for courses, modules, pricing, and badges.
- **Trainer & Franchise Application Review**: Evaluate incoming candidate resumes and applicant details.
- **Employer Job Openings**: Review, approve, or archive job postings submitted by hiring partners.
- **Support Desk**: Answer student inquiries, assign priorities, and resolve support tickets.
- **System Diagnostics**: Real-time database monitoring (MongoDB live status / In-memory fallback engine).

---

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, Lucide Icons, Framer Motion
- **Backend**: Node.js, Express, TypeScript, Helmet, CORS, Express-Rate-Limit, Morgan
- **Database & Data Layer**: MongoDB (Mongoose) + Automatic Resilient In-Memory Fallback Engine
- **Testing**: Vitest, Supertest

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB (optional - server features zero-config automatic in-memory fallback)

### Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd Micron-InfoTech

# Install dependencies
npm install
```

### Running Locally

#### 1. Start the Backend API Server
```bash
node server/dist/server.js
# Or in development mode:
npm run start
```
*Backend runs on `http://localhost:5000`*

#### 2. Start the Frontend Application (in a separate terminal)
```bash
npx vite
# Or:
npm run dev
```
*Frontend runs on `http://localhost:5173`*

---

## 🔑 Default Admin Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| **Super Admin** | `admin@microninfotech.com` | `Admin@123456` |
| **Content Editor** | `editor@microninfotech.com` | `Editor@123456` |

*Access the Admin Portal at [http://localhost:5173/admin](http://localhost:5173/admin)*

---

## 🧪 Testing

To run the automated API test suite:
```bash
npm run test
```

## 🏗️ Production Build

```bash
npm run build
```
Creates production-ready client bundles in `dist/` and server binaries in `server/dist/`.

---

## 📄 License
This project is proprietary and confidential to **Micron InfoTech**.
