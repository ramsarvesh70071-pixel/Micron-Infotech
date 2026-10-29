import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// Pages
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
    <BrowserRouter>
      <ScrollHandler />
      <Routes>
        {/* 1. Home Page (home.pdf) */}
        <Route path="/" element={<HomePage />} />
        <Route path="/job-oriented-courses" element={<HomePage />} />
        <Route path="/courses" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />

        {/* 2. About Us (about.pdf) */}
        <Route path="/about" element={<AboutPage />} />

        {/* 3. Become a Trainer (become-a-trainer.pdf) */}
        <Route path="/become-a-trainer" element={<BecomeTrainerPage />} />

        {/* 4. Contact & Branches (contact.pdf) */}
        <Route path="/contact" element={<ContactPage />} />

        {/* 5 & 6. Corporate Training & Case Studies (corporate-training.pdf & corporate-training-case-studies.pdf) */}
        <Route path="/corporate-training" element={<CorporateTrainingPage />} />
        <Route path="/corporate-training/case-studies" element={<CorporateCaseStudiesPage />} />

        {/* 7. Franchise Opportunity (franchise.pdf) */}
        <Route path="/franchise" element={<FranchisePage />} />

        {/* 8. Post Free Jobs / Employer Hiring (post-free-jobs-hiring-employees.pdf) */}
        <Route path="/post-free-jobs-hiring-employees" element={<PostJobPage />} />

        {/* 9. Student Reviews (student-reviews.pdf) */}
        <Route path="/student-reviews" element={<StudentReviewsPage />} />

        {/* 10. Students Placements (students-placements.pdf) */}
        <Route path="/students-placements" element={<PlacementPage />} />
        <Route path="/placement" element={<PlacementPage />} />
        <Route path="/placements" element={<PlacementPage />} />

        {/* 11. Support & Help Desk (support.pdf) */}
        <Route path="/support" element={<SupportPage />} />

        {/* 11. Legal Policies */}
        <Route path="/legal/cookie-policy" element={<LegalPage />} />
        <Route path="/legal/gdpr-policy" element={<LegalPage />} />
        <Route path="/legal/privacy-policy" element={<LegalPage />} />
        <Route path="/legal/refund-policy" element={<LegalPage />} />
        <Route path="/legal/terms-conditions" element={<LegalPage />} />
        <Route path="/legal/:slug" element={<LegalPage />} />

        {/* Fallback */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
