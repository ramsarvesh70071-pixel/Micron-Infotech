import React, { useState, useEffect } from "react";
import { AdminLayout } from "../components/AdminLayout";
import { getAdminBlogs, createBlog, updateBlog, deleteBlog } from "../../services/api";
import {
  FileText,
  Plus,
  Search,
  Edit,
  Trash2,
  ExternalLink,
  Clock,
  Tag,
  CheckCircle,
  XCircle,
  X
} from "lucide-react";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);

  // Form Fields
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("Micron Editorial Board");
  const [category, setCategory] = useState("Career Roadmap");
  const [tagsInput, setTagsInput] = useState("DevOps, Cloud, Tech");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [readTime, setReadTime] = useState("5 min read");
  const [isPublished, setIsPublished] = useState(true);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await getAdminBlogs();
      if (res.success && res.data) {
        setBlogs(res.data);
      }
    } catch (err: any) {
      console.error("Failed to load blogs:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const openAddModal = () => {
    setEditingBlog(null);
    setTitle("");
    setAuthor("Micron Editorial Board");
    setCategory("Career Roadmap");
    setTagsInput("Cloud, DevOps, Software");
    setExcerpt("");
    setContent("");
    setReadTime("5 min read");
    setIsPublished(true);
    setIsModalOpen(true);
  };

  const openEditModal = (b: any) => {
    setEditingBlog(b);
    setTitle(b.title || "");
    setAuthor(b.author || "Micron Editorial Board");
    setCategory(b.category || "Career Roadmap");
    setTagsInput(Array.isArray(b.tags) ? b.tags.join(", ") : "");
    setExcerpt(b.excerpt || "");
    setContent(b.content || "");
    setReadTime(b.readTime || "5 min read");
    setIsPublished(b.isPublished !== false);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !excerpt || !content) {
      alert("Title, excerpt, and content are required.");
      return;
    }

    setSaving(true);
    const parsedTags = tagsInput.split(",").map(t => t.trim()).filter(Boolean);

    const payload = {
      title,
      author,
      category,
      tags: parsedTags,
      excerpt,
      content,
      readTime,
      isPublished
    };

    try {
      if (editingBlog) {
        await updateBlog(editingBlog._id || editingBlog.id, payload);
      } else {
        await createBlog(payload);
      }
      setIsModalOpen(false);
      fetchBlogs();
    } catch (err: any) {
      alert("Failed to save blog post: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, postTitle: string) => {
    if (!window.confirm(`Delete article "${postTitle}"?`)) return;
    try {
      await deleteBlog(id);
      fetchBlogs();
    } catch (err: any) {
      alert("Failed to delete blog post: " + err.message);
    }
  };

  const filteredBlogs = blogs.filter(b => {
    if (!search) return true;
    const s = search.toLowerCase();
    return (
      b.title?.toLowerCase().includes(s) ||
      b.category?.toLowerCase().includes(s) ||
      b.author?.toLowerCase().includes(s)
    );
  });

  return (
    <AdminLayout
      title="Articles & Technology Blogs"
      subtitle="Publish career guides, technology interview roadmaps and student placement articles"
    >
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md w-full">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search articles by title or keyword..."
              className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            onClick={openAddModal}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-600/30 transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Write New Article</span>
          </button>
        </div>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-400" />
            <h3 className="font-bold text-white text-sm">
              Published & Draft Articles ({filteredBlogs.length})
            </h3>
          </div>
          <span className="text-xs text-slate-400">SEO & Editorial Engine</span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-400 text-sm">Loading articles...</div>
        ) : filteredBlogs.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-sm">No articles found matching search.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/60 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                <tr>
                  <th className="px-5 py-3.5">Article Title & Slug</th>
                  <th className="px-5 py-3.5">Category & Tags</th>
                  <th className="px-5 py-3.5">Author</th>
                  <th className="px-5 py-3.5">Read Time</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5">Date</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredBlogs.map(blog => (
                  <tr key={blog._id || blog.id} className="hover:bg-slate-800/40 transition">
                    <td className="px-5 py-4">
                      <div className="font-bold text-white max-w-[280px]">{blog.title}</div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">/{blog.slug}</div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="font-semibold text-blue-400">{blog.category}</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {blog.tags?.slice(0, 2).map((t: string) => (
                          <span key={t} className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                            #{t}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="text-slate-200">{blog.author}</div>
                    </td>

                    <td className="px-5 py-4 text-slate-400 font-mono">
                      {blog.readTime}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          blog.isPublished
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {blog.isPublished ? "Published" : "Draft"}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-slate-400 font-mono text-[11px]">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(blog)}
                          className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition cursor-pointer"
                          title="Edit Article"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(blog._id || blog.id, blog.title)}
                          className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition cursor-pointer"
                          title="Delete Article"
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

      {/* Add / Edit Article Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl my-8 overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
              <h3 className="text-base font-bold text-white">
                {editingBlog ? "Edit Article" : "Compose New Article"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Article Headline *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Master Cloud DevOps: The Complete 2026 Guide"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                  <input
                    type="text"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    placeholder="e.g. Career Roadmap"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Author</label>
                  <input
                    type="text"
                    value={author}
                    onChange={e => setAuthor(e.target.value)}
                    placeholder="e.g. Micron Editorial Board"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Read Time</label>
                  <input
                    type="text"
                    value={readTime}
                    onChange={e => setReadTime(e.target.value)}
                    placeholder="e.g. 5 min read"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={e => setTagsInput(e.target.value)}
                  placeholder="DevOps, Cloud, Salary, High Demand"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Short Excerpt / Meta Description *</label>
                <textarea
                  rows={2}
                  required
                  value={excerpt}
                  onChange={e => setExcerpt(e.target.value)}
                  placeholder="Brief summary displayed on cards and search results..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Article Body *</label>
                <textarea
                  rows={6}
                  required
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  placeholder="Comprehensive article content, guides, syllabus breakdowns..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>

              <div className="flex items-center gap-2 pt-2 text-xs text-slate-300">
                <input
                  type="checkbox"
                  id="pub"
                  checked={isPublished}
                  onChange={e => setIsPublished(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600"
                />
                <label htmlFor="pub" className="cursor-pointer">
                  Publish immediately on Public Blog Page
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-600/30"
                >
                  {saving ? "Saving..." : editingBlog ? "Save Changes" : "Publish Article"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
