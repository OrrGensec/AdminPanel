'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

// Seeded random function for consistent values
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export default function AnimatedBackground() {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const starCount = pathname === '/' ? 400 : 200;

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Don't render on server to avoid hydration mismatch
  if (!isClient) {
    return <div className="absolute inset-0 overflow-hidden" />;
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(starCount)].map((_, i) => {
        // Use seeded random for consistent values
        const seed = i * 1000;
        const left = seededRandom(seed + 1) * 100;
        const top = seededRandom(seed + 2) * 100;
        const delay = seededRandom(seed + 3) * 3;
        const duration = 2 + seededRandom(seed + 4) * 2;
        
        return (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`
            }}
          />
        );
      })}
    </div>
  )
}