import { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from '../context/AudioContext';
import useTypewriter from '../hooks/useTypewriter';
import type { SoundType } from '../types';

interface SystemMessageProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  prefix?: boolean;
  onComplete?: () => void;
  soundInterval?: number;
  soundType?: SoundType;
}

export default function SystemMessage({
  text,
  delay = 0,
  speed = 30,
  className = '',
  prefix = true,
  onComplete,
  soundInterval = 1,
  soundType = 'typing',
}: SystemMessageProps) {
  const { playSound } = useAudio();
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const completedRef = useRef(false);
  const onChar = useCallback(() => {
    playSound(soundType);
  }, [playSound, soundType]);
  const { displayed: displayText, isComplete } = useTypewriter(text, {
    speed,
    delay,
    onChar,
    soundInterval,
  });

  useEffect(() => {
    if (isComplete && !completedRef.current) {
      completedRef.current = true;
      onCompleteRef.current?.();
    }
  }, [isComplete]);

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
