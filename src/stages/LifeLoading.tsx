import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StageWrapper from '../components/StageWrapper';
import GlassCard from '../components/GlassCard';
import SystemMessage from '../components/SystemMessage';
import FileCard from '../components/FileCard';
import ChoiceButtons from '../components/ChoiceButtons';
import Button from '../components/Button';
import MessageSequence from '../components/MessageSequence';
import BackgroundEffect, { particleDefs } from '../components/BackgroundEffect';
import { useGame } from '../context/GameContext';
import { Stage } from '../types';

interface Scenario {
  id: string;
  title: string;
  description: string;
  choices: { label: string; value: string; isComedy?: boolean; comedyAnalysis?: string }[];
  solution: string;
}

const scenarios: Scenario[] = [
  {
    id: 'hard_day',
    title: 'يوم صعب',
    description: 'وصلت البيت بعد يوم طويل وكانت طاقتك صفر. أنا موجود/ة بجانبك. ماذا تفضل أن أفعل؟',
    choices: [
      { label: 'تجلس بجانبي بصمت وتحتضنني', value: 'silent_hug' },
      { label: 'تسألني وش صار وتحاول تفهم', value: 'ask' },
      {
        label: 'تقول لي "خلص عادي" وتكمل سوالفك 😂',
        value: 'ignore',
        isComedy: true,
        comedyAnalysis: '😂 أها! تقولي عادي وتمشي! هذا تهرب يا ياشيخة.',
      },
    ],
    solution: 'في الأيام الصعبة، مجرد وجودك بجانبي بصمت هو كل ما أحتاج. لا كلمات كثيرة، فقط حضور دافئ.',
  },
  {
    id: 'difference',
    title: 'اختلاف',
    description: 'عندنا رأي مختلف في شيء بسيط. أنا مصر على رأيي وأنتِ مصرّة على رأيك. شو الحل؟',
    choices: [
      { label: 'نتفاهم وكل واحد يشرح وجهة نظره', value: 'talk' },
      { label: 'أحاول أفهم وجهة نظرك أكثر', value: 'understand' },
      {
        label: 'أقول "خلاص أنا الصح" وأمشي 😤',
        value: 'stubborn',
        isComedy: true,
        comedyAnalysis: '😂 أنا الصح وأمشي! واضح إنش عنيده والعناد يجري في الدم.',
      },
    ],
    solution: 'الاختلاف طبيعي. ليس المهم من الصح، المهم إننا نخرج من النقاش ونحن أقرب لبعض.',
  },
  {
    id: 'space',
    title: 'مساحة شخصية',
    description: 'أطلب منك مساحة يوم أو يومين. هل هذا يخوفك؟ كيف تتصرفين؟',
    choices: [
      { label: 'أحترم طلبك وأعطيك مساحة بثقة', value: 'respect_space' },
      { label: 'أتواصل معك برسالة بسيطة بدون إلحاح', value: 'gentle_message' },
      {
        label: 'أقعد أرسلك ٥٠ رسالة "تمام عليك؟" 😂',
        value: 'spam',
        isComedy: true,
        comedyAnalysis: '😂 ٥٠ رسالة! هذا مو حب هذا تحقيق.',
      },
    ],
    solution: 'طلب المساحة ليس بعدًا. أحيانًا يحتاج الإنسان يتنفس ليعود أقوى. ثقتك بي هي أكبر دعم.',
  },
];

const comedyFails = [
  '😂 لا حياة في الخادم! معلش بحمله مرة ثانية...',
  '😂 الحياة مشغولة شوي! ثالث مرة هتشتغل أكيد...',
  '😂 والله أنا تعبت! آخر مرة يا حياة يا... خلاص',
];

export default function LifeLoading() {
  const { goToNextStage, playSound } = useGame();
  const [phase, setPhase] = useState<'loading' | 'files' | 'scenario' | 'file_complete' | 'done' | 'searching'>('loading');
  const [loadingAttempt, setLoadingAttempt] = useState(0);
  const [loadingSubPhase, setLoadingSubPhase] = useState<'loading' | 'error' | 'success'>('loading');
  const [currentScenario, setCurrentScenario] = useState(0);
  const [completed, setCompleted] = useState<string[]>([]);
  const [analysisStep, setAnalysisStep] = useState<'idle' | 'loading' | 'result'>('idle');
  const [analysisText, setAnalysisText] = useState('');
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [filesIntroDone, setFilesIntroDone] = useState(false);
  const [doneMsgsComplete, setDoneMsgsComplete] = useState(false);
  const [shuffledScenarios] = useState(() => {
    const arr = [...scenarios];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  });
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  function tmr(ms: number, fn: () => void) {
    const id = setTimeout(() => {
      timersRef.current = timersRef.current.filter(t => t !== id);
      fn();
    }, ms);
    timersRef.current.push(id);
  }

  // BUG-06 FIX: clear all pending timers when this stage unmounts
  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, []);

  useEffect(() => {
    if (phase !== 'loading') return;

    if (loadingSubPhase === 'loading') {
      const t = setTimeout(() => {
        if (loadingAttempt >= 3) {
          setLoadingSubPhase('success');
        } else {
          playSound('error');
          setLoadingSubPhase('error');
        }
      }, 1500);
      return () => clearTimeout(t);
    }

    if (loadingSubPhase === 'error') {
      const t = setTimeout(() => {
        setLoadingAttempt(prev => prev + 1);
        setLoadingSubPhase('loading');
      }, 4000);
      return () => clearTimeout(t);
    }

    if (loadingSubPhase === 'success') {
      playSound('success');
      const t = setTimeout(() => setPhase('files'), 3000);
      return () => clearTimeout(t);
    }
  }, [phase, loadingAttempt, loadingSubPhase, playSound]);

  useEffect(() => {
    if (phase !== 'file_complete') return;
    const t = setTimeout(() => {
      setCurrentScenario(prev => prev + 1);
      setPhase('files');
    }, 5000);
    return () => clearTimeout(t);
  }, [phase]);

  const handleFileClick = (id: string) => {
    if (!filesIntroDone) setFilesIntroDone(true);
    const idx = shuffledScenarios.findIndex(s => s.id === id);
    if (idx >= 0) {
      setCurrentScenario(idx);
      setPhase('scenario');
      playSound('click');
    }
  };

  const handleChoice = (value: string) => {
    if (buttonsDisabled) return;

    const scenario = shuffledScenarios[currentScenario];
    const choice = scenario.choices.find(c => c.value === value);
    const isComedy = !!choice?.isComedy;
    const text = isComedy ? choice!.comedyAnalysis! : scenario.solution;

    clearTimers();
    setButtonsDisabled(true);
    setAnalysisText(text);
    setAnalysisStep('loading');

    if (!isComedy) playSound('success');

    tmr(1500, () => setAnalysisStep('result'));

    const typingDurationMs = text.length * 25;
    const totalDelay = 1500 + 300 + typingDurationMs + 3000;

    tmr(totalDelay, () => {
      if (isComedy) {
        setAnalysisStep('idle');
        setButtonsDisabled(false);
        setAnalysisText('');
      } else {
        setShowContinue(true);
      }
    });
  };

  const handleContinue = useCallback(() => {
    setCompleted(prev => [...prev, shuffledScenarios[currentScenario].id]);
    setShowContinue(false);
    setAnalysisStep('idle');
    setAnalysisText('');
    setButtonsDisabled(false);

    if (currentScenario >= shuffledScenarios.length - 1) {
      setPhase('done');
    } else {
      setPhase('file_complete');
    }
  }, [currentScenario]);

  const handleSearchingComplete = useCallback(() => {
    goToNextStage();
  }, [goToNextStage]);

  const fileCardBaseDelay = filesIntroDone ? 0 : 3.7;
  const filesCompletedCount = completed.length;

  const filesIntroMessages = [
    { text: 'هممم......ثلاثة ملفات في الحياه ؟', speed: 25 },
    { text: 'فيني فضول اكثر منش نعرف ايش في الملفات هذه', speed: 25 },
    { text: 'بسرعة افتحيهن مش مقدرتش اصبر', speed: 25 },
  ];

  const searchingMessages = [
    { text: 'جاري البحث عن وجهتنا القادمة...', speed: 25 },
    { text: 'تم تحديد الوجهه بنجاح', speed: 25 },
    { text: 'وجهتنا الى اهم مكان يخص ريم', speed: 25 },
    { text: 'سيتم الان الانتقال الى بيت ريم في المستقبل', speed: 25 },
  ];

  return (
    <StageWrapper stage={Stage.LifeLoading}>
      <BackgroundEffect
        gradient="bg-gradient-to-b from-[#1a120c] via-night to-night"
        glowColor="rgba(201,168,76,0.06)"
        glowPosition="center"
        particles={particleDefs.files}
      />

      <AnimatePresence mode="wait">
        {phase === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full flex flex-col items-center gap-4"
          >
            {loadingSubPhase === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <span className="text-5xl block mb-4">🎉</span>
                <GlassCard>
                  <p className="text-green-400 font-display text-center mb-2">تم التحميل بنجاح</p>
                  <p className="text-silver-blue text-sm text-center leading-relaxed">
                    اخيرا الحياه تحملت ...... مع ان محد بيتحمل الحياه
                  </p>
                </GlassCard>
              </motion.div>
            ) : loadingSubPhase === 'error' ? (
              <motion.div
                key={`err-${loadingAttempt}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, x: [0, -5, 5, -5, 5, 0] }}
                transition={{ x: { duration: 0.4 } }}
                className="text-center"
              >
                <span className="text-4xl block mb-4">⚠️</span>
                <GlassCard>
                  <p className="text-red-400 font-display text-center mb-2">فشل التحميل</p>
                  <p className="text-silver-blue text-sm text-center">
                    {comedyFails[loadingAttempt]}
                  </p>
                </GlassCard>
              </motion.div>
            ) : (
              <motion.div key={`load-${loadingAttempt}`}>
                <SystemMessage text="جاري تحميل الحياة..." delay={0.3} />
              </motion.div>
            )}
          </motion.div>
        )}

        {(phase === 'files' || phase === 'file_complete') && (
          <motion.div
            key="files"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full flex flex-col gap-3 relative min-h-[200px]"
          >
            {!filesIntroDone && (
              <div className="w-full max-w-md space-y-2 mb-4">
                <MessageSequence messages={filesIntroMessages} />
              </div>
            )}
            <p className="text-silver-blue font-mono text-sm text-center mb-2">الملفات المتاحة:</p>
            {shuffledScenarios
              .filter(s => !completed.includes(s.id))
              .map((s, i) => (
                <FileCard
                  key={s.id}
                  title={s.title}
                  onClick={() => handleFileClick(s.id)}
                  delay={fileCardBaseDelay + i * 0.25}
                  duration={1.2 + i * 0.3}
                />
              ))}
            {shuffledScenarios.every(s => completed.includes(s.id)) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center mt-4"
              >
                <p className="text-gold font-display mb-4">تم فتح جميع الملفات</p>
                <Button
                  onClick={() => setPhase('done')}
                  variant="shine"
                  size="lg"
                >
                  أكمل
                </Button>
              </motion.div>
            )}

            {phase === 'file_complete' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 z-10 bg-[#030508]/80 backdrop-blur-sm flex items-start justify-center pt-12 min-h-[300px]"
              >
                <div className="w-full max-w-md space-y-3">
                  {filesCompletedCount === 1 ? (
                    <MessageSequence
                      messages={[
                        { text: 'تم اكتمال فحص الملف الاول', speed: 25 },
                        { text: 'حلويييين باقي نكتشف ايش في الملفين الثانيين ...فيني شجن اعرف', speed: 25 },
                      ]}
                    />
                  ) : (
                    <MessageSequence
                      messages={[
                        { text: 'تم اكمال فحص ملفين بنجاح', speed: 25 },
                        { text: 'باقي لنا اخر ملف ونكتشف ايش بيطلع لنا نكتشف', speed: 25 },
                      ]}
                    />
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {phase === 'scenario' && (
          <motion.div
            key="scenario"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full flex flex-col items-center gap-5"
          >
            <GlassCard>
              <p className="text-gold font-display font-bold mb-3">{shuffledScenarios[currentScenario].title}</p>
              <p className="text-warm-white font-body leading-relaxed">{shuffledScenarios[currentScenario].description}</p>
            </GlassCard>

            <ChoiceButtons
              choices={shuffledScenarios[currentScenario].choices}
              onSelect={handleChoice}
              disabled={buttonsDisabled}
            />

            {analysisStep !== 'idle' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
              >
                <GlassCard variant="dark">
                  <SystemMessage text="جاري تحليل الاجابة" speed={25} prefix />
                  {analysisStep === 'result' && (
                    <div className="mt-3">
                      <SystemMessage text={analysisText} speed={25} prefix delay={0.3} />
                    </div>
                  )}
                </GlassCard>
              </motion.div>
            )}

            {showContinue && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Button
                  onClick={handleContinue}
                  variant="shine"
                  size="lg"
                >
                  {currentScenario < shuffledScenarios.length - 1 ? 'الملف التالي' : 'إنهاء'}
                </Button>
              </motion.div>
            )}
          </motion.div>
        )}

        {phase === 'done' && (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full flex flex-col items-center gap-6"
          >
            <div className="w-full max-w-md space-y-3">
              <MessageSequence
                messages={[
                  { text: 'خلاص كملنا اكتشفنا اهم ثلاثه ملفات كل الناس معقدة منها في الحياه', speed: 25 },
                  { text: 'جاهزة ننتقل للي بعده', speed: 25 },
                ]}
                onComplete={() => setDoneMsgsComplete(true)}
              />
            </div>

            {doneMsgsComplete && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Button
                  onClick={() => {
                    setPhase('searching');
                    setDoneMsgsComplete(false);
                  }}
                  variant="shine"
                  size="lg"
                >
                  جاهزة
                </Button>
              </motion.div>
            )}
          </motion.div>
        )}

        {phase === 'searching' && (
          <motion.div
            key="searching"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full flex flex-col items-center gap-8"
          >
            {/* Scanner animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-28 h-28"
            >
              <div className="absolute inset-0 border-2 border-silver-blue/20 rounded-full animate-ping" />
              <div className="absolute inset-2 border border-gold/20 rounded-full animate-spin" style={{ animationDuration: '4s' }} />
              <div className="absolute inset-4 border border-silver-blue/10 rounded-full" />
              <div className="absolute inset-6 border border-gold/10 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '3s' }} />
              <div className="absolute inset-[42%] bg-gold rounded-full shadow-[0_0_12px_rgba(201,168,76,0.5)] animate-pulse" />
            </motion.div>

            <div className="w-full max-w-md space-y-3">
              <MessageSequence
                messages={searchingMessages}
                onComplete={handleSearchingComplete}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </StageWrapper>
  );
}
