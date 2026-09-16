'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Layers,
  Server,
  Zap,
  X,
  Globe,
  Radio,
  ShieldCheck,
  ArrowUpRight,
  Sparkles,
  Code2,
} from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { PORTFOLIO_DATA, Project } from '@/data/portfolioData';

// Dynamic theme aesthetics per project for unique visual distinction
const PROJECT_THEMES: Record<string, {
  accent: string;
  glow: string;
  gradient: string;
  borderColor: string;
  borderHover: string;
}> = {
  'campushire': {
    accent: '#6366f1',
    glow: 'rgba(99, 102, 241, 0.35)',
    gradient: 'from-indigo-500/25 via-sky-500/10 to-transparent',
    borderColor: 'rgba(99, 102, 241, 0.3)',
    borderHover: 'rgba(99, 102, 241, 0.65)',
  },
  'local-service-management': {
    accent: '#f97316',
    glow: 'rgba(249, 115, 22, 0.35)',
    gradient: 'from-orange-500/25 via-amber-500/10 to-transparent',
    borderColor: 'rgba(249, 115, 22, 0.3)',
    borderHover: 'rgba(249, 115, 22, 0.65)',
  },
  'aura-chat-app': {
    accent: '#a855f7',
    glow: 'rgba(168, 85, 247, 0.35)',
    gradient: 'from-purple-500/25 via-pink-500/10 to-transparent',
    borderColor: 'rgba(168, 85, 247, 0.3)',
    borderHover: 'rgba(168, 85, 247, 0.65)',
  },
  'library-management': {
    accent: '#10b981',
    glow: 'rgba(16, 185, 129, 0.35)',
    gradient: 'from-emerald-500/25 via-teal-500/10 to-transparent',
    borderColor: 'rgba(16, 185, 129, 0.3)',
    borderHover: 'rgba(16, 185, 129, 0.65)',
  },
};

const DEFAULT_THEME = {
  accent: '#3b82f6',
  glow: 'rgba(59, 130, 246, 0.35)',
  gradient: 'from-blue-500/25 via-cyan-500/10 to-transparent',
  borderColor: 'rgba(59, 130, 246, 0.3)',
  borderHover: 'rgba(59, 130, 246, 0.65)',
};

/**
 * Highly interactive Project Card with Cursor Spotlight & 3D Tilt Dynamics
 */
function InteractiveProjectCard({
  project,
  idx,
  onOpenModal,
}: {
  project: Project;
  idx: number;
  onOpenModal: (p: Project) => void;
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const theme = PROJECT_THEMES[project.id] || DEFAULT_THEME;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.94, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: 30 }}
      transition={{ duration: 0.45, delay: idx * 0.09, ease: [0.16, 1, 0.3, 1] }}
      className="relative group h-full [transform-style:preserve-3d]"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{
          y: -8,
          scale: 1.015,
          transition: { type: 'spring', stiffness: 350, damping: 24 },
        }}
        className="relative h-full rounded-3xl overflow-hidden border flex flex-col justify-between transition-all duration-300 select-none shadow-xl"
        style={{
          background: 'var(--bg-card)',
          borderColor: isHovered ? theme.borderHover : 'var(--border-primary)',
          backdropFilter: 'blur(16px)',
          boxShadow: isHovered
            ? `0 24px 48px -12px ${theme.glow}, 0 0 0 1px ${theme.borderHover}`
            : 'var(--shadow-card)',
        }}
      >
        {/* Dynamic Interactive Cursor Spotlight */}
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${theme.glow}, transparent 70%)`,
          }}
        />

        {/* Ambient Corner Blob */}
        <div
          className={`absolute top-0 right-0 w-44 h-44 bg-gradient-to-br ${theme.gradient} rounded-full blur-3xl pointer-events-none opacity-40 group-hover:opacity-90 transition-opacity duration-500`}
        />

        {/* Top Image Preview with Shine Sweep & Quick Inspect Button */}
        <div className="relative h-56 sm:h-64 w-full overflow-hidden shrink-0" style={{ background: 'var(--bg-elevated)' }}>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
          />

          {/* Gradient Darkness Overlay */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, var(--bg-card) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)' }}
          />

          {/* Shimmer Light Sweep on Hover */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

          {/* Top Floating Badges */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
            {/* Category Badge */}
            <div
              className="px-3 py-1.5 rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5 backdrop-blur-md shadow-md"
              style={{
                background: 'rgba(15, 23, 42, 0.75)',
                border: `1px solid ${theme.borderColor}`,
                color: theme.accent,
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{project.category}</span>
            </div>

            {/* Live Radar Pulse Badge */}
            {project.liveUrl && (
              <div
                className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-2 backdrop-blur-md shadow-md"
                style={{
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(34, 197, 94, 0.4)',
                  color: '#22c55e',
                }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="tracking-wide">LIVE</span>
              </div>
            )}
          </div>

          {/* Quick Details Trigger Button */}
          <button
            onClick={() => onOpenModal(project)}
            className="absolute bottom-4 right-4 px-4 py-2 rounded-xl text-xs font-mono font-semibold flex items-center gap-2 cursor-pointer opacity-90 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl translate-y-0 sm:translate-y-2 group-hover:translate-y-0 z-20 hover:scale-105 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
              color: '#ffffff',
              boxShadow: `0 8px 20px -4px ${theme.glow}`,
            }}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Architecture & Details</span>
          </button>
        </div>

        {/* Card Body & Content */}
        <div className="relative z-10 p-6 sm:p-7 flex flex-col gap-5 flex-1 justify-between">
          <div className="flex flex-col gap-2.5">
            <h3
              className="text-lg sm:text-xl font-bold tracking-tight group-hover:text-(--accent-primary) transition-colors duration-200"
              style={{ color: 'var(--text-heading)' }}
            >
              {project.title}
            </h3>

            <p
              className="text-xs sm:text-[13px] font-mono font-medium line-clamp-1"
              style={{ color: theme.accent }}
            >
              {project.tagline}
            </p>

            <p
              className="text-xs sm:text-sm leading-relaxed line-clamp-3 pt-1"
              style={{ color: 'var(--text-secondary)' }}
            >
              {project.description}
            </p>
          </div>

          {/* Highlights Checklist */}
          <div className="flex flex-col gap-2 pt-1">
            {project.highlights.slice(0, 2).map((hl, hIdx) => (
              <div
                key={hIdx}
                className="flex items-start gap-2.5 text-xs sm:text-[13px] leading-snug p-2.5 rounded-xl border border-transparent group-hover:border-(--border-primary)/50 group-hover:bg-(--bg-elevated)/40 transition-all duration-200"
                style={{ color: 'var(--text-secondary)' }}
              >
                <ShieldCheck
                  className="w-4 h-4 shrink-0 mt-0.5"
                  style={{ color: theme.accent }}
                />
                <span className="line-clamp-2">{hl}</span>
              </div>
            ))}
          </div>

          {/* Technology Stack Pills */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.techStack.map((tech, tIdx) => (
              <span
                key={tIdx}
                className="px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-mono border border-(--border-primary) transition-all duration-200 hover:scale-105 hover:border-(--border-hover)"
                style={{
                  background: 'var(--bg-elevated)',
                  color: 'var(--text-primary)',
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Bottom Action Buttons */}
          <div className="pt-4 flex items-center justify-between gap-3 border-t border-(--border-primary)">
            <div className="flex items-center gap-2.5 flex-wrap">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn px-4 py-2 rounded-xl text-xs font-mono font-semibold flex items-center gap-2 transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
                  style={{
                    background: 'rgba(34, 197, 94, 0.12)',
                    color: '#22c55e',
                    border: '1px solid rgba(34, 197, 94, 0.35)',
                  }}
                >
                  <Radio className="w-3.5 h-3.5 animate-pulse" />
                  <span>Live Production</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </a>
              )}

              {project.frontendUrl && (
                <a
                  href={project.frontendUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl text-xs font-mono font-medium flex items-center gap-1.5 transition-all hover:scale-105"
                  style={{
                    background: 'var(--accent-primary-soft)',
                    color: 'var(--accent-primary)',
                    border: '1px solid var(--accent-primary-border)',
                  }}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Frontend</span>
                </a>
              )}

              {project.backendUrl && (
                <a
                  href={project.backendUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl text-xs font-mono font-medium flex items-center gap-1.5 transition-all hover:scale-105"
                  style={{
                    background: 'var(--accent-tertiary-soft)',
                    color: 'var(--accent-tertiary)',
                    border: '1px solid rgba(167,139,250,0.25)',
                  }}
                >
                  <Server className="w-3.5 h-3.5" />
                  <span>Backend</span>
                </a>
              )}
            </div>

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border border-(--border-primary) hover:border-(--accent-primary) transition-all duration-200 hover:scale-110 active:scale-95 flex items-center justify-center shadow-sm cursor-pointer"
                style={{
                  background: 'var(--bg-elevated)',
                  color: 'var(--text-primary)',
                }}
                title="View GitHub Repository"
              >
                <SiGithub className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/**
 * Production Showcase Parent Section with Filter Chips & Interactive Detail Modal
 */
export default function ProjectsShowcase() {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = ['All', 'Full Stack', 'Frontend'];

  const filteredProjects = selectedFilter === 'All'
    ? PORTFOLIO_DATA.projects
    : PORTFOLIO_DATA.projects.filter(p => p.category === selectedFilter);

  return (
    <section id="projects" className="py-24 px-4 sm:px-8 relative z-10 select-none">
      <div className="max-w-6xl mx-auto flex flex-col gap-14">

        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center gap-3.5"
        >
          <div className="section-badge">
            <Layers className="w-3.5 h-3.5" />
            <span>Featured Engineering Work</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight" style={{ color: 'var(--text-heading)' }}>
            Live Production <span className="gradient-text">Showcase</span>
          </h2>

          <p className="text-sm sm:text-base max-w-2xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Enterprise platforms, AI-driven automation systems, real-time WebSockets, and geospatial architectures engineered for scale.
          </p>

          {/* Category Filter Chips */}
          <div
            className="flex flex-wrap justify-center gap-1.5 mt-4 p-1.5 rounded-2xl border"
            style={{
              background: 'var(--bg-elevated)',
              borderColor: 'var(--border-primary)',
            }}
          >
            {categories.map((cat) => {
              const isSelected = selectedFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedFilter(cat)}
                  className="relative px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer"
                  style={{
                    background: isSelected ? 'var(--accent-primary)' : 'transparent',
                    color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                    boxShadow: isSelected ? '0 4px 14px rgba(99, 102, 241, 0.35)' : 'none',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Responsive Interactive 2-Column Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-7 sm:gap-8 items-stretch"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project: Project, idx: number) => (
              <InteractiveProjectCard
                key={project.id}
                project={project}
                idx={idx}
                onOpenModal={(p) => setActiveModalProject(p)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Comprehensive Architecture & Deep-Dive Modal */}
      <AnimatePresence>
        {activeModalProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(16px)' }}
            onClick={() => setActiveModalProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative overflow-hidden flex flex-col gap-6 max-h-[88vh] overflow-y-auto border shadow-2xl"
              style={{
                background: 'var(--bg-card)',
                borderColor: 'var(--border-primary)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalProject(null)}
                className="absolute top-5 right-5 p-2.5 rounded-2xl cursor-pointer hover:scale-110 transition-all border border-(--border-primary) hover:border-(--accent-primary)"
                style={{ background: 'var(--bg-elevated)', color: 'var(--text-secondary)' }}
                aria-label="Close details modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Header */}
              <div className="flex flex-col gap-2 pr-10">
                <div className="flex items-center gap-2">
                  <span
                    className="text-xs font-mono uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-md"
                    style={{
                      background: 'var(--accent-primary-soft)',
                      color: 'var(--accent-primary)',
                      border: '1px solid var(--accent-primary-border)',
                    }}
                  >
                    {activeModalProject.category}
                  </span>
                  {activeModalProject.liveUrl && (
                    <span className="text-xs font-mono text-emerald-400 font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Live Production Deploy
                    </span>
                  )}
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ color: 'var(--text-heading)' }}>
                  {activeModalProject.title}
                </h3>
                <p className="text-xs sm:text-sm font-mono" style={{ color: 'var(--accent-primary)' }}>
                  {activeModalProject.tagline}
                </p>
              </div>

              {/* Modal Banner Preview */}
              <div className="rounded-2xl overflow-hidden h-56 sm:h-72 relative border border-(--border-primary)">
                <img
                  src={activeModalProject.image}
                  alt={activeModalProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              {/* Detailed Description */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-mono uppercase font-bold text-(--text-tertiary)">Architecture Overview</span>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {activeModalProject.description}
                </p>
              </div>

              {/* Highlights Specifications */}
              <div className="flex flex-col gap-2.5">
                <span className="text-xs font-mono uppercase font-bold text-(--text-tertiary)">Key Engineering Highlights</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeModalProject.highlights.map((hl, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-[13px] p-3 rounded-2xl border"
                      style={{
                        background: 'var(--bg-elevated)',
                        borderColor: 'var(--border-primary)',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-(--accent-success)" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Chips */}
              <div className="flex flex-col gap-2 pt-1">
                <span className="text-xs font-mono uppercase font-bold text-(--text-tertiary)">Technology Stack</span>
                <div className="flex flex-wrap gap-2">
                  {activeModalProject.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl text-xs font-mono font-medium border"
                      style={{
                        background: 'var(--bg-elevated)',
                        borderColor: 'var(--border-primary)',
                        color: 'var(--text-primary)',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Footer Links */}
              <div className="pt-5 flex flex-wrap items-center gap-3 border-t border-(--border-primary)">
                {activeModalProject.liveUrl && (
                  <a
                    href={activeModalProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-md"
                    style={{
                      background: 'rgba(34, 197, 94, 0.15)',
                      color: '#22c55e',
                      border: '1px solid rgba(34, 197, 94, 0.4)',
                    }}
                  >
                    <Radio className="w-3.5 h-3.5 animate-pulse" />
                    <span>Launch Live Production</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}

                {activeModalProject.frontendUrl && (
                  <a
                    href={activeModalProject.frontendUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-button text-xs font-medium text-white px-5 py-2.5 rounded-xl flex items-center gap-1.5"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>Launch Frontend</span>
                  </a>
                )}

                {activeModalProject.backendUrl && (
                  <a
                    href={activeModalProject.backendUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all hover:scale-105"
                    style={{
                      background: 'var(--accent-tertiary-soft)',
                      color: 'var(--accent-tertiary)',
                      border: '1px solid rgba(167,139,250,0.25)',
                    }}
                  >
                    <Server className="w-3.5 h-3.5" />
                    <span>Backend API</span>
                  </a>
                )}

                {activeModalProject.githubUrl && (
                  <a
                    href={activeModalProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl text-xs font-mono font-medium flex items-center gap-2 transition-all hover:scale-105 active:scale-95 border"
                    style={{
                      background: 'var(--bg-elevated)',
                      borderColor: 'var(--border-primary)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    <SiGithub className="w-4 h-4" />
                    <span>View GitHub Source</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
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
