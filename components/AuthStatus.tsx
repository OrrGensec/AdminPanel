'use client';
import { useState, useEffect } from 'react';
import { AuthService } from '../lib/auth';

export default function AuthStatus() {
  const [authInfo, setAuthInfo] = useState<any>(null);
  const auth = AuthService.getInstance();

  useEffect(() => {
    const updateAuthInfo = () => {
      setAuthInfo({
        isAuthenticated: auth.isAuthenticated(),
        canEdit: auth.canEdit(),
        user: auth.getUser(),
        hasToken: !!auth.getToken(),
      });
    };

    updateAuthInfo();
    
    // Update every 5 seconds to catch token changes
    const interval = setInterval(updateAuthInfo, 5000);
    
    return () => clearInterval(interval);
  }, [auth]);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 bg-gray-900 text-white p-3 rounded text-xs max-w-xs z-50">
      <div className="font-bold mb-1">Auth Status</div>
      <div>Authenticated: {authInfo?.isAuthenticated ? '✅' : '❌'}</div>
      <div>Can Edit: {authInfo?.canEdit ? '✅' : '❌'}</div>
      <div>Has Token: {authInfo?.hasToken ? '✅' : '❌'}</div>
      <div>User: {authInfo?.user?.username || 'None'}</div>
    </div>
  );
}