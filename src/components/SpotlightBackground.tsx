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
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Light Mode: Warm #c9bd6e Ambient Mesh Shading */}
      {!isDark && (
        <div 
          className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 70% 50% at 20% 15%, rgba(201, 189, 110, 0.42) 0%, transparent 70%),
              radial-gradient(ellipse 65% 55% at 85% 35%, rgba(201, 189, 110, 0.34) 0%, transparent 65%),
              radial-gradient(ellipse 80% 60% at 40% 85%, rgba(201, 189, 110, 0.28) 0%, transparent 70%),
              linear-gradient(180deg, #f6f3e6 0%, #eee6cb 50%, #f6f3e6 100%)
            `
          }}
        />
      )}

      {/* 3D Geometric Grid Perspective Canvas */}
      <div 
        className="absolute inset-0 bg-grid-pattern transition-opacity duration-700" 
        style={{ 
          opacity: isDark ? 0.35 : 0.4,
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 40%, black 40%, transparent 95%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 40%, black 40%, transparent 95%)'
        }} 
      />

      {/* Floating Ambient Volumetric Blobs */}
      <div
        className="absolute -top-32 -left-32 w-140 h-140 rounded-full blur-[140px] animate-pulse-glow"
        style={{ 
          background: isDark ? 'rgba(249,115,22,0.08)' : 'rgba(201,189,110,0.65)',
          transition: 'background 0.5s ease'
        }}
      />
      <div
        className="absolute top-[35%] -right-32 w-160 h-160 rounded-full blur-[160px] animate-pulse-glow"
        style={{ 
          background: isDark ? 'rgba(20,184,166,0.07)' : 'rgba(201,189,110,0.5)', 
          animationDelay: '2.5s',
          transition: 'background 0.5s ease'
        }}
      />
      <div
        className="absolute -bottom-32 left-[25%] w-140 h-140 rounded-full blur-[150px] animate-pulse-glow"
        style={{ 
          background: isDark ? 'rgba(167,139,250,0.06)' : 'rgba(201,189,110,0.45)', 
          animationDelay: '4.5s',
          transition: 'background 0.5s ease'
        }}
      />

      {/* Dynamic Cursor Spotlight Tracking */}
      <div
        className="spotlight-overlay hidden md:block"
        style={{
          background: isDark
            ? `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(249,115,22,0.045), rgba(20,184,166,0.025) 45%, transparent 75%)`
            : `radial-gradient(550px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(201,189,110,0.42), rgba(238,230,203,0.15) 50%, transparent 75%)`,
        }}
      />
    </div>
  );
}



