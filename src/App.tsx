import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// Public Pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import BecomeTrainerPage from "./pages/BecomeTrainerPage";
import CorporateTrainingPage from "./pages/CorporateTrainingPage";
import CorporateCaseStudiesPage from "./pages/CorporateCaseStudiesPage";
import FranchisePage from "./pages/FranchisePage";
import PostJobPage from "./pages/PostJobPage";
import StudentReviewsPage from "./pages/StudentReviewsPage";
import PlacementPage from "./pages/PlacementPage";
import SupportPage from "./pages/SupportPage";
import LegalPage from "./pages/LegalPage";
import BlogPage from "./pages/BlogPage";

// Admin Context & Guard
import { AdminAuthProvider } from "./admin/context/AdminAuthContext";
import { AdminProtectedRoute } from "./admin/components/AdminProtectedRoute";

// Admin Pages
import AdminLoginPage from "./admin/pages/AdminLoginPage";
import AdminDashboardPage from "./admin/pages/AdminDashboardPage";
import AdminEnquiriesPage from "./admin/pages/AdminEnquiriesPage";
import AdminCoursesPage from "./admin/pages/AdminCoursesPage";
import AdminApplicationsPage from "./admin/pages/AdminApplicationsPage";
import AdminJobsPage from "./admin/pages/AdminJobsPage";
import AdminReviewsPage from "./admin/pages/AdminReviewsPage";
import AdminBranchesPage from "./admin/pages/AdminBranchesPage";
import AdminBlogsPage from "./admin/pages/AdminBlogsPage";
import AdminSupportPage from "./admin/pages/AdminSupportPage";
import AdminUsersPage from "./admin/pages/AdminUsersPage";
import AdminSettingsPage from "./admin/pages/AdminSettingsPage";

// Scroll to top or anchor target automatically when route changes
function ScrollHandler() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          return;
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <AdminAuthProvider>
      <BrowserRouter>
        <ScrollHandler />
        <Routes>
          {/* Public Website Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/job-oriented-courses" element={<HomePage />} />
          <Route path="/courses" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/become-a-trainer" element={<BecomeTrainerPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/corporate-training" element={<CorporateTrainingPage />} />
          <Route path="/corporate-training/case-studies" element={<CorporateCaseStudiesPage />} />
          <Route path="/franchise" element={<FranchisePage />} />
          <Route path="/post-free-jobs-hiring-employees" element={<PostJobPage />} />
          <Route path="/student-reviews" element={<StudentReviewsPage />} />
          <Route path="/students-placements" element={<PlacementPage />} />
          <Route path="/placement" element={<PlacementPage />} />
          <Route path="/placements" element={<PlacementPage />} />
          <Route path="/support" element={<SupportPage />} />

          {/* Legal Policies */}
          <Route path="/legal/cookie-policy" element={<LegalPage />} />
          <Route path="/legal/gdpr-policy" element={<LegalPage />} />
          <Route path="/legal/privacy-policy" element={<LegalPage />} />
          <Route path="/legal/refund-policy" element={<LegalPage />} />
          <Route path="/legal/terms-conditions" element={<LegalPage />} />
          <Route path="/legal/:slug" element={<LegalPage />} />

          {/* Admin Authentication */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <AdminDashboardPage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <AdminProtectedRoute>
                <AdminDashboardPage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/enquiries"
            element={
              <AdminProtectedRoute>
                <AdminEnquiriesPage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/courses"
            element={
              <AdminProtectedRoute>
                <AdminCoursesPage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/applications"
            element={
              <AdminProtectedRoute>
                <AdminApplicationsPage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/jobs"
            element={
              <AdminProtectedRoute>
                <AdminJobsPage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/reviews"
            element={
              <AdminProtectedRoute>
                <AdminReviewsPage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/branches"
            element={
              <AdminProtectedRoute>
                <AdminBranchesPage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/blogs"
            element={
              <AdminProtectedRoute>
                <AdminBlogsPage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/support"
            element={
              <AdminProtectedRoute>
                <AdminSupportPage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminProtectedRoute requiredRole="superadmin">
                <AdminUsersPage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <AdminProtectedRoute>
                <AdminSettingsPage />
              </AdminProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </AdminAuthProvider>
  );
}
