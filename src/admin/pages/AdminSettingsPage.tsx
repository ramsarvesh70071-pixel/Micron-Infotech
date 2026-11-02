import React, { useState, useEffect } from "react";
import { AdminLayout } from "../components/AdminLayout";
import { checkApiHealth, updateAdminProfile } from "../../services/api";
import { useAdminAuth } from "../context/AdminAuthContext";
import {
  Settings,
  Server,
  Database,
  Shield,
  Key,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Cpu,
  Globe
} from "lucide-react";

export default function AdminSettingsPage() {
  const { user } = useAdminAuth();
  const [healthData, setHealthData] = useState<any>(null);
  const [checkingHealth, setCheckingHealth] = useState(false);

  // Password Change
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwdLoading, setPwdLoading] = useState(false);
  const [pwdMsg, setPwdMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchHealth = async () => {
    setCheckingHealth(true);
    try {
      const res = await checkApiHealth();
      setHealthData(res);
    } catch (err: any) {
      setHealthData({ status: "UNREACHABLE", error: err.message });
    } finally {
      setCheckingHealth(false);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPwdMsg({ type: "error", text: "New passwords do not match." });
      return;
    }
    if (newPassword.length < 6) {
      setPwdMsg({ type: "error", text: "Password must be at least 6 characters long." });
      return;
    }

    setPwdLoading(true);
    setPwdMsg(null);

    try {
      await updateAdminProfile({
        currentPassword,
        newPassword
      });
      setPwdMsg({ type: "success", text: "Password changed successfully!" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setPwdMsg({ type: "error", text: err.message || "Failed to update password." });
    } finally {
      setPwdLoading(false);
    }
  };

  return (
    <AdminLayout
      title="System Architecture & Settings"
      subtitle="Inspect live database connections, verify server health pings and manage personal account security"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: System & Database Health */}
        <div className="lg:col-span-7 space-y-6">
          {/* Health Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Backend Health & Engine Status</h3>
                  <p className="text-xs text-slate-400">Live heartbeat monitoring</p>
                </div>
              </div>

              <button
                onClick={fetchHealth}
                disabled={checkingHealth}
                className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
                title="Ping API Server"
              >
                <RefreshCw className={`w-4 h-4 ${checkingHealth ? "animate-spin text-blue-400" : ""}`} />
              </button>
            </div>

            <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-400">API Status:</span>
                <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{healthData?.status || "HEALTHY"}</span>
                </span>
              </div>

              <div className="flex justify-between items-center py-1 border-t border-slate-800/80">
                <span className="text-slate-400">Active Database Mode:</span>
                <span className="font-bold text-white">
                  {healthData?.database?.isMemoryFallback ? (
                    <span className="text-amber-400">In-Memory Zero-Config Engine (Active)</span>
                  ) : (
                    <span className="text-emerald-400">MongoDB Mongoose (Connected)</span>
                  )}
                </span>
              </div>

              <div className="flex justify-between items-center py-1 border-t border-slate-800/80">
                <span className="text-slate-400">Database Host / Storage:</span>
                <span className="font-mono text-slate-300">
                  {healthData?.database?.host || "localhost / internal"}
                </span>
              </div>

              <div className="flex justify-between items-center py-1 border-t border-slate-800/80">
                <span className="text-slate-400">Database Name:</span>
                <span className="font-mono text-slate-300">
                  {healthData?.database?.name || "micron_infotech"}
                </span>
              </div>

              <div className="flex justify-between items-center py-1 border-t border-slate-800/80">
                <span className="text-slate-400">Server Uptime:</span>
                <span className="font-mono text-blue-400">
                  {healthData?.uptime ? `${Math.floor(healthData.uptime)} seconds` : "Active"}
                </span>
              </div>
            </div>

            <div className="mt-4 p-3.5 bg-blue-500/10 border border-blue-500/20 rounded-xl text-xs text-blue-300 leading-relaxed">
              <strong>Enterprise Zero-Config Guarantee:</strong> If an external MongoDB instance is running, the backend automatically connects to MongoDB. If no MongoDB service is running, it seamlessly runs on the built-in resilient in-memory database engine so all CRUD operations, searches, filters, tests, and admin functions execute with 100% fidelity without crashing.
            </div>
          </div>

          {/* Architecture Details Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-base font-bold text-white mb-3">Enterprise Stack & Security Controls</h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-slate-400 font-medium">Authentication</div>
                <div className="font-bold text-white mt-1">JWT + bcrypt (10 rounds)</div>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-slate-400 font-medium">Headers Security</div>
                <div className="font-bold text-white mt-1">Helmet Protection</div>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-slate-400 font-medium">Rate Limiting</div>
                <div className="font-bold text-white mt-1">1000 req / 15m (50 auth)</div>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-slate-400 font-medium">Data Validation</div>
                <div className="font-bold text-white mt-1">express-validator</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Account Security & Password Update */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Update Security Credentials</h3>
                <p className="text-xs text-slate-400">Change password for {user?.email}</p>
              </div>
            </div>

            {pwdMsg && (
              <div
                className={`p-3.5 mb-4 rounded-xl text-xs flex items-center gap-2 ${
                  pwdMsg.type === "success"
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "bg-red-500/10 text-red-400 border border-red-500/20"
                }`}
              >
                {pwdMsg.type === "success" ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertTriangle className="w-4 h-4 shrink-0" />}
                <span>{pwdMsg.text}</span>
              </div>
            )}

            <form onSubmit={handlePasswordChange} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Current Password *</label>
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">New Password *</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Confirm New Password *</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={pwdLoading}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 transition cursor-pointer mt-2"
              >
                {pwdLoading ? "Updating Password..." : "Update Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
