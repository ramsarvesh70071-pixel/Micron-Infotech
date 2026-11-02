import React, { useState, useEffect } from "react";
import { AdminLayout } from "../components/AdminLayout";
import { getAdminReviews, toggleReviewApproval, submitReview, deleteReview } from "../../services/api";
import {
  Star,
  Plus,
  Search,
  CheckCircle,
  XCircle,
  Trash2,
  Sparkles,
  Award,
  Building,
  User,
  X
} from "lucide-react";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [course, setCourse] = useState("AWS Cloud & DevOps");
  const [rating, setRating] = useState(5);
  const [hike, setHike] = useState("200% Hike");
  const [packageLpa, setPackageLpa] = useState("16 LPA");
  const [reviewText, setReviewText] = useState("");

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await getAdminReviews();
      if (res.success && res.data) {
        setReviews(res.data);
      }
    } catch (err: any) {
      console.error("Failed to load reviews:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleToggleApprove = async (review: any) => {
    try {
      await toggleReviewApproval(review._id || review.id, {
        isApproved: !review.isApproved
      });
      fetchReviews();
    } catch (err: any) {
      alert("Failed to update review approval: " + err.message);
    }
  };

  const handleToggleFeatured = async (review: any) => {
    try {
      await toggleReviewApproval(review._id || review.id, {
        isFeatured: !review.isFeatured
      });
      fetchReviews();
    } catch (err: any) {
      alert("Failed to toggle featured: " + err.message);
    }
  };

  const handleDelete = async (id: string, authorName: string) => {
    if (!window.confirm(`Delete review from ${authorName}?`)) return;
    try {
      await deleteReview(id);
      fetchReviews();
    } catch (err: any) {
      alert("Failed to delete review: " + err.message);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !role || !company || !reviewText) {
      alert("Please fill all required fields.");
      return;
    }

    setFormLoading(true);
    try {
      await submitReview({
        name,
        role,
        company,
        course,
        rating: Number(rating),
        hike,
        packageLpa,
        reviewText
      });
      setIsModalOpen(false);
      setName("");
      setRole("");
      setCompany("");
      setReviewText("");
      fetchReviews();
    } catch (err: any) {
      alert("Failed to submit review: " + err.message);
    } finally {
      setFormLoading(false);
    }
  };

  const filteredReviews = reviews.filter(r => {
    if (!search) return true;
    const s = search.toLowerCase();
    return (
      r.name?.toLowerCase().includes(s) ||
      r.company?.toLowerCase().includes(s) ||
      r.role?.toLowerCase().includes(s) ||
      r.course?.toLowerCase().includes(s)
    );
  });

  return (
    <AdminLayout
      title="Student Testimonials & Reviews"
      subtitle="Moderate placement testimonials, verify student ratings and spotlight high-jump alumni stories"
    >
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md w-full">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by student, company, course, or role..."
              className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-600/30 transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Student Review</span>
          </button>
        </div>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <h3 className="font-bold text-white text-sm">
              Alumni Reviews ({filteredReviews.length})
            </h3>
          </div>
          <span className="text-xs text-slate-400">Moderated verified reviews</span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-400 text-sm">Loading reviews...</div>
        ) : filteredReviews.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-sm">No reviews found matching search.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/60 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                <tr>
                  <th className="px-5 py-3.5">Student / Alumni</th>
                  <th className="px-5 py-3.5">Placed Company & Role</th>
                  <th className="px-5 py-3.5">Course Completed</th>
                  <th className="px-5 py-3.5">Rating & Hike</th>
                  <th className="px-5 py-3.5">Testimonial Quote</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredReviews.map(rev => (
                  <tr key={rev._id || rev.id} className="hover:bg-slate-800/40 transition">
                    <td className="px-5 py-4">
                      <div className="font-bold text-white">{rev.name}</div>
                      {rev.packageLpa && (
                        <div className="text-[11px] text-emerald-400 font-mono font-semibold mt-0.5">
                          {rev.packageLpa}
                        </div>
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <div className="font-semibold text-slate-200">{rev.company}</div>
                      <div className="text-[11px] text-slate-400">{rev.role}</div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="text-slate-300 font-medium">{rev.course}</div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1 text-amber-400 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{rev.rating} / 5</span>
                      </div>
                      {rev.hike && (
                        <div className="text-[10px] text-purple-400 font-semibold mt-0.5">
                          {rev.hike}
                        </div>
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-slate-300 max-w-xs truncate italic" title={rev.reviewText}>
                        "{rev.reviewText}"
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <button
                        onClick={() => handleToggleApprove(rev)}
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full cursor-pointer transition ${
                          rev.isApproved
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                        }`}
                        title="Click to toggle public display"
                      >
                        {rev.isApproved ? "Approved" : "Pending Review"}
                      </button>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleToggleFeatured(rev)}
                          className={`p-1.5 rounded-lg transition cursor-pointer ${
                            rev.isFeatured
                              ? "bg-amber-500/20 text-amber-400"
                              : "bg-slate-800 text-slate-500 hover:text-amber-400"
                          }`}
                          title={rev.isFeatured ? "Featured Review" : "Feature on Homepage"}
                        >
                          <Sparkles className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(rev._id || rev.id, rev.name)}
                          className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition cursor-pointer"
                          title="Delete Review"
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

      {/* Add Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
              <h3 className="text-base font-bold text-white">Add Alumni Testimonial</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Student Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Anjali Nair"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Placed Company *</label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={e => setCompany(e.target.value)}
                    placeholder="e.g. Google India / Amazon"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Job Role *</label>
                  <input
                    type="text"
                    required
                    value={role}
                    onChange={e => setRole(e.target.value)}
                    placeholder="e.g. Cloud DevOps Engineer"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Course Completed *</label>
                  <input
                    type="text"
                    required
                    value={course}
                    onChange={e => setCourse(e.target.value)}
                    placeholder="e.g. AWS Cloud & DevOps"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Salary Package (LPA)</label>
                  <input
                    type="text"
                    value={packageLpa}
                    onChange={e => setPackageLpa(e.target.value)}
                    placeholder="e.g. 18.5 LPA"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Hike %</label>
                  <input
                    type="text"
                    value={hike}
                    onChange={e => setHike(e.target.value)}
                    placeholder="e.g. 250% Hike"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Review Experience Text *</label>
                <textarea
                  rows={4}
                  required
                  value={reviewText}
                  onChange={e => setReviewText(e.target.value)}
                  placeholder="Describe student training feedback, mock interviews, placement support..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-600/30"
                >
                  {formLoading ? "Saving..." : "Publish Review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
