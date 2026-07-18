import React from 'react';
import { Stage, STAGE_COUNT } from '../types';

interface ProgressIndicatorProps {
  currentStage: Stage;
}

const ProgressIndicator = React.memo(function ProgressIndicator({
  currentStage,
}: ProgressIndicatorProps) {
  const current = currentStage;

  return (
    <div
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex gap-2 items-center"
      role="progressbar"
      aria-valuenow={current}
      aria-valuemin={0}
      aria-valuemax={STAGE_COUNT - 1}
      aria-label={`المرحلة ${current + 1} من ${STAGE_COUNT}`}
    >
      {Array.from({ length: STAGE_COUNT }, (_, i) => (
        <div
          key={i}
          className={`rounded-full transition-all duration-300 ${
            i < current
              ? 'w-1.5 h-1.5 bg-gold/60'
              : i === current
                ? 'w-2.5 h-2.5 bg-gold shadow-[0_0_6px_rgba(212,175,55,0.5)]'
                : 'w-1.5 h-1.5 bg-silver-blue/20'
          }`}
        />
      ))}
    </div>
  );
});

export default ProgressIndicator;
