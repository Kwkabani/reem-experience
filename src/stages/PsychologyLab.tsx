import { useState, useRef, useEffect } from 'react';import { motion, AnimatePresence } from 'framer-motion';
import StageWrapper from '../components/StageWrapper';
import GlassCard from '../components/GlassCard';
import SystemMessage from '../components/SystemMessage';
import Button from '../components/Button';
import ChoiceButtons from '../components/ChoiceButtons';
import BackgroundEffect, { particleDefs } from '../components/BackgroundEffect';
import { useGame } from '../context/GameContext';
import { Stage } from '../types';

interface Choice {
  label: string;
  value: string;
  isComedy?: boolean;
  comedyAnalysis?: string;
}

interface Question {
  id: string;
  text: string;
  choices: Choice[];
}

const questions: Question[] = [
  {
    id: 'q1',
    text: 'لنفرض ان شريك حياتك عاد الى البيت بعد يوم طويل , وكان هادئا اكثر من المعتاد . ماذا سيكون اول تصرف منش ؟',
    choices: [
      { label: 'اسأله بهدوء اذا كان بخير , واعطية مساحة لو احتاجها ', value: 'space' },
      { label: ' ربما يشعر بتعب أو ضغط , وافتح الحديث معه عندما اشعر انه مستعد ', value: 'tired' },
      {
        label: 'أفتح جلسة تحقيق , ماحصل؟ , وليش ماتشتي تتكلم الان ؟اعترف من هي اللي زعلتك في الدوام؟ 😂',
        value: 'angry',
        isComedy: true,
        comedyAnalysis:
          '⛔️ تم تفعيل وضع المحقق كونان 😂 , للأسف لم يتم العثور على اي متهم .... , اشتي اجابة من ريم , مش من قسم التحريات 🌚',
      },
    ],
  },
  {
    id: 'q2',
    text: 'سمعتي قصة غير ناجحة وسلبية عن زواج شخصين "ايش اول انطباع يخطر في بالش ؟"',
    choices: [
      { label: 'لكل علاقة ظروفها , ولا احب ان اقيس حياتي على حياة غيري ', value: 'message' },
      { label: 'استفيد من القصة , بس ماخليها تحكم مستقبلي ', value: 'space_wait' },
      {
        label: 'افتح دفتر "قصص الرعب الزوجية " واضيفها للفصل السابع 😂🌚',
        value: 'eyes',
        isComedy: true,
        comedyAnalysis:
          'تم اكتشاف ارشيف ضخم من القصص 🫣 , "لكن نتذكر ان كل قصة لها مؤلفيها , وليست بالضروره تكون بداية لقصتنا🫰🏼 , نشتي الاجابة اللي تشبهك اكثر ',
      },
    ],
  },
  {
    id: 'q3',
    text: 'بعد الزواج اكتشفتي ان شريك حياتش يختلف عنك في بعض الطباع  "ماعتفعلي ؟" ',
    choices: [
      { label: 'احاول ان اتفهمه , ونتعلم كيف نتعامل مع اختلافنا ', value: 'sit_together' },
      { label: 'نتكلم بكل صراحة عن كل شي , وندور طريقة عشان نتعامل مع اختلافاتنا', value: 'laugh' },
      {
        label: 'ابحث في الاعدادات عن زر " تحديث الزوج للإصدار الجديد " 😂 ',
        value: 'sleep',
        isComedy: true,
        comedyAnalysis:
          'جاري البحث عن التحديث الجديد .....🕵🏻 , " للأسف الانسان لايعمل بالتحديثات 😂🤍 " , لكن الجميل فيه انه يستطيع ان يتعلم ويتغير اذا وجد من يفهمه 🤍 ',
      },
    ],
  },
];

const analysisMessages: Record<string, string> = {
  space: 'الانسان بطبعة يميل للاكثر حنية , كلمة حالية منش عتقلب كل الموازين ',
  tired: 'احلا شي في هذه الحياه لما الانسان يلقى الحضن اللي يهرب من مشاكل الحياه لاعنده , وانتي تقدري تكوني المكان الامن هذا ',
  message: 'كل قصة لها عنوان , ولها ابطالها , ومش شرط تطلع قصتنا نفس قصتهم',
  space_wait: 'بالضبط... ناخذ من تجارب الناس الاشياء اللي بتفيدنا , كل تجربة تحمل جوانب سلبيه وايجابية',
  sit_together: 'مافيش في الحياه حاجتين تتشابه وتكون متمسكه ببعضها , ابسط مثال المغناطيس 👌🏻',
  laugh: 'احلا قرار . لان الصراحة بين الطرفين تبسط كل شي وتخلي التفاهم اكثر . ويكون التعامل مرن',
};

export default function PsychologyLab() {
  const { goToNextStage, playSound, setAnswer } = useGame();
  const [phase, setPhase] = useState<'intro' | 'questions'>('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [analysisStep, setAnalysisStep] = useState<'idle' | 'loading' | 'result'>('idle');
  const [analysisText, setAnalysisText] = useState('');
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  // BUG-06 FIX: clear pending timers when this stage unmounts
  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, []);

  const handleSelect = (value: string) => {
    if (buttonsDisabled) return;

    const question = questions[currentQ];
    const choice = question.choices.find(c => c.value === value);
    const isComedy = !!choice?.isComedy;
    const text = isComedy ? choice!.comedyAnalysis! : (analysisMessages[value] || 'مفهوم.');

    clearTimers();
    setButtonsDisabled(true);
    setAnalysisText(text);
    setAnalysisStep('loading');

    if (!isComedy) {
      playSound('success');
    }

    tmr(1500, () => setAnalysisStep('result'));

    tmr(4500, () => {
      if (isComedy) {
        setAnalysisStep('idle');
        setButtonsDisabled(false);
        setAnalysisText('');
      } else {
        setAnswer(question.id, value);
        if (currentQ < questions.length - 1) {
          setCurrentQ(prev => prev + 1);
          setAnalysisStep('idle');
          setButtonsDisabled(false);
        } else {
          setIsComplete(true);
        }
      }
    });
  };

  function tmr(ms: number, fn: () => void) {
    const id = setTimeout(() => {
      timersRef.current = timersRef.current.filter(t => t !== id);
      fn();
    }, ms);
    timersRef.current.push(id);
  }

  return (
    <div className="relative min-h-[100dvh] overflow-hidden">
      <BackgroundEffect
        gradient="bg-gradient-to-b from-[#1a120c] via-[#0d0805] to-[#060302]"
        glowColor="rgba(201,168,76,0.06)"
        glowPosition="center"
        particles={particleDefs.analysis}
      />

      {/* Vignette overlays */}
      <div className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 30%, transparent 70%, rgba(26,18,12,0.5) 100%),' +
            'linear-gradient(90deg, rgba(0,0,0,0.3) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.3) 100%),' +
            'linear-gradient(180deg, transparent 0%, rgba(42,31,20,0.3) 100%)',
        }}
      />

      <StageWrapper stage={Stage.PsychologyLab} className="relative z-10">
        <div className="relative mb-2">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-48 h-24 bg-gold/5 blur-3xl rounded-full pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/20 flex items-center justify-center">
              <span className="text-gold text-lg">✦</span>
            </div>
            <h2 className="text-xl font-display font-bold text-gold">
              مختبر الادراك 
            </h2>
            <div className="w-6 h-px bg-gold/15 mx-auto my-2" />
            <p className="text-beige/50 text-sm">مع ريم</p>
          </motion.div>
        </div>

        <div
          className="w-full max-w-xs h-px mx-auto mb-4"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(201,168,76,0.12), transparent)',
          }}
        />

        <AnimatePresence mode="wait">
          {phase === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex flex-col items-center gap-6"
            >
              <GlassCard variant="warm">
                <SystemMessage
                  text="سيداتي سادتي ضيفنا اليوم في برنامجنا مختبر الادراك المتخصصة في مجال علم النفس والدكتورة الصاعدة في هذا المجال الدكتورة ريم الفقية."
                  speed={25}
                  prefix
                />
              </GlassCard>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3 }}
              >
                <Button
                  onClick={() => setPhase('questions')}
                  variant="shine"
                  size="xl"
                  className="w-full"
                >
                  لنبدأ
                </Button>
              </motion.div>
            </motion.div>
          )}

          {phase === 'questions' && !isComplete && (
            <motion.div
              key={`q-${currentQ}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="w-full flex flex-col items-center gap-5"
            >
              <GlassCard variant="warm" delay={0}>
                <p className="text-warm-white font-body text-lg leading-relaxed text-center">
                  {questions[currentQ].text}
                </p>
                <p className="text-beige/50 text-xs mt-3 text-center font-mono">
                  {currentQ + 1} / {questions.length}
                </p>
              </GlassCard>

              <ChoiceButtons
                choices={questions[currentQ].choices}
                onSelect={handleSelect}
                disabled={buttonsDisabled}
              />

              {analysisStep !== 'idle' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full max-w-md"
                >
                  <GlassCard variant="warm">
                    <SystemMessage text="جاري تحليل الاجابة" speed={25} prefix />
                    {analysisStep === 'result' && (
                      <div className="mt-3">
                        <SystemMessage
                          text={analysisText}
                          speed={25}
                          prefix
                          delay={0.3}
                        />
                      </div>
                    )}
                  </GlassCard>
                </motion.div>
              )}
            </motion.div>
          )}

          {isComplete && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full flex flex-col items-center gap-6"
            >
              <GlassCard variant="warm" delay={0.3}>
                <p className="text-beige/50 text-xs mb-3 text-center font-body">
                  أخيرًا...
                </p>
                <p className="text-warm-white font-body leading-relaxed text-center text-lg">
                  "أحيانًا لاتحتاج العلاقات الى اشخاص مثاليين ..
                  بل الى شخصين يحاول كل واحد منهما ان يفهم الاخر , ويقدر اختلافه , ويحتويه في لحظات ضعفه"
                </p>
                <div
                  className="w-full h-px mx-auto my-4"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent, rgba(201,168,76,0.1), transparent)',
                  }}
                />
                <p className="text-gold/60 text-xs text-center">
                  شكرًا لانش شاركتي معنا اجاباتك , وشكرا لانش ريم 🤍
                </p>
              </GlassCard>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
              >
                <Button
                  onClick={goToNextStage}
                  variant="shine"
                  size="xl"
                  className="w-full"
                >
                  تابع
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </StageWrapper>
    </div>
  );
}
