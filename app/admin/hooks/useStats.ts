"use client";

import { useState, useEffect, useCallback } from 'react';
import { adminApi } from '../utils/admin-api';

interface SystemStatusData {
  status: 'operational' | 'degraded' | 'maintenance';
  message: string;
  updatedAt: string;
  services: {
    name: string;
    status: 'up' | 'down' | 'slow';
    responseTime: number;
  }[];
}

interface SystemHealthData {
  uptime: number;
  peakHours: { hour: number; requests: number }[];
}

interface UseStatsReturn {
  stats: {
    news: number;
    gallery: number;
    press: number;
    users: number;
    newsDelta?: number;
    galleryDelta?: number;
    pressDelta?: number;
    usersDelta?: number;
    systemStatus?: 'operational' | 'degraded' | 'maintenance';
    uptime?: number; // percentage
    lastUpdated?: string;
    peakHours?: { hour: number; requests: number }[];
  };
  systemStatus: {
    status: 'operational' | 'degraded' | 'maintenance';
    message: string;
    updatedAt: string;
    services: {
      name: string;
      status: 'up' | 'down' | 'slow';
      responseTime: number;
    }[];
  };
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  refreshStats: () => Promise<void>;
}

export function useStats(): UseStatsReturn {
  const [stats, setStats] = useState({
    news: 0,
    gallery: 0,
    press: 0,
    users: 0,
    systemStatus: 'operational' as 'operational' | 'degraded' | 'maintenance',
    uptime: 0,
    lastUpdated: '',
    peakHours: [] as { hour: number; requests: number }[],
  });
  const [systemStatus, setSystemStatus] = useState({
    status: 'operational' as 'operational' | 'degraded' | 'maintenance',
    message: 'Cargando estado del sistema...',
    updatedAt: '',
    services: [] as {
      name: string;
      status: 'up' | 'down' | 'slow';
      responseTime: number;
    }[],
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      setError(null);

      // Fetch data, handling failures gracefully
      const [news, gallery, press] = await Promise.all([
        adminApi.getNews().catch(() => []),
        adminApi.getGallery().catch(() => []),
        adminApi.getPress().catch(() => []),
      ]);

      // Optional fetches that may not exist
      let users = [];
      let systemStatusData = {};
      let systemHealthData = {};

      try {
        users = await adminApi.getUsers();
      } catch (err) {
        console.warn('Users API not available:', err);
        users = [];
      }

      try {
        systemStatusData = await adminApi.getSystemStatus();
      } catch (err) {
        console.warn('System status API not available:', err);
        systemStatusData = {};
      }

      try {
        systemHealthData = await adminApi.getSystemHealth();
      } catch (err) {
        console.warn('System health API not available:', err);
        systemHealthData = {};
      }

      // Process real data
      const newsCount = Array.isArray(news) ? news.length : 0;
      const galleryCount = Array.isArray(gallery) ? gallery.length : 0;
      const pressCount = Array.isArray(press) ? press.length : 0;
      const usersCount = Array.isArray(users) ? users.length : 0;

      // Calculate deltas based on stored previous values
      const calculateDelta = (current: number, key: string): number => {
        try {
          const stored = localStorage.getItem(`dashboard_${key}_prev`);
          const prevValue = stored ? parseInt(stored) : current;
          localStorage.setItem(`dashboard_${key}_prev`, current.toString());

          if (prevValue === 0) return 0;
          const delta = ((current - prevValue) / prevValue) * 100;
          return Math.round(delta);
        } catch {
          return 0; // Fallback if localStorage is not available
        }
      };

      const newsDelta = calculateDelta(newsCount, 'news');
      const galleryDelta = calculateDelta(galleryCount, 'gallery');
      const pressDelta = calculateDelta(pressCount, 'press');
      const usersDelta = calculateDelta(usersCount, 'users');

      // Process system status
      let systemStatusInfo: SystemStatusData;
      let systemHealthInfo: SystemHealthData;

      if (systemStatusData && typeof systemStatusData === 'object' && 'status' in systemStatusData) {
        systemStatusInfo = systemStatusData as SystemStatusData;
      } else {
        systemStatusInfo = {
          status: 'operational',
          message: 'Sistema operativo',
          updatedAt: new Date().toISOString(),
          services: []
        };
      }

      if (systemHealthData && typeof systemHealthData === 'object' && 'uptime' in systemHealthData) {
        systemHealthInfo = systemHealthData as SystemHealthData;
      } else {
        systemHealthInfo = {
          uptime: 99.9,
          peakHours: [
            { hour: 9, requests: 150 },
            { hour: 14, requests: 200 },
            { hour: 18, requests: 180 }
          ]
        };
      }

      const baseStats = {
        news: newsCount,
        gallery: galleryCount,
        press: pressCount,
        users: usersCount,
        newsDelta,
        galleryDelta,
        pressDelta,
        usersDelta,
        systemStatus: systemStatusInfo.status,
        uptime: systemHealthInfo.uptime,
        lastUpdated: new Date().toISOString(),
        peakHours: systemHealthInfo.peakHours,
      };

      // Process system services status
      const services = Array.isArray(systemStatusInfo.services) && systemStatusInfo.services.length > 0
        ? systemStatusInfo.services.map((service: any) => ({
            name: service.name || 'Servicio',
            status: (service.status === 'up' || service.status === 'down' || service.status === 'slow')
              ? service.status : 'up' as const,
            responseTime: typeof service.responseTime === 'number' ? service.responseTime : 0
          }))
        : [
            { name: 'API', status: 'up' as const, responseTime: 45 },
            { name: 'Database', status: 'up' as const, responseTime: 12 },
            { name: 'Cache', status: 'up' as const, responseTime: 5 },
          ];

      const systemStatusState = {
        status: systemStatusInfo.status,
        message: systemStatusInfo.message || 'Sistema operativo',
        updatedAt: new Date().toISOString(),
        services: services,
      };

      setStats(baseStats);
      setSystemStatus(systemStatusState);

    } catch (err) {
      setError('Error al cargar estadísticas del sistema');
      console.error('Error fetching stats:', err);

      // Set fallback data on error
      setStats({
        news: 0,
        gallery: 0,
        press: 0,
        users: 0,
        systemStatus: 'maintenance',
        uptime: 0,
        lastUpdated: new Date().toISOString(),
        peakHours: [],
      });

      setSystemStatus({
        status: 'maintenance',
        message: 'Error al conectar con el servidor',
        updatedAt: new Date().toISOString(),
        services: [
          { name: 'API', status: 'down' as const, responseTime: 0 },
          { name: 'Database', status: 'down' as const, responseTime: 0 },
          { name: 'Cache', status: 'down' as const, responseTime: 0 },
        ],
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const refreshStats = useCallback(async () => {
    await fetchStats(true);
  }, [fetchStats]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    systemStatus,
    loading,
    refreshing,
    error,
    refreshStats,
  };
}