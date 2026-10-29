import React, { useState } from "react";
import { 
  Building2, 
  TrendingUp, 
  DollarSign, 
  Award, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Send, 
  Users, 
  MapPin, 
  Briefcase 
} from "lucide-react";
import TopBanner from "../components/TopBanner";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EnrollModal from "../components/EnrollModal";
import SearchModal from "../components/SearchModal";

export default function FranchisePage() {
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [capital, setCapital] = useState("₹15 - ₹25 Lakhs");
  const [space, setSpace] = useState("1,200 - 2,000 sq ft");
  const [background, setBackground] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && phone && city) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setName("");
        setEmail("");
        setPhone("");
        setCity("");
        setBackground("");
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
              <span>FRANCHISE PARTNERSHIP OPPORTUNITY</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
              Partner with India's #1 Rated <span className="text-[#2E2EF2]">IT Training Brand</span>
            </h1>

            <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              MicronInfoTech has an established network of high-performing centres, making it a sound, highly profitable investment for starting your own tech education business with 100% placement backing.
            </p>
          </div>
        </section>

        {/* About Franchise Section */}
        <section className="py-14 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              
              {/* Left Column: Why Franchise with Us */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#2E2EF2] bg-blue-50 px-3 py-1 rounded-full">
                    Sound Investment Model
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
                    Why Invest in an MicronInfoTech Franchise?
                  </h2>
                  <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                    INVENTATEQ is India's premier software training institute providing classroom, online, and corporate classes with over 14+ years of proven operational experience.
                  </p>
                  <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                    Our courses are designed after extensive research by technical experts in the software industry — giving your enrolled students an unmatched competitive edge in job interviews and generating exceptional goodwill and referrals for your center.
                  </p>
                </div>

                {/* 4 Pillars from PDF */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <Award className="w-4 h-4 text-[#2E2EF2]" />
                      Find the Best
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Leverage our proven business blueprints and operational playbooks analyzed to make setup friction-free.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                      Exclusive Reports
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Access industry reports, student admission metrics, and revenue projections you can genuinely depend on.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-purple-600" />
                      Free Advice & Expertise
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Get expert location selection advice, lab hardware specifications, and staff recruitment guidance from our leadership.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <Users className="w-4 h-4 text-amber-600" />
                      Franchisee Support
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Centralized digital marketing funnels, faculty training, and placement cell support connecting your students to 2,000+ brands.
                    </p>
                  </div>
                </div>

                {/* Expected ROI Metrics */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-900 text-white space-y-3">
                  <h4 className="font-bold text-sm">Typical Franchise Financial Highlights:</h4>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-2.5 rounded-lg bg-white/10">
                      <div className="text-lg font-black text-cyan-300">65 - 75%</div>
                      <div className="text-[10px] text-blue-100">Gross Margin</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/10">
                      <div className="text-lg font-black text-cyan-300">12 - 18 Mo</div>
                      <div className="text-[10px] text-blue-100">Break-even Period</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/10">
                      <div className="text-lg font-black text-cyan-300">2,000+</div>
                      <div className="text-[10px] text-blue-100">Shared Hiring Partners</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Application Form */}
              <div className="lg:col-span-6">
                <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-md">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2E2EF2] mb-1">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Partner Onboarding</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Apply for Franchise Partnership
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 mb-6">
                    Submit your interest. Our franchise expansion director will review territory availability and share our confidential franchise disclosure document.
                  </p>

                  {submitted ? (
                    <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
                      <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                      <h4 className="font-bold text-base text-emerald-900">Application Received!</h4>
                      <p className="text-xs text-emerald-700 max-w-sm mx-auto">
                        Thank you <strong>{name}</strong>. Our franchise business director will contact you directly at <strong>{phone}</strong> to discuss franchise opportunities in <strong>{city}</strong>.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Your Full Name *</label>
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="eg. Vikram Singhania"
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
                            placeholder="vikram@example.com"
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
                          <label className="block font-bold text-slate-700 mb-1">Target City / Locality *</label>
                          <input
                            type="text"
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="eg. Hyderabad, Pune, Whitefield..."
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#2E2EF2] text-slate-900"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Available Investment Capital</label>
                          <select
                            value={capital}
                            onChange={(e) => setCapital(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#2E2EF2] text-slate-900 bg-white"
                          >
                            <option value="₹10 - ₹15 Lakhs">₹10 - ₹15 Lakhs</option>
                            <option value="₹15 - ₹25 Lakhs">₹15 - ₹25 Lakhs</option>
                            <option value="₹25 - ₹40 Lakhs">₹25 - ₹40 Lakhs</option>
                            <option value="₹40 Lakhs+">₹40 Lakhs+ (Multi-Center)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Commercial Space Available</label>
                          <select
                            value={space}
                            onChange={(e) => setSpace(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#2E2EF2] text-slate-900 bg-white"
                          >
                            <option value="800 - 1,200 sq ft">800 - 1,200 sq ft</option>
                            <option value="1,200 - 2,000 sq ft">1,200 - 2,000 sq ft</option>
                            <option value="2,000 - 3,500 sq ft">2,000 - 3,500 sq ft</option>
                            <option value="Looking to Lease">Looking to Lease based on advice</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Professional Background & Vision</label>
                        <textarea
                          rows={3}
                          value={background}
                          onChange={(e) => setBackground(e.target.value)}
                          placeholder="Briefly describe your current business experience or passion for tech education..."
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#2E2EF2] text-slate-900"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 rounded-lg bg-[#2E2EF2] hover:bg-[#1a1ae4] text-white font-black text-xs tracking-wider uppercase transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2 mt-2"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Franchise Application</span>
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

