import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StageWrapper from '../components/StageWrapper';
import GlassCard from '../components/GlassCard';
import SystemMessage from '../components/SystemMessage';
import MessageSequence from '../components/MessageSequence';
import Button from '../components/Button';
import BackgroundEffect, { particleDefs } from '../components/BackgroundEffect';
import { useGame } from '../context/GameContext';
import { Stage } from '../types';

interface Module {
  id: string;
  label: string;
  comedy: string;
}

const modules: Module[] = [
  { id: 'respect', label: 'وحدة الاحترام', comedy: '😂 تم التفعيل.. خلاص مافيه رفع صوت.' },
  { id: 'connect', label: 'وحدة التواصل', comedy: '😂 جاري تحميل لغة العيون.. تم بنجاح.' },
  { id: 'laugh', label: 'وحدة الضحك', comedy: '😂 النظام يضحك.. هذي أعلى رتبة.' },
];

interface ModuleLoaderProps {
  module: Module;
  index: number;
  onComplete: () => void;
}

function ModuleLoader({ module, index, onComplete }: ModuleLoaderProps) {
  const { playSound } = useGame();
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'loading' | 'success' | 'comedy'>('loading');

  useEffect(() => {
    const start = Date.now();
    const dur = 1500 + index * 300;
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const p = Math.min((elapsed / dur) * 100, 100);
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        playSound('success');
        setStatus('success');
        setTimeout(() => {
          setStatus('comedy');
          setTimeout(() => onComplete(), 1500);
        }, 600);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [index, onComplete, playSound]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.3 }}
      className="w-full max-w-sm border border-white/10 rounded-xl p-4 bg-white/[0.02]"
    >
      <div className="flex justify-between items-center mb-3">
        <span className="text-warm-white font-display text-sm">{module.label}</span>
        <span className={`text-xs font-mono ${status === 'loading' ? 'text-silver-blue' : status === 'success' ? 'text-green-400' : 'text-purple-300'}`}>
          {status === 'loading' ? `${Math.round(progress)}%` : status === 'success' ? '✓ نجاح' : '😁'}
        </span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full transition-colors ${
            status === 'loading' ? 'bg-gold' : status === 'success' ? 'bg-green-500' : 'bg-purple-400'
          }`}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <AnimatePresence mode="wait">
        {status === 'comedy' && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="text-purple-300/60 text-xs mt-2"
          >
            {module.comedy}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function LifeSystem() {
  const { goToNextStage } = useGame();
  const [completeMsgsDone, setCompleteMsgsDone] = useState(false);
  const [completedModules, setCompletedModules] = useState(0);
  const [phase, setPhase] = useState<'modules' | 'installing' | 'complete'>('modules');

  // BUG-03 FIX: stable reference via useCallback so ModuleLoader's effect
  // doesn't restart (and reset progress) on every parent re-render
  const handleModuleComplete = useCallback(() => {
    setCompletedModules(prev => {
      const next = prev + 1;
      if (next >= modules.length) {
        setTimeout(() => setPhase('installing'), 500);
      }
      return next;
    });
  }, []);

  useEffect(() => {
    if (phase === 'installing') {
      const t = setTimeout(() => setPhase('complete'), 2500);
      return () => clearTimeout(t);
    }
  }, [phase]);

  const handleCompleteMsgsDone = useCallback(() => {
    setCompleteMsgsDone(true);
  }, []);

  return (
    <StageWrapper stage={Stage.LifeSystem} className="bg-tech-dark">
      <BackgroundEffect
        gradient="bg-transparent"
        glowColor="rgba(138,164,199,0.05)"
        glowPosition="center"
        particles={particleDefs.system}
      />

      <GlassCard>
        <div className="text-center">
          <p className="text-silver-blue font-mono text-sm tracking-widest">SYSTEM LIFE v1.0</p>
          <div className="w-12 h-px bg-silver-blue/30 mx-auto my-3" />
          <p className="text-warm-white font-display text-sm">تنفيذ الأوامر</p>
        </div>
      </GlassCard>

      <AnimatePresence mode="wait">
        {phase === 'modules' && (
          <motion.div
            key="modules"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full flex flex-col items-center gap-3"
          >
            {modules.map((m, i) => (
              completedModules > i ? null : completedModules === i ? (
                <ModuleLoader key={m.id} module={m} index={i} onComplete={handleModuleComplete} />
              ) : (
                <div
                  key={m.id}
                  className="w-full max-w-sm border border-white/5 rounded-xl p-4 bg-white/[0.01] opacity-30"
                >
                  <span className="text-silver-blue/50 font-display text-sm">⏳ {m.label}</span>
                </div>
              )
            ))}
          </motion.div>
        )}

        {phase === 'installing' && (
          <motion.div
            key="installing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <SystemMessage text="جاري تثبيت أهم مكون..." delay={0.5} />
          </motion.div>
        )}

        {phase === 'complete' && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full flex flex-col items-center gap-5"
          >
            <GlassCard delay={0.3}>
              <div className="text-center">
                <p className="text-gold font-display font-bold text-2xl mb-2">تم التثبيت</p>
                <p className="text-warm-white font-body text-lg">المودة والرحمة</p>
                <div className="w-16 h-px bg-gold/30 mx-auto my-3" />
                <p className="text-silver-blue text-sm">الإصدار: للأبد</p>
              </div>
            </GlassCard>

            <div className="w-full max-w-md space-y-3">
              <MessageSequence
                messages={[
                  { text: 'الان بعدما عرفنا منش اجابات غرفة الفهم النظام في حياتنا استقر', speed: 25 },
                  { text: 'لان مبدئنا بيكون انشاء الله هي المودة والرحمة', speed: 25 },
                  { text: 'جاهزة نستكشف كيف وضع الحياه ؟', speed: 25 },
                ]}
                onComplete={handleCompleteMsgsDone}
              />
            </div>

            {completeMsgsDone && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Button
                  onClick={goToNextStage}
                  variant="shine"
                  size="lg"
                >
                  يلا نستكشف
                </Button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </StageWrapper>
  );
}
