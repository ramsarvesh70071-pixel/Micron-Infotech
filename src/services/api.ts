// API client for Micron InfoTech full-stack application

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
  total?: number;
  ticketNumber?: string;
  token?: string;
  user?: any;
  errors?: any[];
  status?: string;
  database?: {
    isMemoryFallback?: boolean;
    status?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

// Helper to get auth header
const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem("micron_admin_token");
  const headers: Record<string, string> = {
    "Content-Type": "application/json"
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

// Generic request helper with timeout and fallback handling
async function request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    ...getAuthHeaders(),
    ...(options.headers || {})
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000);

  try {
    const res = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.message || `Request failed with status ${res.status}`);
      }
      return json;
    }

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    return { success: true } as ApiResponse<T>;
  } catch (error: any) {
    clearTimeout(timeoutId);
    console.warn(`[API] Request to ${endpoint} failed:`, error.message);
    throw error;
  }
}

// ---------------- PUBLIC API METHODS ----------------

// Enquiries (Student Leads, Contact, Corporate Training)
export const submitEnquiry = async (data: {
  name: string;
  email: string;
  phone: string;
  course?: string;
  mode?: string;
  branch?: string;
  comments?: string;
  type?: "enrollment" | "general" | "corporate";
  companyName?: string;
  teamSize?: string;
}): Promise<ApiResponse> => {
  return request("/enquiries", {
    method: "POST",
    body: JSON.stringify(data)
  });
};

// Trainer / Franchise Applications
export const submitApplication = async (data: {
  type: "trainer" | "franchise";
  name: string;
  email: string;
  phone: string;
  technology?: string;
  experience?: string;
  currentCompany?: string;
  mode?: string;
  linkedin?: string;
  message?: string;
  city?: string;
  state?: string;
  capital?: string;
  space?: string;
  background?: string;
}): Promise<ApiResponse> => {
  return request("/applications", {
    method: "POST",
    body: JSON.stringify(data)
  });
};

// Employer Job Posting
export const submitJobPosting = async (data: {
  companyName: string;
  recruiterName: string;
  officialEmail: string;
  phone: string;
  jobTitle: string;
  openings?: string;
  experience?: string;
  ctcRange?: string;
  skills: string;
  location?: string;
  description?: string;
}): Promise<ApiResponse> => {
  return request("/jobs", {
    method: "POST",
    body: JSON.stringify(data)
  });
};

// Student Support Ticket
export const submitSupportTicket = async (data: {
  name: string;
  email: string;
  phone?: string;
  studentId?: string;
  category?: string;
  priority?: "Low" | "Normal" | "High" | "Urgent";
  description: string;
}): Promise<ApiResponse> => {
  return request("/support", {
    method: "POST",
    body: JSON.stringify(data)
  });
};

// Track Support Ticket
export const trackSupportTicket = async (ticketNumber: string): Promise<ApiResponse> => {
  return request(`/support/track/${ticketNumber}`);
};

// Fetch Courses
export const getCourses = async (params: { category?: string; search?: string; popular?: boolean } = {}): Promise<ApiResponse> => {
  const query = new URLSearchParams();
  if (params.category) query.append("category", params.category);
  if (params.search) query.append("search", params.search);
  if (params.popular) query.append("popular", "true");
  const qs = query.toString() ? `?${query.toString()}` : "";
  return request(`/courses${qs}`);
};

// Fetch Single Course
export const getCourseBySlug = async (slug: string): Promise<ApiResponse> => {
  return request(`/courses/${slug}`);
};

// Fetch Approved Reviews
export const getReviews = async (params: { course?: string; featured?: boolean } = {}): Promise<ApiResponse> => {
  const query = new URLSearchParams();
  if (params.course) query.append("course", params.course);
  if (params.featured) query.append("featured", "true");
  const qs = query.toString() ? `?${query.toString()}` : "";
  return request(`/reviews${qs}`);
};

// Submit Student Testimonial
export const submitReview = async (data: {
  name: string;
  role: string;
  company: string;
  rating: number;
  reviewText: string;
  course: string;
  avatar?: string;
  hike?: string;
  packageLpa?: string;
}): Promise<ApiResponse> => {
  return request("/reviews", {
    method: "POST",
    body: JSON.stringify(data)
  });
};

// Fetch Branches
export const getBranches = async (): Promise<ApiResponse> => {
  return request("/branches");
};

// Fetch Published Blogs
export const getBlogs = async (): Promise<ApiResponse> => {
  return request("/blogs");
};

// Fetch Single Blog Post
export const getBlogBySlug = async (slug: string): Promise<ApiResponse> => {
  return request(`/blogs/${slug}`);
};

// Health Check
export const checkApiHealth = async (): Promise<ApiResponse> => {
  return request("/health");
};

// ---------------- ADMIN API METHODS ----------------

// Admin Auth Login
export const adminLogin = async (credentials: { email: string; password: string }): Promise<ApiResponse> => {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials)
  });
};

// Admin Auth Profile
export const getAdminProfile = async (): Promise<ApiResponse> => {
  return request("/auth/me");
};

// Admin Update Profile
export const updateAdminProfile = async (data: {
  name?: string;
  phone?: string;
  avatar?: string;
  currentPassword?: string;
  newPassword?: string;
}): Promise<ApiResponse> => {
  return request("/auth/profile", {
    method: "PUT",
    body: JSON.stringify(data)
  });
};

// Admin Dashboard Live Stats
export const getDashboardStats = async (): Promise<ApiResponse> => {
  return request("/dashboard/stats");
};

// Admin Enquiries CRUD
export const getAdminEnquiries = async (params: {
  type?: string;
  status?: string;
  course?: string;
  search?: string;
  page?: number;
  limit?: number;
} = {}): Promise<ApiResponse> => {
  const query = new URLSearchParams();
  if (params.type) query.append("type", params.type);
  if (params.status) query.append("status", params.status);
  if (params.course) query.append("course", params.course);
  if (params.search) query.append("search", params.search);
  if (params.page) query.append("page", String(params.page));
  if (params.limit) query.append("limit", String(params.limit));
  const qs = query.toString() ? `?${query.toString()}` : "";
  return request(`/enquiries${qs}`);
};

export const updateEnquiryStatus = async (id: string, data: { status?: string; notes?: string; assignedTo?: string }): Promise<ApiResponse> => {
  return request(`/enquiries/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data)
  });
};

export const deleteEnquiry = async (id: string): Promise<ApiResponse> => {
  return request(`/enquiries/${id}`, {
    method: "DELETE"
  });
};

export const exportEnquiriesCsvUrl = (): string => {
  const token = localStorage.getItem("micron_admin_token");
  return `${API_BASE_URL}/enquiries/export/csv?token=${token || ""}`;
};

// Admin Courses CRUD
export const getAdminCourses = async (): Promise<ApiResponse> => {
  return request("/courses?all=true");
};

export const createCourse = async (data: any): Promise<ApiResponse> => {
  return request("/courses", {
    method: "POST",
    body: JSON.stringify(data)
  });
};

export const updateCourse = async (id: string, data: any): Promise<ApiResponse> => {
  return request(`/courses/${id}`, {
    method: "PUT",
    body: JSON.stringify(data)
  });
};

export const deleteCourse = async (id: string): Promise<ApiResponse> => {
  return request(`/courses/${id}`, {
    method: "DELETE"
  });
};

// Admin Applications CRUD
export const getAdminApplications = async (params: { type?: string; status?: string; search?: string } = {}): Promise<ApiResponse> => {
  const query = new URLSearchParams();
  if (params.type) query.append("type", params.type);
  if (params.status) query.append("status", params.status);
  if (params.search) query.append("search", params.search);
  const qs = query.toString() ? `?${query.toString()}` : "";
  return request(`/applications${qs}`);
};

export const updateApplicationStatus = async (id: string, data: { status?: string; notes?: string }): Promise<ApiResponse> => {
  return request(`/applications/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data)
  });
};

export const deleteApplication = async (id: string): Promise<ApiResponse> => {
  return request(`/applications/${id}`, {
    method: "DELETE"
  });
};

// Admin Jobs CRUD
export const getAdminJobs = async (params: { status?: string; search?: string } = {}): Promise<ApiResponse> => {
  const query = new URLSearchParams();
  if (params.status) query.append("status", params.status);
  if (params.search) query.append("search", params.search);
  const qs = query.toString() ? `?${query.toString()}` : "";
  return request(`/jobs${qs}`);
};

export const updateJobStatus = async (id: string, data: { status?: string }): Promise<ApiResponse> => {
  return request(`/jobs/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data)
  });
};

export const deleteJob = async (id: string): Promise<ApiResponse> => {
  return request(`/jobs/${id}`, {
    method: "DELETE"
  });
};

// Admin Reviews CRUD
export const getAdminReviews = async (): Promise<ApiResponse> => {
  return request("/reviews/admin");
};

export const toggleReviewApproval = async (id: string, data: { isApproved?: boolean; isFeatured?: boolean }): Promise<ApiResponse> => {
  return request(`/reviews/${id}/approve`, {
    method: "PATCH",
    body: JSON.stringify(data)
  });
};

export const deleteReview = async (id: string): Promise<ApiResponse> => {
  return request(`/reviews/${id}`, {
    method: "DELETE"
  });
};

// Admin Branches CRUD
export const createBranch = async (data: any): Promise<ApiResponse> => {
  return request("/branches", {
    method: "POST",
    body: JSON.stringify(data)
  });
};

export const updateBranch = async (id: string, data: any): Promise<ApiResponse> => {
  return request(`/branches/${id}`, {
    method: "PUT",
    body: JSON.stringify(data)
  });
};

export const deleteBranch = async (id: string): Promise<ApiResponse> => {
  return request(`/branches/${id}`, {
    method: "DELETE"
  });
};

// Admin Blogs CRUD
export const getAdminBlogs = async (): Promise<ApiResponse> => {
  return request("/blogs/admin/all");
};

export const createBlog = async (data: any): Promise<ApiResponse> => {
  return request("/blogs", {
    method: "POST",
    body: JSON.stringify(data)
  });
};

export const updateBlog = async (id: string, data: any): Promise<ApiResponse> => {
  return request(`/blogs/${id}`, {
    method: "PUT",
    body: JSON.stringify(data)
  });
};

export const deleteBlog = async (id: string): Promise<ApiResponse> => {
  return request(`/blogs/${id}`, {
    method: "DELETE"
  });
};

// Admin Support Tickets CRUD
export const getAdminSupportTickets = async (params: { status?: string; priority?: string; search?: string } = {}): Promise<ApiResponse> => {
  const query = new URLSearchParams();
  if (params.status) query.append("status", params.status);
  if (params.priority) query.append("priority", params.priority);
  if (params.search) query.append("search", params.search);
  const qs = query.toString() ? `?${query.toString()}` : "";
  return request(`/support${qs}`);
};

export const updateSupportTicket = async (id: string, data: { status?: string; responseNotes?: string }): Promise<ApiResponse> => {
  return request(`/support/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data)
  });
};

export const deleteSupportTicket = async (id: string): Promise<ApiResponse> => {
  return request(`/support/${id}`, {
    method: "DELETE"
  });
};

// Admin Users CRUD (Superadmin)
export const getAdminUsers = async (): Promise<ApiResponse> => {
  return request("/users");
};

export const createAdminUser = async (data: any): Promise<ApiResponse> => {
  return request("/users", {
    method: "POST",
    body: JSON.stringify(data)
  });
};

export const updateAdminUser = async (id: string, data: any): Promise<ApiResponse> => {
  return request(`/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(data)
  });
};

export const deleteAdminUser = async (id: string): Promise<ApiResponse> => {
  return request(`/users/${id}`, {
    method: "DELETE"
  });
};
