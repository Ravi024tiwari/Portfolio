'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  Terminal,
  Mail,
  Phone,
  ArrowRight,
  Copy,
  Check,
  ChevronDown,
  Code,
  Award,
} from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { FLOATING_TECH_ICONS } from '@/components/TechIcons';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

const TYPING_ROLES = [
  "MERN Stack Developer",
  "Next.js Full-Stack Developer",
  "TypeScript & PostgreSQL Engineer",
  "C++ Competitive Programmer (800+ LeetCode)"
];

export default function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const workstationRef = useRef<HTMLDivElement>(null);

  // 3D Tilt Physics using Framer Motion
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-12, 12]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!workstationRef.current) return;
    const rect = workstationRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % TYPING_ROLES.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center pt-28 pb-16 px-4 sm:px-8 overflow-hidden">
      
      {/* Hero Content Container */}
      <div className="max-w-7xl w-full flex flex-col gap-14 sm:gap-18 z-10">
        
        {/* Main 2-Column Split: Intro + 3D Interactive Screen Studio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Hero Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 xl:col-span-6 flex flex-col gap-5 text-left"
          >
            {/* Status Badge */}
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium w-fit backdrop-blur-md"
              style={{
                background: 'var(--accent-success-soft)',
                border: '1px solid rgba(34,197,94,0.3)',
                color: 'var(--accent-success)'
              }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--accent-success)' }} />
              <span className="font-mono">{PORTFOLIO_DATA.personal.statusBadge}</span>
            </div>

            {/* Main Headline */}
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08]" style={{ color: 'var(--text-heading)' }}>
                Hi, I&apos;m{' '}
                <span className="gradient-text">{PORTFOLIO_DATA.personal.name}</span>
              </h1>

              {/* Dynamic Role Subheading with Terminal Badge */}
              <div className="h-10 sm:h-12 flex items-center">
                <span className="text-base sm:text-xl font-mono font-medium flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                  <Terminal className="w-4 h-4 shrink-0" style={{ color: 'var(--accent-tertiary)' }} />
                  <motion.span
                    key={currentRoleIndex}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35 }}
                    style={{ color: 'var(--accent-primary)' }}
                    className="font-semibold"
                  >
                    {TYPING_ROLES[currentRoleIndex]}
                  </motion.span>
                  <span className="w-0.5 h-5 animate-pulse" style={{ background: 'var(--accent-primary)' }} />
                </span>
              </div>
            </div>

            {/* Developer Bio */}
            <p className="text-sm sm:text-base leading-relaxed max-w-xl" style={{ color: 'var(--text-secondary)' }}>
              {PORTFOLIO_DATA.personal.bio}
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="glass-button text-white font-medium text-sm px-6 py-3.5 rounded-xl flex items-center gap-2 group cursor-pointer"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </a>

              <button
                onClick={handleCopyEmail}
                className="px-5 py-3.5 rounded-xl text-sm font-medium flex items-center gap-2 transition-all cursor-pointer hover:border-(--border-hover)"
                style={{
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-primary)',
                  color: 'var(--text-primary)',
                }}
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-4 h-4" style={{ color: 'var(--accent-success)' }} />
                    <span style={{ color: 'var(--accent-success)' }}>Email Copied!</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4" style={{ color: 'var(--accent-primary)' }} />
                    <span>Copy Email</span>
                    <Copy className="w-3.5 h-3.5" style={{ color: 'var(--text-tertiary)' }} />
                  </>
                )}
              </button>
            </div>

            {/* Social & Competitive Badges */}
            <div className="pt-3 flex flex-wrap items-center gap-2.5" style={{ borderTop: '1px solid var(--border-primary)' }}>
              <span className="text-xs font-mono uppercase tracking-wider mr-1" style={{ color: 'var(--text-tertiary)' }}>Profiles:</span>

              <a
                href={PORTFOLIO_DATA.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 transition-all hover:scale-105"
                style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)', color: 'var(--text-secondary)' }}
              >
                <SiGithub className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>

              <a
                href={PORTFOLIO_DATA.personal.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 transition-all hover:scale-105"
                style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)', color: 'var(--text-secondary)' }}
              >
                <Code className="w-3.5 h-3.5" style={{ color: '#FFA116' }} />
                <span>LeetCode <strong style={{ color: '#FFA116' }}>(800+)</strong></span>
              </a>

              <a
                href={PORTFOLIO_DATA.personal.gfg}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 transition-all hover:scale-105"
                style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)', color: 'var(--text-secondary)' }}
              >
                <Award className="w-3.5 h-3.5" style={{ color: '#2F8D46' }} />
                <span>GFG <strong style={{ color: '#2F8D46' }}>(100+)</strong></span>
              </a>
            </div>
          </motion.div>

          {/* Right Column — Photorealistic 3D Floating Profile & Stats Showcase */}
          <div 
            ref={workstationRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="lg:col-span-6 xl:col-span-6 relative perspective-1200 w-full flex items-center justify-center py-4"
          >
            {/* 3D Tilted Interactive Canvas */}
            <motion.div
              style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }}
              className="relative w-full max-w-lg transition-transform duration-200 ease-out"
            >
              
              {/* Main 3D Floating Glass Profile Showcase Card */}
              <div 
                className="w-full rounded-3xl p-6 sm:p-7 glass-card-glow relative flex flex-col gap-5 preserve-3d"
                style={{
                  transform: 'translateZ(25px)',
                  boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.65), 0 0 35px var(--accent-primary-soft)',
                }}
              >
                {/* Profile Portrait Container */}
                <div className="relative group rounded-2xl overflow-hidden aspect-16/11 sm:aspect-16/10 shadow-2xl">
                  <img
                    src="/portfolioImage.jpeg"
                    alt="Ravi Tiwari Portrait"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  
                  {/* Outer subtle glow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  
                  {/* Overlay Identity Banner */}
                  <div className="absolute bottom-3.5 left-4 right-4 flex items-end justify-between">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-base sm:text-lg font-bold text-white tracking-wide">
                        {PORTFOLIO_DATA.personal.name}
                      </span>
                      <p className="text-xs text-gray-300 font-mono">
                        {PORTFOLIO_DATA.personal.role}
                      </p>
                    </div>
                    
                    <span 
                      className="text-[11px] font-mono px-3 py-1 rounded-full font-medium"
                      style={{ background: 'var(--accent-primary)', color: '#fff' }}
                    >
                      India
                    </span>
                  </div>
                </div>

                {/* 4-Cell Key Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {PORTFOLIO_DATA.stats.map((stat, idx) => {
                    const colors = [
                      'var(--accent-primary)',
                      '#fbbf24',
                      'var(--accent-secondary)',
                      'var(--accent-tertiary)'
                    ];
                    return (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl flex flex-col gap-1 transition-all duration-300 hover:border-(--border-hover)"
                        style={{
                          background: 'var(--bg-elevated)',
                          border: '1px solid var(--border-primary)',
                        }}
                      >
                        <span className="text-xl sm:text-2xl font-extrabold" style={{ color: colors[idx % colors.length] }}>
                          {stat.value}
                        </span>
                        <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
                          {stat.label}
                        </span>
                        <span className="text-[10px] font-mono truncate" style={{ color: 'var(--text-tertiary)' }}>
                          {stat.detail}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Contact Quick Bar */}
                <div className="pt-3 flex items-center justify-between gap-3 border-t border-(--border-primary) text-xs">
                  <div className="flex items-center gap-2 text-(--text-tertiary)">
                    <Mail className="w-3.5 h-3.5 text-(--accent-primary)" />
                    <span className="font-mono truncate select-all max-w-[180px] sm:max-w-[220px]" style={{ color: 'var(--text-secondary)' }}>
                      {PORTFOLIO_DATA.personal.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-(--text-tertiary)">
                    <Phone className="w-3.5 h-3.5 text-(--accent-secondary)" />
                    <span className="font-mono text-(--text-secondary)">
                      {PORTFOLIO_DATA.personal.mobile}
                    </span>
                  </div>
                </div>

              </div>

            </motion.div>
          </div>

        </div>

        {/* Core Tech Stack Scrolling Marquee */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full flex flex-col gap-4 items-center justify-center text-center mt-2"
        >
          {/* Section Divider with Label */}
          <div className="flex items-center gap-3">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-(--border-primary)" />
            <span className="text-xs sm:text-sm font-mono font-bold tracking-widest uppercase text-(--text-tertiary)">
              Core Tech Stack & Ecosystem
            </span>
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-(--border-primary)" />
          </div>

          {/* Interactive Marquee Container */}
          <div
            className="w-full rounded-2xl py-5 px-4 overflow-hidden relative glass-panel"
            style={{ 
              background: 'var(--bg-card)', 
              border: '1px solid var(--border-primary)', 
              boxShadow: 'var(--shadow-card)',
            }}
          >
            {/* Left fade mask */}
            <div
              className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(to right, var(--bg-card) 0%, transparent 100%)' }}
            />
            {/* Right fade mask */}
            <div
              className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(to left, var(--bg-card) 0%, transparent 100%)' }}
            />

            {/* Endless scrolling animation wrapper */}
            <div className="flex overflow-hidden w-full">
              <div className="flex gap-8 sm:gap-12 animate-marquee py-1 w-max">
                
                {/* Cycle 1 of icons */}
                {FLOATING_TECH_ICONS.map((tech, idx) => {
                  const Icon = tech.icon;
                  return (
                    <div
                      key={`cycle1-${idx}`}
                      className="flex flex-col items-center gap-2 group cursor-pointer"
                    >
                      <div
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center bg-(--bg-elevated) border border-(--border-primary) transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-2 group-hover:border-(--accent-primary) group-hover:shadow-[0_8px_30px_rgba(249,115,22,0.2)]"
                      >
                        <Icon
                          className="w-7 h-7 sm:w-8 sm:h-8 transition-colors duration-300"
                          style={{ color: tech.color }}
                        />
                      </div>
                      <span
                        className="text-[11px] font-semibold text-(--text-secondary) transition-colors duration-300 group-hover:text-(--text-heading)"
                      >
                        {tech.name}
                      </span>
                    </div>
                  );
                })}

                {/* Cycle 2 for seamless endless scrolling */}
                {FLOATING_TECH_ICONS.map((tech, idx) => {
                  const Icon = tech.icon;
                  return (
                    <div
                      key={`cycle2-${idx}`}
                      className="flex flex-col items-center gap-2 group cursor-pointer"
                    >
                      <div
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center bg-(--bg-elevated) border border-(--border-primary) transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-2 group-hover:border-(--accent-primary) group-hover:shadow-[0_8px_30px_rgba(249,115,22,0.2)]"
                      >
                        <Icon
                          className="w-7 h-7 sm:w-8 sm:h-8 transition-colors duration-300"
                          style={{ color: tech.color }}
                        />
                      </div>
                      <span
                        className="text-[11px] font-semibold text-(--text-secondary) transition-colors duration-300 group-hover:text-(--text-heading)"
                      >
                        {tech.name}
                      </span>
                    </div>
                  );
                })}

              </div>
            </div>

          </div>
        </motion.div>

      </div>

      {/* Interactive Bottom Scroll Indicator */}
      <a 
        href="#about"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 text-xs font-mono group transition-opacity hover:opacity-100" 
        style={{ color: 'var(--text-tertiary)' }}
      >
        <span className="group-hover:text-(--accent-primary) transition-colors">Scroll to Explore</span>
        <ChevronDown className="w-4 h-4 animate-bounce" style={{ color: 'var(--accent-primary)' }} />
      </a>
    </section>
  );
}

