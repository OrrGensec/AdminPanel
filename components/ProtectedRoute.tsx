'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { accessToken, validateToken } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('accessToken');
      
      if (!storedToken && !accessToken) {
        setIsAuthenticated(false);
        window.location.href = '/login';
        return;
      }
      
      const isValid = await validateToken();
      if (isValid) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        window.location.href = '/login';
        return;
      }
      
      setIsLoading(false);
    };

    // Small delay to allow Zustand to hydrate
    const timer = setTimeout(checkAuth, 100);
    return () => clearTimeout(timer);
  }, [accessToken, validateToken]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground">Redirecting to login...</div>
      </div>
    );
  }

  return <>{children}</>;
}