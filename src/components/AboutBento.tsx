'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Code2,
  Terminal,
  Trophy,
  ExternalLink,
  Cpu,
  Layers,
  Zap,
  CheckCircle2,
  BookOpen,
  Compass,
  Laptop,
  Flame,
  Binary,
  GraduationCap,
  Briefcase,
  Search,
  Filter,
} from 'lucide-react';
import { PORTFOLIO_DATA, SkillCategory } from '@/data/portfolioData';
import { TECH_ICON_MAP } from '@/components/TechIcons';
import EngineeringPillars from '@/components/EngineeringPillars';

type TabType = 'story' | 'skills' | 'dsa';

export default function AboutBento() {
  const [activeTab, setActiveTab] = useState<TabType>('story');
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<string>('All');
  const [skillSearchQuery, setSkillSearchQuery] = useState<string>('');
  const [selectedDsaPlatform, setSelectedDsaPlatform] = useState<number>(0);

  // Flatten skills or filter by category & search
  const allCategories = ['All', ...PORTFOLIO_DATA.skillCategories.map((c) => c.category)];

  const filteredSkills = PORTFOLIO_DATA.skillCategories.flatMap((cat) => {
    if (selectedSkillCategory !== 'All' && cat.category !== selectedSkillCategory) {
      return [];
    }
    return cat.skills.filter((skill) =>
      skill.name.toLowerCase().includes(skillSearchQuery.toLowerCase()) ||
      (skill.tag && skill.tag.toLowerCase().includes(skillSearchQuery.toLowerCase()))
    );
  });

  return (
    <section id="about" className="py-20 sm:py-28 px-4 sm:px-8 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-10 sm:gap-14">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center gap-3"
        >
          <div className="section-badge">
            <Compass className="w-3.5 h-3.5 text-(--accent-primary)" />
            <span>Interactive Engineering Hub</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight" style={{ color: 'var(--text-heading)' }}>
            Engineering Mindset & <span className="gradient-text">Core Capabilities</span>
          </h2>
          <p className="text-sm sm:text-base max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
            Explore my engineering philosophy, filter through production-ready technologies, and inspect algorithmic problem-solving milestones.
          </p>
        </motion.div>

        {/* Interactive Segmented Switcher */}
        <div className="flex justify-center">
          <div
            className="p-1.5 rounded-2xl flex items-center gap-1.5 sm:gap-2 backdrop-blur-xl border border-(--border-primary) max-w-full overflow-x-auto no-scrollbar"
            style={{ background: 'var(--bg-elevated)' }}
          >
            {[
              { id: 'story', label: 'Overview & Pillars', icon: Sparkles },
              { id: 'skills', label: 'Interactive Tech Stack', icon: Code2 },
              { id: 'dsa', label: 'DSA & Milestones', icon: Trophy },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className="relative px-3.5 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors duration-200 shrink-0 cursor-pointer"
                  style={{
                    color: isActive ? '#ffffff' : 'var(--text-secondary)',
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeAboutTab"
                      className="absolute inset-0 rounded-xl"
                      style={{
                        background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
                        boxShadow: '0 4px 20px -2px rgba(99, 102, 241, 0.4)',
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Tab View Content */}
        <AnimatePresence mode="wait">
          {/* ================= VIEW 1: STORY & PILLARS ================= */}
          {activeTab === 'story' && (
            <motion.div
              key="story"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-10 sm:gap-12"
            >
              {/* Fluid Editorial Bio & Career Highlights */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left: Refined Bio & Core Highlights */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-(--accent-primary-soft) text-(--accent-primary) border border-(--accent-primary-border)">
                      <Terminal className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--text-heading)' }}>
                        Building Resilient & Scalable Web Systems
                      </h3>
                      <p className="text-xs font-mono text-(--text-tertiary)">
                        Full-Stack Engineer • Problem Solver • Tech Explorer
                      </p>
                    </div>
                  </div>

                  <p className="text-base sm:text-lg leading-relaxed font-normal" style={{ color: 'var(--text-secondary)' }}>
                    {PORTFOLIO_DATA.personal.bio}
                  </p>

                  {/* Summary Capability Points */}
                  <div className="flex flex-col gap-2.5 pt-2">
                    {PORTFOLIO_DATA.personal.summaryBullets.map((bullet, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.08 }}
                        className="flex items-start gap-3 p-3 rounded-xl transition-all duration-200 hover:bg-(--bg-elevated) group"
                      >
                        <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-(--accent-success)" />
                        <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                          {bullet}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Right: Interactive Quick Context & Fast Stats */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                  <div
                    className="p-6 rounded-3xl backdrop-blur-xl border border-(--border-primary) flex flex-col gap-5"
                    style={{ background: 'var(--bg-card)' }}
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-(--border-primary)">
                      <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--text-heading)' }}>
                        <Briefcase className="w-4 h-4 text-(--accent-primary)" />
                        <span>Current Engagement</span>
                      </div>
                      <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-(--accent-success-soft) text-(--accent-success) border border-(--accent-success-border)">
                        Active
                      </span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-base font-bold" style={{ color: 'var(--text-heading)' }}>
                        Software Development Intern
                      </span>
                      <span className="text-xs text-(--text-secondary)">
                        Building end-to-end full-stack architectures & interactive responsive interfaces.
                      </span>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <div className="p-2.5 rounded-xl bg-(--bg-elevated) border border-(--border-primary) text-(--accent-secondary)">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-mono text-(--text-tertiary)">Academic Background</span>
                        <span className="text-sm font-semibold" style={{ color: 'var(--text-heading)' }}>
                          B.Tech in Computer Science & Eng.
                        </span>
                        <span className="text-xs text-(--text-secondary)">GGV Central University (8.5 CGPA)</span>
                      </div>
                    </div>

                    {/* Quick Metric Pills */}
                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-(--border-primary)">
                      <div className="flex flex-col">
                        <span className="text-2xl font-extrabold text-(--accent-primary)">800+</span>
                        <span className="text-xs font-mono text-(--text-secondary)">LeetCode Solved</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-2xl font-extrabold text-(--accent-secondary)">100+</span>
                        <span className="text-xs font-mono text-(--text-secondary)">GFG Solved</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Engineering Pillars - Complex Scroll-Triggered Orbital Reveal */}
              <EngineeringPillars />
            </motion.div>
          )}

          {/* ================= VIEW 2: INTERACTIVE TECH STACK ================= */}
          {activeTab === 'skills' && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-8"
            >
              {/* Category Filter Chips & Live Search Bar */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Horizontal Category Chips */}
                <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 no-scrollbar">
                  {allCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedSkillCategory(cat)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium shrink-0 transition-all cursor-pointer ${
                        selectedSkillCategory === cat
                          ? 'bg-(--accent-primary) text-white font-semibold shadow-md shadow-indigo-500/20'
                          : 'bg-(--bg-elevated) text-(--text-secondary) border border-(--border-primary) hover:text-(--text-primary)'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Search Input */}
                <div className="relative w-full md:w-64">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-(--text-tertiary)" />
                  <input
                    type="text"
                    value={skillSearchQuery}
                    onChange={(e) => setSkillSearchQuery(e.target.value)}
                    placeholder="Search stack or tags..."
                    className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-(--bg-elevated) border border-(--border-primary) text-(--text-primary) placeholder:text-(--text-tertiary) focus:outline-none focus:border-(--accent-primary)"
                  />
                </div>
              </div>

              {/* Dynamic Interactive Skills Matrix */}
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5"
              >
                <AnimatePresence>
                  {filteredSkills.map((skill, sIdx) => {
                    const iconConfig = TECH_ICON_MAP[skill.name];
                    const SkillIcon = iconConfig?.icon || Code2;
                    const brandColor = iconConfig?.color || 'var(--accent-primary)';

                    return (
                      <motion.div
                        key={skill.name}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2, delay: sIdx * 0.02 }}
                        whileHover={{ y: -3, scale: 1.01 }}
                        className="p-4 rounded-2xl border border-(--border-primary) flex flex-col justify-between gap-3 group transition-all duration-200 cursor-default"
                        style={{
                          background: 'var(--bg-elevated)',
                        }}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <div
                              className="w-9 h-9 rounded-xl flex items-center justify-center p-2 transition-transform duration-300 group-hover:scale-110"
                              style={{
                                background: 'var(--bg-card)',
                                border: '1px solid var(--border-primary)',
                                color: brandColor,
                              }}
                            >
                              <SkillIcon className="w-5 h-5 shrink-0" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-bold" style={{ color: 'var(--text-heading)' }}>
                                {skill.name}
                              </span>
                              {skill.tag && (
                                <span className="text-[10px] font-mono text-(--text-tertiary)">
                                  {skill.tag}
                                </span>
                              )}
                            </div>
                          </div>

                          <span className="text-xs font-mono font-bold text-(--accent-primary)">
                            {skill.level}%
                          </span>
                        </div>

                        {/* Interactive Proficiency Indicator */}
                        <div className="w-full h-1.5 rounded-full bg-(--bg-card) overflow-hidden border border-(--border-primary)">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            className="h-full rounded-full"
                            style={{
                              background: `linear-gradient(90deg, var(--accent-primary) 0%, ${brandColor} 100%)`,
                            }}
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}

          {/* ================= VIEW 3: DSA & PROBLEM SOLVING ================= */}
          {activeTab === 'dsa' && (
            <motion.div
              key="dsa"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-8"
            >
              {/* Platform Switcher Tabs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PORTFOLIO_DATA.competitiveProgramming.map((item, idx) => {
                  const isSelected = selectedDsaPlatform === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedDsaPlatform(idx)}
                      className={`p-5 sm:p-6 rounded-3xl border text-left transition-all duration-300 flex flex-col justify-between gap-4 cursor-pointer ${
                        isSelected
                          ? 'border-(--accent-primary) shadow-lg shadow-indigo-500/10'
                          : 'border-(--border-primary) hover:border-(--border-hover)'
                      }`}
                      style={{
                        background: isSelected ? 'var(--bg-elevated)' : 'var(--bg-card)',
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                            <Trophy className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-base font-bold" style={{ color: 'var(--text-heading)' }}>
                              {item.platform}
                            </h4>
                            <span className="text-xs font-mono text-(--accent-success)">
                              {item.badge}
                            </span>
                          </div>
                        </div>

                        <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">
                          {item.solved}
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-(--border-primary) text-xs">
                        <span style={{ color: 'var(--text-tertiary)' }}>Click to inspect topic coverage</span>
                        <span className="font-semibold text-(--accent-primary) flex items-center gap-1">
                          {isSelected ? 'Currently Viewing' : 'Select'}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Selected Platform Deep Dive */}
              {(() => {
                const current = PORTFOLIO_DATA.competitiveProgramming[selectedDsaPlatform];
                return (
                  <motion.div
                    key={selectedDsaPlatform}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 sm:p-8 rounded-3xl border border-(--border-primary) flex flex-col gap-6"
                    style={{ background: 'var(--bg-elevated)' }}
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-(--border-primary)">
                      <div className="flex items-center gap-3">
                        <Binary className="w-6 h-6 text-(--accent-primary)" />
                        <div>
                          <h4 className="text-lg font-bold" style={{ color: 'var(--text-heading)' }}>
                            {current.platform} Problem Solving Focus
                          </h4>
                          <p className="text-xs font-mono text-(--text-secondary)">
                            Core Language: <span className="text-(--accent-primary) font-bold">C++ with Standard Template Library (STL)</span>
                          </p>
                        </div>
                      </div>

                      <a
                        href={current.profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all hover:scale-105"
                        style={{
                          background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
                          color: '#ffffff',
                        }}
                      >
                        <span>Verify {current.platform} Profile</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    {/* Topic Tags */}
                    <div className="flex flex-col gap-3">
                      <span className="text-xs font-mono text-(--text-tertiary)">
                        Key Algorithmic Topics & Data Structures Handled:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {current.topics.map((topic, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-3 py-1.5 rounded-xl text-xs font-mono font-medium border border-(--border-primary) transition-all hover:border-(--accent-primary)"
                            style={{
                              background: 'var(--bg-card)',
                              color: 'var(--text-primary)',
                            }}
                          >
                            ⚡ {topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Algorithmic Methodology */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                      <div className="p-3.5 rounded-2xl bg-(--bg-card) border border-(--border-primary) flex flex-col gap-1">
                        <span className="text-xs font-mono text-(--text-tertiary)">Optimal Complexity</span>
                        <span className="text-sm font-bold" style={{ color: 'var(--text-heading)' }}>O(N log N) & O(N)</span>
                        <span className="text-[11px] text-(--text-secondary)">Strict space & time boundaries</span>
                      </div>
                      <div className="p-3.5 rounded-2xl bg-(--bg-card) border border-(--border-primary) flex flex-col gap-1">
                        <span className="text-xs font-mono text-(--text-tertiary)">C++ STL Tools</span>
                        <span className="text-sm font-bold" style={{ color: 'var(--text-heading)' }}>Vectors, Maps, Sets</span>
                        <span className="text-[11px] text-(--text-secondary)">Custom comparators & heaps</span>
                      </div>
                      <div className="p-3.5 rounded-2xl bg-(--bg-card) border border-(--border-primary) flex flex-col gap-1">
                        <span className="text-xs font-mono text-(--text-tertiary)">Problem Versatility</span>
                        <span className="text-sm font-bold" style={{ color: 'var(--text-heading)' }}>Graph, DP, Trees</span>
                        <span className="text-[11px] text-(--text-secondary)">800+ verified test cases</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
