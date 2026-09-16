'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, CheckCircle2, Award, Briefcase, GraduationCap } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

export default function Timeline() {
  const [activeTab, setActiveTab] = useState<'All' | 'Work Experience' | 'Education & Certifications'>('All');

  const filteredTimeline = activeTab === 'All'
    ? PORTFOLIO_DATA.experienceTimeline
    : PORTFOLIO_DATA.experienceTimeline.filter(item => item.type === activeTab);

  return (
    <section id="timeline" className="py-24 px-4 sm:px-8 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-14">

        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center gap-3"
        >
          <div className="section-badge">
            <Award className="w-3.5 h-3.5" />
            <span>Career Roadmap</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: 'var(--text-heading)' }}>
            Experience & <span className="gradient-text">Milestones</span>
          </h2>
          <p className="text-sm sm:text-base max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
            My professional trajectory spanning full-stack software development internships and academic computer science foundations.
          </p>

          {/* Filter Tabs */}
          <div
            className="flex flex-wrap justify-center gap-1.5 mt-3 p-1.5 rounded-2xl"
            style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)' }}
          >
            {(['All', 'Work Experience', 'Education & Certifications'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer"
                style={{
                  background: activeTab === tab ? 'var(--accent-primary)' : 'transparent',
                  color: activeTab === tab ? '#fff' : 'var(--text-tertiary)',
                  boxShadow: activeTab === tab ? '0 4px 12px rgba(249,115,22,0.3)' : 'none',
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Timeline Container with Laser Connector Line */}
        <div
          className="max-w-4xl mx-auto w-full flex flex-col gap-8 relative pl-6 sm:pl-10"
        >
          {/* Laser vertical spine */}
          <div 
            className="absolute left-2 sm:left-3.5 top-3 bottom-3 w-0.5 rounded-full"
            style={{
              background: 'linear-gradient(to bottom, var(--accent-primary) 0%, var(--accent-secondary) 50%, var(--accent-tertiary) 100%)',
              boxShadow: '0 0 12px rgba(249,115,22,0.4)',
            }}
          />

          <AnimatePresence>
            {filteredTimeline.map((item, idx) => {
              const isWork = item.type === 'Work Experience';
              const Icon = isWork ? Briefcase : GraduationCap;
              return (
                <motion.div
                  key={idx}
                  layout
                  initial={{ opacity: 0, x: -25, y: 15 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="relative group"
                >
                  {/* Timeline Glowing Node */}
                  <div
                    className="absolute -left-6 sm:-left-9.5 top-3 w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-125 z-10"
                    style={{
                      background: 'var(--bg-primary)',
                      border: `2px solid ${isWork ? 'var(--accent-primary)' : 'var(--accent-secondary)'}`,
                      boxShadow: `0 0 14px ${isWork ? 'rgba(249,115,22,0.4)' : 'rgba(20,184,166,0.4)'}`,
                    }}
                  >
                    <div 
                      className="w-2 h-2 rounded-full animate-ping" 
                      style={{ background: isWork ? 'var(--accent-primary)' : 'var(--accent-secondary)' }} 
                    />
                  </div>

                  {/* Glass Card */}
                  <div
                    className="rounded-3xl p-6 sm:p-7 flex flex-col gap-4 glass-card-glow transition-all duration-300"
                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border-primary)', boxShadow: 'var(--shadow-card)' }}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2.5">
                      <div className="flex items-center gap-2">
                        <span
                          className="px-3 py-1 rounded-lg text-xs font-mono flex items-center gap-1.5"
                          style={{ background: 'var(--accent-primary-soft)', color: 'var(--accent-primary)', border: '1px solid var(--accent-primary-border)' }}
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          {item.period}
                        </span>
                        <span
                          className="px-3 py-1 rounded-lg text-xs font-mono flex items-center gap-1.5"
                          style={{ 
                            background: isWork ? 'var(--accent-secondary-soft)' : 'var(--accent-tertiary-soft)', 
                            color: isWork ? 'var(--accent-secondary)' : 'var(--accent-tertiary)',
                            border: `1px solid ${isWork ? 'var(--accent-secondary-border)' : 'rgba(167,139,250,0.25)'}`
                          }}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          {item.type}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-(--text-tertiary)">
                        {item.organization}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <h3 className="text-lg sm:text-xl font-bold" style={{ color: 'var(--text-heading)' }}>
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {item.description}
                      </p>
                    </div>

                    {/* Skills pills */}
                    <div className="flex flex-wrap gap-2 pt-3 border-t border-(--border-primary)">
                      {item.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-1 rounded-lg text-xs font-mono flex items-center gap-1.5"
                          style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)', color: 'var(--text-secondary)' }}
                        >
                          <CheckCircle2 className="w-3 h-3 text-(--accent-success)" />
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

