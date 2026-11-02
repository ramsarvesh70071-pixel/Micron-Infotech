import React, { useState } from "react";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Building2, 
  ExternalLink,
  MessageSquare
} from "lucide-react";
import TopBanner from "../components/TopBanner";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EnrollModal from "../components/EnrollModal";
import SearchModal from "../components/SearchModal";
import { BRANCHES_DATA, BranchLocation } from "../data/branchesData";
import { COURSES_LIST } from "../data/coursesData";

export default function ContactPage() {
  const [selectedBranch, setSelectedBranch] = useState<BranchLocation>(BRANCHES_DATA[0]);
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // Contact Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [course, setCourse] = useState("Data Science & Generative AI");
  const [branchChoice, setBranchChoice] = useState("BTM Layout");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && phone) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setName("");
        setEmail("");
        setPhone("");
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
        <section className="relative py-14 lg:py-18 bg-gradient-to-b from-blue-50/70 via-white to-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-[#2E2EF2] text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>14+ YEARS OF EXCELLENCE</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Contact Us & <span className="text-[#2E2EF2]">Our Branches</span>
            </h1>

            <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Join over <strong>12,590+ students</strong> who have chosen MicronInfoTech for their best career placement. Visit us at any of our 6 learning centers across Bangalore and Chennai, or connect directly with our academic advisors.
            </p>
          </div>
        </section>

        {/* Contact Form & Branches Section */}
        <section className="py-14 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              
              {/* Left Column: Interactive Contact Form */}
              <div className="lg:col-span-5">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm relative sticky top-28">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2E2EF2] mb-1">
                    <MessageSquare className="w-4.5 h-4.5" />
                    <span>Get in Touch</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Send Us an Inquiry
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 mb-6">
                    Fill out the form below. Our senior counselor will call you within 15 minutes to discuss syllabus, fees, and batch schedules.
                  </p>

                  {submitted ? (
                    <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
                      <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                      <h4 className="font-bold text-emerald-900">Inquiry Received!</h4>
                      <p className="text-xs text-emerald-700">
                        Thank you <strong>{name}</strong>. An advisor will contact you at <strong>{phone}</strong> shortly.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6.5 text-xs">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="eg. Rahul Sharma"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-[#2E2EF2] text-slate-900"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="rahul@example.com"
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-[#2E2EF2] text-slate-900"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Phone Number *</label>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+91 9876543210"
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-[#2E2EF2] text-slate-900"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Branch Preference</label>
                          <select
                            value={branchChoice}
                            onChange={(e) => setBranchChoice(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-[#2E2EF2] text-slate-900"
                          >
                            <option value="Gorakhpur">Gorakhpur Center (Uttar Pradesh)</option>
                            <option value="BTM Layout">BTM Layout (Bangalore)</option>
                            <option value="Marathahalli">Marathahalli (Bangalore)</option>
                            <option value="Jayanagar">Jayanagar (Bangalore)</option>
                            <option value="Rajajinagar">Rajajinagar (Bangalore)</option>
                            <option value="Kalyan Nagar">Kalyan Nagar (Bangalore)</option>
                            <option value="Chennai Velachery">Chennai (Velachery & OMR)</option>
                            <option value="Online Virtual">Live Online Classroom</option>
                          </select>
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Course of Interest</label>
                          <select
                            value={course}
                            onChange={(e) => setCourse(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-[#2E2EF2] text-slate-900"
                          >
                            {COURSES_LIST.map((c) => (
                              <option key={c.id} value={c.name}>
                                {c.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Your Message (Optional)</label>
                        <textarea
                          rows={8}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Ask about batch timings, fee installments, or course curriculum..."
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-[#2E2EF2] text-slate-900"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-[#2E2EF2] hover:bg-[#1a1ae4] text-white font-extrabold text-xs tracking-wider uppercase transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Consultation Request</span>
                      </button>
                    </form>
                  )}
                </div>
              </div>

              {/* Right Column: 6 Branches Directory */}
              <div className="lg:col-span-7 space-y-6 ">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2E2EF2] mb-1">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Physical Locations</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Our Learning Center Locations
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Equipped with advanced multi-screen IT labs, high-speed fiber internet, and dedicated mock interview cabins.
                  </p>
                </div>

                {/* Embedded Interactive Google Map for Gorakhpur Center (Buxipur Rd, Avas Vikas Colony, Miyan Baza, Gorakhpur, UP 273001) */}
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm space-y-3 p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                    <div className="flex items-start gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2E2EF2] flex items-center justify-center shrink-0 mt-0.5">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                          <span>Gorakhpur Center on Google Maps</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                            Verified Location
                          </span>
                        </h4>
                        <p className="text-[11px] text-slate-600 mt-0.5 font-medium">
                          Buxipur Rd, Avas Vikas Colony, Miyan Baza, Gorakhpur, Uttar Pradesh 273001
                        </p>
                      </div>
                    </div>

                    <a
                      href="https://maps.google.com/?q=Buxipur+Rd,+Avas+Vikas+Colony,+Miyan+Baza,+Gorakhpur,+Uttar+Pradesh+273001"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#2E2EF2] text-white text-xs font-bold hover:bg-[#2525d4] transition-colors shrink-0 shadow-xs"
                    >
                      <span>Open Google Maps</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* Responsive Google Maps Iframe */}
                  <div className="w-full h-80 sm:h-96 rounded-xl overflow-hidden border border-slate-200 relative bg-slate-100">
                    <iframe
                      title="Google Maps - MicronInfoTech Gorakhpur"
                      src="https://maps.google.com/maps?q=Buxipur+Rd,+Avas+Vikas+Colony,+Miyan+Baza,+Gorakhpur,+Uttar+Pradesh+273001&t=&z=16&ie=UTF8&iwloc=&output=embed"
                      className="w-full h-full border-0"
                      loading="lazy"
                      allowFullScreen
                    />
                  </div>
                </div>

                {/* Direct Helpline Banner */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-sm">Need Instant Counselor Support?</h4>
                    <p className="text-xs text-blue-200 mt-0.5">
                      Our admissions helpline is active Monday through Sunday from 8:00 AM to 8:30 PM.
                    </p>
                  </div>
                  <a
                    href="tel:7676765421"
                    className="px-5 py-2.5 rounded-full bg-white text-[#2E2EF2] font-black text-xs whitespace-nowrap hover:bg-blue-50 transition-colors shadow-xs"
                  >
                    Call: 7676765421
                  </a>
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

