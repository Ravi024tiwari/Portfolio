'use client';

import React, { useRef, useState, useEffect, useId } from 'react';
import { motion, useInView, AnimatePresence, type Variants } from 'framer-motion';
import {
  Layers,
  Zap,
  Cpu,
  Laptop,
  Flame,
  ArrowUpRight,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';

export interface PillarItem {
  id: string;
  number: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  desc: string;
  tags: string[];
  gradient: string;
  glowColor: string;
  accentColor: string;
  borderColor: string;
}

export const ENGINEERING_PILLARS_DATA: PillarItem[] = [
  {
    id: 'scalable-systems',
    number: '01',
    icon: Layers,
    title: 'Scalable Full-Stack Systems',
    subtitle: 'System Architecture',
    desc: 'Architecting robust backend pipelines with Node.js, Express, Next.js App Router, and geospatial MongoDB querying.',
    tags: ['Next.js', 'Node.js', 'MongoDB Geospatial', 'RESTful APIs'],
    gradient: 'from-orange-500/20 via-amber-500/10 to-transparent',
    glowColor: 'rgba(249, 115, 22, 0.35)',
    accentColor: '#f97316',
    borderColor: 'rgba(249, 115, 22, 0.4)',
  },
  {
    id: 'modern-ui',
    number: '02',
    icon: Zap,
    title: 'Micro-Interactive & Modern UI',
    subtitle: 'Frontend Engineering',
    desc: 'Crafting responsive, high-fidelity interfaces with fluid Framer Motion animations and clean component structures.',
    tags: ['React.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    gradient: 'from-teal-500/20 via-cyan-500/10 to-transparent',
    glowColor: 'rgba(20, 184, 166, 0.35)',
    accentColor: '#14b8a6',
    borderColor: 'rgba(20, 184, 166, 0.4)',
  },
  {
    id: 'dsa-optimization',
    number: '03',
    icon: Cpu,
    title: 'Algorithmic Optimization & DSA',
    subtitle: 'Problem Solving',
    desc: 'Rigorous problem solver in C++ with 800+ LeetCode problems solved, emphasizing optimal time and space complexity.',
    tags: ['C++ (STL)', 'Graph Algorithms', 'Dynamic Programming', 'Trees'],
    gradient: 'from-purple-500/20 via-indigo-500/10 to-transparent',
    glowColor: 'rgba(167, 139, 250, 0.35)',
    accentColor: '#a78bfa',
    borderColor: 'rgba(167, 139, 250, 0.4)',
  },
  {
    id: 'cloud-db',
    number: '04',
    icon: Laptop,
    title: 'Cloud & Database Architecture',
    subtitle: 'Data Infrastructure',
    desc: 'Designing performant database schemas with PostgreSQL, MongoDB geospatial indexing, and serverless edge functions.',
    tags: ['PostgreSQL', 'MongoDB', 'Vercel Serverless', 'Edge Functions'],
    gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    glowColor: 'rgba(34, 197, 94, 0.35)',
    accentColor: '#22c55e',
    borderColor: 'rgba(34, 197, 94, 0.4)',
  },
];

type ScreenLayout = 'desktop' | 'tablet' | 'mobile';


const getSequentialOrbitalVariants = (index: number, layout: ScreenLayout): Variants => {
  const syncDelay = index * 0.05;

  if (layout === 'desktop') {    const targetX = [-360, -120, 120, 360][index];
    const phaseOffset = -index * 72;
    const xKeyframes = [
      -160 + phaseOffset - targetX,         
      160 + phaseOffset * 0.75 - targetX,    
      targetX * 0.55 + 20 - targetX,         
      -2 * (index - 1.5),                    
      0,                                    
    ];

    const yKeyframes = [
      -100 - index * 14,  
      -135 - index * 10,  
      30 + index * 5,     
      -5,                 
      0,                  
    ];

    const zKeyframes = [
      -500 - index * 30,  
      -230 - index * 18,  
      -35,                
      10,                 
      0,                  
    ];

    const rotateZKeyframes = [
      -75 + index * 8,    
      -38 + index * 5,    
      -6,                 
      1 * (index % 2 === 0 ? 1 : -1), 
      0,                  
    ];

    const rotateYKeyframes = [
      -36 + index * 6,    
      -16 + index * 3,    
      5,                  
      -0.5,               
      0,                  
    ];

    const rotateXKeyframes = [
      28,                 
      34,                 
      6,                  
      -1,                 
      0,                  
    ];

    const scaleKeyframes = [
      0.24 - index * 0.02, 
      0.62 - index * 0.02, 
      0.94,                
      1.02,                
      1,                   
    ];

    return {
      hidden: {
        opacity: 0,
        scale: scaleKeyframes[0],
        x: xKeyframes[0],
        y: yKeyframes[0],
        z: zKeyframes[0],
        rotateZ: rotateZKeyframes[0],
        rotateY: rotateYKeyframes[0],
        rotateX: rotateXKeyframes[0],
        filter: 'blur(14px)',
        transition: {
          duration: 0.35,
          ease: 'easeIn',
        },
      },
      visible: {
        opacity: [0, 0.85, 0.98, 1, 1],
        scale: scaleKeyframes,
        x: xKeyframes,
        y: yKeyframes,
        z: zKeyframes,
        rotateZ: rotateZKeyframes,
        rotateY: rotateYKeyframes,
        rotateX: rotateXKeyframes,
        filter: ['blur(14px)', 'blur(6px)', 'blur(1px)', 'blur(0px)', 'blur(0px)'],
        transition: {
          duration: 3.2, 
          delay: syncDelay,
          times: [0, 0.28, 0.58, 0.82, 1],
          ease: [0.16, 1, 0.3, 1], 
        },
      },
    };
  }

  if (layout === 'tablet') {
    // 2x2 grid: Top-Left, Top-Right, Bottom-Left, Bottom-Right
    const tabletPositions = [
      { targetX: -130, targetY: -100 },
      { targetX: 130, targetY: -100 },
      { targetX: -130, targetY: 100 },
      { targetX: 130, targetY: 100 },
    ];
    const { targetX, targetY } = tabletPositions[index];
    const phaseAngle = (index * 90) * (Math.PI / 180);
    const startOrbitalX = Math.cos(phaseAngle) * 170;
    const startOrbitalY = Math.sin(phaseAngle) * 110;

    return {
      hidden: {
        opacity: 0,
        scale: 0.2,
        x: startOrbitalX - targetX,
        y: startOrbitalY - targetY,
        z: -450,
        rotateZ: -60 + index * 15,
        rotateY: -25,
        rotateX: 20,
        filter: 'blur(12px)',
        transition: {
          duration: 0.35,
          ease: 'easeIn',
        },
      },
      visible: {
        opacity: [0, 0.85, 0.98, 1, 1],
        scale: [0.2, 0.58, 0.94, 1.02, 1],
        x: [
          startOrbitalX - targetX,
          Math.cos(phaseAngle + 1.2) * 210 - targetX,
          targetX * 0.4 - targetX,
          -2,
          0,
        ],
        y: [
          startOrbitalY - targetY,
          Math.sin(phaseAngle + 1.2) * 150 - targetY,
          targetY * 0.4 - targetY,
          -2,
          0,
        ],
        z: [-450, -210, -30, 8, 0],
        rotateZ: [-60 + index * 15, -20, 3, 0],
        rotateY: [-25, -10, 2, 0],
        rotateX: [20, 24, 0, 0],
        filter: ['blur(12px)', 'blur(5px)', 'blur(1px)', 'blur(0px)', 'blur(0px)'],
        transition: {
          duration: 3.0,
          delay: syncDelay,
          times: [0, 0.28, 0.58, 0.82, 1],
          ease: [0.16, 1, 0.3, 1],
        },
      },
    };
  }

  // Mobile layout (1 column vertical stack):
  // Synchronized 4-planet vertical orbital loop that sweeps smoothly into stacked slots
  const targetY = [-260, -90, 90, 260][index];
  const phaseY = -index * 55;

  return {
    hidden: {
      opacity: 0,
      scale: 0.22,
      x: -45 + (index % 2 === 0 ? -15 : 15),
      y: phaseY - targetY,
      z: -380,
      rotateZ: -45 + index * 12,
      rotateY: -20,
      rotateX: 18,
      filter: 'blur(10px)',
      transition: {
        duration: 0.35,
        ease: 'easeIn',
      },
    },
    visible: {
      opacity: [0, 0.85, 1, 1],
      scale: [0.22, 0.62, 1.02, 1],
      x: [-45 + (index % 2 === 0 ? -15 : 15), 45, -6, 0],
      y: [phaseY - targetY, (phaseY - targetY) * 0.4, 8, 0],
      z: [-380, -140, 8, 0],
      rotateZ: [-45 + index * 12, -15, 2, 0],
      rotateY: [-20, -5, 0, 0],
      rotateX: [18, 20, 0, 0],
      filter: ['blur(10px)', 'blur(4px)', 'blur(0px)', 'blur(0px)'],
      transition: {
        duration: 2.8,
        delay: syncDelay,
        times: [0, 0.3, 0.65, 1],
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };
};

/**
 * Individual Interactive Pillar Card
 */
export const PillarCard: React.FC<{
  pillar: PillarItem;
  index: number;
  layout: ScreenLayout;
  animationKey: number;
}> = ({ pillar, index, layout, animationKey }) => {
  const Icon = pillar.icon;
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

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
      key={`${pillar.id}-${animationKey}`}
      variants={getSequentialOrbitalVariants(index, layout)}
      className="relative group h-full [transform-style:preserve-3d]"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{
          y: -6,
          scale: 1.02,
          rotateX: 2,
          rotateY: -2,
          transition: { type: 'spring', stiffness: 350, damping: 22 },
        }}
        className="relative h-full p-6 sm:p-7 rounded-3xl border flex flex-col justify-between gap-6 overflow-hidden transition-all duration-300 select-none shadow-lg"
        style={{
          background: 'var(--bg-card)',
          borderColor: isHovered ? pillar.borderColor : 'var(--border-primary)',
          backdropFilter: 'blur(16px)',
          boxShadow: isHovered
            ? `0 20px 40px -10px ${pillar.glowColor}, 0 0 0 1px ${pillar.borderColor}`
            : 'var(--shadow-card)',
        }}
      >
        {/* Dynamic Cursor Spotlight Effect */}
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, ${pillar.glowColor}, transparent 70%)`,
          }}
        />

        {/* Ambient Corner Accent Blob */}
        <div
          className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${pillar.gradient} rounded-full blur-2xl pointer-events-none opacity-40 group-hover:opacity-90 transition-opacity duration-500`}
        />

        {/* Card Header & Content */}
        <div className="relative z-10 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            {/* Animated Glow Icon */}
            <motion.div
              whileHover={{ rotate: [0, -12, 12, 0] }}
              transition={{ duration: 0.5 }}
              className="w-12 h-12 rounded-2xl flex items-center justify-center p-3 border transition-transform duration-300 group-hover:scale-110"
              style={{
                background: 'var(--bg-elevated)',
                borderColor: 'var(--border-primary)',
                color: pillar.accentColor,
                boxShadow: `0 4px 18px -2px ${pillar.glowColor}`,
              }}
            >
              <Icon className="w-6 h-6 shrink-0" />
            </motion.div>

            {/* Sequence Step Number */}
            <div
              className="flex items-center gap-1.5 font-mono text-xs font-bold px-2.5 py-1 rounded-full border transition-all duration-300"
              style={{
                background: 'var(--bg-elevated)',
                borderColor: isHovered ? pillar.borderColor : 'var(--border-primary)',
                color: isHovered ? pillar.accentColor : 'var(--text-secondary)',
              }}
            >
              <span>{pillar.number}</span>
              <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200" />
            </div>
          </div>

          {/* Titles */}
          <div className="flex flex-col gap-1.5">
            <span
              className="text-[11px] font-mono tracking-wider uppercase font-semibold"
              style={{ color: pillar.accentColor }}
            >
              {pillar.subtitle}
            </span>
            <h4
              className="text-base sm:text-lg font-bold tracking-tight leading-snug"
              style={{ color: 'var(--text-heading)' }}
            >
              {pillar.title}
            </h4>
            <p
              className="text-xs sm:text-sm leading-relaxed pt-1"
              style={{ color: 'var(--text-secondary)' }}
            >
              {pillar.desc}
            </p>
          </div>
        </div>

        {/* Technology Tag Pills */}
        <div className="relative z-10 pt-4 border-t border-(--border-primary) flex flex-wrap gap-1.5">
          {pillar.tags.map((tag, tIdx) => (
            <span
              key={tIdx}
              className="text-[10px] sm:text-[11px] font-mono px-2.5 py-1 rounded-lg border border-(--border-primary) transition-all duration-200 group-hover:border-(--border-hover) hover:scale-105"
              style={{
                background: 'var(--bg-elevated)',
                color: 'var(--text-primary)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

/**
 * Parent Layout Component: Orchestrates Scroll-Triggered 3D Sequential Orbital Reveal
 */
export default function EngineeringPillars() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, {
    once: false,
    amount: 0.2,
    margin: '-40px 0px',
  });

  const [layout, setLayout] = useState<ScreenLayout>('desktop');
  const [animationKey, setAnimationKey] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Responsive Screen Breakpoint Detection
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setLayout('mobile');
      } else if (width < 1024) {
        setLayout('tablet');
      } else {
        setLayout('desktop');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleReplay = () => {
    setIsAnimating(true);
    setAnimationKey((prev) => prev + 1);
    setTimeout(() => {
      setIsAnimating(false);
    }, 3500);
  };

  return (
    <div ref={containerRef} className="relative w-full flex flex-col gap-6 pt-6 select-none">
      {/* Section Header with Replay & Status Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-(--accent-primary-soft) border border-(--accent-primary-border) text-(--accent-primary) shadow-sm">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <h3
              className="text-lg sm:text-xl font-bold tracking-tight flex items-center gap-2"
              style={{ color: 'var(--text-heading)' }}
            >
              <span>Engineering Pillars & Architecture Standards</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-(--accent-primary-soft) text-(--accent-primary) border border-(--accent-primary-border) hidden md:inline-flex">
                4-Card Vortex
              </span>
            </h3>
            <p className="text-xs font-mono text-(--text-tertiary)">
              Sequential 3D orbital emergence into resilient production architecture
            </p>
          </div>
        </div>

        {/* Interactive Controls */}
        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          {/* Replay Orbital Reveal Button */}
          <button
            onClick={handleReplay}
            title="Replay 3D Orbital Reveal Animation"
            className="px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold flex items-center gap-2 border border-(--border-primary) hover:border-(--accent-primary) transition-all duration-300 cursor-pointer shadow-sm active:scale-95"
            style={{
              background: 'var(--bg-elevated)',
              color: 'var(--text-primary)',
            }}
          >
            <RotateCcw className={`w-3.5 h-3.5 text-(--accent-primary) ${isAnimating ? 'animate-spin' : ''}`} />
            <span>Replay Orbit</span>
          </button>

          <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-(--accent-success) px-3 py-1.5 rounded-xl bg-(--accent-success-soft) border border-(--accent-success-border)">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Standards Met</span>
          </div>
        </div>
      </div>

      {/* 3D Perspective Stage for Orbital Flight */}
      <div
        className="relative w-full [perspective:1400px] [transform-style:preserve-3d] py-4"
        style={{ minHeight: '360px' }}
      >
        {/* Central Vortex Energy Core */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 flex items-center justify-center"
          aria-hidden="true"
        >
          {/* Vortex Radial Pulsing Core */}
          <motion.div
            key={`vortex-glow-${animationKey}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={
              isInView
                ? {
                    scale: [0, 1.2, 2.2, 2.8],
                    opacity: [0, 0.8, 0.4, 0],
                  }
                : { scale: 0, opacity: 0 }
            }
            transition={{
              duration: 2.2,
              times: [0, 0.2, 0.6, 1],
              ease: 'easeOut',
            }}
            className="w-72 h-72 rounded-full border border-(--accent-primary) blur-sm"
            style={{
              background: 'radial-gradient(circle, var(--accent-primary-soft) 0%, rgba(20, 184, 166, 0.1) 50%, transparent 70%)',
            }}
          />

          {/* Sequential Ejection Rings (Fires as cards erupt) */}
          {[0, 1, 2, 3].map((ringIdx) => (
            <motion.div
              key={`ring-${ringIdx}-${animationKey}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={
                isInView
                  ? {
                      scale: [0, 1.8],
                      opacity: [0, 0.6, 0],
                    }
                  : { scale: 0, opacity: 0 }
              }
              transition={{
                duration: 1.2,
                delay: ringIdx * 0.34,
                ease: 'easeOut',
              }}
              className="absolute w-44 h-44 rounded-full border border-dashed border-(--accent-primary)"
            />
          ))}

          {/* Rotating Planetary Orbit Tracks */}
          <div className="absolute w-[80%] max-w-[650px] aspect-square rounded-full border border-dashed border-(--border-primary)/60 animate-[spin_40s_linear_infinite] opacity-30" />
          <div className="absolute w-[60%] max-w-[480px] aspect-square rounded-full border border-(--border-primary)/40 animate-[spin_25s_linear_infinite_reverse] opacity-25" />
        </div>

        {/* 3D Animated Grid: Settles into clean Responsive Grid */}
        <motion.div
          key={`orbit-grid-${animationKey}`}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 relative z-10 [transform-style:preserve-3d]"
        >
          {ENGINEERING_PILLARS_DATA.map((pillar, index) => (
            <PillarCard
              key={pillar.id}
              pillar={pillar}
              index={index}
              layout={layout}
              animationKey={animationKey}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
