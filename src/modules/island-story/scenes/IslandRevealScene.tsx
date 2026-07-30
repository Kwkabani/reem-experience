import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../../../components/GlassCard';
import SystemMessage from '../../../components/SystemMessage';
import Button from '../../../components/Button';
import IslandCanvas from '../island/IslandCanvas';
import { useIslandReveal } from '../hooks/useIslandReveal';
import { useGame } from '../context/GameContext';
import { useAudio } from '../../../context/AudioContext';
import { sceneTransition } from '../systems/AnimationPresets';
import { ISLAND_WELCOME } from '../data/story';
import { LOCATIONS } from '../island/config';
import type { LocationConfig } from '../island/types';

type TextPhase =
  'fog' | 'rising' | 'clearing' | 'beach' | 'house' | 'tree' | 'cave' | 'tower' | 'welcome';

const TEXT_PHASE_MAP: Record<string, TextPhase> = {
  fog: 'fog',
  rising: 'rising',
  clearing: 'clearing',
  beach_reveal: 'beach',
  house_reveal: 'house',
  tree_reveal: 'tree',
  cave_reveal: 'cave',
  tower_reveal: 'tower',
};

const TEXT_LABELS: Record<string, string> = {
  fog: '...البحر يهمس بأسراره',
  rising: '...الضباب يبدأ بالانقشاع',
  clearing: '...تظهر معالم الجزيرة',
};

export default function IslandRevealScene() {
  const { goToNextScene, completeScene, currentScene } = useGame();
  const { playSound } = useAudio();
  const [showWelcome, setShowWelcome] = useState(false);
  const [welcomeTypingDone, setWelcomeTypingDone] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [textPhase, setTextPhase] = useState<TextPhase>('fog');
  const [currentRevealText, setCurrentRevealText] = useState<string | null>(null);
  const soundPlayed = useRef<Set<string>>(new Set());

  const handlePhaseChange = (phaseId: string) => {
    const mapped = TEXT_PHASE_MAP[phaseId];
    if (mapped) {
      setTextPhase(mapped);

      // Set per-location reveal text
      if (mapped !== 'fog' && mapped !== 'rising' && mapped !== 'clearing') {
        const loc = LOCATIONS.find((l: LocationConfig) => l.id === mapped);
        if (loc) {
          setCurrentRevealText(loc.revealText);
        }
      }
    }

    if (!soundPlayed.current.has(phaseId)) {
      soundPlayed.current.add(phaseId);
      if (phaseId === 'rising') playSound('ready');
      if (phaseId === 'clearing') playSound('success');
      if (phaseId === 'beach_reveal') playSound('typing_soft');
      if (phaseId === 'house_reveal') playSound('typing_soft');
      if (phaseId === 'tree_reveal') playSound('complete');
      if (phaseId === 'cave_reveal') playSound('typing_soft');
      if (phaseId === 'tower_reveal') {
        playSound('complete');
        setTimeout(() => playSound('success'), 600);
      }
    }
  };

  const reveal = useIslandReveal(handlePhaseChange);

  useEffect(() => {
    if (reveal.phase === 'tower_reveal') {
      const t = setTimeout(() => {
        setTextPhase('welcome');
        setCurrentRevealText(null);
        setShowWelcome(true);
      }, 2800);
      return () => clearTimeout(t);
    }
  }, [reveal.phase]);

  useEffect(() => {
    if (!welcomeTypingDone) return;
    const t = setTimeout(() => setShowButton(true), 2000);
    return () => clearTimeout(t);
  }, [welcomeTypingDone]);

  const handleContinue = () => {
    playSound('click');
    completeScene(currentScene);
    goToNextScene();
  };

  const currentText = TEXT_LABELS[textPhase] || null;

  return (
    <motion.div
      {...sceneTransition}
      className="relative min-h-[100dvh] flex flex-col items-center justify-center px-5 py-12 overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #0a0a1a 0%, #141022 20%, #1a1410 50%, #0d1b2a 80%, #060d1a 100%)',
      }}
    >
      <IslandCanvas
        reveal={{
          phase: reveal.phase,
          cameraZoom: reveal.cameraZoom,
          cameraX: reveal.cameraX,
          cameraY: reveal.cameraY,
          fogOpacity: reveal.fogOpacity,
          isLocationRevealed: reveal.isLocationRevealed,
          isAllLocationsRevealed: reveal.isAllLocationsRevealed,
          hasEnteredWelcome: reveal.hasEnteredWelcome,
        }}
        cameraZoom={reveal.cameraZoom}
        cameraX={reveal.cameraX}
        cameraY={reveal.cameraY}
        fogOpacity={reveal.fogOpacity}
      >
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center min-h-[100dvh] w-full max-w-lg px-5 mx-auto">
          {/* Phase text */}
          <AnimatePresence mode="wait">
            {currentText && (
              <motion.div
                key={`phase-${textPhase}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10, transition: { duration: 0.6 } }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <p className="text-silver-blue/30 font-mono text-xs">{currentText}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Per-location reveal text */}
          <AnimatePresence mode="wait">
            {currentRevealText && (
              <motion.div
                key={`reveal-${currentRevealText}`}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.9, transition: { duration: 0.5 } }}
                transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                className="text-center mt-4"
              >
                <motion.p
                  className="text-warm-gold/50 font-mono text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  {currentRevealText}
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Welcome card */}
          <AnimatePresence mode="wait">
            {textPhase === 'welcome' && showWelcome && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full flex flex-col items-center gap-6 mt-8"
              >
                <GlassCard variant="warm" delay={0.3}>
                  <div className="text-right">
                    <SystemMessage
                      text={ISLAND_WELCOME}
                      delay={0}
                      speed={50}
                      prefix={false}
                      onComplete={() => setWelcomeTypingDone(true)}
                    />
                  </div>
                </GlassCard>

                {showButton && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                  >
                    <Button
                      onClick={handleContinue}
                      variant="shine"
                      size="lg"
                      className="min-w-[200px]"
                    >
                      استكشفي الجزيرة
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </IslandCanvas>
    </motion.div>
  );
}
