'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Layers,
  Server,
  Zap,
  X,
  Globe,
  Radio,
  ShieldCheck
} from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { PORTFOLIO_DATA, Project } from '@/data/portfolioData';

export default function ProjectsShowcase() {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = ['All', 'Full Stack', 'Frontend'];

  const filteredProjects = selectedFilter === 'All'
    ? PORTFOLIO_DATA.projects
    : PORTFOLIO_DATA.projects.filter(p => p.category === selectedFilter);

  const CATEGORY_COLORS: Record<string, string> = {
    'Full Stack': 'var(--accent-primary)',
    'Frontend': 'var(--accent-secondary)',
    'AI / Tools': 'var(--accent-tertiary)',
    'Mobile': '#f43f5e',
  };

  return (
    <section id="projects" className="py-24 px-4 sm:px-8 relative z-10">
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
            <Layers className="w-3.5 h-3.5" />
            <span>Featured Projects</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: 'var(--text-heading)' }}>
            Live Production <span className="gradient-text">Showcase</span>
          </h2>
          <p className="text-sm sm:text-base max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
            Real-world full-stack platforms, real-time WebSocket applications, and geospatial search systems engineered with modern architectures.
          </p>

          {/* Filter Tabs */}
          <div
            className="flex flex-wrap justify-center gap-1.5 mt-3 p-1.5 rounded-2xl"
            style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)' }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className="relative px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer"
                style={{
                  background: selectedFilter === cat ? 'var(--accent-primary)' : 'transparent',
                  color: selectedFilter === cat ? '#fff' : 'var(--text-tertiary)',
                  boxShadow: selectedFilter === cat ? '0 4px 12px rgba(249,115,22,0.3)' : 'none',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
        >
          <AnimatePresence>
            {filteredProjects.map((project: Project, idx: number) => {
              const catColor = CATEGORY_COLORS[project.category] || 'var(--accent-primary)';
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="rounded-3xl overflow-hidden flex flex-col justify-between group glass-card-glow preserve-3d"
                  style={{ 
                    background: 'var(--bg-card)', 
                    border: '1px solid var(--border-primary)', 
                    boxShadow: 'var(--shadow-card)',
                  }}
                >
                  {/* Image Container with Specular Overlay */}
                  <div className="relative h-52 w-full overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(to top, var(--bg-card) 0%, transparent 60%)' }}
                    />

                    {/* Category Badge */}
                    <div
                      className="absolute top-3.5 left-3.5 px-3 py-1 rounded-lg text-[11px] font-mono font-medium backdrop-blur-md"
                      style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', color: catColor }}
                    >
                      {project.category}
                    </div>

                    {/* Quick Inspect Button */}
                    <button
                      onClick={() => setActiveModalProject(project)}
                      className="absolute bottom-3.5 right-3.5 px-3.5 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg translate-y-2 group-hover:translate-y-0"
                      style={{ background: 'var(--accent-primary)', color: '#fff' }}
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </button>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex flex-col gap-4 flex-1 justify-between">
                    <div className="flex flex-col gap-1.5">
                      <h3 className="text-lg font-bold" style={{ color: 'var(--text-heading)' }}>
                        {project.title}
                      </h3>
                      <p className="text-[11px] font-mono line-clamp-1" style={{ color: catColor }}>
                        {project.tagline}
                      </p>
                      <p className="text-xs leading-relaxed line-clamp-3 mt-1" style={{ color: 'var(--text-secondary)' }}>
                        {project.description}
                      </p>
                    </div>

                    {/* Highlights */}
                    <div className="flex flex-col gap-1.5 pt-1">
                      {project.highlights.slice(0, 2).map((hl, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-2 text-[11px]" style={{ color: 'var(--text-tertiary)' }}>
                          <ShieldCheck className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--accent-success)' }} />
                          <span className="truncate">{hl}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.techStack.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-0.5 rounded-md text-[10px] font-mono"
                          style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)', color: 'var(--text-secondary)' }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-4 flex items-center justify-between gap-2 border-t border-(--border-primary)">
                      <div className="flex items-center gap-2">
                        {project.frontendUrl && (
                          <a
                            href={project.frontendUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all hover:scale-105"
                            style={{ background: 'var(--accent-primary-soft)', color: 'var(--accent-primary)', border: '1px solid var(--accent-primary-border)' }}
                          >
                            <Globe className="w-3 h-3" /> Frontend
                          </a>
                        )}
                        {project.backendUrl && (
                          <a
                            href={project.backendUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all hover:scale-105"
                            style={{ background: 'var(--accent-tertiary-soft)', color: 'var(--accent-tertiary)', border: '1px solid rgba(167,139,250,0.25)' }}
                          >
                            <Server className="w-3 h-3" /> Backend
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all hover:scale-105"
                            style={{ background: 'var(--accent-success-soft)', color: 'var(--accent-success)', border: '1px solid rgba(34,197,94,0.25)' }}
                          >
                            <Radio className="w-3 h-3" /> Live
                          </a>
                        )}
                      </div>

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg transition-all hover:scale-108"
                          style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)', color: 'var(--text-secondary)' }}
                          title="GitHub Repository"
                        >
                          <SiGithub className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {activeModalProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(12px)' }}
            onClick={() => setActiveModalProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative overflow-hidden flex flex-col gap-5 max-h-[85vh] overflow-y-auto glass-panel"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', boxShadow: 'var(--shadow-card-hover)' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveModalProject(null)}
                className="absolute top-4 right-4 p-2.5 rounded-xl cursor-pointer hover:bg-(--bg-card) transition-colors"
                style={{ background: 'var(--bg-elevated)', color: 'var(--text-tertiary)', border: '1px solid var(--border-primary)' }}
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-col gap-1.5 pr-8">
                <span className="text-xs font-mono uppercase tracking-wider font-semibold" style={{ color: CATEGORY_COLORS[activeModalProject.category] || 'var(--accent-primary)' }}>
                  {activeModalProject.category}
                </span>
                <h3 className="text-2xl font-extrabold" style={{ color: 'var(--text-heading)' }}>{activeModalProject.title}</h3>
                <p className="text-sm font-mono" style={{ color: 'var(--text-secondary)' }}>{activeModalProject.tagline}</p>
              </div>

              <div className="rounded-2xl overflow-hidden h-52 sm:h-64 relative">
                <img src={activeModalProject.image} alt={activeModalProject.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {activeModalProject.description}
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeModalProject.highlights.map((hl, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 text-xs p-3 rounded-2xl"
                    style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)', color: 'var(--text-secondary)' }}
                  >
                    <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--accent-success)' }} />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2 pt-1">
                {activeModalProject.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg text-xs font-mono"
                    style={{ background: 'var(--accent-primary-soft)', color: 'var(--accent-primary)', border: '1px solid var(--accent-primary-border)' }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap gap-2.5 border-t border-(--border-primary)">
                {activeModalProject.frontendUrl && (
                  <a href={activeModalProject.frontendUrl} target="_blank" rel="noopener noreferrer"
                    className="glass-button text-xs font-medium text-white px-5 py-2.5 rounded-xl flex items-center gap-1.5"
                  >
                    <Globe className="w-3.5 h-3.5" /> Launch Frontend
                  </a>
                )}
                {activeModalProject.backendUrl && (
                  <a href={activeModalProject.backendUrl} target="_blank" rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all hover:scale-105"
                    style={{ background: 'var(--accent-tertiary-soft)', color: 'var(--accent-tertiary)', border: '1px solid rgba(167,139,250,0.25)' }}
                  >
                    <Server className="w-3.5 h-3.5" /> Backend API
                  </a>
                )}
                {activeModalProject.liveUrl && (
                  <a href={activeModalProject.liveUrl} target="_blank" rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all hover:scale-105"
                    style={{ background: 'var(--accent-success-soft)', color: 'var(--accent-success)', border: '1px solid rgba(34,197,94,0.25)' }}
                  >
                    <Radio className="w-3.5 h-3.5" /> Live Production
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

