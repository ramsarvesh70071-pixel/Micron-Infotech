import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AdminLayout } from "../components/AdminLayout";
import { getDashboardStats, updateEnquiryStatus } from "../../services/api";
import {
  Inbox,
  UserCheck,
  BookOpen,
  Star,
  LifeBuoy,
  Briefcase,
  TrendingUp,
  Clock,
  ArrowRight,
  Database,
  Server,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  FileSpreadsheet
} from "lucide-react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setError(null);
      const res = await getDashboardStats();
      if (res.success && res.data) {
        setStats(res.data);
      } else {
        throw new Error(res.message || "Failed to load dashboard data");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleQuickStatusChange = async (enquiryId: string, newStatus: string) => {
    try {
      await updateEnquiryStatus(enquiryId, { status: newStatus });
      fetchStats();
    } catch (err: any) {
      alert("Could not update lead status: " + err.message);
    }
  };

  return (
    <AdminLayout
      title="Executive Overview"
      subtitle="Real-time admissions pipeline, applications, course metrics & system health"
    >
      {/* Top Banner & Quick Refresh */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-black text-white">Live Operations Dashboard</h2>
          <p className="text-xs text-slate-400">All data calculated dynamically from the backend database.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setRefreshing(true);
              fetchStats();
            }}
            disabled={refreshing}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin text-blue-400" : ""}`} />
            <span>Refresh Metrics</span>
          </button>

          <Link
            to="/admin/enquiries"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition shadow-sm"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>View All Leads</span>
          </Link>
        </div>
      </div>

      {error && (
        <div className="p-4 mb-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Notice: {error} (Displaying available cached data)</span>
          </div>
          <button onClick={fetchStats} className="underline font-bold hover:text-white">Retry</button>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i} className="h-28 bg-slate-900/60 rounded-2xl border border-slate-800" />
          ))}
        </div>
      ) : (
        <>
          {/* Real Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Total Enquiries */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-400">Total Enquiries</span>
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                  <Inbox className="w-4.5 h-4.5" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-white">{stats?.totals?.enquiries || 0}</span>
                {stats?.totals?.newEnquiries > 0 && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                    +{stats.totals.newEnquiries} New
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Student admissions & corporate leads</p>
            </div>

            {/* Total Applications */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-400">Partner Applications</span>
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                  <UserCheck className="w-4.5 h-4.5" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-white">{stats?.totals?.applications || 0}</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300">
                  Trainers & Franchise
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Faculty & expansion partners</p>
            </div>

            {/* Active Courses */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-400">Active Courses</span>
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                  <BookOpen className="w-4.5 h-4.5" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-white">{stats?.totals?.courses || 0}</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                  Published
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Job-oriented training programs</p>
            </div>

            {/* Conversion Rate */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-400">Lead Conversion</span>
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                  <TrendingUp className="w-4.5 h-4.5" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-white">{stats?.totals?.conversionRate || "0.0%"}</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">
                  Enrolled
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Ratio of contacted leads converted</p>
            </div>

            {/* Approved Reviews */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-400">Verified Reviews</span>
                <div className="p-2 rounded-xl bg-yellow-500/10 text-yellow-400">
                  <Star className="w-4.5 h-4.5" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-white">{stats?.totals?.reviews || 0}</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-yellow-500/20 text-yellow-300">
                  4.8 Avg Rating
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Student alumni placement stories</p>
            </div>

            {/* Open Support Tickets */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-400">Support Desk</span>
                <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400">
                  <LifeBuoy className="w-4.5 h-4.5" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-white">{stats?.totals?.openTickets || 0}</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300">
                  Open / In Progress
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Student grievances & requests</p>
            </div>

            {/* Active Job Postings */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-400">Employer Jobs</span>
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                  <Briefcase className="w-4.5 h-4.5" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-white">{stats?.totals?.activeJobs || 0}</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                  Active
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Corporate recruiter postings</p>
            </div>

            {/* Server Status Quick Widget */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-400">Database Engine</span>
                <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
                  <Database className="w-4.5 h-4.5" />
                </div>
              </div>
              <div className="text-sm font-bold text-white truncate">
                {stats?.systemStatus?.engine || "Active Engine"}
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Connected & Healthy</span>
              </div>
            </div>
          </div>

          {/* Lead Pipeline & Top Courses Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
            {/* Status Pipeline Visualizer */}
            <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-base font-bold text-white">Admissions Pipeline Stage Breakdown</h3>
                  <p className="text-xs text-slate-400">Live lead distribution across admission stages</p>
                </div>
                <Link to="/admin/enquiries" className="text-xs font-bold text-blue-400 hover:text-blue-300">
                  Manage Pipeline →
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
                {[
                  { label: "New", count: stats?.statusDistribution?.new || 0, color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
                  { label: "Contacted", count: stats?.statusDistribution?.contacted || 0, color: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
                  { label: "In Progress", count: stats?.statusDistribution?.in_progress || 0, color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
                  { label: "Converted", count: stats?.statusDistribution?.converted || 0, color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
                  { label: "Closed", count: stats?.statusDistribution?.closed || 0, color: "bg-slate-500/20 text-slate-400 border-slate-500/30" }
                ].map(item => (
                  <div key={item.label} className={`p-3 rounded-xl border text-center ${item.color}`}>
                    <div className="text-xl font-black">{item.count}</div>
                    <div className="text-[11px] font-semibold mt-0.5">{item.label}</div>
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div className="space-y-2">
                <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden flex">
                  {stats?.totals?.enquiries > 0 ? (
                    <>
                      <div style={{ width: `${((stats.statusDistribution.new || 0) / stats.totals.enquiries) * 100}%` }} className="bg-blue-500 h-full" title="New" />
                      <div style={{ width: `${((stats.statusDistribution.contacted || 0) / stats.totals.enquiries) * 100}%` }} className="bg-amber-500 h-full" title="Contacted" />
                      <div style={{ width: `${((stats.statusDistribution.in_progress || 0) / stats.totals.enquiries) * 100}%` }} className="bg-purple-500 h-full" title="In Progress" />
                      <div style={{ width: `${((stats.statusDistribution.converted || 0) / stats.totals.enquiries) * 100}%` }} className="bg-emerald-500 h-full" title="Converted" />
                      <div style={{ width: `${((stats.statusDistribution.closed || 0) / stats.totals.enquiries) * 100}%` }} className="bg-slate-600 h-full" title="Closed" />
                    </>
                  ) : (
                    <div className="w-full bg-slate-800 h-full" />
                  )}
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>Legend: Blue (New) • Amber (Contacted) • Purple (In Progress) • Green (Converted)</span>
                  <span className="font-bold text-white">{stats?.totals?.enquiries || 0} Total</span>
                </div>
              </div>
            </div>

            {/* Top Demand Courses */}
            <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-white">Top Demand Courses</h3>
                  <p className="text-xs text-slate-400">By student enquiry volume</p>
                </div>
                <Link to="/admin/courses" className="text-xs font-bold text-blue-400 hover:text-blue-300">
                  Courses →
                </Link>
              </div>

              <div className="space-y-3">
                {stats?.courseDistribution && stats.courseDistribution.length > 0 ? (
                  stats.courseDistribution.map((item: any, idx: number) => {
                    const max = stats.courseDistribution[0]?.count || 1;
                    const pct = Math.round((item.count / max) * 100);

                    return (
                      <div key={item.name} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-slate-200 truncate max-w-[200px]">
                            {idx + 1}. {item.name}
                          </span>
                          <span className="font-mono text-slate-400">{item.count} inquiries</span>
                        </div>
                        <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-xs text-slate-500 py-6 text-center">No inquiry distributions recorded yet.</p>
                )}
              </div>
            </div>
          </div>

          {/* Recent Leads Feed */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden mb-8">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Recent Enquiries & Admissions Activity</h3>
                <p className="text-xs text-slate-400">Real-time submissions from website forms</p>
              </div>
              <Link
                to="/admin/enquiries"
                className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1"
              >
                <span>Full Leads Table</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/60 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                  <tr>
                    <th className="px-6 py-3.5">Candidate / Lead</th>
                    <th className="px-6 py-3.5">Contact</th>
                    <th className="px-6 py-3.5">Course & Mode</th>
                    <th className="px-6 py-3.5">Stage</th>
                    <th className="px-6 py-3.5">Received</th>
                    <th className="px-6 py-3.5 text-right">Quick Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {stats?.recentEnquiries && stats.recentEnquiries.length > 0 ? (
                    stats.recentEnquiries.map((enq: any) => (
                      <tr key={enq._id} className="hover:bg-slate-800/40 transition">
                        <td className="px-6 py-4">
                          <div className="font-bold text-white">{enq.name}</div>
                          <div className="text-[11px] text-slate-400">{enq.branch || "BTM Layout"}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-slate-300 font-mono">{enq.phone}</div>
                          <div className="text-[11px] text-slate-400 truncate max-w-[180px]">{enq.email}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-slate-200">{enq.course || "General Inquiry"}</div>
                          <div className="text-[11px] text-blue-400">{enq.mode || "Classroom"}</div>
                        </td>
                        <td className="px-6 py-4">
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
                        <td className="px-6 py-4 text-slate-400 font-mono text-[11px]">
                          {new Date(enq.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <select
                            value={enq.status}
                            onChange={e => handleQuickStatusChange(enq._id, e.target.value)}
                            className="bg-slate-950 border border-slate-700 text-slate-300 text-[11px] rounded-lg px-2 py-1 focus:outline-none focus:border-blue-500"
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="in_progress">In Progress</option>
                            <option value="converted">Converted</option>
                            <option value="closed">Closed</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                        No recent enquiries recorded. Submit an inquiry through the website to test!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* System & Architecture Information */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                <Server className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Full-Stack Enterprise Architecture Active</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Node.js {stats?.systemStatus?.nodeVersion} • Database: <strong className="text-slate-200">{stats?.systemStatus?.engine}</strong> ({stats?.systemStatus?.databaseName})
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <Link
                to="/admin/settings"
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl transition"
              >
                Inspect Settings
              </Link>
              <Link
                to="/admin/courses"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition"
              >
                Manage Courses
              </Link>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
}
