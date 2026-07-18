import { AudioProvider } from '../../context/AudioContext';
import { GameProvider, useGame } from './context/GameContext';
import { ModuleCompleteProvider } from './context/ModuleContext';
import ErrorBoundary from '../../components/ErrorBoundary';
import Welcome from './stages/Welcome';
import PsychologyLab from './stages/PsychologyLab';
import LifeSystem from './stages/LifeSystem';
import LifeLoading from './stages/LifeLoading';
import House from './stages/House';
import Reveal from './stages/Reveal';
import FinalMessage from './stages/FinalMessage';
import type { ModuleProps } from '../types';

const stages = [Welcome, PsychologyLab, LifeSystem, LifeLoading, House, Reveal, FinalMessage];

function Game() {
  const { currentStage } = useGame();
  const StageComponent = stages[currentStage];

  if (!StageComponent) {
    return (
      <div className="flex items-center justify-center min-h-[100dvh] bg-night" role="alert">
        <p className="text-silver-blue font-mono text-sm">حدث خطأ غير متوقع.</p>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <StageComponent />
    </ErrorBoundary>
  );
}

export default function Days365Module({ onComplete }: ModuleProps) {
  return (
    <AudioProvider>
      <ModuleCompleteProvider onComplete={onComplete}>
        <GameProvider>
          <Game />
        </GameProvider>
      </ModuleCompleteProvider>
    </AudioProvider>
  );
}
