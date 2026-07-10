import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: 'default' | 'warm' | 'dark';
}

const variants = {
  default: 'backdrop-blur-xl bg-white/5 border border-white/10',
  warm: 'backdrop-blur-xl bg-[#1a120c]/80 border border-[#c9a84c]/15',
  dark: 'backdrop-blur-xl bg-[#0d0805]/70 border border-[#c9a84c]/15',
};

export default function GlassCard({ children, className = '', delay = 0, variant = 'default' }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={`${variants[variant]} rounded-2xl p-6 w-full max-w-md ${className}`}
    >
      {children}
    </motion.div>
  );
}
