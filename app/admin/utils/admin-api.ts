/**
 * ADMIN API CLIENT
 * 
 * Centraliza todas las llamadas a API para el panel de administración
 */

import { apiClient } from '@/lib/api/api-client';

// ==========================================
// INTERFACES TYPESCRIPT - Evitar `any`
// ==========================================

// News
export interface NewsItem {
  _id: string;
  id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  category: string;
  tags: string[];
  published: boolean;
  status: 'active' | 'inactive';
  published_date: string;
  image_url?: string;
  thumbnail_url?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  total: number;
  per_page: number;
  total_pages?: number;
}

// Press
export interface PressItem {
  _id: string;
  id?: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string;
  link?: string;
  file_url?: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

// Gallery
export interface GalleryItem {
  _id: string;
  filename: string;
  path: string;
  thumbnail?: string;
  width?: number;
  height?: number;
  size_bytes?: number;
  format?: string;
  upload_date?: string;
}

// Services
export interface ServiceItem {
  _id: string;
  id?: string;
  icon: string;
  image: string;
  name: string;
  slug: string;
  description: string;
  longDescription?: string;
  features?: string[];
  cta?: { text?: string; url?: string };
  active: boolean;
  order: number;
  category?: string;
  createdAt: string;
  updatedAt: string;
}

// Jobs
export interface JobItem {
  _id: string;
  id?: string;
  title: string;
  slug: string;
  description: string;
  requirements: string;
  location: string;
  employment_type: string;
  salary_range?: { min?: number; max?: number };
  salary?: string; // Campo adicional para compatibilidad con UI
  // UI-friendly optional fields
  image_url?: string;
  company?: string;
  department?: string;
  modality?: string;
  type?: string;
  skills: string[];
  posted_date: string;
  closing_date?: string;
  is_active: boolean;
  views: number;
  applications_count: number;
  createdAt: string;
  updatedAt: string;
}

// Internships
export interface InternshipItem {
  _id: string;
  id?: string;
  title: string;
  slug: string;
  description: string;
  requirements: string;
  location: string;
  modality: string;
  department: string;
  duration_months: number;
  is_paid: boolean;
  stipend?: number;
  skills: string[];
  start_date?: string;
  posted_date: string;
  closing_date?: string;
  is_active: boolean;
  views: number;
  applications_count: number;
  createdAt: string;
  updatedAt: string;
}

// Users
export interface UserItem {
  _id: string;
  id?: string;
  email: string;
  name: string;
  role: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

// Branches
export interface BranchItem {
  _id: string;
  id?: string;
  name: string;
  address: string;
  phone?: string;
  email?: string;
  coordinates?: { lat: number; lng: number };
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

// Team
export interface TeamItem {
  _id: string;
  id?: string;
  name: string;
  position: string;
  department?: string;
  bio?: string;
  image_url?: string;
  order: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

// Tipos auxiliares
type ApiResponse<T = unknown> = Promise<T>;
type DataParam = Record<string, unknown> | FormData;

function getErrorMessage(err: unknown): string | undefined {
  if (err instanceof Error) return err.message;
  if (typeof err === 'string') return err;
  try {
    return JSON.stringify(err as object);
  } catch {
    return String(err);
  }
}

class AdminApiClient {
  // DASHBOARD
  async getDashboardStats() {
    try {
      const [news, gallery, press] = await Promise.all([
        this.getNews(),
        this.getGallery(),
        this.getPress(),
      ]);
      return {
        news: Array.isArray(news) ? news.length : 0,
        gallery: Array.isArray(gallery) ? gallery.length : 0,
        press: Array.isArray(press) ? press.length : 0,
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  }

  // NEWS - Using admin endpoints (no cache, with auth)
  async getNews(limit?: number): ApiResponse {
    const q = limit ? `?limit=${encodeURIComponent(String(limit))}` : '';
    return apiClient.get(`/api/admin/news${q}`);
  }

  async createNews(data: DataParam): ApiResponse {
    return apiClient.post('/api/admin/news', data);
  }

  async updateNews(id: string, data: DataParam): ApiResponse {
    return apiClient.put(`/api/admin/news/${id}`, data);
  }

  async deleteNews(id: string): ApiResponse {
    return apiClient.delete(`/api/admin/news/${id}`);
  }

  async toggleNewsStatus(id: string, status: string): ApiResponse {
    return apiClient.patch(`/api/admin/news/${id}/toggle-status`, { status });
  }

  // PRESS - Using admin endpoints (no cache, with auth)
  async getPress(limit?: number): ApiResponse {
    const q = limit ? `?limit=${encodeURIComponent(String(limit))}` : '';
    return apiClient.get(`/api/admin/press${q}`);
  }

  async createPress(data: DataParam): ApiResponse {
    return apiClient.post('/api/admin/press', data);
  }

  async updatePress(id: string, data: DataParam): ApiResponse {
    return apiClient.put(`/api/admin/press/${id}`, data);
  }

  async deletePress(id: string): ApiResponse {
    return apiClient.delete(`/api/admin/press/${id}`);
  }

  async togglePressStatus(id: string, status: string): ApiResponse {
    return apiClient.patch(`/api/admin/press/${id}/toggle-status`, { status });
  }

  // GALLERY - Using admin endpoints (no cache, with auth)
  async getGallery(): Promise<PaginatedResponse<GalleryItem>> {
    return apiClient.get('/api/admin/gallery');
  }

  async createGallery(data: DataParam): ApiResponse {
    return apiClient.post('/api/admin/gallery', data);
  }

  async updateGallery(id: string, data: DataParam): ApiResponse {
    return apiClient.put(`/api/admin/gallery/${id}`, data);
  }

  async deleteGallery(id: string): ApiResponse {
    return apiClient.delete(`/api/admin/gallery/${id}`);
  }

  // SERVICES - Using admin endpoints (no cache, with auth)
  async getServices(): ApiResponse {
    return apiClient.get('/api/admin/services');
  }

  async createService(data: DataParam): ApiResponse {
    return apiClient.post('/api/admin/services', data);
  }

  async updateService(id: string, data: DataParam): ApiResponse {
    return apiClient.put(`/api/admin/services/${id}`, data);
  }

  async deleteService(id: string): ApiResponse {
    return apiClient.delete(`/api/admin/services/${id}`);
  }

  async toggleServiceActive(id: string, active: boolean): ApiResponse {
    return apiClient.patch(`/api/admin/services/${id}/toggle-active`, { active });
  }

  // COOKIES
  async getCookieConsents(options?: { limit?: number }): ApiResponse {
    const params = new URLSearchParams();
    if (options?.limit) {
      params.append('limit', String(options.limit));
    }
    const query = params.toString();
    // Backend exposes the list at /api/cookies/list
    return apiClient.get(`/api/cookies/list${query ? `?${query}` : ''}`);
  }

  async getCookieStats(): ApiResponse {
    return apiClient.get('/api/cookies/stats');
  }

  async updateCookieConsent(id: string, data: DataParam): ApiResponse {
    return apiClient.put(`/api/admin/cookies/${id}`, data);
  }

  // USERS
  async getUsers(): ApiResponse {
    return apiClient.get('/api/admin/users');
  }

  async createUser(data: DataParam): ApiResponse {
    return apiClient.post('/api/admin/users', data);
  }

  async updateUser(id: string, data: DataParam): ApiResponse {
    return apiClient.put(`/api/admin/users/${id}`, data);
  }

  async deleteUser(id: string): ApiResponse {
    return apiClient.delete(`/api/admin/users/${id}`);
  }

  // AUDIT LOG
  async getAuditLog(limit?: number): ApiResponse {
    const q = limit ? `?limit=${encodeURIComponent(String(limit))}` : '';
    return apiClient.get(`/api/admin/audit-log${q}`);
  }

  // LOGO
  async getLogo(): ApiResponse {
    return apiClient.get('/api/logo');
  }

  async updateLogo(data: DataParam): ApiResponse {
    return apiClient.put('/api/logo', data);
  }

  async getLogoHistory(): ApiResponse {
    return apiClient.get('/api/logo/history');
  }

  async getCurrentLogo() {
    return apiClient.get('/api/logo');
  }

  async getBrandingStats() {
    // This endpoint doesn't exist, return mock data for now
    console.warn('getBrandingStats: Endpoint not implemented yet, returning mock data');
    return {
      success: true,
      data: {
        totalLogos: 0,
        activeLogo: null,
        storageUsed: 0,
        lastUpload: null
      }
    };
  }

  async uploadMultipleLogos(files: File[], _options?: Record<string, unknown>): ApiResponse {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    return apiClient.post('/api/logo/upload-multiple', formData, {
      headers: {
        // No establecer Content-Type para que el navegador lo maneje automáticamente con FormData
      },
    });
  }

  async setActiveLogo(filename: string): ApiResponse {
    return apiClient.put('/api/logo', { filename });
  }

  async updateLogoMeta(data: { filename: string; alt: string }): ApiResponse {
    return apiClient.put('/api/logo/meta', data);
  }

  async optimizeAllLogos(): ApiResponse {
    return apiClient.post('/api/logo/optimize-all');
  }

  // SYSTEM STATUS
  async getSystemStatus(): ApiResponse {
    return apiClient.get('/api/admin/system/status');
  }

  async getSystemHealth(): ApiResponse {
    return apiClient.get('/api/admin/system/health');
  }

  // ESSENCE
  async getEssence(): ApiResponse {
    return apiClient.get('/api/admin/essence');
  }

  async updateEssence(data: DataParam): ApiResponse {
    return apiClient.put('/api/admin/essence', data);
  }

  async getEssenceHistory(): ApiResponse {
    return apiClient.get('/api/admin/essence/history');
  }

  // JOBS - Using admin endpoints (no cache, with auth)
  async getJobs(): Promise<PaginatedResponse<JobItem>> {
    return apiClient.get('/api/admin/jobs');
  }

  async createJob(data: DataParam): ApiResponse {
    return apiClient.post('/api/admin/jobs', data);
  }

  async updateJob(id: string, data: DataParam): ApiResponse {
    return apiClient.put(`/api/admin/jobs/${id}`, data);
  }

  async deleteJob(id: string): ApiResponse {
    return apiClient.delete(`/api/admin/jobs/${id}`);
  }

  async toggleJobActive(id: string, is_active: boolean): ApiResponse {
    return apiClient.patch(`/api/admin/jobs/${id}/toggle-active`, { is_active });
  }

  // INTERNSHIPS - Using admin endpoints (no cache, with auth)
  async getInternships(): Promise<PaginatedResponse<InternshipItem>> {
    return apiClient.get('/api/admin/internships');
  }

  async createInternship(data: DataParam): ApiResponse {
    return apiClient.post('/api/admin/internships', data);
  }

  async updateInternship(id: string, data: DataParam): ApiResponse {
    return apiClient.put(`/api/admin/internships/${id}`, data);
  }

  async deleteInternship(id: string): ApiResponse {
    return apiClient.delete(`/api/admin/internships/${id}`);
  }

  async toggleInternshipActive(id: string, is_active: boolean): ApiResponse {
    return apiClient.patch(`/api/admin/internships/${id}/toggle-active`, { is_active });
  }

  // BRANCHES
  async getBranches(): ApiResponse {
    return apiClient.get('/api/admin/branches');
  }

  async createBranch(data: DataParam): ApiResponse {
    return apiClient.post('/api/admin/branches', data);
  }

  async updateBranch(id: string, data: DataParam): ApiResponse {
    return apiClient.put(`/api/admin/branches/${id}`, data);
  }

  async deleteBranch(id: string): ApiResponse {
    return apiClient.delete(`/api/admin/branches/${id}`);
  }

  // CONTACTS
  async getContacts(): ApiResponse {
    return apiClient.get('/api/admin/contact');
  }

  async createContact(data: DataParam): ApiResponse {
    return apiClient.post('/api/admin/contact', data);
  }

  async updateContact(id: string, data: DataParam): ApiResponse {
    return apiClient.put(`/api/admin/contact/${id}`, data);
  }

  async deleteContact(id: string): ApiResponse {
    return apiClient.delete(`/api/admin/contact/${id}`);
  }

  // TEAM
  async getTeam(): ApiResponse {
    return apiClient.get('/api/admin/team');
  }

  async createTeamMember(data: DataParam): ApiResponse {
    return apiClient.post('/api/admin/team', data);
  }

  async updateTeamMember(id: string, data: DataParam): ApiResponse {
    return apiClient.put(`/api/admin/team/${id}`, data);
  }

  async deleteTeamMember(id: string): ApiResponse {
    return apiClient.delete(`/api/admin/team/${id}`);
  }

  // TRANSLATIONS
  async getTranslations(): ApiResponse {
    return apiClient.get('/api/admin/translation');
  }

  async updateTranslation(key: string, data: DataParam): ApiResponse {
    return apiClient.put(`/api/admin/translation/${key}`, data);
  }

  // TERMS
  async getTerms(): ApiResponse {
    return apiClient.get('/api/admin/terminos');
  }

  async updateTerms(data: DataParam): ApiResponse {
    return apiClient.put('/api/admin/terminos', data);
  }

  // AUTH
  async checkAuth(admin: boolean, role: string): ApiResponse {
    try {
      const response = await apiClient.post('/api/admin/auth/check', { admin, role });
      return response;
    } catch (error: unknown) {
      console.error('Error checking auth:', error);
      throw error;
    }
  }

  // GALLERY
  async listImages(): Promise<{ success: boolean; data?: string[]; error?: string }> {
    try {
      const response = await apiClient.get('/api/admin/gallery');
      const items = Array.isArray((response as { items?: GalleryItem[] })?.items)
        ? (response as { items: GalleryItem[] }).items
        : Array.isArray((response as { data?: { items?: GalleryItem[] } })?.data?.items)
          ? (response as { data: { items: GalleryItem[] } }).data.items
          : [];
      return {
        success: true,
        data: items.map((item) => item.filename).filter(Boolean),
      };
    } catch (error: unknown) {
      const msg = getErrorMessage(error);
      return {
        success: false,
        error: msg || 'Error de red',
      };
    }
  }

  async deleteImage(filename: string): Promise<{ success: boolean; data?: unknown; error?: string }> {
    try {
      const response = await apiClient.delete(`/api/admin/gallery/${encodeURIComponent(filename)}`);
      return {
        success: true,
        data: response,
      };
    } catch (error: unknown) {
      const msg = getErrorMessage(error);
      return {
        success: false,
        error: msg || 'Error de red',
      };
    }
  }
}

// Crear instancia singleton
export const adminApi = new AdminApiClient();

export function useAdminApi() {
  return adminApi;
}

export default adminApi;
