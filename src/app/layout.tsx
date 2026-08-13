import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import ThemeProvider from '@/components/ThemeProvider';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Ravi Tiwari | Full-Stack Software Developer Portfolio',
  description:
    'Full-Stack Software Developer specializing in MERN stack, Next.js, TypeScript, React Native, and C++ Competitive Programming (800+ LeetCode solved).',
  keywords: [
    'Ravi Tiwari',
    'Full Stack Developer',
    'MERN Stack',
    'TypeScript',
    'React Native',
    'Next.js',
    'C++ Competitive Programming',
    'LeetCode 800+',
    'Software Engineer Internship'
  ],
  authors: [{ name: 'Ravi Tiwari' }],
  icons: {
    icon: '/portfolioicon.webp',
  },
  openGraph: {
    title: 'Ravi Tiwari | Full-Stack Software Developer',
    description:
      'High-performance full-stack web and mobile developer portfolio. Explore projects, DSA competitive programming stats, and engineering experience.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
