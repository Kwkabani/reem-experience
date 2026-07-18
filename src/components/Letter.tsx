import { memo } from 'react';
import { motion } from 'framer-motion';

interface LetterProps {
  content: string;
  title?: string;
  delay?: number;
}

function Letter({ content, title, delay = 0 }: LetterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, delay, ease: 'easeOut' }}
      className="bg-gradient-to-b from-white/5 to-white/[0.02] backdrop-blur-md border border-white/10 rounded-2xl p-6 max-w-sm w-full shadow-xl"
    >
      {title && (
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
          <span className="text-gold text-lg">✧</span>
          <h3 className="text-gold font-display font-bold">{title}</h3>
        </div>
      )}
      <p className="text-warm-white font-body leading-relaxed text-base whitespace-pre-line">
        {content}
      </p>
    </motion.div>
  );
}

export default memo(Letter);
