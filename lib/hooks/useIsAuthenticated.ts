'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/lib/store/authStore';

export const useIsAuthenticated = () => {
  const { isLoggedIn, checkLoggedIn, loading, logout, setIsLoggedIn } = useAuthStore((state) => state);

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return {
    isLoggedIn,
    loading,
    logout,
    setIsLoggedIn,
  };
};