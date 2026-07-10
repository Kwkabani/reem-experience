import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SystemMessage from './SystemMessage';
import useSequentialMessages from '../hooks/useSequentialMessages';
import type { TimedMessage } from '../hooks/useSequentialMessages';

interface MessageSequenceProps {
  messages: TimedMessage[];
  className?: string;
  onComplete?: () => void;
}

export default function MessageSequence({ messages, className = '', onComplete }: MessageSequenceProps) {
  const { activeIndex, isComplete } = useSequentialMessages(messages);

  useEffect(() => {
    if (isComplete) onComplete?.();
  }, [isComplete, onComplete]);

  return (
    <div className={`space-y-2 ${className}`}>
      {messages.map((msg, i) => (
        <AnimatePresence key={i}>
          {i <= activeIndex && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <SystemMessage text={msg.text} speed={msg.speed ?? 30} delay={0} prefix />
            </motion.div>
          )}
        </AnimatePresence>
      ))}
    </div>
  );
}
