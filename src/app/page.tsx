import SpotlightBackground from '@/components/SpotlightBackground';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AboutBento from '@/components/AboutBento';
import ProjectsShowcase from '@/components/ProjectsShowcase';
import Timeline from '@/components/Timeline';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* Ambient Background */}
      <SpotlightBackground />

      {/* Navigation Bar */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* About Me & Skills */}
      <AboutBento />

      {/* Featured Projects */}
      <ProjectsShowcase />

      {/* Career Timeline */}
      <Timeline />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
