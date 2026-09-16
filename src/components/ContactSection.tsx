'use client';

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Code,
  Award,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import confetti from 'canvas-confetti';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: '7f4b825b-460f-4645-9e96-7bc01f578727',
          name: formData.name,
          email: formData.email,
          subject: formData.subject || `New Portfolio Inquiry from ${formData.name}`,
          message: formData.message,
          from_name: `${formData.name} via Portfolio`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } else {
        setErrorMessage(result.message || 'Something went wrong. Please try again or reach out directly via email.');
      }
    } catch (err) {
      setErrorMessage('Network error. Please try again or contact directly at raviashoktiwari9559@gmail.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-8 relative z-10">
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
            <Send className="w-3.5 h-3.5" />
            <span>Get in Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: 'var(--text-heading)' }}>
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-sm sm:text-base max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
            Interested in hiring me for software development roles, internships, or discussing full-stack architecture? Send a message directly.
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">

          {/* Contact Info (5 cols) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col gap-5"
          >
            <div
              className="rounded-3xl p-6 sm:p-7 flex flex-col gap-6 glass-card-glow"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border-primary)', boxShadow: 'var(--shadow-card)' }}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-base shadow-md"
                  style={{ background: 'var(--accent-primary)' }}
                >
                  RT
                </div>
                <div>
                  <h3 className="text-lg font-bold" style={{ color: 'var(--text-heading)' }}>Ravi Tiwari</h3>
                  <p className="text-xs font-mono" style={{ color: 'var(--accent-primary)' }}>Full-Stack Software Developer</p>
                </div>
              </div>

              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Feel free to reach out via email, WhatsApp, or connect with me across coding platforms.
              </p>

              {/* Contact Direct Cards */}
              <div className="flex flex-col gap-3">
                {/* Email */}
                <a
                  href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                  className="p-3.5 rounded-2xl flex items-center justify-between gap-3 group transition-all duration-300 hover:scale-[1.02] border border-(--border-primary) hover:border-(--accent-primary)"
                  style={{ background: 'var(--bg-elevated)' }}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2.5 rounded-xl shrink-0 transition-colors group-hover:bg-(--accent-primary) group-hover:text-white" style={{ background: 'var(--accent-primary-soft)', color: 'var(--accent-primary)' }}>
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-[10px] font-mono" style={{ color: 'var(--text-tertiary)' }}>Direct Email</span>
                      <span className="text-xs font-semibold truncate font-mono" style={{ color: 'var(--text-primary)' }}>
                        {PORTFOLIO_DATA.personal.email}
                      </span>
                    </div>
                  </div>
                  <div
                    className="p-1.5 rounded-xl transition-all shrink-0 duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 bg-(--bg-card)"
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    <ArrowUpRight className="w-4 h-4 transition-colors group-hover:text-(--accent-primary)" />
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${PORTFOLIO_DATA.personal.mobile.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl flex items-center justify-between gap-3 group transition-all duration-300 hover:scale-[1.02] border border-(--border-primary) hover:border-(--accent-success)"
                  style={{ background: 'var(--bg-elevated)' }}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2.5 rounded-xl shrink-0 transition-colors group-hover:bg-(--accent-success) group-hover:text-white" style={{ background: 'var(--accent-success-soft)', color: 'var(--accent-success)' }}>
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-[10px] font-mono" style={{ color: 'var(--text-tertiary)' }}>WhatsApp</span>
                      <span className="text-xs font-semibold truncate font-mono" style={{ color: 'var(--text-primary)' }}>
                        {PORTFOLIO_DATA.personal.mobile}
                      </span>
                    </div>
                  </div>
                  <div
                    className="p-1.5 rounded-xl transition-all shrink-0 duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 bg-(--bg-card)"
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    <ArrowUpRight className="w-4 h-4 transition-colors group-hover:text-(--accent-success)" />
                  </div>
                </a>

                {/* Location */}
                <div
                  className="p-3.5 rounded-2xl flex items-center gap-3 border border-(--border-primary)"
                  style={{ background: 'var(--bg-elevated)' }}
                >
                  <div className="p-2.5 rounded-xl shrink-0" style={{ background: 'var(--accent-tertiary-soft)', color: 'var(--accent-tertiary)' }}>
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono" style={{ color: 'var(--text-tertiary)' }}>Location & Work Model</span>
                    <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>India • Open to Remote & Relocation</span>
                  </div>
                </div>
              </div>

              {/* Social Profiles */}
              <div className="pt-4 flex items-center gap-2.5 border-t border-(--border-primary)">
                <a href={PORTFOLIO_DATA.personal.github} target="_blank" rel="noopener noreferrer"
                  className="p-2.5 rounded-xl text-xs font-medium flex items-center gap-2 transition-all hover:scale-105 border border-(--border-primary)"
                  style={{ background: 'var(--bg-elevated)', color: 'var(--text-secondary)' }}
                >
                  <SiGithub className="w-4 h-4" /> GitHub
                </a>
                <a href={PORTFOLIO_DATA.personal.leetcode} target="_blank" rel="noopener noreferrer"
                  className="p-2.5 rounded-xl text-xs font-medium flex items-center gap-2 transition-all hover:scale-105 border border-(--border-primary)"
                  style={{ background: 'var(--bg-elevated)', color: 'var(--text-secondary)' }}
                >
                  <Code className="w-4 h-4" style={{ color: '#FFA116' }} /> LeetCode
                </a>
                <a href={PORTFOLIO_DATA.personal.gfg} target="_blank" rel="noopener noreferrer"
                  className="p-2.5 rounded-xl text-xs font-medium flex items-center gap-2 transition-all hover:scale-105 border border-(--border-primary)"
                  style={{ background: 'var(--bg-elevated)', color: 'var(--text-secondary)' }}
                >
                  <Award className="w-4 h-4" style={{ color: '#2F8D46' }} /> GFG
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 rounded-3xl p-6 sm:p-8 glass-card"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-primary)', boxShadow: 'var(--shadow-card)' }}
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center justify-center text-center gap-4"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center animate-bounce"
                  style={{ background: 'var(--accent-success-soft)', color: 'var(--accent-success)', border: '1px solid rgba(34,197,94,0.3)' }}
                >
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold" style={{ color: 'var(--text-heading)' }}>Message Sent!</h3>
                <p className="text-sm max-w-md" style={{ color: 'var(--text-secondary)' }}>
                  Thank you, <strong style={{ color: 'var(--accent-primary)' }}>{formData.name}</strong>. I&apos;ll respond to <span className="font-mono" style={{ color: 'var(--accent-tertiary)' }}>{formData.email}</span> as soon as possible.
                </p>
                <button
                  onClick={() => { setIsSubmitted(false); setFormData({ name: '', email: '', subject: '', message: '' }); }}
                  className="glass-button text-xs font-medium text-white px-6 py-3 rounded-xl mt-2 cursor-pointer"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl font-bold" style={{ color: 'var(--text-heading)' }}>Direct Dispatch</h3>
                  <p className="text-xs font-mono" style={{ color: 'var(--text-tertiary)' }}>Send an inquiry or interview schedule directly</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Hiring Manager"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="form-input"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>Your Email</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. hr@techcompany.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>Subject</label>
                  <input
                    type="text"
                    required
                    placeholder="Full-Stack Developer Opportunity / Project Inquiry"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>Message</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Briefly detail the opportunity or requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="form-input resize-none"
                  />
                </div>

                {errorMessage && (
                  <div className="p-3 rounded-xl text-xs font-mono text-rose-400 bg-rose-500/10 border border-rose-500/30">
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="glass-button text-white text-sm font-medium py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-1 shadow-md hover:scale-[1.01] active:scale-[0.99] transition-transform"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      <span>Dispatching to Gmail...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Dispatch Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}

