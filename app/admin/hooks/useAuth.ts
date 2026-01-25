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

      const data = await adminApi.checkAuth(adminVal, roleVal);
      setAdmin(Boolean(data.admin));
      setRole(data.role || '');
      setAuthorized(Boolean(data.role));
    } catch (error) {
      setAdmin(false);
      setAuthorized(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch('/api/backend/admin/logout', { method: 'POST', credentials: 'include' });
    } catch (e) {
      // ignore
    }
    try { sessionStorage.removeItem('admin'); } catch (e) {}
    try { sessionStorage.removeItem('role'); } catch (e) {}
    try { sessionStorage.removeItem('admin_token'); } catch (e) {}
    try { sessionStorage.removeItem('user_email'); } catch (e) {}
    try { sessionStorage.removeItem('user_name'); } catch (e) {}
    try { localStorage.removeItem('token'); } catch (e) {}
    try { localStorage.removeItem('user'); } catch (e) {}
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