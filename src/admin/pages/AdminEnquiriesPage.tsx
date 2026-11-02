import React, { useState, useEffect } from "react";
import { AdminLayout } from "../components/AdminLayout";
import { getAdminEnquiries, updateEnquiryStatus, deleteEnquiry, exportEnquiriesCsvUrl } from "../../services/api";
import {
  Inbox,
  Search,
  Filter,
  Download,
  Trash2,
  Edit,
  Eye,
  CheckCircle2,
  Clock,
  MessageSquare,
  Building,
  User,
  Phone,
  Mail,
  X,
  AlertCircle
} from "lucide-react";

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Selected for View / Edit Modal
  const [selectedEnquiry, setSelectedEnquiry] = useState<any | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editStatus, setEditStatus] = useState("new");
  const [editNotes, setEditNotes] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const res = await getAdminEnquiries({
        type: typeFilter !== "all" ? typeFilter : undefined,
        status: statusFilter !== "all" ? statusFilter : undefined,
        search: search.trim() || undefined
      });
      if (res.success && res.data) {
        setEnquiries(res.data);
      }
    } catch (err: any) {
      console.error("Failed to load enquiries:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [typeFilter, statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchEnquiries();
  };

  const handleOpenEdit = (enq: any) => {
    setSelectedEnquiry(enq);
    setEditStatus(enq.status);
    setEditNotes(enq.notes || "");
    setIsEditModalOpen(true);
  };

  const handleSaveStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnquiry) return;

    setActionLoading(true);
    try {
      await updateEnquiryStatus(selectedEnquiry._id || selectedEnquiry.id, {
        status: editStatus,
        notes: editNotes
      });
      setIsEditModalOpen(false);
      setSelectedEnquiry(null);
      fetchEnquiries();
    } catch (err: any) {
      alert("Failed to update status: " + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete lead from ${name}?`)) return;

    try {
      await deleteEnquiry(id);
      fetchEnquiries();
    } catch (err: any) {
      alert("Could not delete lead: " + err.message);
    }
  };

  return (
    <AdminLayout
      title="Student Admissions & Corporate Inquiries"
      subtitle="Complete pipeline of student course enrollments, branch inquiries and corporate training requests"
    >
      {/* Action Controls & Filters */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md relative">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by candidate name, email, phone, or course..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </form>

          {/* Filter Dropdowns & CSV Button */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Type */}
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Filter className="w-3.5 h-3.5" />
              <span>Type:</span>
              <select
                value={typeFilter}
                onChange={e => setTypeFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-white text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500"
              >
                <option value="all">All Inquiries</option>
                <option value="enrollment">Student Enrollment</option>
                <option value="general">General Contact</option>
                <option value="corporate">Corporate Training</option>
              </select>
            </div>

            {/* Status */}
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <span>Status:</span>
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-white text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500"
              >
                <option value="all">All Stages</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="in_progress">In Progress</option>
                <option value="converted">Converted</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            {/* Export CSV Button */}
            <a
              href={exportEnquiriesCsvUrl()}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
              title="Download CSV spreadsheet"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Inbox className="w-5 h-5 text-blue-400" />
            <h3 className="font-bold text-white text-sm">
              Inquiries List ({enquiries.length})
            </h3>
          </div>
          <span className="text-xs text-slate-400">Showing filtered leads</span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-400 text-sm">
            Loading admissions inquiries...
          </div>
        ) : enquiries.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-sm">
            No inquiries matching your criteria. Try adjusting your filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/60 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                <tr>
                  <th className="px-5 py-3.5">Candidate / Lead</th>
                  <th className="px-5 py-3.5">Phone & Email</th>
                  <th className="px-5 py-3.5">Course / Training Domain</th>
                  <th className="px-5 py-3.5">Mode / Branch</th>
                  <th className="px-5 py-3.5">Stage</th>
                  <th className="px-5 py-3.5">Date</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {enquiries.map(enq => (
                  <tr key={enq._id || enq.id} className="hover:bg-slate-800/40 transition">
                    <td className="px-5 py-4">
                      <div className="font-bold text-white">{enq.name}</div>
                      {enq.companyName && (
                        <div className="text-[11px] text-purple-400 font-medium flex items-center gap-1 mt-0.5">
                          <Building className="w-3 h-3" />
                          <span>{enq.companyName} ({enq.teamSize || "Corporate"})</span>
                        </div>
                      )}
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">
                        {enq.type}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="text-slate-200 font-mono font-medium">{enq.phone}</div>
                      <div className="text-[11px] text-slate-400 truncate max-w-[200px]">{enq.email}</div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="font-semibold text-slate-200 max-w-[220px]">
                        {enq.course || "General Consultation"}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="text-slate-300">{enq.mode || "Classroom"}</div>
                      <div className="text-[11px] text-slate-400">{enq.branch || "BTM Center"}</div>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          enq.status === "new"
                            ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                            : enq.status === "contacted"
                            ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                            : enq.status === "in_progress"
                            ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                            : enq.status === "converted"
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                            : "bg-slate-500/20 text-slate-400 border border-slate-500/30"
                        }`}
                      >
                        {enq.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-slate-400 font-mono text-[11px]">
                      {new Date(enq.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(enq)}
                          className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition cursor-pointer"
                          title="View Details & Update Status"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(enq._id || enq.id, enq.name)}
                          className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition cursor-pointer"
                          title="Delete Lead"
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

      {/* View & Update Status Modal */}
      {isEditModalOpen && selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
              <h3 className="text-base font-bold text-white">Lead Details & Status</h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <form onSubmit={handleSaveStatus} className="p-6 space-y-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Candidate Name:</span>
                  <strong className="text-white">{selectedEnquiry.name}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Phone:</span>
                  <strong className="text-blue-400 font-mono">{selectedEnquiry.phone}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Email:</span>
                  <strong className="text-slate-200">{selectedEnquiry.email}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Course:</span>
                  <strong className="text-slate-200">{selectedEnquiry.course}</strong>
                </div>
                {selectedEnquiry.comments && (
                  <div className="pt-2 border-t border-slate-800">
                    <span className="text-slate-400 block mb-1">Student Note / Question:</span>
                    <p className="text-slate-300 italic bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                      "{selectedEnquiry.comments}"
                    </p>
                  </div>
                )}
              </div>

              {/* Status Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Update Admissions Stage:
                </label>
                <select
                  value={editStatus}
                  onChange={e => setEditStatus(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500"
                >
                  <option value="new">New (Uncontacted)</option>
                  <option value="contacted">Contacted (Counselor Call Completed)</option>
                  <option value="in_progress">In Progress (Attending Demo / Syllabus Review)</option>
                  <option value="converted">Converted (Enrolled / Fee Paid)</option>
                  <option value="closed">Closed (Not Interested / Postponed)</option>
                </select>
              </div>

              {/* Counselor Internal Notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Internal Counselor Notes:
                </label>
                <textarea
                  rows={3}
                  value={editNotes}
                  onChange={e => setEditNotes(e.target.value)}
                  placeholder="Record callback date, discussed batch time, fee discount offered, etc..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500 placeholder-slate-600"
                />
              </div>

              {/* Modal Buttons */}
              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-600/30"
                >
                  {actionLoading ? "Saving..." : "Save Updates"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
