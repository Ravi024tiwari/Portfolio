'use client';

import { ArrowUp, Code, Award, Mail } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 py-10 px-4 sm:px-8" style={{ borderTop: '1px solid var(--border-primary)', background: 'var(--bg-secondary)' }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">

        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs"
            style={{ background: 'var(--accent-primary)' }}
          >
            RT
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm" style={{ color: 'var(--text-heading)' }}>{PORTFOLIO_DATA.personal.name}</span>
            <span className="text-[11px] font-mono" style={{ color: 'var(--text-tertiary)' }}>Full-Stack Software Developer</span>
          </div>
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--text-tertiary)' }}>
          <a href={PORTFOLIO_DATA.personal.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 transition-colors hover:opacity-80">
            <SiGithub className="w-3.5 h-3.5" /> GitHub
          </a>
          <a href={PORTFOLIO_DATA.personal.leetcode} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 transition-colors hover:opacity-80">
            <Code className="w-3.5 h-3.5" style={{ color: '#FFA116' }} /> LeetCode
          </a>
          <a href={PORTFOLIO_DATA.personal.gfg} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 transition-colors hover:opacity-80">
            <Award className="w-3.5 h-3.5" style={{ color: '#2F8D46' }} /> GFG
          </a>
          <a href={`mailto:${PORTFOLIO_DATA.personal.email}`} className="flex items-center gap-1 transition-colors hover:opacity-80">
            <Mail className="w-3.5 h-3.5" style={{ color: 'var(--accent-primary)' }} /> Email
          </a>
        </div>

        {/* Copyright + Back to Top */}
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono" style={{ color: 'var(--text-tertiary)' }}>
            © {new Date().getFullYear()} {PORTFOLIO_DATA.personal.name}
          </span>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg transition-all hover:scale-105 cursor-pointer"
            style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)', color: 'var(--accent-primary)' }}
            title="Back to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
