import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
const GlobeAnimation = React.lazy(() => import('../../../components/GlobeAnimation'));
import GlassCard from '../../../components/GlassCard';
import SystemMessage from '../../../components/SystemMessage';
import LoadingAnimation from '../../../components/LoadingAnimation';
import ProgressIndicator from '../components/ProgressIndicator';
import Button from '../../../components/Button';
import { Stage } from '../types';
import { useGame } from '../context/GameContext';
import { useAudio } from '../../../context/AudioContext';
import { useGlobeState } from '../../../hooks/useGlobeState';
import { GLOBE_MESSAGES } from '../config/content';
import { TIMING } from '../config/timing';

type Phase =
  | 'loading'
  | 'globe'
  | 'zoom'
  | 'analysis'
  | 'search'
  | 'question'
  | 'answer'
  | 'card'
  | 'comedy'
  | 'transition'
  | 'done';

export default function Welcome() {
  const { goToNextStage } = useGame();
  const { enableAudio, playSound } = useAudio();
  const [phase, setPhase] = useState<Phase>('loading');
  const [globeMsgIdx, setGlobeMsgIdx] = useState(0);
  const [showRedirect, setShowRedirect] = useState(false);
  const [searchProgress, setSearchProgress] = useState(0);
  const loadingIntervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const globe = useGlobeState();

  // Loading → Globe (3s)
  useEffect(() => {
    if (phase !== 'loading') return;
    const t = setTimeout(() => {
      setPhase('globe');
      globe.show();
    }, TIMING.WELCOME_LOADING);
    return () => clearTimeout(t);
  }, [phase]);

  // Globe messages cycling (every 1.5s)
  useEffect(() => {
    if (phase !== 'globe') return;
    if (globeMsgIdx >= GLOBE_MESSAGES.length) return;
    const t = setTimeout(() => {
      setGlobeMsgIdx((prev) => prev + 1);
    }, TIMING.GLOBE_MESSAGE_INTERVAL);
    return () => clearTimeout(t);
  }, [phase, globeMsgIdx]);

  // All messages done → show redirect for 1.5s → zoom
  useEffect(() => {
    if (phase !== 'globe') return;
    if (globeMsgIdx < GLOBE_MESSAGES.length) return;
    if (!showRedirect) {
      setShowRedirect(true);
      return;
    }
    const t = setTimeout(() => {
      setPhase('zoom');
      globe.startZoom();
    }, TIMING.GLOBE_REDIRECT_DELAY);
    return () => clearTimeout(t);
  }, [phase, globeMsgIdx, showRedirect]);

  // Zoom → Analysis
  const handleZoomComplete = () => {
    playSound('ready');
    globe.finish();
    setPhase('analysis');
  };

  // Analysis → Search (4s analysis display)
  useEffect(() => {
    if (phase !== 'analysis') return;
    const t = setTimeout(() => setPhase('search'), TIMING.ANALYSIS_DISPLAY);
    return () => clearTimeout(t);
  }, [phase]);

  // Search animation (3.5s)
  useEffect(() => {
    if (phase !== 'search') return;
    const start = Date.now();
    let completed = false;
    const interval = setInterval(() => {
      const elapsed = (Date.now() - start) / 1000;
      const p = Math.min(elapsed / (TIMING.SEARCH_DURATION / 1000), 1);
      setSearchProgress(p);
      if (p >= 1 && !completed) {
        completed = true;
        clearInterval(interval);
        playSound('complete');
      }
    }, 50);
    return () => clearInterval(interval);
  }, [phase, playSound]);

  useEffect(() => {
    if (phase !== 'search' || searchProgress < 1) return;
    const t = setTimeout(() => setPhase('question'), TIMING.SEARCH_COMPLETION_DELAY);
    return () => clearTimeout(t);
  }, [phase, searchProgress]);

  // Eager audio init on mount so sounds play from the start
  useEffect(() => {
    enableAudio();
  }, [enableAudio]);

  // Resume AudioContext on first user gesture (browser autoplay policy)
  useEffect(() => {
    const handler = () => playSound('click');
    document.addEventListener('pointerdown', handler, { once: true });
    return () => document.removeEventListener('pointerdown', handler);
  }, [playSound]);

  // Answer → Card (6s)
  useEffect(() => {
    if (phase !== 'answer') return;
    const t = setTimeout(() => setPhase('card'), TIMING.ANSWER_TO_CARD);
    return () => clearTimeout(t);
  }, [phase]);

  // Comedy → Transition (5s)
  useEffect(() => {
    if (phase !== 'comedy') return;
    const t = setTimeout(() => setPhase('transition'), TIMING.COMEDY_TO_TRANSITION);
    return () => clearTimeout(t);
  }, [phase]);

  // Transition → Next (4s)
  useEffect(() => {
    if (phase !== 'transition') return;
    const t = setTimeout(() => goToNextStage(), TIMING.TRANSITION_TO_NEXT);
    return () => clearTimeout(t);
  }, [phase, goToNextStage]);

  // Done → skip to next stage
  useEffect(() => {
    if (phase !== 'done') return;
    goToNextStage();
  }, [phase, goToNextStage]);

  // Loading pulse during loading + zoom phases
  useEffect(() => {
    if (phase !== 'loading' && phase !== 'zoom') {
      if (loadingIntervalRef.current) {
        clearTimeout(loadingIntervalRef.current);
        loadingIntervalRef.current = null;
      }
      return;
    }

    playSound('loading');

    const pulse = () => {
      loadingIntervalRef.current = setTimeout(() => {
        playSound('loading');
        pulse();
      }, TIMING.LOADING_PULSE_INTERVAL) as unknown as number;
    };

    loadingIntervalRef.current = setTimeout(
      pulse,
      TIMING.LOADING_PULSE_INTERVAL,
    ) as unknown as number;

    return () => {
      if (loadingIntervalRef.current) {
        clearTimeout(loadingIntervalRef.current);
        loadingIntervalRef.current = null;
      }
    };
  }, [phase, playSound]);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      className="relative min-h-[100dvh] overflow-hidden"
      style={{ background: '#030508' }}
    >
      {/* GlobeAnimation - mounted for all phases */}
      <React.Suspense fallback={null}>
        <GlobeAnimation state={globe.state} onZoomComplete={handleZoomComplete} />
      </React.Suspense>

      <ProgressIndicator currentStage={Stage.Welcome} />

      {/* Content overlay */}
      <div className="relative z-10 min-h-[100dvh] flex flex-col items-center justify-center px-5">
        <AnimatePresence mode="wait">
          {phase === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <LoadingAnimation text="جاري تحميل تجربة الرحلة الاستكشافية..." />
            </motion.div>
          )}

          {phase === 'globe' && (
            <motion.div
              key="globe"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex flex-col items-center gap-4"
              style={{ marginTop: 'clamp(20vh, 30vw, 35vh)' }}
            >
              {GLOBE_MESSAGES.slice(0, globeMsgIdx + 1).map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <SystemMessage text={msg} delay={0} speed={20} />
                </motion.div>
              ))}
              {showRedirect && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <SystemMessage text="سيتم التوجة الى المنطقة المحددة" delay={0} speed={20} />
                </motion.div>
              )}
            </motion.div>
          )}

          {phase === 'zoom' && (
            <motion.div
              key="zoom"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <SystemMessage text="جاري الدخول إلى التجربة..." delay={0.5} speed={25} />
            </motion.div>
          )}

          {phase === 'analysis' && (
            <motion.div
              key="analysis"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex flex-col items-center gap-6"
            >
              <SystemMessage text="احنا الان في مأرب." delay={0.3} speed={20} />
              <SystemMessage text="ومعانا تجربة..." delay={2} speed={20} />
              <SystemMessage text="باقي ندور لمن صنعت هذه التجربة." delay={3.5} speed={20} />
            </motion.div>
          )}

          {phase === 'search' && (
            <motion.div
              key="search"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex flex-col items-center gap-6"
            >
              <SystemMessage text="جاري البحث عن الشخص الذي صنعت له هذه التجربه..." delay={1.0} />

              <motion.div
                className="mt-4 relative w-16 h-16"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="absolute inset-0 rounded-full border-2 border-gold/40" />
                <motion.div
                  className="absolute inset-2 rounded-full bg-gold/20"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>

              <div className="w-48 h-px bg-gradient-to-l from-transparent via-gold/50 to-transparent relative overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 w-6 h-px bg-gold"
                  animate={{ x: [-24, 192] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />
              </div>

              <motion.p
                className="text-silver-blue/50 text-xs font-mono mt-2"
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                تحميل البيانات... {Math.round(searchProgress * 100)}%
              </motion.p>
            </motion.div>
          )}

          {phase === 'question' && (
            <motion.div
              key="question"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="w-full flex flex-col items-center gap-6"
            >
              <GlassCard delay={0.2}>
                <div className="text-center">
                  <span className="text-4xl block mb-4">🔍</span>
                  <p className="text-gold font-display font-bold text-lg mb-3">سؤال من النظام</p>
                  <p className="text-warm-white font-body text-xl leading-relaxed">
                    في نظرش من هو هذا الشخص
                    <br />
                    اللي سوينا له هذه التجربه؟
                  </p>
                </div>
              </GlassCard>

              <Button
                onClick={() => setPhase('answer')}
                variant="glass"
                size="lg"
                className="w-full"
              >
                الاجابة عن السؤال
              </Button>
            </motion.div>
          )}

          {phase === 'answer' && (
            <motion.div
              key="answer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex flex-col items-center gap-6"
            >
              <GlassCard delay={0.3}>
                <div className="text-center">
                  <motion.p
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                    className="text-4xl mb-4"
                  >
                    😏
                  </motion.p>
                  <p className="text-gold font-display font-bold text-lg mb-3">تحليل الإجابة...</p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="text-warm-white font-body text-lg leading-relaxed"
                  >
                    في حد غيرش يستاهل اسوي له هذه التجربة ياريم؟
                  </motion.p>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {phase === 'card' && (
            <motion.div
              key="card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="w-full flex flex-col items-center gap-6"
            >
              <GlassCard delay={0.2}>
                <div className="text-center">
                  <p className="text-gold font-display font-bold text-xl mb-4">
                    سويت هذه التجربه مخصصه لش ياريم ✨ واتمنى انها تعجبش 🤍
                  </p>
                  <div className="w-12 h-px bg-gold/20 mx-auto my-4" />
                  <p className="text-warm-white font-body text-lg leading-relaxed">
                    جاهزة نكتشف ايش فيها؟
                  </p>
                </div>
              </GlassCard>

              <Button
                onClick={() => setPhase('comedy')}
                variant="shine"
                size="lg"
                className="w-full"
              >
                يله هيه قدو وقت نستكشف...
              </Button>
            </motion.div>
          )}

          {phase === 'comedy' && (
            <motion.div
              key="comedy"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <motion.p
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
                className="text-5xl mb-4"
              >
                😂
              </motion.p>
              <GlassCard delay={0.4}>
                <div className="text-center">
                  <p className="text-warm-white font-body text-lg leading-relaxed">
                    اهاااه شكل هرمون الفضول مرتفع شويه
                  </p>
                  <p className="text-warm-white font-body text-lg leading-relaxed mt-2">
                    سرعة الضغط على الزرار
                    <br />
                    اسرع من سرعة الضوء 😂
                  </p>
                  <div className="w-12 h-px bg-gold/20 mx-auto my-4" />
                  <p className="text-silver-blue text-sm">امزح امزح .... يله عنستكشف الان</p>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {phase === 'transition' && (
            <motion.div
              key="transition"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
              className="text-center"
            >
              <motion.p
                className="text-gold font-display font-bold text-2xl"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: 1 }}
              >
                ✦
              </motion.p>
              <SystemMessage text="جاري الانتقال إلى غرفة الانعكاس ..." delay={0.5} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Skip button - appears after 3 seconds */}
        {phase !== 'card' && phase !== 'comedy' && phase !== 'transition' && phase !== 'done' && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 3 }}
            onClick={() => setPhase('done')}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 text-silver-blue/50 text-xs font-mono
                       hover:text-silver-blue transition-colors px-4 py-2"
          >
            تخطي ←
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
