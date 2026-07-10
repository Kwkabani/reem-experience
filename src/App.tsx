import { lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { GameProvider, useGame } from './context/GameContext';

const Welcome = lazy(() => import('./stages/Welcome'));
const PsychologyLab = lazy(() => import('./stages/PsychologyLab'));
const LifeSystem = lazy(() => import('./stages/LifeSystem'));
const LifeLoading = lazy(() => import('./stages/LifeLoading'));
const House = lazy(() => import('./stages/House'));
const Reveal = lazy(() => import('./stages/Reveal'));
const FinalMessage = lazy(() => import('./stages/FinalMessage'));

const stages = [
  Welcome,
  PsychologyLab,
  LifeSystem,
  LifeLoading,
  House,
  Reveal,
  FinalMessage,
];

function Game() {
  const { currentStage } = useGame();
  const StageComponent = stages[currentStage];

  if (!StageComponent) {
    return (
      <div className="flex items-center justify-center min-h-[100dvh] bg-night">
        <p className="text-silver-blue font-mono text-sm">حدث خطأ غير متوقع.</p>
      </div>
    );
  }

  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[100dvh] bg-night">
        <div className="w-6 h-6 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
      </div>
    }>
      <AnimatePresence mode="wait">
        <StageComponent key={currentStage} />
      </AnimatePresence>
    </Suspense>
  );
}

export default function App() {
  return (
    <GameProvider>
      <Game />
    </GameProvider>
  );
}
