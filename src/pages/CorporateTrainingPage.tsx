import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Building2, 
  Award, 
  TrendingUp, 
  CheckCircle2, 
  Users, 
  ArrowRight, 
  FileText, 
  Sparkles, 
  Send, 
  Laptop, 
  ShieldCheck, 
  BarChart3 
} from "lucide-react";
import TopBanner from "../components/TopBanner";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EnrollModal from "../components/EnrollModal";
import SearchModal from "../components/SearchModal";
import { CORPORATE_CLIENTS } from "../data/corporateData";

export default function CorporateTrainingPage() {
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // Corporate RFP Form State
  const [companyName, setCompanyName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [teamSize, setTeamSize] = useState("10-30 Employees");
  const [domain, setDomain] = useState("Cloud & DevOps");
  const [requirements, setRequirements] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleRfpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (companyName && contactPerson && workEmail && phone) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setCompanyName("");
        setContactPerson("");
        setWorkEmail("");
        setPhone("");
        setRequirements("");
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
              <span>ENTERPRISE LEARNING & UPSKILLING</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
              Trusted by <span className="text-[#2E2EF2]">1,279+ Corporations</span>, Brands & MNCs
            </h1>

            <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              There's a serious reason why 1,000+ brands and multinational corporations partner with MicronInfoTech: our measured learning performance, customized sandbox labs, and guaranteed team upskilling outcomes.
            </p>

            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <a
                href="#rfp"
                className="px-6 py-3 rounded-full bg-[#2E2EF2] hover:bg-[#1a1ae4] text-white font-bold text-xs sm:text-sm tracking-wide shadow-md transition-all cursor-pointer"
              >
                Request Corporate Training Proposal
              </a>
              <Link
                to="/corporate-training/case-studies"
                className="px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm tracking-wide transition-all flex items-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-[#2E2EF2]" />
                <span>View Enterprise Case Studies</span>
              </Link>
            </div>
          </div>
        </section>

        {/* 1,279+ Corporate Client Programs Showcase */}
        <section className="py-16 bg-slate-50/70 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2E2EF2] bg-blue-100 px-3 py-1 rounded-full">
                Proven Track Record
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
                Customized Enterprise Training Delivered
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                Explore how we have engineered targeted technical training programs across Fortune 500 enterprises and defense departments.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {CORPORATE_CLIENTS.map((client, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-lg transition-all space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-3 h-10 border-b border-slate-100 pb-2">
                      <div className="h-7 w-32 flex items-center justify-start flex-shrink-0">
                        <img
                          src={client.logo}
                          alt={client.name}
                          className="h-7 w-auto max-w-[120px] object-contain object-left select-none block"
                          loading="eager"
                        />
                      </div>
                      {client.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-[#2E2EF2] border border-blue-100 whitespace-nowrap">
                          {client.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-bold text-[#2E2EF2]">{client.course}</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {client.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-emerald-800">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Completed Cohort
                    </span>
                    <button
                      onClick={() => setEnrollModalOpen(true)}
                      className="text-[#2E2EF2] hover:underline cursor-pointer"
                    >
                      Enquire Syllabus →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Corporate Value Pillars */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <Laptop className="w-8 h-8 text-[#2E2EF2]" />
                <h3 className="font-extrabold text-base text-slate-900">Customized Hands-on Sandbox Labs</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We create isolated cloud lab sandboxes tailored to your company's actual tech stack, database schemas, and microservice dependencies.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <BarChart3 className="w-8 h-8 text-emerald-600" />
                <h3 className="font-extrabold text-base text-slate-900">Measurable Productivity Gain</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Post-training evaluations, project code audits, and milestone benchmarks that guarantee at least 35-40% operational efficiency improvement.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <ShieldCheck className="w-8 h-8 text-indigo-600" />
                <h3 className="font-extrabold text-base text-slate-900">Flexible Delivery Formats</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  On-site instructor delivery at your corporate headquarters, virtual live instructor-led bootcamps, or hybrid weekend upskilling.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Corporate RFP Form Section */}
        <section id="rfp" className="py-16 bg-slate-50/80 border-b border-slate-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-lg">
              <div className="text-center mb-8">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2E2EF2] bg-blue-100 px-3 py-1 rounded-full">
                  Corporate Inquiries
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
                  Request a Corporate Proposal & Syllabus
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Tell us about your team size, target skills, and schedule constraints. Our enterprise solutions director will formulate a customized training roadmap.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-base text-emerald-900">Proposal Request Received!</h4>
                  <p className="text-xs text-emerald-700 max-w-sm mx-auto">
                    Thank you <strong>{contactPerson}</strong>. Our enterprise learning director will contact you at <strong>{workEmail}</strong> with custom pricing and syllabus.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRfpSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Company / Organization *</label>
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="eg. Wipro Limited"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#2E2EF2] text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Contact Person Name *</label>
                      <input
                        type="text"
                        required
                        value={contactPerson}
                        onChange={(e) => setContactPerson(e.target.value)}
                        placeholder="eg. Priya Menon (L&D Lead)"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#2E2EF2] text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Corporate Official Email *</label>
                      <input
                        type="email"
                        required
                        value={workEmail}
                        onChange={(e) => setWorkEmail(e.target.value)}
                        placeholder="priya.m@wipro.com"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#2E2EF2] text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Direct Phone Number *</label>
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Estimated Cohort Size</label>
                      <select
                        value={teamSize}
                        onChange={(e) => setTeamSize(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#2E2EF2] text-slate-900 bg-white"
                      >
                        <option value="5-10 Employees">5 - 10 Employees</option>
                        <option value="10-30 Employees">10 - 30 Employees</option>
                        <option value="30-100 Employees">30 - 100 Employees</option>
                        <option value="100+ Campus Recruits">100+ Campus Recruits</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Training Domain</label>
                      <select
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#2E2EF2] text-slate-900 bg-white"
                      >
                        <option value="Cloud & DevOps">Cloud & DevOps (AWS / Azure / K8s)</option>
                        <option value="Data Science & GenAI">Data Science & Generative AI</option>
                        <option value="Full Stack Development">Full Stack Development (Java / Python / React)</option>
                        <option value="Software Testing & SDET">Software Testing & SDET Automation</option>
                        <option value="Salesforce & ERP">Salesforce & ERP Systems</option>
                        <option value="Cyber Security & Networking">Cyber Security & Networking</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Project Context & Specific Goals</label>
                    <textarea
                      rows={3}
                      value={requirements}
                      onChange={(e) => setRequirements(e.target.value)}
                      placeholder="Outline target timeline, specific tools or frameworks, and whether on-site or online training is preferred..."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#2E2EF2] text-slate-900"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-lg bg-[#2E2EF2] hover:bg-[#1a1ae4] text-white font-black text-xs tracking-wider uppercase transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2 mt-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit RFP & Request Proposal</span>
                  </button>
                </form>
              )}
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

