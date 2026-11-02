import React, { useState, useEffect } from "react";
import { AdminLayout } from "../components/AdminLayout";
import { getAdminJobs, updateJobStatus, deleteJob } from "../../services/api";
import {
  Briefcase,
  Search,
  Filter,
  CheckCircle,
  Building,
  MapPin,
  Trash2,
  ExternalLink,
  DollarSign,
  Users
} from "lucide-react";

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await getAdminJobs({
        status: statusFilter !== "all" ? statusFilter : undefined,
        search: search.trim() || undefined
      });
      if (res.success && res.data) {
        setJobs(res.data);
      }
    } catch (err: any) {
      console.error("Failed to load jobs:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [statusFilter]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await updateJobStatus(id, { status: newStatus });
      fetchJobs();
    } catch (err: any) {
      alert("Failed to update job status: " + err.message);
    }
  };

  const handleDelete = async (id: string, jobTitle: string) => {
    if (!window.confirm(`Delete job opening "${jobTitle}"?`)) return;
    try {
      await deleteJob(id);
      fetchJobs();
    } catch (err: any) {
      alert("Failed to delete job: " + err.message);
    }
  };

  return (
    <AdminLayout
      title="Corporate Hiring & Job Postings"
      subtitle="Manage corporate employer job postings and match candidates with verified openings"
    >
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md w-full">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={e => e.key === "Enter" && fetchJobs()}
              placeholder="Search by company, job title, skills, or city..."
              className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Filter className="w-3.5 h-3.5" />
            <span>Status:</span>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-white text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Job Postings</option>
              <option value="active">Active Openings</option>
              <option value="review">Under Review</option>
              <option value="filled">Positions Filled</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-white text-sm">
              Employer Postings ({jobs.length})
            </h3>
          </div>
          <span className="text-xs text-slate-400">Placement recruitment drives</span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-400 text-sm">Loading job openings...</div>
        ) : jobs.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-sm">No job openings found matching filters.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/60 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                <tr>
                  <th className="px-5 py-3.5">Company & Recruiter</th>
                  <th className="px-5 py-3.5">Job Role & Openings</th>
                  <th className="px-5 py-3.5">Package (CTC)</th>
                  <th className="px-5 py-3.5">Location & Exp</th>
                  <th className="px-5 py-3.5">Required Skills</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {jobs.map(job => (
                  <tr key={job._id || job.id} className="hover:bg-slate-800/40 transition">
                    <td className="px-5 py-4">
                      <div className="font-bold text-white flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5 text-blue-400" />
                        <span>{job.companyName}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {job.recruiterName} • <span className="font-mono">{job.phone}</span>
                      </div>
                      <div className="text-[11px] text-slate-500">{job.officialEmail}</div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="font-bold text-slate-100">{job.jobTitle}</div>
                      <div className="text-[11px] text-purple-400 font-medium mt-0.5">
                        {job.openings || "Multiple Positions"}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="font-mono font-bold text-emerald-400">
                        {job.ctcRange || "Best in Industry"}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="text-slate-200">{job.location || "Bangalore"}</div>
                      <div className="text-[11px] text-slate-400">{job.experience}</div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="max-w-[220px] text-slate-300 truncate" title={job.skills}>
                        {job.skills}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <select
                        value={job.status}
                        onChange={e => handleStatusChange(job._id || job.id, e.target.value)}
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg border focus:outline-none ${
                          job.status === "active"
                            ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                            : job.status === "review"
                            ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                            : "bg-slate-800 text-slate-400 border-slate-700"
                        }`}
                      >
                        <option value="review">Review</option>
                        <option value="active">Active</option>
                        <option value="filled">Filled</option>
                      </select>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => handleDelete(job._id || job.id, job.jobTitle)}
                        className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition cursor-pointer"
                        title="Delete Job"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
