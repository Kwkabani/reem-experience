import { useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from '../context/AudioContext';
import useTypewriter from '../hooks/useTypewriter';

interface SystemMessageProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  prefix?: boolean;
}

export default function SystemMessage({
  text,
  delay = 0,
  speed = 30,
  className = '',
  prefix = true,
}: SystemMessageProps) {
  const { playSound } = useAudio();
  const charCountRef = useRef(0);
  const onChar = useCallback(() => {
    charCountRef.current++;
    if (charCountRef.current % 5 === 0) {
      playSound('typing');
    }
  }, [playSound]);
  // BUG-10: destructure { displayed, isComplete } from updated hook
  const { displayed: displayText, isComplete } = useTypewriter(text, { speed, delay, onChar });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`font-mono text-silver-blue text-sm leading-relaxed ${className}`}
      aria-live="polite"
      aria-atomic="true"
    >
      {prefix && <span className="text-gold opacity-70">{'> '}</span>}
      {displayText}
      {/* BUG-10: hide cursor when typing is complete */}
      {!isComplete && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
          className="inline-block w-2 h-4 bg-silver-blue mr-0.5 align-middle"
        />
      )}
    </motion.div>
  );
}
