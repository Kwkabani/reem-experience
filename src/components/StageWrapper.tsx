import { motion } from 'framer-motion';
import ProgressIndicator from './ProgressIndicator';
import { Stage } from '../types';
import type { ReactNode } from 'react';

interface StageWrapperProps {
  stage: Stage;
  children: ReactNode;
  className?: string;
}

export default function StageWrapper({ stage, children, className = '' }: StageWrapperProps) {
  return (
    <motion.div
      key={stage}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className={`min-h-[100dvh] flex flex-col items-center justify-center px-5 py-12 ${className}`}
    >
      <ProgressIndicator currentStage={stage} />
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md gap-6">
        {children}
      </div>
    </motion.div>
  );
}
