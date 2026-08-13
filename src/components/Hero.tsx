'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  "React Native Specialist",
  "C++ Competitive Programmer (800+ LeetCode)"
];

export default function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);

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
      
      {/* Hero Content Wrapper */}
      <div className="max-w-6xl w-full flex flex-col gap-12 sm:gap-16 z-10">
        
        {/* Main Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 flex flex-col gap-5 text-left"
          >
            {/* Status Badge */}
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium w-fit"
              style={{
                background: 'var(--accent-success-soft)',
                border: '1px solid rgba(34,197,94,0.25)',
                color: 'var(--accent-success)'
              }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--accent-success)' }} />
              <span>{PORTFOLIO_DATA.personal.statusBadge}</span>
            </div>

            {/* Name & Headline */}
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]" style={{ color: 'var(--text-heading)' }}>
                Hi, I&apos;m{' '}
                <span className="gradient-text">{PORTFOLIO_DATA.personal.name}</span>
              </h1>

              {/* Dynamic Typing Subheading */}
              <div className="h-10 sm:h-12 flex items-center">
                <span className="text-base sm:text-xl font-mono font-medium flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                  <Terminal className="w-4 h-4" style={{ color: 'var(--accent-tertiary)' }} />
                  <motion.span
                    key={currentRoleIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    style={{ color: 'var(--accent-primary)' }}
                    className="font-semibold"
                  >
                    {TYPING_ROLES[currentRoleIndex]}
                  </motion.span>
                  <span className="w-0.5 h-5 animate-pulse" style={{ background: 'var(--accent-primary)' }} />
                </span>
              </div>
            </div>

            {/* Bio */}
            <p className="text-sm sm:text-base leading-relaxed max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
              {PORTFOLIO_DATA.personal.bio}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="#projects"
                className="glass-button text-white font-medium text-sm px-5 py-3 rounded-xl flex items-center gap-2 group cursor-pointer"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={handleCopyEmail}
                className="px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2 transition-all cursor-pointer"
                style={{
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-primary)',
                  color: 'var(--text-primary)',
                }}
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-4 h-4" style={{ color: 'var(--accent-success)' }} />
                    <span style={{ color: 'var(--accent-success)' }}>Copied!</span>
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

            {/* Social Profiles */}
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

          {/* Right Column — Interactive Portfolio Image & Stats Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Interactive & Responsive Profile Image Container */}
            <div className="relative group w-full aspect-square ssm:aspect-4/3.5 lg:aspect-4/4.5 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-[0_20px_50px_rgba(249,115,22,0.15)]">
              {/* Image element */}
              <img
                src="/portfolioImage.jpeg"
                alt="Ravi Tiwari Portfolio Portrait"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              
              {/* Outer soft glowing border layer */}
              <div 
                className="absolute inset-0 border-2 border-transparent group-hover:border-(--accent-primary) rounded-3xl transition-colors duration-500 pointer-events-none z-20"
                style={{ mixBlendMode: 'screen' }}
              />

              {/* Decorative Glassmorphism Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-95 z-10" />

              {/* Text tag overlays */}
              <div className="absolute bottom-5 left-5 right-5 z-20 flex flex-col gap-1">
                <span className="text-xs font-semibold tracking-widest text-(--accent-primary) uppercase">
                  Available for Opportunities
                </span>
                <h3 className="text-xl font-bold text-white tracking-wide">
                  {PORTFOLIO_DATA.personal.name}
                </h3>
                <p className="text-xs text-gray-300">
                  {PORTFOLIO_DATA.personal.role}
                </p>
              </div>
            </div>

            {/* Stats Card */}
            <div
              className="rounded-2xl p-5 relative overflow-hidden"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border-primary)', boxShadow: 'var(--shadow-card)' }}
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3">
                {PORTFOLIO_DATA.stats.map((stat, idx) => {
                  const colors = ['var(--accent-primary)', 'var(--accent-secondary)', 'var(--accent-tertiary)', 'var(--accent-success)'];
                  return (
                    <div
                      key={idx}
                      className="p-3 rounded-xl"
                      style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)' }}
                    >
                      <span className="text-xl sm:text-2xl font-extrabold block" style={{ color: colors[idx] }}>
                        {stat.value}
                      </span>
                      <span className="text-xs font-semibold block mt-0.5" style={{ color: 'var(--text-primary)' }}>
                        {stat.label}
                      </span>
                      <span className="text-[10px] font-mono block mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
                        {stat.detail}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Contact Info */}
              <div className="pt-3 mt-3 flex flex-col gap-1.5" style={{ borderTop: '1px solid var(--border-primary)' }}>
                <div className="flex items-center justify-between text-xs" style={{ color: 'var(--text-secondary)' }}>
                  <span className="flex items-center gap-1.5" style={{ color: 'var(--text-tertiary)' }}>
                    <Mail className="w-3 h-3" style={{ color: 'var(--accent-primary)' }} /> Email:
                  </span>
                  <span className="font-mono select-all" style={{ color: 'var(--accent-primary)' }}>{PORTFOLIO_DATA.personal.email}</span>
                </div>
                <div className="flex items-center justify-between text-xs" style={{ color: 'var(--text-secondary)' }}>
                  <span className="flex items-center gap-1.5" style={{ color: 'var(--text-tertiary)' }}>
                    <Phone className="w-3 h-3" style={{ color: 'var(--accent-tertiary)' }} /> Mobile:
                  </span>
                  <span className="font-mono" style={{ color: 'var(--accent-tertiary)' }}>{PORTFOLIO_DATA.personal.mobile}</span>
                </div>
              </div>
            </div>

          </motion.div>
        </div>

        {/* Centered Tech Stack Scrolling Marquee */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full flex flex-col gap-5 items-center justify-center text-center mt-6"
        >
          {/* Label */}
          <div className="flex items-center gap-3">
            <span className="h-px w-12 bg-linear-to-r from-transparent to-(--border-primary)" />
            <span className="text-xs sm:text-sm font-mono font-bold tracking-widest uppercase to-(--border-primary)">
              Core Tech Stack & Tools
            </span>
            <span className="h-px w-12 bg-linear-to-l from-transparent to-(--border-primary)" />
          </div>

          {/* Interactive Marquee Container */}
          <div
            className="w-full rounded-2xl py-6 px-4 overflow-hidden relative"
            style={{ 
              background: 'var(--bg-card)', 
              border: '1px solid var(--border-primary)', 
              boxShadow: 'var(--shadow-card)',
              backdropFilter: 'blur(10px)'
            }}
          >
            {/* Left fade mask */}
            <div
              className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(to right, var(--bg-card) 0%, transparent 100%)' }}
            />
            {/* Right fade mask */}
            <div
              className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(to left, var(--bg-card) 0%, transparent 100%)' }}
            />

            {/* Endless scrolling animation wrapper */}
            <div className="flex overflow-hidden w-full">
              <div className="flex gap-8 sm:gap-12 animate-marquee py-2 w-max">
                
                {/* First cycle of icons */}
                {FLOATING_TECH_ICONS.map((tech, idx) => {
                  const Icon = tech.icon;
                  return (
                    <div
                      key={`cycle1-${idx}`}
                      className="flex flex-col items-center gap-2 group cursor-pointer"
                    >
                      <div
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center bg-(--bg-elevated) border border-(--border-primary) transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-2 group-hover:border-(--accent-primary) group-hover:shadow-[0_8px_30px_rgba(249,115,22,0.15)]"
                      >
                        <Icon
                          className="w-8 h-8 sm:w-10 sm:h-10 transition-colors duration-300"
                          style={{ color: tech.color }}
                        />
                      </div>
                      <span
                        className="text-[11px] sm:text-xs font-semibold text-(--text-secondary) transition-colors duration-300 group-hover:text-(--text-heading)"
                      >
                        {tech.name}
                      </span>
                    </div>
                  );
                })}

                {/* Second cycle of icons for seamless endless scrolling */}
                {FLOATING_TECH_ICONS.map((tech, idx) => {
                  const Icon = tech.icon;
                  return (
                    <div
                      key={`cycle2-${idx}`}
                      className="flex flex-col items-center gap-2 group cursor-pointer"
                    >
                      <div
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center bg-(--bg-elevated) border border-(--border-primary) transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-2 group-hover:border-(--accent-primary) group-hover:shadow-[0_8px_30px_rgba(249,115,22,0.15)]"
                      >
                        <Icon
                          className="w-8 h-8 sm:w-10 sm:h-10 transition-colors duration-300"
                          style={{ color: tech.color }}
                        />
                      </div>
                      <span
                        className="text-[11px] sm:text-xs font-semibold text-(--text-secondary) transition-colors duration-300 group-hover:text-(--text-heading)"
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

      {/* Bottom Scroll Prompt */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 text-xs font-mono animate-bounce" style={{ color: 'var(--text-tertiary)' }}>
        <span>Scroll to Explore</span>
        <ChevronDown className="w-4 h-4" style={{ color: 'var(--accent-primary)' }} />
      </div>
    </section>
  );
}
