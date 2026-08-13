'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '@/components/ThemeProvider';

export default function SpotlightBackground() {
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });
  const { theme } = useTheme();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern" style={{ opacity: isDark ? 0.4 : 0.3 }} />

      {/* Ambient Blobs */}
      <div
        className="absolute top-[-10%] left-[-10%] w-112.5 h-112.5 rounded-full blur-[120px] animate-pulse-glow"
        style={{ background: isDark ? 'rgba(249,115,22,0.06)' : 'rgba(249,115,22,0.03)' }}
      />
      <div
        className="absolute top-[40%] right-[-10%] w-125 h-125 rounded-full blur-[140px] animate-pulse-glow"
        style={{ background: isDark ? 'rgba(20,184,166,0.06)' : 'rgba(20,184,166,0.03)', animationDelay: '2s' }}
      />
      <div
        className="absolute bottom-[-10%] left-[20%] w-112.5 h-112.5 rounded-full blur-[130px] animate-pulse-glow"
        style={{ background: isDark ? 'rgba(167,139,250,0.05)' : 'rgba(167,139,250,0.02)', animationDelay: '4s' }}
      />

      {/* Dynamic Cursor Spotlight — only in dark mode */}
      {isDark && (
        <div
          className="spotlight-overlay hidden md:block"
          style={{
            background: `radial-gradient(500px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(249,115,22,0.04), rgba(20,184,166,0.02) 40%, transparent 80%)`,
          }}
        />
      )}
    </div>
  );
}
