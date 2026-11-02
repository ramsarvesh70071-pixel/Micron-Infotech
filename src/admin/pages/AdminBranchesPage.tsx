import React, { useState, useEffect } from "react";
import { AdminLayout } from "../components/AdminLayout";
import { getBranches, createBranch, updateBranch, deleteBranch } from "../../services/api";
import {
  MapPin,
  Plus,
  Edit,
  Trash2,
  Building,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  Shield,
  X
} from "lucide-react";

export default function AdminBranchesPage() {
  const [branches, setBranches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);

  // Form
  const [name, setName] = useState("");
  const [city, setCity] = useState("Bangalore");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [googleMapsUrl, setGoogleMapsUrl] = useState("");
  const [timings, setTimings] = useState("Mon - Sat: 8:00 AM - 8:30 PM | Sunday: 9:00 AM - 6:00 PM");
  const [isHeadquarter, setIsHeadquarter] = useState(false);

  const fetchBranches = async () => {
    setLoading(true);
    try {
      const res = await getBranches();
      if (res.success && res.data) {
        setBranches(res.data);
      }
    } catch (err: any) {
      console.error("Failed to load branches:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const openAddModal = () => {
    setEditingBranch(null);
    setName("");
    setCity("Bangalore");
    setAddress("");
    setPhone("+91 98450 ");
    setEmail("center@microninfotech.com");
    setGoogleMapsUrl("");
    setTimings("Mon - Sat: 8:00 AM - 8:30 PM | Sunday: 9:00 AM - 6:00 PM");
    setIsHeadquarter(false);
    setIsModalOpen(true);
  };

  const openEditModal = (b: any) => {
    setEditingBranch(b);
    setName(b.name || "");
    setCity(b.city || "Bangalore");
    setAddress(b.address || "");
    setPhone(b.phone || "");
    setEmail(b.email || "");
    setGoogleMapsUrl(b.googleMapsUrl || "");
    setTimings(b.timings || "");
    setIsHeadquarter(!!b.isHeadquarter);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !city || !address || !phone || !email) {
      alert("Please fill all required fields.");
      return;
    }

    setSaving(true);
    const payload = {
      name,
      city,
      address,
      phone,
      email,
      googleMapsUrl,
      timings,
      isHeadquarter
    };

    try {
      if (editingBranch) {
        await updateBranch(editingBranch._id || editingBranch.id, payload);
      } else {
        await createBranch(payload);
      }
      setIsModalOpen(false);
      fetchBranches();
    } catch (err: any) {
      alert("Failed to save branch: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, branchName: string) => {
    if (!window.confirm(`Delete learning center "${branchName}"?`)) return;
    try {
      await deleteBranch(id);
      fetchBranches();
    } catch (err: any) {
      alert("Failed to delete branch: " + err.message);
    }
  };

  return (
    <AdminLayout
      title="Offline Training Centers & Branches"
      subtitle="Manage classroom training locations, branch coordinators and Google Map links"
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-base font-bold text-white">Learning Centers ({branches.length})</h3>
          <p className="text-xs text-slate-400">Classroom training campuses in Bangalore and Chennai</p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-600/30 transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Center</span>
        </button>
      </div>

      {loading ? (
        <div className="p-12 text-center text-slate-400 text-sm">Loading branches...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {branches.map(branch => (
            <div
              key={branch._id || branch.id}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-white text-base">{branch.name}</h4>
                      {branch.isHeadquarter && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          Headquarters
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-blue-400 font-semibold">{branch.city}</p>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => openEditModal(branch)}
                      className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition cursor-pointer"
                      title="Edit Center"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(branch._id || branch.id, branch.name)}
                      className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition cursor-pointer"
                      title="Delete Center"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs text-slate-300 my-4 bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{branch.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                    <span className="font-mono text-white font-medium">{branch.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                    <span className="text-slate-300">{branch.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-500 shrink-0" />
                    <span className="text-slate-400 text-[11px]">{branch.timings}</span>
                  </div>
                </div>
              </div>

              {branch.googleMapsUrl && (
                <a
                  href={branch.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 pt-2 border-t border-slate-800"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Branch Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
              <h3 className="text-base font-bold text-white">
                {editingBranch ? "Edit Learning Center" : "Add Learning Center"}
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
                <label className="block text-xs font-semibold text-slate-300 mb-1">Center Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. BTM Layout (Headquarters)"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    placeholder="e.g. Bangalore"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Contact Phone *</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="e.g. +91 98450 22323"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="e.g. btm@microninfotech.com"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Campus Address *</label>
                <textarea
                  rows={2}
                  required
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  placeholder="Building, street, landmark, pincode..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Google Maps Link</label>
                <input
                  type="url"
                  value={googleMapsUrl}
                  onChange={e => setGoogleMapsUrl(e.target.value)}
                  placeholder="https://maps.google.com/..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-2 text-xs text-slate-300">
                <input
                  type="checkbox"
                  id="hq"
                  checked={isHeadquarter}
                  onChange={e => setIsHeadquarter(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600"
                />
                <label htmlFor="hq" className="cursor-pointer">
                  Mark as Primary Corporate Headquarters
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
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-600/30"
                >
                  {saving ? "Saving..." : editingBranch ? "Save Changes" : "Create Branch"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
