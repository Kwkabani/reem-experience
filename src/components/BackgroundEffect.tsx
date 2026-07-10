import { memo } from 'react';

interface Particle {
  type: 'heart' | 'file' | 'envelope' | 'star' | 'dot';
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  symbol: string;
}

interface BackgroundEffectProps {
  gradient?: string;
  glowColor?: string;
  glowPosition?: 'center' | 'bottom' | 'top';
  particles?: Particle[];
}

function BackgroundEffect({ gradient = 'bg-night', glowColor, glowPosition = 'center', particles = [] }: BackgroundEffectProps) {
  const glowClass = glowPosition === 'bottom' ? 'bottom-0' : glowPosition === 'top' ? 'top-0' : 'top-1/2 -translate-y-1/2';

  return (
    <div className={`fixed inset-0 -z-10 pointer-events-none ${gradient} overflow-hidden`}>
      {/* Glow */}
      {glowColor && (
        <div
          className={`absolute left-1/2 -translate-x-1/2 w-[80%] h-[40%] ${glowClass} pointer-events-none`}
          style={{
            background: `radial-gradient(ellipse, ${glowColor}, transparent 70%)`,
          }}
        />
      )}

      {/* Floating particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute pointer-events-none select-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: `${p.size}px`,
            opacity: 0.04,
            animation: `particleFloat ${p.duration}s ${p.delay}s infinite linear`,
          }}
        >
          {p.symbol}
        </div>
      ))}
    </div>
  );
}

export const particleDefs = {
  hearts: [
    { type: 'heart' as const, x: 10, y: 20, size: 18, duration: 12, delay: 0, symbol: '❤' },
    { type: 'heart' as const, x: 85, y: 15, size: 14, duration: 14, delay: 3, symbol: '❤' },
    { type: 'heart' as const, x: 50, y: 30, size: 22, duration: 16, delay: 6, symbol: '❤' },
    { type: 'heart' as const, x: 25, y: 25, size: 10, duration: 11, delay: 8, symbol: '❤' },
    { type: 'heart' as const, x: 70, y: 35, size: 16, duration: 13, delay: 4, symbol: '❤' },
    { type: 'dot' as const, x: 40, y: 50, size: 4, duration: 18, delay: 1, symbol: '✦' },
    { type: 'dot' as const, x: 60, y: 60, size: 3, duration: 16, delay: 5, symbol: '✦' },
    { type: 'dot' as const, x: 30, y: 70, size: 5, duration: 14, delay: 2, symbol: '✦' },
  ],
  files: [
    { type: 'file' as const, x: 15, y: 10, size: 20, duration: 20, delay: 0, symbol: '📁' },
    { type: 'file' as const, x: 80, y: 20, size: 16, duration: 22, delay: 4, symbol: '📁' },
    { type: 'file' as const, x: 45, y: 15, size: 14, duration: 18, delay: 8, symbol: '📁' },
    { type: 'dot' as const, x: 55, y: 40, size: 4, duration: 15, delay: 1, symbol: '✦' },
    { type: 'dot' as const, x: 35, y: 55, size: 3, duration: 17, delay: 3, symbol: '✦' },
    { type: 'dot' as const, x: 25, y: 65, size: 5, duration: 13, delay: 6, symbol: '✦' },
    { type: 'dot' as const, x: 70, y: 70, size: 4, duration: 19, delay: 2, symbol: '✦' },
  ],
  envelopes: [
    { type: 'envelope' as const, x: 20, y: 15, size: 18, duration: 25, delay: 0, symbol: '✉' },
    { type: 'envelope' as const, x: 75, y: 25, size: 14, duration: 22, delay: 6, symbol: '✉' },
    { type: 'star' as const, x: 50, y: 10, size: 12, duration: 8, delay: 0, symbol: '★' },
    { type: 'star' as const, x: 30, y: 45, size: 8, duration: 10, delay: 3, symbol: '★' },
    { type: 'star' as const, x: 65, y: 55, size: 10, duration: 9, delay: 5, symbol: '★' },
    { type: 'dot' as const, x: 45, y: 70, size: 4, duration: 16, delay: 2, symbol: '✦' },
    { type: 'dot' as const, x: 15, y: 60, size: 3, duration: 14, delay: 7, symbol: '✦' },
    { type: 'dot' as const, x: 85, y: 65, size: 5, duration: 18, delay: 4, symbol: '✦' },
    { type: 'heart' as const, x: 40, y: 35, size: 12, duration: 12, delay: 1, symbol: '❤' },
    { type: 'heart' as const, x: 60, y: 50, size: 10, duration: 14, delay: 5, symbol: '❤' },
  ],
  analysis: [
    { type: 'dot' as const, x: 15, y: 10, size: 8, duration: 15, delay: 0, symbol: '✦' },
    { type: 'dot' as const, x: 85, y: 20, size: 6, duration: 18, delay: 3, symbol: '✦' },
    { type: 'dot' as const, x: 50, y: 40, size: 10, duration: 20, delay: 6, symbol: '✦' },
    { type: 'dot' as const, x: 35, y: 55, size: 7, duration: 14, delay: 2, symbol: '✦' },
    { type: 'dot' as const, x: 70, y: 65, size: 5, duration: 16, delay: 5, symbol: '✦' },
    { type: 'dot' as const, x: 25, y: 75, size: 9, duration: 22, delay: 1, symbol: '✦' },
    { type: 'dot' as const, x: 80, y: 85, size: 6, duration: 17, delay: 4, symbol: '✦' },
  ],
  system: [
    { type: 'dot' as const, x: 20, y: 15, size: 12, duration: 20, delay: 0, symbol: '◇' },
    { type: 'dot' as const, x: 75, y: 25, size: 8, duration: 18, delay: 4, symbol: '◇' },
    { type: 'dot' as const, x: 45, y: 50, size: 14, duration: 22, delay: 2, symbol: '◆' },
    { type: 'dot' as const, x: 15, y: 60, size: 6, duration: 15, delay: 6, symbol: '✦' },
    { type: 'dot' as const, x: 85, y: 70, size: 10, duration: 17, delay: 3, symbol: '✦' },
    { type: 'dot' as const, x: 55, y: 80, size: 8, duration: 19, delay: 5, symbol: '✦' },
    { type: 'dot' as const, x: 35, y: 90, size: 5, duration: 14, delay: 7, symbol: '✦' },
    { type: 'dot' as const, x: 65, y: 30, size: 7, duration: 16, delay: 1, symbol: '◇' },
  ],
};

export default memo(BackgroundEffect);
