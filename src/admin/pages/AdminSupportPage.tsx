import React, { useState, useEffect } from "react";
import { AdminLayout } from "../components/AdminLayout";
import { getAdminSupportTickets, updateSupportTicket, deleteSupportTicket } from "../../services/api";
import {
  LifeBuoy,
  Search,
  Filter,
  CheckCircle,
  Clock,
  AlertCircle,
  Trash2,
  Edit,
  Eye,
  MessageSquare,
  User,
  X
} from "lucide-react";

export default function AdminSupportPage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  // Edit / Resolve Modal
  const [selectedTicket, setSelectedTicket] = useState<any | null>(null);
  const [status, setStatus] = useState("Open");
  const [responseNotes, setResponseNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const res = await getAdminSupportTickets({
        status: statusFilter !== "all" ? statusFilter : undefined,
        priority: priorityFilter !== "all" ? priorityFilter : undefined,
        search: search.trim() || undefined
      });
      if (res.success && res.data) {
        setTickets(res.data);
      }
    } catch (err: any) {
      console.error("Failed to load support tickets:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [statusFilter, priorityFilter]);

  const handleOpenModal = (t: any) => {
    setSelectedTicket(t);
    setStatus(t.status || "Open");
    setResponseNotes(t.responseNotes || "");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicket) return;

    setSaving(true);
    try {
      await updateSupportTicket(selectedTicket._id || selectedTicket.id, {
        status,
        responseNotes
      });
      setSelectedTicket(null);
      fetchTickets();
    } catch (err: any) {
      alert("Failed to update ticket: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, ticketNumber: string) => {
    if (!window.confirm(`Delete support ticket ${ticketNumber}?`)) return;
    try {
      await deleteSupportTicket(id);
      fetchTickets();
    } catch (err: any) {
      alert("Failed to delete ticket: " + err.message);
    }
  };

  return (
    <AdminLayout
      title="Student Help Desk & Support Grievances"
      subtitle="Track batch reschedule requests, LMS video recordings access, certificate issuance and placement assistance"
    >
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md w-full">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={e => e.key === "Enter" && fetchTickets()}
              placeholder="Search by ticket # (MIC-XXXXXX), student name, or ID..."
              className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Filter className="w-3.5 h-3.5" />
              <span>Status:</span>
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-white text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <span>Priority:</span>
              <select
                value={priorityFilter}
                onChange={e => setPriorityFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-white text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500"
              >
                <option value="all">All Priorities</option>
                <option value="Urgent">Urgent</option>
                <option value="High">High</option>
                <option value="Normal">Normal</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LifeBuoy className="w-5 h-5 text-rose-400" />
            <h3 className="font-bold text-white text-sm">
              Tickets Queue ({tickets.length})
            </h3>
          </div>
          <span className="text-xs text-slate-400">Student Resolution SLA: 24h</span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-400 text-sm">Loading tickets...</div>
        ) : tickets.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-sm">No tickets found matching filters.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/60 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                <tr>
                  <th className="px-5 py-3.5">Ticket #</th>
                  <th className="px-5 py-3.5">Student / Contact</th>
                  <th className="px-5 py-3.5">Category</th>
                  <th className="px-5 py-3.5">Priority</th>
                  <th className="px-5 py-3.5">Description</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {tickets.map(t => (
                  <tr key={t._id || t.id} className="hover:bg-slate-800/40 transition">
                    <td className="px-5 py-4">
                      <div className="font-mono font-bold text-blue-400">{t.ticketNumber}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {new Date(t.createdAt).toLocaleDateString()}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="font-bold text-white">{t.name}</div>
                      {t.studentId && (
                        <div className="text-[11px] text-purple-400 font-mono">{t.studentId}</div>
                      )}
                      <div className="text-[11px] text-slate-400">{t.email}</div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="text-slate-200 font-medium">{t.category}</div>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          t.priority === "Urgent"
                            ? "bg-red-500/20 text-red-300 border border-red-500/30"
                            : t.priority === "High"
                            ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                            : "bg-slate-800 text-slate-300"
                        }`}
                      >
                        {t.priority}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-slate-300 max-w-xs truncate" title={t.description}>
                        {t.description}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                          t.status === "Resolved"
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                            : t.status === "In Progress"
                            ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                            : t.status === "Closed"
                            ? "bg-slate-800 text-slate-500"
                            : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                        }`}
                      >
                        {t.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenModal(t)}
                          className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition cursor-pointer"
                          title="Manage Ticket & Reply"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(t._id || t.id, t.ticketNumber)}
                          className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition cursor-pointer"
                          title="Delete Ticket"
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

      {/* Ticket Management Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
              <div>
                <h3 className="text-base font-bold text-white">
                  Ticket Resolution: {selectedTicket.ticketNumber}
                </h3>
                <p className="text-xs text-slate-400">Update status and provide student response notes</p>
              </div>
              <button
                onClick={() => setSelectedTicket(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Student:</span>
                  <strong className="text-white">{selectedTicket.name} {selectedTicket.studentId && `(${selectedTicket.studentId})`}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Email:</span>
                  <span className="text-blue-400">{selectedTicket.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Category:</span>
                  <strong className="text-slate-200">{selectedTicket.category}</strong>
                </div>
                <div className="pt-2 border-t border-slate-800">
                  <span className="text-slate-400 block mb-1">Issue Description:</span>
                  <p className="text-slate-200 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80 leading-relaxed">
                    {selectedTicket.description}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Ticket Status:
                </label>
                <select
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500"
                >
                  <option value="Open">Open (Assigned)</option>
                  <option value="In Progress">In Progress (Working with Academic / LMS Team)</option>
                  <option value="Resolved">Resolved (Resolution Provided to Student)</option>
                  <option value="Closed">Closed (Confirmed by Student)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Resolution / Response Notes:
                </label>
                <textarea
                  rows={4}
                  value={responseNotes}
                  onChange={e => setResponseNotes(e.target.value)}
                  placeholder="Record solution details: batch changed to Saturday morning, LMS link refreshed, certificate mailed..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500 placeholder-slate-600"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setSelectedTicket(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-600/30"
                >
                  {saving ? "Saving..." : "Save Resolution"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
