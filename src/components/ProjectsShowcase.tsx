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

  const categories = ['All', 'Full Stack', 'Frontend', 'AI / Tools'];

  const filteredProjects = selectedFilter === 'All'
    ? PORTFOLIO_DATA.projects
    : PORTFOLIO_DATA.projects.filter(p => p.category === selectedFilter);

  const CATEGORY_COLORS: Record<string, string> = {
    'Full Stack': '#f97316',
    'Frontend': '#14b8a6',
    'AI / Tools': '#a78bfa',
    'Mobile': '#f43f5e',
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-8 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">

        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3">
          <div className="section-badge">
            <Layers className="w-3.5 h-3.5" />
            <span>Featured Projects</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: 'var(--text-heading)' }}>
            Live Production <span className="gradient-text">Showcase</span>
          </h2>
          <p className="text-sm sm:text-base max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
            Real-world full-stack platforms, real-time WebSocket applications, geospatial search systems, and AI agent experiments.
          </p>

          {/* Filter Tabs */}
          <div
            className="flex flex-wrap justify-center gap-1 mt-3 p-1 rounded-xl"
            style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)' }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className="px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer"
                style={{
                  background: selectedFilter === cat ? 'var(--accent-primary)' : 'transparent',
                  color: selectedFilter === cat ? '#fff' : 'var(--text-tertiary)',
                  boxShadow: selectedFilter === cat ? '0 2px 8px rgba(249,115,22,0.25)' : 'none',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project: Project) => {
            const catColor = CATEGORY_COLORS[project.category] || 'var(--accent-primary)';
            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl overflow-hidden flex flex-col justify-between group"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-primary)', boxShadow: 'var(--shadow-card)' }}
              >
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, var(--bg-card) 0%, transparent 60%)' }}
                  />

                  {/* Category Badge */}
                  <div
                    className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md text-[11px] font-mono font-medium"
                    style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', color: catColor }}
                  >
                    {project.category}
                  </div>

                  {/* Inspect Button */}
                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: 'var(--accent-primary)', color: '#fff' }}
                  >
                    <Zap className="w-3 h-3" />
                    <span>Details</span>
                  </button>
                </div>

                {/* Body */}
                <div className="p-5 flex flex-col gap-3 flex-1 justify-between">
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-base font-bold" style={{ color: 'var(--text-heading)' }}>
                      {project.title}
                    </h3>
                    <p className="text-[11px] font-mono line-clamp-1" style={{ color: catColor }}>
                      {project.tagline}
                    </p>
                    <p className="text-xs leading-relaxed line-clamp-3 mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                      {project.description}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="flex flex-col gap-1 pt-1">
                    {project.highlights.slice(0, 2).map((hl, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[11px]" style={{ color: 'var(--text-tertiary)' }}>
                        <ShieldCheck className="w-3 h-3 shrink-0" style={{ color: 'var(--accent-success)' }} />
                        <span className="truncate">{hl}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded-md text-[10px] font-mono"
                        style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)', color: 'var(--text-secondary)' }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-3 flex items-center justify-between gap-2" style={{ borderTop: '1px solid var(--border-primary)' }}>
                    <div className="flex items-center gap-1.5">
                      {project.frontendUrl && (
                        <a
                          href={project.frontendUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 rounded-lg text-[11px] font-medium flex items-center gap-1 transition-all hover:scale-105"
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
                          className="px-2.5 py-1 rounded-lg text-[11px] font-medium flex items-center gap-1 transition-all hover:scale-105"
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
                          className="px-2.5 py-1 rounded-lg text-[11px] font-medium flex items-center gap-1 transition-all hover:scale-105"
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
                        className="p-1.5 rounded-lg transition-all hover:scale-105"
                        style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)', color: 'var(--text-secondary)' }}
                        title="GitHub Repository"
                      >
                        <SiGithub className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {activeModalProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
            onClick={() => setActiveModalProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="rounded-2xl max-w-2xl w-full p-6 sm:p-8 relative overflow-hidden flex flex-col gap-5 max-h-[85vh] overflow-y-auto"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', boxShadow: 'var(--shadow-card-hover)' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveModalProject(null)}
                className="absolute top-4 right-4 p-2 rounded-lg cursor-pointer"
                style={{ background: 'var(--bg-elevated)', color: 'var(--text-tertiary)', border: '1px solid var(--border-primary)' }}
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-mono uppercase tracking-wider" style={{ color: CATEGORY_COLORS[activeModalProject.category] || 'var(--accent-primary)' }}>
                  {activeModalProject.category}
                </span>
                <h3 className="text-2xl font-extrabold" style={{ color: 'var(--text-heading)' }}>{activeModalProject.title}</h3>
                <p className="text-sm font-mono" style={{ color: 'var(--text-secondary)' }}>{activeModalProject.tagline}</p>
              </div>

              <div className="rounded-xl overflow-hidden h-48 sm:h-56">
                <img src={activeModalProject.image} alt={activeModalProject.title} className="w-full h-full object-cover" />
              </div>

              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {activeModalProject.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeModalProject.highlights.map((hl, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 text-xs p-2.5 rounded-xl"
                    style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)', color: 'var(--text-secondary)' }}
                  >
                    <ShieldCheck className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: 'var(--accent-success)' }} />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {activeModalProject.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono"
                    style={{ background: 'var(--accent-primary-soft)', color: 'var(--accent-primary)', border: '1px solid var(--accent-primary-border)' }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="pt-3 flex flex-wrap gap-2" style={{ borderTop: '1px solid var(--border-primary)' }}>
                {activeModalProject.frontendUrl && (
                  <a href={activeModalProject.frontendUrl} target="_blank" rel="noopener noreferrer"
                    className="glass-button text-xs font-medium text-white px-4 py-2 rounded-lg flex items-center gap-1.5"
                  >
                    <Globe className="w-3.5 h-3.5" /> Open Frontend
                  </a>
                )}
                {activeModalProject.backendUrl && (
                  <a href={activeModalProject.backendUrl} target="_blank" rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5"
                    style={{ background: 'var(--accent-tertiary-soft)', color: 'var(--accent-tertiary)', border: '1px solid rgba(167,139,250,0.25)' }}
                  >
                    <Server className="w-3.5 h-3.5" /> Backend
                  </a>
                )}
                {activeModalProject.liveUrl && (
                  <a href={activeModalProject.liveUrl} target="_blank" rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5"
                    style={{ background: 'var(--accent-success-soft)', color: 'var(--accent-success)', border: '1px solid rgba(34,197,94,0.25)' }}
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Live App
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
