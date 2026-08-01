import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../../../components/GlassCard';
import SystemMessage from '../../../components/SystemMessage';
import Button from '../../../components/Button';
import IslandCanvas from '../island/IslandCanvas';
import ResetGameDialog from '../components/ResetGameDialog';
import { useGame } from '../context/useGame';
import { useModuleComplete } from '../context/useModuleComplete';
import { useAudio } from '../../../context/AudioContext';
import { sceneTransition } from '../systems/AnimationPresets';
import { CHARACTERS } from '../characters/config';
import { LOCATIONS } from '../island/config';
import type { RevealState } from '../island/types';

const LOCATION_NAMES: Record<string, string> = {
  beach: 'الشاطئ',
  house: 'البيت الصغير',
  tree: 'الشجرة القديمة',
  cave: 'الكهف',
  tower: 'البرج',
};

const LOCATION_STORIES: Record<string, string> = {
  beach: 'هنا بدأت رحلتك... الأمواج تحمل الأماني التي أرسلتها مع القارورة، وتردها إليك كل يوم.',
  house: 'بيت صغير لا يفتح أبوابه إلا لمن تمسكت بحلمها. ليتك تكتشفين من يسكنه يوماً.',
  tree: 'هذه الشجرة تحفظ أسرار الجزيرة، وتهمس كل ليلة بحكاية جديدة لمن تجلس تحتها.',
  cave: 'مكان لم يكتشفه أحد بعد... من يعلم ما الذي يخفيه في الأعماق؟',
  tower: 'أعلى نقطة في الجزيرة... من هنا ترين البحر كله، وتشاهدين أحلامك وهي تتشكل أمامك.',
};

export default function IslandExploreScene() {
  const { player, completeScene, currentScene, island, resetGame } = useGame();
  const { playSound } = useAudio();
  const onComplete = useModuleComplete();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [storyDone, setStoryDone] = useState(false);
  const [showReset, setShowReset] = useState(false);

  const unlocked = island.unlockedLocations;

  const isLocationRevealed = useCallback((id: string) => unlocked.includes(id), [unlocked]);

  const revealState: RevealState = {
    phase: 'explore',
    cameraZoom: 0.95,
    cameraX: 0,
    cameraY: 0,
    fogOpacity: 0,
    isLocationRevealed,
    isAllLocationsRevealed: true,
    hasEnteredWelcome: true,
  };

  const selectedLocation = LOCATIONS.find((l) => l.id === selectedId) || null;
  const CharacterComponent = player?.characterId
    ? CHARACTERS.find((c) => c.id === player.characterId)?.component
    : null;

  const handleSelect = (id: string) => {
    playSound('click');
    setSelectedId(id);
    setStoryDone(false);
  };

  const handleCloseStory = () => {
    playSound('click');
    setSelectedId(null);
  };

  const handleFinish = () => {
    playSound('success');
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
      className="relative min-h-[100dvh] flex flex-col items-center justify-center px-4 py-8 overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #0a0a1a 0%, #141022 20%, #1a1410 50%, #0d1b2a 80%, #060d1a 100%)',
      }}
    >
      <IslandCanvas
        reveal={revealState}
        cameraZoom={0.95}
        cameraX={0}
        cameraY={0}
        fogOpacity={0}
        character={
          CharacterComponent ? (
            <div className="w-full" style={{ aspectRatio: '200 / 280' }}>
              <CharacterComponent />
            </div>
          ) : undefined
        }
        characterLocationId="beach"
        onLocationSelect={handleSelect}
      >
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-between w-full max-w-lg px-4 py-6 mx-auto pointer-events-none">
          {/* Restart button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            onClick={() => {
              playSound('click');
              setShowReset(true);
            }}
            className="absolute top-2 right-2 z-20 px-3 py-2.5 rounded-lg text-xs font-mono
              text-silver-blue/40 hover:text-silver-blue/70 border border-white/5 hover:border-white/10
              hover:bg-white/[0.03] transition-all duration-200 cursor-pointer select-none
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-silver-blue/60 min-h-[44px] pointer-events-auto"
          >
            إعادة اللعبة
          </motion.button>

          {/* HUD */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="w-full flex items-center justify-center pointer-events-auto"
          >
            <div
              className="flex items-center gap-3 rounded-full px-4 py-2 border border-gold/20"
              style={{
                background: 'rgba(10,8,12,0.6)',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              }}
            >
              {CharacterComponent && (
                <div className="w-9 h-12 shrink-0">
                  <CharacterComponent />
                </div>
              )}
              <div className="text-right">
                <p className="text-gold font-display font-bold text-sm leading-tight">
                  {player?.name || 'المستكشفة'}
                </p>
                <p className="text-silver-blue/50 text-[10px] font-mono leading-tight">
                  {player?.characterName || 'جزيرة الأماني'}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Story panel */}
          <div className="w-full pointer-events-auto">
            <AnimatePresence mode="wait">
              {selectedLocation ? (
                <motion.div
                  key={`story-${selectedLocation.id}`}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16, transition: { duration: 0.3 } }}
                  transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                >
                  <GlassCard variant="warm">
                    <div className="text-right">
                      <p className="text-gold font-display font-bold text-base mb-1">
                        {LOCATION_NAMES[selectedLocation.id] || 'مكان غامض'}
                      </p>
                      <SystemMessage
                        text={LOCATION_STORIES[selectedLocation.id] || selectedLocation.revealText}
                        delay={0.1}
                        speed={35}
                        prefix={false}
                        soundType="typing_soft"
                        onComplete={() => setStoryDone(true)}
                      />
                    </div>
                    {storyDone && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="flex justify-center mt-4"
                      >
                        <Button onClick={handleCloseStory} variant="glass" size="sm">
                          إغلاق
                        </Button>
                      </motion.div>
                    )}
                  </GlassCard>
                </motion.div>
              ) : (
                <motion.div
                  key="explore-hint"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16, transition: { duration: 0.3 } }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="flex flex-col items-center gap-4"
                >
                  <p className="text-silver-blue/30 font-mono text-xs text-center">
                    اضغطي على المواقع المضيئة لاكتشاف أسرار الجزيرة
                  </p>
                  <Button onClick={handleFinish} variant="shine" size="lg">
                    أنهيت استكشافي ✨
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </IslandCanvas>

      <ResetGameDialog
        open={showReset}
        onConfirm={handleReset}
        onCancel={() => setShowReset(false)}
      />
    </motion.div>
  );
}
