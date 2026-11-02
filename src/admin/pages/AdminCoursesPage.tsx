import React, { useState, useEffect } from "react";
import { AdminLayout } from "../components/AdminLayout";
import { getAdminCourses, createCourse, updateCourse, deleteCourse } from "../../services/api";
import {
  BookOpen,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Check,
  X,
  Star,
  Sparkles,
  ListPlus,
  Clock,
  Layers
} from "lucide-react";

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  // Form Fields
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Cloud & DevOps");
  const [badge, setBadge] = useState("");
  const [duration, setDuration] = useState("3 Months");
  const [mode, setMode] = useState("Classroom & Online");
  const [price, setPrice] = useState("24999");
  const [popular, setPopular] = useState(false);
  const [active, setActive] = useState(true);
  const [highlightsInput, setHighlightsInput] = useState("");
  
  // Dynamic Syllabus state: [{ title: string, topics: string }]
  const [modules, setModules] = useState<{ title: string; topics: string }[]>([
    { title: "Module 1: Foundations", topics: "Core concepts, Tools, Setup" }
  ]);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await getAdminCourses();
      if (res.success && res.data) {
        setCourses(res.data);
      }
    } catch (err: any) {
      console.error("Failed to load courses:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const openAddModal = () => {
    setEditingCourse(null);
    setTitle("");
    setCategory("Cloud & DevOps");
    setBadge("");
    setDuration("3 Months");
    setMode("Classroom & Live Online");
    setPrice("24999");
    setPopular(false);
    setActive(true);
    setHighlightsInput("100% Placement Support, Live Projects, Interview Prep");
    setModules([{ title: "Module 1: Introduction", topics: "Core Concepts, Installation, Tooling" }]);
    setIsModalOpen(true);
  };

  const openEditModal = (c: any) => {
    setEditingCourse(c);
    setTitle(c.title || "");
    setCategory(c.category || "Cloud & DevOps");
    setBadge(c.badge || "");
    setDuration(c.duration || "3 Months");
    setMode(c.mode || "Classroom & Live Online");
    setPrice(String(c.price || "24999"));
    setPopular(!!c.popular);
    setActive(c.active !== false);
    setHighlightsInput(Array.isArray(c.highlights) ? c.highlights.join(", ") : "");
    
    if (Array.isArray(c.syllabus) && c.syllabus.length > 0) {
      setModules(c.syllabus.map((m: any) => ({
        title: m.title || "",
        topics: Array.isArray(m.topics) ? m.topics.join(", ") : (m.topics || "")
      })));
    } else {
      setModules([{ title: "Module 1: Introduction", topics: "Fundamentals" }]);
    }
    setIsModalOpen(true);
  };

  const handleAddModule = () => {
    setModules([...modules, { title: `Module ${modules.length + 1}: `, topics: "" }]);
  };

  const handleRemoveModule = (index: number) => {
    setModules(modules.filter((_, i) => i !== index));
  };

  const handleModuleChange = (index: number, field: "title" | "topics", val: string) => {
    const next = [...modules];
    next[index][field] = val;
    setModules(next);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category || !duration) {
      alert("Title, category, and duration are required.");
      return;
    }

    setFormLoading(true);
    const parsedHighlights = highlightsInput
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);

    const parsedSyllabus = modules.map(m => ({
      title: m.title.trim(),
      topics: m.topics.split(",").map(t => t.trim()).filter(Boolean)
    }));

    const payload = {
      title,
      category,
      badge,
      duration,
      mode,
      price: Number(price) || 24999,
      popular,
      active,
      highlights: parsedHighlights,
      syllabus: parsedSyllabus
    };

    try {
      if (editingCourse) {
        await updateCourse(editingCourse._id || editingCourse.id, payload);
      } else {
        await createCourse(payload);
      }
      setIsModalOpen(false);
      fetchCourses();
    } catch (err: any) {
      alert("Error saving course: " + err.message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleToggleActive = async (course: any) => {
    try {
      await updateCourse(course._id || course.id, { active: !course.active });
      fetchCourses();
    } catch (err: any) {
      alert("Failed to toggle status: " + err.message);
    }
  };

  const handleTogglePopular = async (course: any) => {
    try {
      await updateCourse(course._id || course.id, { popular: !course.popular });
      fetchCourses();
    } catch (err: any) {
      alert("Failed to toggle popular: " + err.message);
    }
  };

  const handleDelete = async (id: string, courseTitle: string) => {
    if (!window.confirm(`Are you sure you want to delete course "${courseTitle}"?`)) return;
    try {
      await deleteCourse(id);
      fetchCourses();
    } catch (err: any) {
      alert("Failed to delete course: " + err.message);
    }
  };

  // Filter courses
  const filteredCourses = courses.filter(c => {
    if (categoryFilter !== "all" && c.category !== categoryFilter) return false;
    if (search) {
      const s = search.toLowerCase();
      return (
        c.title?.toLowerCase().includes(s) ||
        c.category?.toLowerCase().includes(s) ||
        c.badge?.toLowerCase().includes(s)
      );
    }
    return true;
  });

  const categories = ["all", "Cloud & DevOps", "Software Development", "Data Science & AI", "Software Testing", "Digital Marketing", "Cyber Security"];

  return (
    <AdminLayout
      title="Courses & Curriculum Management"
      subtitle="Full control over course catalog, syllabus modules, pricing, badges and active states"
    >
      {/* Controls & Add Button */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-1 items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search courses..."
                className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-white text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={openAddModal}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-600/30 transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Course</span>
          </button>
        </div>
      </div>

      {/* Main Courses Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-400" />
            <h3 className="font-bold text-white text-sm">
              Catalog Courses ({filteredCourses.length})
            </h3>
          </div>
          <span className="text-xs text-slate-400">Live published curriculum</span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-400 text-sm">Loading courses...</div>
        ) : filteredCourses.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-sm">No courses found matching filters.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/60 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                <tr>
                  <th className="px-5 py-3.5">Course Title & Category</th>
                  <th className="px-5 py-3.5">Duration & Mode</th>
                  <th className="px-5 py-3.5">Fee (INR)</th>
                  <th className="px-5 py-3.5">Rating & Reviews</th>
                  <th className="px-5 py-3.5">Badge / Flags</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredCourses.map(course => (
                  <tr key={course._id || course.id} className="hover:bg-slate-800/40 transition">
                    <td className="px-5 py-4">
                      <div className="font-bold text-white max-w-[280px]">{course.title}</div>
                      <div className="text-[11px] text-blue-400 font-medium mt-0.5">{course.category}</div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="text-slate-200 font-medium">{course.duration}</div>
                      <div className="text-[11px] text-slate-400">{course.mode}</div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="font-mono font-bold text-emerald-400">
                        ₹{Number(course.price || 0).toLocaleString("en-IN")}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1 text-amber-400 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{course.rating || 4.8}</span>
                        <span className="text-slate-500 font-normal">({course.reviewsCount || 100})</span>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-1">
                        {course.badge && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                            {course.badge}
                          </span>
                        )}
                        {course.popular && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            Trending
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <button
                        onClick={() => handleToggleActive(course)}
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full cursor-pointer transition ${
                          course.active
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : "bg-slate-800 text-slate-500 border border-slate-700"
                        }`}
                        title="Click to toggle publish status"
                      >
                        {course.active ? "Published" : "Draft / Inactive"}
                      </button>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleTogglePopular(course)}
                          className={`p-1.5 rounded-lg transition cursor-pointer ${
                            course.popular
                              ? "bg-amber-500/20 text-amber-400"
                              : "bg-slate-800 text-slate-500 hover:text-amber-400"
                          }`}
                          title={course.popular ? "Marked as Popular" : "Make Popular"}
                        >
                          <Sparkles className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openEditModal(course)}
                          className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition cursor-pointer"
                          title="Edit Course"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(course._id || course.id, course.title)}
                          className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition cursor-pointer"
                          title="Delete Course"
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

      {/* Add / Edit Course Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl my-8 overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {editingCourse ? "Edit Course Curriculum" : "Create New Course"}
                  </h3>
                  <p className="text-xs text-slate-400">Configure public title, fees, syllabus modules, and flags</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Course Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="e.g. AWS Cloud & DevOps Masterclass"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Domain Category *
                  </label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500"
                  >
                    <option value="Cloud & DevOps">Cloud & DevOps</option>
                    <option value="Software Development">Software Development</option>
                    <option value="Data Science & AI">Data Science & AI</option>
                    <option value="Software Testing">Software Testing</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Cyber Security">Cyber Security</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Course Badge
                  </label>
                  <input
                    type="text"
                    value={badge}
                    onChange={e => setBadge(e.target.value)}
                    placeholder="e.g. Trending #1, Top Placement"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Duration *
                  </label>
                  <input
                    type="text"
                    required
                    value={duration}
                    onChange={e => setDuration(e.target.value)}
                    placeholder="e.g. 3.5 Months"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Fee Amount (INR)
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    placeholder="e.g. 29999"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Key Highlights (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={highlightsInput}
                    onChange={e => setHighlightsInput(e.target.value)}
                    placeholder="100% Placement Support, 15+ Live Labs, AWS Certified Trainer"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Dynamic Syllabus Modules Editor */}
              <div className="pt-3 border-t border-slate-800">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-blue-400" />
                      <span>Syllabus Modules</span>
                    </h4>
                    <p className="text-[11px] text-slate-400">Define curriculum modules and topic keywords</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddModule}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-400 hover:text-blue-300 bg-blue-500/10 px-2.5 py-1 rounded-lg"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Module</span>
                  </button>
                </div>

                <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                  {modules.map((m, idx) => (
                    <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 relative space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          value={m.title}
                          onChange={e => handleModuleChange(idx, "title", e.target.value)}
                          placeholder="Module Title (e.g. Module 1: Linux & Shell)"
                          className="flex-1 px-2.5 py-1.5 bg-slate-900 border border-slate-700/80 rounded-lg text-white text-xs"
                        />
                        {modules.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveModule(idx)}
                            className="text-red-400 hover:text-red-300 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        value={m.topics}
                        onChange={e => handleModuleChange(idx, "topics", e.target.value)}
                        placeholder="Topics (comma-separated: Bash, Users, Permissions)"
                        className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700/80 rounded-lg text-slate-300 text-xs"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6 pt-2 border-t border-slate-800 text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-slate-200">
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={e => setActive(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600"
                  />
                  <span>Published on Public Website</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-slate-200">
                  <input
                    type="checkbox"
                    checked={popular}
                    onChange={e => setPopular(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600"
                  />
                  <span>Highlight as Trending</span>
                </label>
              </div>

              {/* Buttons */}
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
                  disabled={formLoading}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-600/30"
                >
                  {formLoading ? "Saving..." : editingCourse ? "Save Course" : "Create Course"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
