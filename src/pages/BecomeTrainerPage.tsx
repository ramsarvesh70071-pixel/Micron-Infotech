import React, { useState } from "react";
import { 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  GraduationCap, 
  Globe, 
  Send, 
  Sparkles, 
  Award, 
  Users 
} from "lucide-react";
import TopBanner from "../components/TopBanner";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EnrollModal from "../components/EnrollModal";
import SearchModal from "../components/SearchModal";

export default function BecomeTrainerPage() {
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [technology, setTechnology] = useState("");
  const [yearsExp, setYearsExp] = useState("5-8 Years");
  const [mode, setMode] = useState("Both Online & Classroom");
  const [company, setCompany] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fullName && email && phone && technology) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFullName("");
        setEmail("");
        setPhone("");
        setTechnology("");
        setCompany("");
        setLinkedin("");
        setMessage("");
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
              <span>JOIN INDIA'S #1 TRAINING FACULTY</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
              Have Rich Experience in IT? Want to Share Knowledge? <span className="text-[#2E2EF2]">We Would Love to Hire You</span>
            </h1>

            <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              We are seeking submissions from experienced, certified trainers who have a passion for teaching, to skillfully make challenging concepts seem easy.
            </p>
          </div>
        </section>

        {/* Requirements & Application Grid */}
        <section className="py-14 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              
              {/* Left Column: Requirements & Benefits */}
              <div className="lg:col-span-6 space-y-8">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#2E2EF2] bg-blue-50 px-3 py-1 rounded-full">
                    Eligibility & Profile
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
                    Who Can Register as a Trainer?
                  </h2>
                  <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                    Anyone who is good at articulating and instructing lessons, which help students grasp complex technical concepts in a simplified manner, with in-depth working knowledge of a particular technology can register.
                  </p>
                  <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                    We welcome software engineers, architects, data scientists, and DevOps practitioners with hands-on corporate project experience and strong communication skills.
                  </p>
                </div>

                {/* 4 Benefits of Teaching at MicronInfoTech */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs space-y-2">
                    <Clock className="w-6 h-6 text-[#2E2EF2]" />
                    <h3 className="font-extrabold text-sm text-slate-900">Flexible Batches</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Choose weekend morning, weekend evening, or weekday early morning batches matching your work hours.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs space-y-2">
                    <DollarSign className="w-6 h-6 text-emerald-600" />
                    <h3 className="font-extrabold text-sm text-slate-900">Top Compensation</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Industry-leading hourly and batch pay structures with transparent timely disbursements.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs space-y-2">
                    <Globe className="w-6 h-6 text-cyan-600" />
                    <h3 className="font-extrabold text-sm text-slate-900">Global Reach</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Teach enthusiastic engineers across India, North America, Europe, and UAE through our online platform.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs space-y-2">
                    <Award className="w-6 h-6 text-amber-600" />
                    <h3 className="font-extrabold text-sm text-slate-900">Elevate Your Brand</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Build your personal brand as a distinguished technical instructor and corporate consultant.
                    </p>
                  </div>
                </div>

                {/* Testimonial from existing instructor */}
                <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-900 text-white space-y-3">
                  <p className="text-xs sm:text-sm text-blue-100 italic leading-relaxed">
                    "Training at MicronInfoTech for the past 6 years has been deeply rewarding. The operational team handles batch management seamlessly, allowing me to focus 100% on mentoring and lab simulations."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white text-[#2E2EF2] font-black flex items-center justify-center text-sm">
                      KM
                    </div>
                    <div>
                      <div className="font-bold text-sm">Kuldeep Mishra</div>
                      <div className="text-[11px] text-blue-200">Lead Digital Marketing & SEO Trainer (11+ Yrs Exp)</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Application Form */}
              <div className="lg:col-span-6">
                <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-md relative">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2E2EF2] mb-1">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Faculty Submission</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Trainer Registration Form
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 mb-6">
                    Fill out your technical expertise and background. Our faculty onboarding committee will review your profile and reach out for a demo session.
                  </p>

                  {submitted ? (
                    <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
                      <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                      <h4 className="font-bold text-base text-emerald-900">Submission Successful!</h4>
                      <p className="text-xs text-emerald-700 max-w-sm mx-auto">
                        Thank you <strong>{fullName}</strong>. Our academic team has received your details for <strong>{technology}</strong> and will schedule a short discussion soon.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                          <input
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="eg. Sunita Sharma"
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#2E2EF2] text-slate-900"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="sunita@company.com"
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#2E2EF2] text-slate-900"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
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

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Primary Tech Stack *</label>
                          <input
                            type="text"
                            required
                            value={technology}
                            onChange={(e) => setTechnology(e.target.value)}
                            placeholder="eg. Python, AWS, DevOps, SAP..."
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#2E2EF2] text-slate-900"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Total IT Experience</label>
                          <select
                            value={yearsExp}
                            onChange={(e) => setYearsExp(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#2E2EF2] text-slate-900 bg-white"
                          >
                            <option value="3-5 Years">3 - 5 Years</option>
                            <option value="5-8 Years">5 - 8 Years</option>
                            <option value="8-12 Years">8 - 12 Years</option>
                            <option value="12+ Years">12+ Years</option>
                          </select>
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Preferred Mode</label>
                          <select
                            value={mode}
                            onChange={(e) => setMode(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#2E2EF2] text-slate-900 bg-white"
                          >
                            <option value="Both Online & Classroom">Both Online & Classroom</option>
                            <option value="Online Virtual Only">Online Virtual Only</option>
                            <option value="Classroom Only (Bangalore/Chennai)">Classroom Only (Bangalore/Chennai)</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Current Organization (Optional)</label>
                          <input
                            type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder="eg. Infosys / Self Employed"
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#2E2EF2] text-slate-900"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">LinkedIn Profile URL</label>
                          <input
                            type="url"
                            value={linkedin}
                            onChange={(e) => setLinkedin(e.target.value)}
                            placeholder="https://linkedin.com/in/..."
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#2E2EF2] text-slate-900"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Teaching Experience & Topics of Interest</label>
                        <textarea
                          rows={3}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Briefly describe your training background, certifications held, or course topics you excel at..."
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#2E2EF2] text-slate-900"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 rounded-lg bg-[#2E2EF2] hover:bg-[#1a1ae4] text-white font-black text-xs tracking-wider uppercase transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2 mt-2"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Instructor Application</span>
                      </button>
                    </form>
                  )}
                </div>
              </div>

            </div>
          </div>
        </section>
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

