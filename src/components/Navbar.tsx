'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Send, User, Briefcase, Sun, Moon, Sparkles } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { useTheme } from '@/components/ThemeProvider';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['hero', 'about', 'projects', 'timeline', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about', id: 'about', icon: User },
    { name: 'Projects', href: '#projects', id: 'projects', icon: Briefcase },
    { name: 'Timeline', href: '#timeline', id: 'timeline', icon: Sparkles },
    { name: 'Contact', href: '#contact', id: 'contact', icon: Send },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-3">
      <nav
        className="max-w-6xl mx-auto rounded-2xl transition-all duration-300"
        style={{
          background: scrolled ? 'var(--glass-bg)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          border: scrolled ? '1px solid var(--border-primary)' : '1px solid transparent',
          boxShadow: scrolled ? 'var(--shadow-card)' : 'none',
          padding: scrolled ? '0.625rem 1.25rem' : '0.75rem 1.25rem',
        }}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2.5 group cursor-pointer">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white text-sm"
              style={{ background: 'var(--accent-primary)' }}
            >
              RT
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-wide" style={{ color: 'var(--text-heading)' }}>
                {PORTFOLIO_DATA.personal.name}
              </span>
              <span className="text-[11px] font-mono hidden sm:inline" style={{ color: 'var(--text-tertiary)' }}>
                Full-Stack Dev
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div
            className="hidden lg:flex items-center gap-0.5 p-1 rounded-xl"
            style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)' }}
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className="relative px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-200"
                  style={{
                    color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    background: isActive ? 'var(--accent-primary-soft)' : 'transparent',
                    fontWeight: isActive ? 600 : 500,
                  }}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* GitHub Link */}
            <a
              href={PORTFOLIO_DATA.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg transition-all hover:scale-105"
              style={{ color: 'var(--text-secondary)', background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)' }}
              title="GitHub Profile"
            >
              <SiGithub className="w-4 h-4" />
            </a>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg transition-all hover:scale-105 cursor-pointer"
              style={{ color: 'var(--text-secondary)', background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)' }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Hire Badge - Desktop */}
            <div
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
              style={{ background: 'var(--accent-success-soft)', color: 'var(--accent-success)', border: '1px solid rgba(34,197,94,0.25)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--accent-success)' }} />
              <span>Open to Work</span>
            </div>

            {/* Contact Button - Desktop */}
            <a
              href="#contact"
              className="hidden sm:flex glass-button text-white text-xs font-medium px-4 py-2 rounded-lg items-center gap-1.5"
            >
              <span>Hire Me</span>
              <Send className="w-3 h-3" />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg cursor-pointer"
              style={{ color: 'var(--text-secondary)', background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)' }}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden mt-2 max-w-6xl mx-auto rounded-2xl p-5 shadow-xl"
            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)' }}
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-xl text-sm font-medium transition-colors"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <Icon className="w-4 h-4" style={{ color: 'var(--accent-primary)' }} />
                    <span>{link.name}</span>
                  </a>
                );
              })}

              <div className="pt-3 mt-2 flex items-center justify-between" style={{ borderTop: '1px solid var(--border-primary)' }}>
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 p-2.5 rounded-xl text-sm cursor-pointer"
                  style={{ color: 'var(--text-secondary)', background: 'var(--bg-elevated)' }}
                >
                  {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  <span className="text-xs">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                </button>

                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="glass-button text-white text-sm font-medium py-2.5 px-5 rounded-xl flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Contact Me</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
