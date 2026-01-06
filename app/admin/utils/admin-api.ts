/**
 * ADMIN API CLIENT
 * 
 * Centraliza todas las llamadas a API para el panel de administración
 */

import { apiClient } from '@/lib/api-client';

class AdminApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  }

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

  // NEWS
  async getNews(limit?: number) {
    return apiClient.get('/api/news');
  }

  async createNews(data: any) {
    return apiClient.post('/api/news', data);
  }

  async updateNews(id: string, data: any) {
    return apiClient.put(`/api/news/${id}`, data);
  }

  async deleteNews(id: string) {
    return apiClient.delete(`/api/news/${id}`);
  }

  // PRESS
  async getPress(limit?: number) {
    return apiClient.get('/api/press');
  }

  async createPress(data: any) {
    return apiClient.post('/api/press', data);
  }

  async updatePress(id: string, data: any) {
    return apiClient.put(`/api/press/${id}`, data);
  }

  async deletePress(id: string) {
    return apiClient.delete(`/api/press/${id}`);
  }

  // GALLERY
  async getGallery() {
    return apiClient.get('/api/gallery');
  }

  async createGallery(data: any) {
    return apiClient.post('/api/gallery', data);
  }

  async updateGallery(id: string, data: any) {
    return apiClient.put(`/api/gallery/${id}`, data);
  }

  async deleteGallery(id: string) {
    return apiClient.delete(`/api/gallery/${id}`);
  }

  // SERVICES
  async getServices() {
    return apiClient.get('/api/services');
  }

  async createService(data: any) {
    return apiClient.post('/api/services', data);
  }

  async updateService(id: string, data: any) {
    return apiClient.put(`/api/services/${id}`, data);
  }

  async deleteService(id: string) {
    return apiClient.delete(`/api/services/${id}`);
  }

  // COOKIES
  async getCookieConsents(options?: { limit?: number }) {
    const params = new URLSearchParams();
    if (options?.limit) {
      params.append('limit', options.limit.toString());
    }
    const query = params.toString();
    return apiClient.get(`/api/cookies${query ? `?${query}` : ''}`);
  }

  async getCookieStats() {
    return apiClient.get('/api/cookies/stats');
  }

  async updateCookieConsent(id: string, data: any) {
    return apiClient.put(`/api/admin/cookies/${id}`, data);
  }

  // USERS
  async getUsers() {
    return apiClient.get('/api/admin/users');
  }

  async createUser(data: any) {
    return apiClient.post('/api/admin/users', data);
  }

  async updateUser(id: string, data: any) {
    return apiClient.put(`/api/admin/users/${id}`, data);
  }

  async deleteUser(id: string) {
    return apiClient.delete(`/api/admin/users/${id}`);
  }

  // AUDIT LOG
  async getAuditLog(limit?: number) {
    return apiClient.get('/api/admin/audit-log');
  }

  // LOGO
  async getLogo() {
    return apiClient.get('/api/logo');
  }

  async updateLogo(data: any) {
    return apiClient.put('/api/logo', data);
  }

  async getLogoHistory() {
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

  async uploadMultipleLogos(files: File[], options?: any) {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append('files', file);
    });

    return apiClient.post('/api/logo/upload-multiple', formData, {
      headers: {
        // No establecer Content-Type para que el navegador lo maneje automáticamente con FormData
      },
    });
  }

  async setActiveLogo(filename: string) {
    return apiClient.put('/api/logo', { filename });
  }

  async updateLogoMeta(data: { filename: string; alt: string }) {
    return apiClient.put('/api/logo/meta', data);
  }

  async optimizeAllLogos() {
    return apiClient.post('/api/logo/optimize-all');
  }

  // SYSTEM STATUS
  async getSystemStatus() {
    return apiClient.get('/api/admin/system/status');
  }

  async getSystemHealth() {
    return apiClient.get('/api/admin/system/health');
  }

  // ESSENCE
  async getEssence() {
    return apiClient.get('/api/admin/essence');
  }

  async updateEssence(data: any) {
    return apiClient.put('/api/admin/essence', data);
  }

  async getEssenceHistory() {
    return apiClient.get('/api/admin/essence/history');
  }

  // JOBS
  async getJobs() {
    return apiClient.get('/api/jobs');
  }

  async createJob(data: any) {
    return apiClient.post('/api/jobs', data);
  }

  async updateJob(id: string, data: any) {
    return apiClient.put(`/api/jobs/${id}`, data);
  }

  async deleteJob(id: string) {
    return apiClient.delete(`/api/jobs/${id}`);
  }

  // INTERNSHIPS
  async getInternships() {
    return apiClient.get('/api/internships');
  }

  async createInternship(data: any) {
    return apiClient.post('/api/internships', data);
  }

  async updateInternship(id: string, data: any) {
    return apiClient.put(`/api/internships/${id}`, data);
  }

  async deleteInternship(id: string) {
    return apiClient.delete(`/api/internships/${id}`);
  }

  // BRANCHES
  async getBranches() {
    return apiClient.get('/api/branches');
  }

  async createBranch(data: any) {
    return apiClient.post('/api/branches', data);
  }

  async updateBranch(id: string, data: any) {
    return apiClient.put(`/api/branches/${id}`, data);
  }

  async deleteBranch(id: string) {
    return apiClient.delete(`/api/branches/${id}`);
  }

  // CONTACTS
  async getContacts() {
    return apiClient.get('/api/contacts');
  }

  async createContact(data: any) {
    return apiClient.post('/api/contacts', data);
  }

  async updateContact(id: string, data: any) {
    return apiClient.put(`/api/contacts/${id}`, data);
  }

  async deleteContact(id: string) {
    return apiClient.delete(`/api/contacts/${id}`);
  }

  // TEAM
  async getTeam() {
    return apiClient.get('/api/admin/team');
  }

  async createTeamMember(data: any) {
    return apiClient.post('/api/admin/team', data);
  }

  async updateTeamMember(id: string, data: any) {
    return apiClient.put(`/api/admin/team/${id}`, data);
  }

  async deleteTeamMember(id: string) {
    return apiClient.delete(`/api/admin/team/${id}`);
  }

  // TRANSLATIONS
  async getTranslations() {
    return apiClient.get('/api/admin/translations');
  }

  async updateTranslation(key: string, data: any) {
    return apiClient.put(`/api/admin/translations/${key}`, data);
  }

  // TERMS
  async getTerms() {
    return apiClient.get('/api/admin/terms');
  }

  async updateTerms(data: any) {
    return apiClient.put('/api/admin/terms', data);
  }

  // AUTH
  async checkAuth(admin: boolean, role: string) {
    try {
      // Usar fetch directo con ruta relativa para pasar por el proxy Next.js
      const response = await fetch('/api/backend/admin/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Role': role,
          'X-Admin': admin.toString()
        },
        credentials: 'include',
        body: JSON.stringify({ admin, role }),
      });

      if (!response.ok) {
        throw new Error(`Auth check failed with status ${response.status}`);
      }

      return response.json();
    } catch (error: any) {
      console.error('Error checking auth:', error);
      throw error;
    }
  }

  // GALLERY
  async listImages(): Promise<{ success: boolean; data?: string[]; error?: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/admin/list-images`, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || `HTTP ${response.status}`,
        };
      }

      return {
        success: true,
        data: Array.isArray(data.images) ? data.images : [],
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.name === 'AbortError' ? 'Timeout de conexión' : 'Error de red',
      };
    }
  }

  async deleteImage(filename: string): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/admin/delete-image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filename }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || `HTTP ${response.status}`,
        };
      }

      return {
        success: true,
        data: data,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.name === 'AbortError' ? 'Timeout de conexión' : 'Error de red',
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
