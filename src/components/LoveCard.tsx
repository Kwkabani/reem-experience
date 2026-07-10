import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface LoveCardProps {
  children: ReactNode;
  delay?: number;
  variant?: 'letter' | 'message' | 'final';
  className?: string;
}

const variants = {
  letter: {
    border: 'border-[#c9a84c]/20',
    bg: 'bg-[#1a0e12]/90',
    glow: 'rgba(201,168,76,0.08)',
  },
  message: {
    border: 'border-[#c9a84c]/15',
    bg: 'bg-[#0d0805]/85',
    glow: 'rgba(201,168,76,0.06)',
  },
  final: {
    border: 'border-gold/25',
    bg: 'bg-[#0d0805]/80',
    glow: 'rgba(201,168,76,0.12)',
  },
};

const loveParticles = [
  { text: 'محمد 🤍ريم', x: 15, y: 80, size: 14, duration: 18, delay: 0 },
  { text: '10-07-2025', x: 70, y: 75, size: 11, duration: 22, delay: 3 },
  { text: 'محمد 🤍ريم', x: 40, y: 85, size: 12, duration: 20, delay: 6 },
  { text: '10-07-2025', x: 80, y: 90, size: 10, duration: 24, delay: 1 },
  { text: 'محمد 🤍ريم', x: 55, y: 70, size: 13, duration: 19, delay: 4 },
  { text: '10-07-2025', x: 25, y: 65, size: 11, duration: 21, delay: 7 },
];

export default function LoveCard({ children, delay = 0, variant = 'letter', className = '' }: LoveCardProps) {
  const v = variants[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={`relative rounded-2xl p-6 w-full max-w-md overflow-hidden ${v.bg} backdrop-blur-xl border ${v.border} ${className}`}
      style={{ maxHeight: '85dvh' }}
    >
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {loveParticles.map((p, i) => (
          <div
            key={i}
            className="absolute whitespace-nowrap font-display font-bold leading-none"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              fontSize: `${p.size}px`,
              opacity: 0,
              animation: `cardParticleFloat ${p.duration}s ${p.delay}s infinite linear`,
            }}
          >
            {p.text}
          </div>
        ))}
      </div>

      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(ellipse, ${v.glow}, transparent 70%)` }}
      />

      {/* Corner decorations */}
      <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-gold/10 rounded-tr" />
      <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-gold/10 rounded-tl" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-gold/10 rounded-br" />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-gold/10 rounded-bl" />

      {/* Content */}
      <div className="relative z-10 overflow-y-auto" style={{ maxHeight: 'calc(85dvh - 3rem)' }}>
        {children}
      </div>
    </motion.div>
  );
}
