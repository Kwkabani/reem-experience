import { useState } from 'react';
import { motion } from 'framer-motion';
import CharacterCreator from '../components/CharacterCreator';
import ResetGameDialog from '../components/ResetGameDialog';
import { useGame } from '../context/GameContext';
import { useModuleComplete } from '../context/ModuleCompleteContext';
import { useAudio } from '../../../context/AudioContext';
import { sceneTransition } from '../systems/AnimationPresets';
import type { AvatarType, PersonalityType } from '../types';
import type { CharacterAppearance } from '../characters/types';

export default function CharacterScene() {
  const { setPlayer, completeScene, currentScene, resetGame } = useGame();
  const { playSound } = useAudio();
  const onComplete = useModuleComplete();
  const [showReset, setShowReset] = useState(false);

  const handleSave = (
    name: string,
    avatar: AvatarType,
    personality: PersonalityType,
    characterId?: string,
    characterName?: string,
    characterAppearance?: CharacterAppearance,
  ) => {
    playSound('success');
    setPlayer(name, avatar, personality, characterId, characterName, characterAppearance);
    completeScene(currentScene);
    onComplete?.();
  };

  const handleReset = () => {
    playSound('click');
    resetGame();
    setShowReset(false);
  };

  return (
    <motion.div
      {...sceneTransition}
      className="relative min-h-[100dvh] flex flex-col items-center justify-center px-5 py-12 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0a0a1a 0%, #141022 30%, #1a1410 60%, #0d1b2a 100%)',
      }}
    >
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[70%] h-[50%] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(201,168,76,0.04), transparent 70%)',
        }}
      />

      <motion.div className="relative z-10 w-full flex flex-col items-center">
        <CharacterCreator onSave={handleSave} />
      </motion.div>

      {/* Restart link */}
      <motion.button
        onClick={() => {
          playSound('click');
          setShowReset(true);
        }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-silver-blue/20 hover:text-silver-blue/50 text-[10px] font-mono tracking-wider transition-colors duration-200 cursor-pointer select-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        بدء اللعبة من جديد
      </motion.button>

      <ResetGameDialog
        open={showReset}
        onConfirm={handleReset}
        onCancel={() => setShowReset(false)}
      />
    </motion.div>
  );
}
