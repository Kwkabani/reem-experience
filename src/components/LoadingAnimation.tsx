import { memo } from 'react';
import { motion } from 'framer-motion';

interface LoadingAnimationProps {
  text?: string;
}

function LoadingAnimation({ text = 'جاري التحميل...' }: LoadingAnimationProps) {
  return (
    <div className="flex flex-col items-center gap-5" role="status" aria-live="polite">
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2.5 h-2.5 bg-gold rounded-full"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 0.6, delay: i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>
      <motion.p
        animate={{ opacity: [1, 0.4, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="text-silver-blue font-mono text-sm"
      >
        {text}
      </motion.p>
    </div>
  );
}

export default memo(LoadingAnimation);
