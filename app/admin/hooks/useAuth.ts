"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { adminApi } from '../utils/admin-api';

interface UseAuthReturn {
  admin: boolean;
  role: string;
  authorized: boolean;
  loading: boolean;
  logout: () => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const router = useRouter();
  const [admin, setAdmin] = useState(false);
  const [role, setRole] = useState('');
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  const verifyAuth = useCallback(async () => {
    try {
      const adminVal = sessionStorage.getItem('admin') === 'true';
      const roleVal = sessionStorage.getItem('role') || '';

      const res = await adminApi.checkAuth(adminVal, roleVal);
      const data = (res ?? {}) as Record<string, unknown>;
      setAdmin(Boolean(data['admin']));
      setRole(typeof data['role'] === 'string' ? (data['role'] as string) : '');
      setAuthorized(Boolean(data['role']));
    } catch {
      setAdmin(false);
      setAuthorized(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch('/api/backend/admin/logout', { method: 'POST', credentials: 'include' });
    } catch {
      // ignore
    }
    try { sessionStorage.removeItem('admin'); } catch {}
    try { sessionStorage.removeItem('role'); } catch {}
    try { sessionStorage.removeItem('admin_token'); } catch {}
    try { sessionStorage.removeItem('user_email'); } catch {}
    try { sessionStorage.removeItem('user_name'); } catch {}
    try { localStorage.removeItem('token'); } catch {}
    try { localStorage.removeItem('user'); } catch {}
    router.push('/admin');
  }, [router]);

  useEffect(() => {
    verifyAuth();
  }, [verifyAuth]);

  return {
    admin,
    role,
    authorized,
    loading,
    logout,
  };
}