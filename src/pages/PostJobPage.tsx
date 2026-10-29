import React, { useState } from "react";
import { 
  Briefcase, 
  CheckCircle2, 
  Building2, 
  Users, 
  Send, 
  Sparkles, 
  Clock, 
  DollarSign, 
  ShieldCheck, 
  Star 
} from "lucide-react";
import TopBanner from "../components/TopBanner";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EnrollModal from "../components/EnrollModal";
import SearchModal from "../components/SearchModal";
import HiringPartners from "../components/HiringPartners";

export default function PostJobPage() {
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // Job Posting Form State
  const [companyName, setCompanyName] = useState("");
  const [recruiterName, setRecruiterName] = useState("");
  const [officialEmail, setOfficialEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [openings, setOpenings] = useState("1-3 Positions");
  const [experience, setExperience] = useState("Freshers (0 - 1 Year)");
  const [ctcRange, setCtcRange] = useState("4 - 7 LPA");
  const [skills, setSkills] = useState("");
  const [location, setLocation] = useState("Bangalore");
  const [description, setDescription] = useState("");
  const [posted, setPosted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (companyName && recruiterName && officialEmail && phone && jobTitle) {
      setPosted(true);
      setTimeout(() => {
        setPosted(false);
        setCompanyName("");
        setRecruiterName("");
        setOfficialEmail("");
        setPhone("");
        setJobTitle("");
        setSkills("");
        setDescription("");
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-[#2E2EF2] selection:text-white">
      <TopBanner onSelectCourse={() => setEnrollModalOpen(true)} />
      <Navbar
        onOpenSearch={() => setSearchModalOpen(true)}
        onCallClick={() => setEnrollModalOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 lg:py-20 bg-gradient-to-b from-blue-50/80 via-white to-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-[#2E2EF2] text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FOR EMPLOYERS & HIRING MANAGERS</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
              Post Free Jobs & Hire <span className="text-[#2E2EF2]">Job-Ready Software Talent</span>
            </h1>

            <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Access thousands of certified freshers and experienced tech professionals trained on real enterprise projects. Zero placement fees, fast shortlist turnaround, and pre-screened candidates.
            </p>

            {/* Core 6 Highlights from PDF */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 max-w-5xl mx-auto pt-6 text-left">
              {[
                "100% Free Job Posting",
                "Trained Freshers & Laterals",
                "Pre-Screened Portfolios",
                "Hands-on Project Skills",
                "On-Campus & Off-Campus",
                "Dedicated Placement Cell"
              ].map((highlight, idx) => (
                <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs flex items-center gap-2 text-xs font-semibold text-slate-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span className="line-clamp-2">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Recruit from Inventateq & Job Form */}
        <section className="py-14 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              
              {/* Left Column: Recruiter Benefits */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#2E2EF2] bg-blue-50 px-3 py-1 rounded-full">
                    Zero Sourcing Hassle
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
                    Why 2,000+ Brands Hire Inventateq Graduates
                  </h2>
                  <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                    At Inventateq, our learners don't just study theoretical concepts — they build full-stack web applications, deploy cloud infrastructure on AWS, train machine learning models, and execute real performance marketing campaigns.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-emerald-600" />
                      Zero Sourcing & Hiring Fees
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      We never charge recruitment agency fees or commissions. You get complete direct access to qualified applicant pools at zero cost.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#2E2EF2]" />
                      Immediate Joiners within 24-48 Hours
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Our graduating batches are ready to join immediately without waiting for long notice periods.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-purple-600" />
                      Pre-Assessed Technical Code Reviews
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Every candidate undergoes rigorous internal mock interviews and capstone evaluations before profile submission.
                    </p>
                  </div>
                </div>

                {/* Recruiter direct helpline */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-900 text-white space-y-2">
                  <div className="font-bold text-sm">Need Custom Hiring Drives?</div>
                  <p className="text-xs text-blue-200 leading-relaxed">
                    Planning a bulk hiring drive for 20+ software engineers? Speak with our Head of Placements directly:
                  </p>
                  <div className="pt-2 flex items-center gap-2 text-xs font-bold text-cyan-300">
                    <span>Email: placements@inventateq.com</span>
                    <span>•</span>
                    <span>Direct: +91 7676765421</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Free Job Posting Form */}
              <div className="lg:col-span-7">
                <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-md">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2E2EF2] mb-1">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Free Recruiter Portal</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Post a Free Job Opening
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 mb-6">
                    Submit your role requirements. Our placement cell will curate matching profiles and share verified resumes with you within 24 hours.
                  </p>

                  {posted ? (
                    <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
                      <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                      <h4 className="font-bold text-base text-emerald-900">Job Posted Successfully!</h4>
                      <p className="text-xs text-emerald-700 max-w-md mx-auto">
                        Thank you <strong>{recruiterName}</strong> from <strong>{companyName}</strong>. Our placement coordinator will share matching shortlisted resumes to <strong>{officialEmail}</strong> shortly.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Company / Organization *</label>
                          <input
                            type="text"
                            required
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            placeholder="eg. TechCorp Solutions"
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#2E2EF2] text-slate-900"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Recruiter / HR Name *</label>
                          <input
                            type="text"
                            required
                            value={recruiterName}
                            onChange={(e) => setRecruiterName(e.target.value)}
                            placeholder="eg. Anjali Verma"
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#2E2EF2] text-slate-900"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Official Work Email *</label>
                          <input
                            type="email"
                            required
                            value={officialEmail}
                            onChange={(e) => setOfficialEmail(e.target.value)}
                            placeholder="anjali@techcorp.com"
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#2E2EF2] text-slate-900"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Contact Phone *</label>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+91 9876543210"
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#2E2EF2] text-slate-900"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Job Title / Designation *</label>
                          <input
                            type="text"
                            required
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                            placeholder="eg. Python Developer / QA Automation"
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#2E2EF2] text-slate-900"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Number of Vacancies</label>
                          <select
                            value={openings}
                            onChange={(e) => setOpenings(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#2E2EF2] text-slate-900 bg-white"
                          >
                            <option value="1-3 Positions">1 - 3 Positions</option>
                            <option value="4-10 Positions">4 - 10 Positions</option>
                            <option value="10-25 Positions">10 - 25 Positions</option>
                            <option value="25+ Bulk Hiring">25+ Bulk Hiring</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Experience Level</label>
                          <select
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#2E2EF2] text-slate-900 bg-white"
                          >
                            <option value="Freshers (0 - 1 Year)">Freshers (0 - 1 Year)</option>
                            <option value="1 - 3 Years">1 - 3 Years</option>
                            <option value="3+ Years">3+ Years (Senior)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Offered CTC Range</label>
                          <select
                            value={ctcRange}
                            onChange={(e) => setCtcRange(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#2E2EF2] text-slate-900 bg-white"
                          >
                            <option value="3.5 - 5 LPA">3.5 - 5 LPA</option>
                            <option value="5 - 8 LPA">5 - 8 LPA</option>
                            <option value="8 - 14 LPA">8 - 14 LPA</option>
                            <option value="14+ LPA">14+ LPA</option>
                          </select>
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Job Location</label>
                          <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Bangalore / Remote"
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#2E2EF2] text-slate-900"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Key Skills Required *</label>
                        <input
                          type="text"
                          required
                          value={skills}
                          onChange={(e) => setSkills(e.target.value)}
                          placeholder="eg. Python, Django, REST APIs, PostgreSQL, Git"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#2E2EF2] text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Job Description & Responsibilities</label>
                        <textarea
                          rows={3}
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Provide a brief summary of role responsibilities or paste your job specification..."
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#2E2EF2] text-slate-900"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 rounded-lg bg-[#2E2EF2] hover:bg-[#1a1ae4] text-white font-black text-xs tracking-wider uppercase transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2 mt-2"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Publish Free Job Opening</span>
                      </button>
                    </form>
                  )}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Hiring Partners Logos */}
        <HiringPartners onCorporateEnquiry={() => setEnrollModalOpen(true)} />
      </main>

      <Footer />

      <EnrollModal
        isOpen={enrollModalOpen}
        onClose={() => setEnrollModalOpen(false)}
      />
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
    </div>
  );
}

