'use client';

import { useEffect } from 'react';
import { initializeCSRF } from '../lib/csrf';

export default function CSRFProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initializeCSRF();
  }, []);

  return <>{children}</>;
}