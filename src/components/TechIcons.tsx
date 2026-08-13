'use client';

import {
  SiTypescript,
  SiJavascript,
  SiCplusplus,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiSocketdotio,
  SiGit,
  SiGithub,
  SiPostman,
  SiVercel,
  SiFramer,
  SiHtml5,
} from 'react-icons/si';
import { TbBrandReactNative } from 'react-icons/tb';
import { BsCpu } from 'react-icons/bs';
import { MdPayment } from 'react-icons/md';
import { IconType } from 'react-icons';

// Maps skill names to their brand icons and brand colors
export const TECH_ICON_MAP: Record<string, { icon: IconType; color: string }> = {
  'TypeScript': { icon: SiTypescript, color: '#3178C6' },
  'C++': { icon: SiCplusplus, color: '#00599C' },
  'JavaScript (ES6+)': { icon: SiJavascript, color: '#F7DF1E' },
  'HTML5 / CSS3': { icon: SiHtml5, color: '#E34F26' },
  'React.js': { icon: SiReact, color: '#61DAFB' },
  'Next.js 14/15': { icon: SiNextdotjs, color: '#000000' },
  'Tailwind CSS': { icon: SiTailwindcss, color: '#06B6D4' },
  'Framer Motion': { icon: SiFramer, color: '#0055FF' },
  'Node.js': { icon: SiNodedotjs, color: '#339933' },
  'Express.js': { icon: SiExpress, color: '#000000' },
  'MongoDB': { icon: SiMongodb, color: '#47A248' },
  'Socket.io': { icon: SiSocketdotio, color: '#010101' },
  'React Native CLI': { icon: TbBrandReactNative, color: '#61DAFB' },
  'Expo Router': { icon: TbBrandReactNative, color: '#000020' },
  'Bottom Navigation': { icon: TbBrandReactNative, color: '#61DAFB' },
  'Digital Image Processing': { icon: BsCpu, color: '#8B5CF6' },
  'Razorpay API': { icon: MdPayment, color: '#0D6EFD' },
  'Vercel Serverless': { icon: SiVercel, color: '#000000' },
  'Git & GitHub': { icon: SiGit, color: '#F05032' },
  'Postman': { icon: SiPostman, color: '#FF6C37' },
};

// Hero section floating tech icons for animation
export const FLOATING_TECH_ICONS = [
  { icon: SiReact, color: '#61DAFB', name: 'React' },
  { icon: SiTypescript, color: '#3178C6', name: 'TypeScript' },
  { icon: SiNodedotjs, color: '#339933', name: 'Node.js' },
  { icon: SiMongodb, color: '#47A248', name: 'MongoDB' },
  { icon: SiNextdotjs, color: '#ffffff', name: 'Next.js' },
  { icon: SiTailwindcss, color: '#06B6D4', name: 'Tailwind' },
  { icon: SiCplusplus, color: '#00599C', name: 'C++' },
  { icon: SiSocketdotio, color: '#ffffff', name: 'Socket.io' },
  { icon: SiGit, color: '#F05032', name: 'Git' },
  { icon: SiExpress, color: '#ffffff', name: 'Express' },
  { icon: SiJavascript,   color: '#F7DF1E', name: 'JavaScript' },
  { icon: SiHtml5,        color: '#E34F26', name: 'HTML5' },
  { icon: SiFramer,       color: '#0055FF', name: 'Framer' },
  { icon: SiVercel,       color: '#ffffff', name: 'Vercel' },
];

export { SiGithub };
