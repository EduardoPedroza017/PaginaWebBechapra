// API helper utilities for news operations
import { News, NewsFormData } from '../types';

export interface ApiResponse<T = unknown> {
  ok: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export class NewsApiError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'NewsApiError';
  }
}

export const getApiUrl = (): string => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error('NEXT_PUBLIC_API_URL is not defined');
  }
  return apiUrl;
};

export const getAuthHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };

  // Add authentication headers if available
  if (typeof window !== 'undefined') {
    const userEmail = sessionStorage.getItem('user_email');
    const admin = sessionStorage.getItem('admin');
    const role = sessionStorage.getItem('role');

    if (userEmail) headers['X-User'] = userEmail;
    if (admin) headers['X-Admin'] = admin;
    if (role) headers['X-Role'] = role;
  }

  return headers;
};

export const handleApiResponse = async <T>(response: Response): Promise<ApiResponse<T>> => {
  const contentType = response.headers.get('content-type');

  if (!response.ok) {
    let errorMessage = `HTTP ${response.status}: ${response.statusText}`;

    try {
      if (contentType?.includes('application/json')) {
        const errorData = await response.json();
        errorMessage = errorData.error || errorData.message || errorMessage;
      } else {
        const errorText = await response.text();
        if (errorText) errorMessage = errorText;
      }
    } catch {
      // Use default error message
    }

    throw new NewsApiError(errorMessage, response.status);
  }

  if (contentType?.includes('application/json')) {
    const data = await response.json();
    return {
      ok: true,
      data: data as T
    };
  }

  return {
    ok: true,
    data: null as T
  };
};

export const fetchNews = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}): Promise<PaginatedResponse<News>> => {
  const apiUrl = getApiUrl();
  const queryParams = new URLSearchParams();

  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());
  if (params?.search) queryParams.append('search', params.search);
  if (params?.category) queryParams.append('category', params.category);
  if (params?.status) queryParams.append('status', params.status);
  if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
  if (params?.sortOrder) queryParams.append('sortOrder', params.sortOrder);

  const response = await fetch(`${apiUrl}/api/admin/news?${queryParams}`, {
    method: 'GET',
    headers: getAuthHeaders(),
    credentials: 'include'
  });

  const result = await handleApiResponse<PaginatedResponse<News>>(response);
  return result.data!;
};

export const createNews = async (newsData: NewsFormData): Promise<News> => {
  const apiUrl = getApiUrl();
  const formData = new FormData();

  // Add text fields
  Object.entries(newsData).forEach(([key, value]) => {
    if (key !== 'image' && value !== null && value !== undefined) {
      if (Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value.toString());
      }
    }
  });

  // Add image file
  if (newsData.image) {
    formData.append('image', newsData.image);
  }

  const headers = getAuthHeaders();
  // remove Content-Type so browser sets multipart/form-data with boundary
  delete (headers as Record<string, string>)['Content-Type'];

  const response = await fetch(`${apiUrl}/api/admin/news`, {
    method: 'POST',
    headers,
    body: formData,
    credentials: 'include'
  });

  const result = await handleApiResponse<News>(response);
  return result.data!;
};

export const updateNews = async (id: string, newsData: Partial<NewsFormData>): Promise<News> => {
  const apiUrl = getApiUrl();
  const formData = new FormData();

  // Add text fields
  Object.entries(newsData).forEach(([key, value]) => {
    if (key !== 'image' && value !== null && value !== undefined) {
      if (Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value.toString());
      }
    }
  });

  // Add image file if provided
  if (newsData.image) {
    formData.append('image', newsData.image);
  }

  const headers = getAuthHeaders();
  delete (headers as Record<string, string>)['Content-Type'];

  const response = await fetch(`${apiUrl}/api/admin/news/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers,
    body: formData,
    credentials: 'include'
  });

  const result = await handleApiResponse<News>(response);
  return result.data!;
};

export const deleteNews = async (id: string): Promise<void> => {
  const apiUrl = getApiUrl();

  const response = await fetch(`${apiUrl}/api/admin/news/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
    credentials: 'include'
  });

  await handleApiResponse(response);
};

export const toggleNewsStatus = async (id: string): Promise<News> => {
  const apiUrl = getApiUrl();

  const response = await fetch(`${apiUrl}/api/admin/news/${encodeURIComponent(id)}/toggle-status`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    credentials: 'include'
  });

  const result = await handleApiResponse<News>(response);
  return result.data!;
};

export const uploadImage = async (file: File): Promise<{ url: string; alt: string }> => {
  const apiUrl = getApiUrl();
  const formData = new FormData();
  formData.append('image', file);

  const headers = getAuthHeaders();
  delete (headers as Record<string, string>)['Content-Type'];

  const response = await fetch(`${apiUrl}/api/admin/upload/image`, {
    method: 'POST',
    headers,
    body: formData,
    credentials: 'include'
  });

  const result = await handleApiResponse<{ url: string; alt: string }>(response);
  return result.data!;
};

export const getNewsStats = async (): Promise<{
  total: number;
  active: number;
  inactive: number;
  draft: number;
  categories: Record<string, number>;
}> => {
  const apiUrl = getApiUrl();

  const response = await fetch(`${apiUrl}/api/admin/news/stats`, {
    method: 'GET',
    headers: getAuthHeaders(),
    credentials: 'include'
  });

  const result = await handleApiResponse<{
    total: number;
    active: number;
    inactive: number;
    draft: number;
    categories: Record<string, number>;
  }>(response);

  return result.data!;
};
