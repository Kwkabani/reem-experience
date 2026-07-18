import React from 'react';
import { motion } from 'framer-motion';
import ProgressIndicator from './ProgressIndicator';
import ErrorBoundary from '../../../components/ErrorBoundary';
import { Stage } from '../types';
import type { ReactNode } from 'react';

interface StageWrapperProps {
  stage: Stage;
  children: ReactNode;
  className?: string;
}

export default function StageWrapper({ stage, children, className = '' }: StageWrapperProps) {
  return (
    <motion.main
      key={stage}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className={`min-h-[100dvh] flex flex-col items-center justify-center px-5 py-12 ${className}`}
      aria-label={`المرحلة: ${stage}`}
      style={{ willChange: 'opacity, transform' }}
    >
      <ProgressIndicator currentStage={stage} />
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md gap-6">
        <React.Suspense
          fallback={
            <div className="flex items-center justify-center min-h-[100dvh]">
              <div className="w-5 h-5 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
            </div>
          }
        >
          <ErrorBoundary
            fallback={
              <div className="flex flex-col items-center justify-center min-h-[100dvh] px-5">
                <p className="text-silver-blue font-mono text-sm mb-4">حدث خطأ في هذه المرحلة</p>
                <button
                  onClick={() => window.location.reload()}
                  className="text-gold text-sm font-mono hover:underline"
                >
                  إعادة المحاولة
                </button>
              </div>
            }
          >
            {children}
          </ErrorBoundary>
        </React.Suspense>
      </div>
    </motion.main>
  );
}
