// utils/admin-api.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

interface UploadImageParams {
  image: File;
  compression: 'low' | 'medium' | 'high';
  maxDimension: number;
  tags: string[];
}

interface DeleteImageParams {
  filename: string;
}

class AdminApi {
  private async fetchWithTimeout(
    url: string,
    options: RequestInit = {},
    timeout = 30000
  ): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  async uploadImage(params: UploadImageParams): Promise<ApiResponse> {
    const formData = new FormData();
    formData.append("image", params.image);
    formData.append("compression", params.compression);
    formData.append("maxDimension", params.maxDimension.toString());
    formData.append("tags", JSON.stringify(params.tags));

    try {
      const response = await this.fetchWithTimeout(
        `${API_BASE_URL}/admin/upload-image`,
        {
          method: 'POST',
          body: formData,
        }
      );

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
        message: data.message,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.name === 'AbortError' ? 'Timeout de conexión' : 'Error de red',
      };
    }
  }

  async listImages(): Promise<ApiResponse<string[]>> {
    try {
      const response = await this.fetchWithTimeout(
        `${API_BASE_URL}/admin/list-images`,
        {
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache',
          },
        },
        15000 // 15 segundos timeout
      );

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

  async deleteImage(params: DeleteImageParams): Promise<ApiResponse> {
    try {
      const response = await this.fetchWithTimeout(
        `${API_BASE_URL}/admin/delete-image`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
        }
      );

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
        message: data.message,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.name === 'AbortError' ? 'Timeout de conexión' : 'Error de red',
      };
    }
  }

  async getImageInfo(filename: string): Promise<ApiResponse> {
    try {
      const response = await this.fetchWithTimeout(
        `${API_BASE_URL}/admin/image-info/${encodeURIComponent(filename)}`,
        {
          method: 'GET',
        }
      );

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

  async bulkDelete(filenames: string[]): Promise<ApiResponse> {
    try {
      const response = await this.fetchWithTimeout(
        `${API_BASE_URL}/admin/bulk-delete`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ filenames }),
        }
      );

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
        message: data.message,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.name === 'AbortError' ? 'Timeout de conexión' : 'Error de red',
      };
    }
  }
}

export const adminApi = new AdminApi();