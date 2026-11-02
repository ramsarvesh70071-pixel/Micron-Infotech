import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Award, 
  Building2, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  BarChart, 
  Quote, 
  Briefcase 
} from "lucide-react";
import TopBanner from "../components/TopBanner";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EnrollModal from "../components/EnrollModal";
import SearchModal from "../components/SearchModal";
import { CORPORATE_CASE_STUDIES, CaseStudy } from "../data/corporateData";

export default function CorporateCaseStudiesPage() {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy>(CORPORATE_CASE_STUDIES[0]);
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

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
              <span>MEASURED BUSINESS IMPACT</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
              Case Studies That Prove <span className="text-[#2E2EF2]">Real Business Impact</span>
            </h1>

            <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Explore how leading global organizations partnered with MicronInfoTech to upskill teams, boost developer productivity, and accelerate technical deliverables.
            </p>
          </div>
        </section>

        {/* Case Studies Explorer Section */}
        <section className="py-14 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Interactive Selector List */}
              <div className="lg:col-span-4 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Select Enterprise Case Study:
                </div>
                {CORPORATE_CASE_STUDIES.map((cs) => (
                  <button
                    key={cs.id}
                    onClick={() => setSelectedCaseStudy(cs)}
                    className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                      selectedCaseStudy.id === cs.id
                        ? "bg-blue-50/80 border-[#2E2EF2] shadow-sm"
                        : "bg-white border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="h-6 flex items-center">
                        {cs.logo ? (
                          <img
                            src={cs.logo}
                            alt={cs.client}
                            className="max-h-6 max-w-[120px] w-auto object-contain select-none"
                          />
                        ) : (
                          <span className="font-black text-sm text-slate-900">{cs.client}</span>
                        )}
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-[#2E2EF2]">
                        {cs.industry}
                      </span>
                    </div>
                    <div className="text-xs text-slate-600 font-semibold line-clamp-1">
                      {cs.trainingDomain}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-2">
                      <span>👥 {cs.cohortSize}</span>
                      <span>•</span>
                      <span>⏱️ {cs.duration}</span>
                    </div>
                  </button>
                ))}

                <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-900 text-white mt-6 space-y-3">
                  <h4 className="font-bold text-sm">Want a Similar Custom Program?</h4>
                  <p className="text-xs text-blue-200 leading-relaxed">
                    We customize syllabus, exercises, and sandbox cloud environments for your organization's specific requirements.
                  </p>
                  <Link
                    to="/corporate-training#rfp"
                    className="inline-block w-full py-2.5 rounded-lg bg-white text-[#2E2EF2] text-center font-black text-xs hover:bg-blue-50 transition-colors shadow-xs"
                  >
                    Request Enterprise Proposal →
                  </Link>
                </div>
              </div>

              {/* Right Column: Case Study Deep Dive */}
              <div className="lg:col-span-8">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
                  {/* Case Study Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        {selectedCaseStudy.logo && (
                          <div className="p-2 bg-white rounded-xl border border-slate-200 shadow-2xs">
                            <img
                              src={selectedCaseStudy.logo}
                              alt={selectedCaseStudy.client}
                              className="h-8 max-w-[140px] w-auto object-contain"
                            />
                          </div>
                        )}
                        <div>
                          <div className="text-xs font-bold text-[#2E2EF2] uppercase tracking-wider">
                            {selectedCaseStudy.industry}
                          </div>
                          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                            {selectedCaseStudy.client}
                          </h2>
                        </div>
                      </div>
                      <div className="text-sm font-semibold text-slate-700">
                        Domain: {selectedCaseStudy.trainingDomain}
                      </div>
                    </div>
                    <div className="text-left sm:text-right text-xs text-slate-500 space-y-0.5">
                      <div>Cohort: <strong className="text-slate-800">{selectedCaseStudy.cohortSize}</strong></div>
                      <div>Format: <strong className="text-slate-800">{selectedCaseStudy.duration}</strong></div>
                    </div>
                  </div>

                  {/* Impact Metrics Grid */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                      Key Outcomes & Metrics:
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {selectedCaseStudy.impactMetrics.map((metric, i) => (
                        <div key={i} className="bg-white p-3.5 rounded-xl border border-slate-200 text-center">
                          <div className="text-xl sm:text-2xl font-black text-[#2E2EF2]">
                            {metric.value}
                          </div>
                          <div className="text-[11px] font-medium text-slate-600 mt-1">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* The Challenge */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                      The Challenge
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-white p-4 rounded-xl border border-slate-200">
                      {selectedCaseStudy.challenge}
                    </p>
                  </div>

                  {/* The Solution */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      MicronInfoTech's Custom Solution
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-white p-4 rounded-xl border border-slate-200">
                      {selectedCaseStudy.solution}
                    </p>
                  </div>

                  {/* Client Testimonial */}
                  <div className="bg-gradient-to-tr from-blue-100/50 to-indigo-100/40 p-5 rounded-xl border border-blue-200/80 space-y-3">
                    <Quote className="w-6 h-6 text-[#2E2EF2]" />
                    <p className="text-xs sm:text-sm text-slate-800 italic font-medium leading-relaxed">
                      "{selectedCaseStudy.testimonial.quote}"
                    </p>
                    <div className="pt-1">
                      <div className="font-extrabold text-xs text-slate-900">
                        {selectedCaseStudy.testimonial.author}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {selectedCaseStudy.testimonial.role}
                      </div>
                    </div>
                  </div>

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

