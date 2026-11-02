import React, { createContext, useContext, useState, useEffect } from "react";
import { adminLogin as apiLogin, getAdminProfile, updateAdminProfile as apiUpdateProfile } from "../../services/api";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "superadmin" | "admin" | "editor";
  avatar?: string;
  phone?: string;
  lastLogin?: string;
}

interface AdminAuthContextType {
  user: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  updateProfile: (data: any) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("micron_admin_token"));
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize and verify stored token
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem("micron_admin_token");
      if (!storedToken) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await getAdminProfile();
        if (res.success && res.user) {
          setUser(res.user);
        } else {
          localStorage.removeItem("micron_admin_token");
          setToken(null);
          setUser(null);
        }
      } catch (err) {
        console.warn("[AdminAuth] Session verification error:", err);
        // If backend is momentarily unreachable, try to decode token payload or keep session
        const storedUser = localStorage.getItem("micron_admin_user");
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
          } catch {
            localStorage.removeItem("micron_admin_token");
            setToken(null);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    setIsLoading(true);
    try {
      const res = await apiLogin(credentials);
      if (res.success && res.token && res.user) {
        localStorage.setItem("micron_admin_token", res.token);
        localStorage.setItem("micron_admin_user", JSON.stringify(res.user));
        setToken(res.token);
        setUser(res.user);
      } else {
        throw new Error(res.message || "Invalid credentials");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("micron_admin_token");
    localStorage.removeItem("micron_admin_user");
    setToken(null);
    setUser(null);
  };

  const updateProfile = async (data: any) => {
    const res = await apiUpdateProfile(data);
    if (res.success && res.user) {
      setUser(prev => ({ ...prev, ...res.user }));
      localStorage.setItem("micron_admin_user", JSON.stringify({ ...user, ...res.user }));
    }
  };

  const refreshProfile = async () => {
    try {
      const res = await getAdminProfile();
      if (res.success && res.user) {
        setUser(res.user);
        localStorage.setItem("micron_admin_user", JSON.stringify(res.user));
      }
    } catch (err) {
      console.warn("Could not refresh profile", err);
    }
  };

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        logout,
        updateProfile,
        refreshProfile
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = (): AdminAuthContextType => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
};
