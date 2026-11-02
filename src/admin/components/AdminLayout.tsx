import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";
import { checkApiHealth } from "../../services/api";
import {
  LayoutDashboard,
  Inbox,
  BookOpen,
  UserCheck,
  Briefcase,
  Star,
  MapPin,
  FileText,
  LifeBuoy,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ShieldCheck,
  Activity,
  ChevronRight,
  Sparkles
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title, subtitle }) => {
  const { user, logout } = useAdminAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [serverOnline, setServerOnline] = useState<boolean | null>(null);
  const [dbMode, setDbMode] = useState<string>("Checking...");

  // Health check on mount and every 30s
  useEffect(() => {
    let mounted = true;
    const ping = async () => {
      try {
        const res = await checkApiHealth();
        if (mounted && res.status === "UP") {
          setServerOnline(true);
          const isMemory = res.database?.isMemoryFallback;
          setDbMode(isMemory ? "In-Memory Engine" : "MongoDB (Live)");
        } else if (mounted) {
          setServerOnline(false);
          setDbMode("Offline");
        }
      } catch {
        if (mounted) {
          setServerOnline(false);
          setDbMode("Offline");
        }
      }
    };

    ping();
    const interval = setInterval(ping, 30000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const navItems = [
    { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Leads & Inquiries", path: "/admin/enquiries", icon: Inbox },
    { label: "Courses Catalog", path: "/admin/courses", icon: BookOpen },
    { label: "Applications", path: "/admin/applications", icon: UserCheck },
    { label: "Employer Jobs", path: "/admin/jobs", icon: Briefcase },
    { label: "Student Reviews", path: "/admin/reviews", icon: Star },
    { label: "Center Branches", path: "/admin/branches", icon: MapPin },
    { label: "Blog & Articles", path: "/admin/blogs", icon: FileText },
    { label: "Support Helpdesk", path: "/admin/support", icon: LifeBuoy },
    ...(user?.role === "superadmin"
      ? [{ label: "Admin Users", path: "/admin/users", icon: Users }]
      : []),
    { label: "System Settings", path: "/admin/settings", icon: Settings }
  ];

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans selection:bg-blue-600 selection:text-white">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-slate-900 border-r border-slate-800 shrink-0">
        {/* Brand */}
        <div className="h-18 flex items-center gap-3 px-6 border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white font-black text-xl">
            M
          </div>
          <div>
            <div className="font-black text-base tracking-tight text-white flex items-center gap-1.5">
              <span>Micron InfoTech</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                ADMIN
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Enterprise Control Hub</p>
          </div>
        </div>

        {/* Live Server Indicator */}
        <div className="px-5 py-3 bg-slate-950/60 border-b border-slate-800/80 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                serverOnline === true
                  ? "bg-emerald-400 animate-pulse"
                  : serverOnline === false
                  ? "bg-amber-400"
                  : "bg-slate-500"
              }`}
            />
            <span className="text-slate-300 font-medium">Backend:</span>
          </div>
          <span
            className={`font-mono text-[11px] font-semibold px-2 py-0.5 rounded ${
              serverOnline ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-300"
            }`}
          >
            {dbMode}
          </span>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || (item.path === "/admin/dashboard" && location.pathname === "/admin");

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all group ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/70"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4.5 h-4.5 transition-colors ${isActive ? "text-white" : "text-slate-400 group-hover:text-blue-400"}`} />
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-4 h-4 text-blue-200" />}
              </Link>
            );
          })}
        </nav>

        {/* User Card */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-blue-400">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-full" />
              ) : (
                user?.name?.charAt(0) || "A"
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">{user?.name || "Administrator"}</p>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {user?.role || "admin"}
                </span>
                <span className="text-[11px] text-slate-400 truncate">{user?.email}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white transition"
              title="Open Public Website"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Public Site</span>
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-red-400 bg-red-500/10 hover:bg-red-500/20 transition cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Header & Drawer */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-slate-900 border-b border-slate-800 px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg bg-slate-800 text-slate-200 hover:text-white"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <span className="font-black text-white text-base">Micron Admin</span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs flex items-center gap-1"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
          <button
            onClick={handleLogout}
            className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-xs"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="w-72 max-w-[85%] h-full bg-slate-900 border-r border-slate-800 p-4 pt-20 flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <nav className="space-y-1 flex-1 overflow-y-auto">
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-slate-400 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    <Icon className="w-4.5 h-4.5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-slate-800 text-xs text-slate-400">
              <p className="font-bold text-white">{user?.name}</p>
              <p className="text-[11px] text-slate-400">{user?.email}</p>
              <button
                onClick={handleLogout}
                className="mt-3 w-full py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg font-semibold"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pt-16 lg:pt-0 overflow-y-auto">
        {/* Top Header Bar Desktop */}
        <header className="hidden lg:flex items-center justify-between h-18 px-8 border-b border-slate-800/80 bg-slate-900/40 backdrop-blur-md sticky top-0 z-20">
          <div>
            <h1 className="text-xl font-black text-white tracking-tight">
              {title || "Dashboard Overview"}
            </h1>
            {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300 font-medium">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>Role: <strong className="text-white capitalize">{user?.role || "Admin"}</strong></span>
            </div>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition shadow-sm"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Website</span>
            </a>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
