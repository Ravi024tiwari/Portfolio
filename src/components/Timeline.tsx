'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle2, Award } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

export default function Timeline() {
  const [activeTab, setActiveTab] = useState<'All' | 'Work Experience' | 'Education & Certifications'>('All');

  const filteredTimeline = activeTab === 'All'
    ? PORTFOLIO_DATA.experienceTimeline
    : PORTFOLIO_DATA.experienceTimeline.filter(item => item.type === activeTab);

  return (
    <section id="timeline" className="py-20 px-4 sm:px-8 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-3">
          <div className="section-badge">
            <Award className="w-3.5 h-3.5" />
            <span>Career Roadmap</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: 'var(--text-heading)' }}>
            Experience & <span className="gradient-text">Certifications</span>
          </h2>
          <p className="text-sm sm:text-base max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
            My professional journey across full-stack engineering internships and specialized academic studies.
          </p>

          {/* Filter Tabs */}
          <div
            className="flex gap-1 mt-3 p-1 rounded-xl"
            style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)' }}
          >
            {(['All', 'Work Experience', 'Education & Certifications'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer"
                style={{
                  background: activeTab === tab ? 'var(--accent-primary)' : 'transparent',
                  color: activeTab === tab ? '#fff' : 'var(--text-tertiary)',
                  boxShadow: activeTab === tab ? '0 2px 8px rgba(249,115,22,0.25)' : 'none',
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Container */}
        <div
          className="max-w-4xl mx-auto w-full flex flex-col gap-7 relative pl-6 sm:pl-8"
          style={{ borderLeft: '2px solid var(--border-primary)' }}
        >
          {filteredTimeline.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              viewport={{ once: true }}
              className="relative group"
            >
              {/* Timeline Node */}
              <div
                className="absolute -left-7.25 sm:-left-9.25 top-2 w-5 h-5 rounded-full flex items-center justify-center transition-all group-hover:scale-125"
                style={{
                  background: 'var(--bg-primary)',
                  border: '2px solid var(--accent-primary)',
                  boxShadow: '0 0 10px rgba(249,115,22,0.2)',
                }}
              >
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--accent-primary)' }} />
              </div>

              {/* Card */}
              <div
                className="rounded-2xl p-5 sm:p-6 flex flex-col gap-3 transition-all"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-primary)', boxShadow: 'var(--shadow-card)' }}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="px-2.5 py-0.5 rounded-md text-[11px] font-mono flex items-center gap-1"
                    style={{ background: 'var(--accent-primary-soft)', color: 'var(--accent-primary)', border: '1px solid var(--accent-primary-border)' }}
                  >
                    <Calendar className="w-3 h-3" />
                    {item.period}
                  </span>
                  <span
                    className="px-2.5 py-0.5 rounded-md text-[11px] font-mono"
                    style={{ background: 'var(--accent-tertiary-soft)', color: 'var(--accent-tertiary)', border: '1px solid rgba(167,139,250,0.2)' }}
                  >
                    {item.type}
                  </span>
                  <span className="text-[11px] font-mono ml-auto" style={{ color: 'var(--text-tertiary)' }}>
                    {item.organization}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-bold" style={{ color: 'var(--text-heading)' }}>
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {item.description}
                  </p>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5 pt-2" style={{ borderTop: '1px solid var(--border-primary)' }}>
                  {item.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 rounded-md text-[11px] font-mono flex items-center gap-1"
                      style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)', color: 'var(--text-secondary)' }}
                    >
                      <CheckCircle2 className="w-2.5 h-2.5" style={{ color: 'var(--accent-success)' }} />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
