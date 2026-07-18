import { Suspense } from 'react';
import { motion } from 'framer-motion';
import type { AppModule } from '../modules/types';

interface Props {
  module: AppModule;
  onExit: () => void;
}

export default function ModuleLauncher({ module, onExit }: Props) {
  const Component = module.component;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[100dvh] relative"
    >
      {/* Back button */}
      <button
        onClick={onExit}
        className="fixed top-4 left-4 z-50 flex items-center gap-1.5 
                   text-silver-blue/60 hover:text-warm-white text-xs font-mono
                   px-3 py-1.5 rounded-full transition-colors
                   backdrop-blur-md"
        style={{
          background: 'rgba(3, 5, 8, 0.7)',
          border: '1px solid rgba(148, 163, 184, 0.1)',
        }}
        aria-label="العودة للرئيسية"
      >
        <span className="text-sm">→</span>
        الرئيسية
      </button>

      <Suspense
        fallback={
          <div className="min-h-[100dvh] flex flex-col items-center justify-center px-5 bg-night">
            <div className="text-4xl mb-4">{module.icon}</div>
            <p className="text-silver-blue/50 text-sm font-mono">جاري التحميل...</p>
          </div>
        }
      >
        <Component onComplete={onExit} />
      </Suspense>
    </motion.div>
  );
}
