'use client';

import { motion } from 'framer-motion';
import {
  User,
  GraduationCap,
  CheckCircle2,
  Trophy,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

export default function AboutBento() {
  return (
    <section id="about" className="py-20 px-4 sm:px-8 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-3">
          <div className="section-badge">
            <User className="w-3.5 h-3.5" />
            <span>Developer Overview</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: 'var(--text-heading)' }}>
            About Me & <span className="gradient-text">Core Competencies</span>
          </h2>
          <p className="text-sm sm:text-base max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
            Passionate software engineer bridging high-performance web systems, mobile architectures, and competitive algorithm design.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">

          {/* Card 1: About (8 cols) */}
          <div
            className="md:col-span-8 rounded-2xl p-6 sm:p-7 flex flex-col gap-5"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-primary)', boxShadow: 'var(--shadow-card)' }}
          >
            <div className="flex items-center gap-3">
              <div
                className="p-2.5 rounded-xl"
                style={{ background: 'var(--accent-primary-soft)', border: '1px solid var(--accent-primary-border)', color: 'var(--accent-primary)' }}
              >
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold" style={{ color: 'var(--text-heading)' }}>Professional & Academic Identity</h3>
                <p className="text-xs font-mono" style={{ color: 'var(--text-tertiary)' }}>Internship & Academic Excellence</p>
              </div>
            </div>

            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {PORTFOLIO_DATA.personal.bio}
            </p>

            {/* Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {PORTFOLIO_DATA.personal.summaryBullets.map((bullet, index) => (
                <div key={index} className="flex items-start gap-2 text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'var(--accent-success)' }} />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Competitive Programming (4 cols) */}
          <div
            className="md:col-span-4 rounded-2xl p-6 flex flex-col gap-5"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-primary)', boxShadow: 'var(--shadow-card)' }}
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl" style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.3)', color: '#fbbf24' }}>
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold" style={{ color: 'var(--text-heading)' }}>Competitive Programming</h3>
                <p className="text-xs font-mono" style={{ color: '#fbbf24' }}>C++ DSA</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {PORTFOLIO_DATA.competitiveProgramming.map((item, idx) => (
                <a
                  key={idx}
                  href={item.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl flex flex-col gap-1 group transition-all hover:scale-[1.02]"
                  style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)' }}
                >
                  <span className="text-[11px] font-medium" style={{ color: 'var(--text-tertiary)' }}>{item.platform}</span>
                  <span className="text-lg font-extrabold" style={{ color: '#fbbf24' }}>{item.solved}</span>
                  <span className="text-[10px] font-mono" style={{ color: 'var(--accent-success)' }}>{item.badge}</span>
                </a>
              ))}
            </div>

            {/* Topics */}
            <div className="flex flex-wrap gap-1.5">
              {PORTFOLIO_DATA.competitiveProgramming[0].topics.map((topic, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-md text-[10px] font-mono"
                  style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.15)', color: '#fbbf24' }}
                >
                  {topic}
                </span>
              ))}
            </div>

            <div className="pt-2 text-xs flex items-center justify-between" style={{ borderTop: '1px solid var(--border-primary)', color: 'var(--text-tertiary)' }}>
              <span>Primary Language:</span>
              <span className="font-bold font-mono" style={{ color: 'var(--accent-primary)' }}>C++ (Modern STL)</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
