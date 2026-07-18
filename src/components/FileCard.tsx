import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface FileCardProps {
  title: string;
  onClick: () => void;
  delay?: number;
  duration?: number;
}

export default function FileCard({ title, onClick, delay = 0, duration = 1.5 }: FileCardProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // BUG-01 FIX: track all timers so they are properly cleared on unmount
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    let completeTimer: ReturnType<typeof setTimeout> | null = null;

    const delayTimer = setTimeout(() => {
      const start = Date.now();
      interval = setInterval(() => {
        const elapsed = (Date.now() - start) / 1000;
        const p = Math.min((elapsed / duration) * 100, 100);
        setProgress(p);
        if (p >= 100) {
          if (interval) clearInterval(interval);
          interval = null;
          completeTimer = setTimeout(() => setIsComplete(true), 300);
        }
      }, 50);
    }, delay * 1000);

    // ← This is the REAL useEffect cleanup — runs on unmount or dep change
    return () => {
      clearTimeout(delayTimer);
      if (interval) clearInterval(interval);
      if (completeTimer) clearTimeout(completeTimer);
    };
  }, [delay, duration]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`border rounded-xl p-4 transition-all duration-500 ${
        isComplete
          ? 'border-gold/40 bg-gold/[0.03] cursor-pointer'
          : 'border-white/10 bg-white/[0.02] cursor-default'
      } ${!isComplete ? 'pointer-events-none' : ''}`}
      onClick={isComplete ? onClick : undefined}
      whileHover={isComplete ? { scale: 1.02, borderColor: 'rgba(201, 168, 76, 0.6)' } : {}}
      whileTap={isComplete ? { scale: 0.98 } : {}}
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="text-gold text-xl flex-shrink-0">📁</span>
        <div className="min-w-0">
          <p className="text-warm-white font-display font-bold truncate" title={title}>
            {title}
          </p>
        </div>
        {isComplete && <span className="mr-auto text-gold text-sm">✓</span>}
      </div>
      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-l from-gold to-gold/60 rounded-full"
          animate={{ width: `${Math.min(progress, 100)}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <p
        className="text-xs text-silver-blue/50 mt-2 font-mono"
        aria-live="polite"
        aria-atomic="true"
      >
        {isComplete ? '✅ جاهز للفتح' : `جاري التحميل... ${Math.round(Math.min(progress, 100))}%`}
      </p>
    </motion.div>
  );
}
