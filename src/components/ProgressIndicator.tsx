import { motion } from 'framer-motion';
import { Stage, STAGE_COUNT } from '../types';

interface ProgressIndicatorProps {
  currentStage: Stage;
}

export default function ProgressIndicator({ currentStage }: ProgressIndicatorProps) {
  const current = currentStage as number;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex gap-2 items-center">
      {Array.from({ length: STAGE_COUNT }).map((_, i) => (
        <motion.div
          key={i}
          className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
            i <= current ? 'bg-gold' : 'bg-white/15'
          }`}
          animate={i === current ? { scale: [1, 1.4, 1] } : {}}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}
