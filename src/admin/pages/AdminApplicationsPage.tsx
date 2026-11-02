import React, { useState, useEffect } from "react";
import { AdminLayout } from "../components/AdminLayout";
import { getAdminApplications, updateApplicationStatus, deleteApplication } from "../../services/api";
import {
  UserCheck,
  Building2,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  ExternalLink,
  Trash2,
  Edit,
  Eye,
  Mail,
  Phone,
  Briefcase,
  MapPin,
  X
} from "lucide-react";

export default function AdminApplicationsPage() {
  const [activeTab, setActiveTab] = useState<"trainer" | "franchise">("trainer");
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Selected Detail Modal
  const [selectedApp, setSelectedApp] = useState<any | null>(null);
  const [newStatus, setNewStatus] = useState("new");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await getAdminApplications({
        type: activeTab,
        status: statusFilter !== "all" ? statusFilter : undefined,
        search: search.trim() || undefined
      });
      if (res.success && res.data) {
        setApplications(res.data);
      }
    } catch (err: any) {
      console.error("Failed to load applications:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [activeTab, statusFilter]);

  const handleOpenDetail = (app: any) => {
    setSelectedApp(app);
    setNewStatus(app.status || "new");
    setNotes(app.notes || "");
  };

  const handleSaveStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp) return;

    setSaving(true);
    try {
      await updateApplicationStatus(selectedApp._id || selectedApp.id, {
        status: newStatus,
        notes
      });
      setSelectedApp(null);
      fetchApplications();
    } catch (err: any) {
      alert("Failed to update status: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete application for ${name}?`)) return;
    try {
      await deleteApplication(id);
      fetchApplications();
    } catch (err: any) {
      alert("Failed to delete application: " + err.message);
    }
  };

  return (
    <AdminLayout
      title="Trainer & Franchise Applications"
      subtitle="Review faculty trainer applications and franchise partner expansion proposals"
    >
      {/* Tab Switcher & Filters */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Tabs */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab("trainer")}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeTab === "trainer"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Trainer Applications</span>
            </button>

            <button
              onClick={() => setActiveTab("franchise")}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeTab === "franchise"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Franchise Requests</span>
            </button>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2 text-xs text-slate-400 w-full sm:w-auto justify-end">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter Status:</span>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-white text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="reviewed">Reviewed</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="onboarded">Onboarded</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-white text-sm">
            {activeTab === "trainer" ? "Faculty Trainer Applicants" : "Franchise Partner Inquiries"} ({applications.length})
          </h3>
          <span className="text-xs text-slate-400">Applications received</span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-400 text-sm">Loading applications...</div>
        ) : applications.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-sm">
            No applications found in this category.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/60 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                <tr>
                  <th className="px-5 py-3.5">Applicant Name</th>
                  <th className="px-5 py-3.5">Contact Details</th>
                  {activeTab === "trainer" ? (
                    <>
                      <th className="px-5 py-3.5">Expertise / Technology</th>
                      <th className="px-5 py-3.5">Experience & Company</th>
                    </>
                  ) : (
                    <>
                      <th className="px-5 py-3.5">Proposed City & State</th>
                      <th className="px-5 py-3.5">Capital & Space</th>
                    </>
                  )}
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5">Date</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {applications.map(app => (
                  <tr key={app._id || app.id} className="hover:bg-slate-800/40 transition">
                    <td className="px-5 py-4">
                      <div className="font-bold text-white">{app.name}</div>
                      {app.linkedin && (
                        <a
                          href={app.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-blue-400 hover:underline flex items-center gap-1 mt-0.5"
                        >
                          <span>LinkedIn Profile</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <div className="font-mono text-slate-200">{app.phone}</div>
                      <div className="text-[11px] text-slate-400">{app.email}</div>
                    </td>

                    {activeTab === "trainer" ? (
                      <>
                        <td className="px-5 py-4">
                          <div className="font-semibold text-slate-200">{app.technology || "General Tech"}</div>
                          <div className="text-[11px] text-slate-400">{app.mode}</div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="text-slate-200">{app.experience}</div>
                          <div className="text-[11px] text-purple-400">{app.currentCompany}</div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-5 py-4">
                          <div className="font-semibold text-white">{app.city}</div>
                          <div className="text-[11px] text-slate-400">{app.state}</div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="text-emerald-400 font-bold">{app.capital}</div>
                          <div className="text-[11px] text-slate-400">{app.space}</div>
                        </td>
                      </>
                    )}

                    <td className="px-5 py-4">
                      <span
                        className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          app.status === "shortlisted"
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                            : app.status === "reviewed"
                            ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                            : app.status === "onboarded"
                            ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                            : app.status === "rejected"
                            ? "bg-red-500/20 text-red-300 border border-red-500/30"
                            : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                        }`}
                      >
                        {app.status || "new"}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-slate-400 font-mono text-[11px]">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenDetail(app)}
                          className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition cursor-pointer"
                          title="Review Application Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(app._id || app.id, app.name)}
                          className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition cursor-pointer"
                          title="Delete Application"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Review & Status Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
              <h3 className="text-base font-bold text-white">Application Profile Review</h3>
              <button
                onClick={() => setSelectedApp(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveStatus} className="p-6 space-y-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Applicant:</span>
                  <strong className="text-white">{selectedApp.name}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Contact:</span>
                  <span className="text-blue-400 font-mono">{selectedApp.phone} • {selectedApp.email}</span>
                </div>

                {selectedApp.type === "trainer" ? (
                  <>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Domain / Expertise:</span>
                      <strong className="text-slate-200">{selectedApp.technology}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Experience / Company:</span>
                      <strong className="text-slate-200">{selectedApp.experience} at {selectedApp.currentCompany}</strong>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between">
                      <span className="text-slate-400">City / State:</span>
                      <strong className="text-slate-200">{selectedApp.city}, {selectedApp.state}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Proposed Space:</span>
                      <strong className="text-slate-200">{selectedApp.space}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Investment Budget:</span>
                      <strong className="text-emerald-400 font-bold">{selectedApp.capital}</strong>
                    </div>
                  </>
                )}

                {(selectedApp.message || selectedApp.background) && (
                  <div className="pt-2 border-t border-slate-800">
                    <span className="text-slate-400 block mb-1">Applicant Note:</span>
                    <p className="text-slate-300 italic bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                      "{selectedApp.message || selectedApp.background}"
                    </p>
                  </div>
                )}
              </div>

              {/* Status Update */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Review Decision Status:
                </label>
                <select
                  value={newStatus}
                  onChange={e => setNewStatus(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500"
                >
                  <option value="new">New (Pending Review)</option>
                  <option value="reviewed">Reviewed (Credentials Verified)</option>
                  <option value="shortlisted">Shortlisted (Demo Session Scheduled)</option>
                  <option value="onboarded">Onboarded (Contract Signed)</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Evaluator Review Notes:
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Record evaluation score, demo interview remarks, negotiation terms..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500 placeholder-slate-600"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setSelectedApp(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-600/30"
                >
                  {saving ? "Saving..." : "Save Evaluation"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
