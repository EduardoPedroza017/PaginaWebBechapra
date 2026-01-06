"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { adminApi } from '../utils/admin-api';

interface UseAuthReturn {
  admin: boolean;
  role: string;
  authorized: boolean;
  loading: boolean;
  logout: () => void;
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

  const logout = useCallback(() => {
    sessionStorage.removeItem('admin');
    sessionStorage.removeItem('role');
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