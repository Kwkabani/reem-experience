import { Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AudioProvider } from '../../context/AudioContext';
import { GameProvider, useGame } from './context/GameContext';
import { ModuleCompleteProvider } from './context/ModuleCompleteContext';
import ErrorBoundary from '../../components/ErrorBoundary';
import OceanScene from './scenes/OceanScene';
import BottleScene from './scenes/BottleScene';
import IslandRevealScene from './scenes/IslandRevealScene';
import CharacterScene from './scenes/CharacterScene';
import type { ModuleProps } from '../types';

const scenes = [OceanScene, BottleScene, IslandRevealScene, CharacterScene];

function Game() {
  const { currentScene } = useGame();
  const SceneComponent = scenes[currentScene];

  if (!SceneComponent) {
    return (
      <div className="flex items-center justify-center min-h-[100dvh] bg-night" role="alert">
        <p className="text-silver-blue font-mono text-sm">حدث خطأ غير متوقع.</p>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <AnimatePresence mode="wait">
        <SceneComponent key={currentScene} />
      </AnimatePresence>
    </ErrorBoundary>
  );
}

export default function IslandStoryModule({ onComplete }: ModuleProps) {
  return (
    <AudioProvider>
      <ModuleCompleteProvider onComplete={onComplete}>
        <GameProvider>
          <Suspense
            fallback={
              <div className="min-h-[100dvh] flex flex-col items-center justify-center px-5 bg-night">
                <div className="flex gap-1.5 mb-4">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-gold rounded-full"
                      animate={{ y: [0, -8, 0] }}
                      transition={{
                        duration: 0.6,
                        delay: i * 0.2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  ))}
                </div>
                <p className="text-silver-blue/50 text-sm font-mono">جاري تحميل جزيرتك...</p>
              </div>
            }
          >
            <Game />
          </Suspense>
        </GameProvider>
      </ModuleCompleteProvider>
    </AudioProvider>
  );
}
