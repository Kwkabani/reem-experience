import { useState, useEffect, useRef } from 'react';

interface Options {
  speed?: number;
  delay?: number;
  onChar?: () => void;
  soundInterval?: number;
}

export default function useTypewriter(
  text: string,
  { speed = 40, delay = 0, onChar, soundInterval = 1 }: Options = {},
) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const indexRef = useRef(0);
  const charTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onCharRef = useRef(onChar);
  onCharRef.current = onChar;
  const soundIntervalRef = useRef(soundInterval);
  soundIntervalRef.current = soundInterval;

  const batchRef = useRef(0);
  const soundBatchRef = useRef(0);
  const BATCH_SIZE = 3;

  useEffect(() => {
    const delayTimer = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(delayTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    indexRef.current = 0;
    batchRef.current = 0;
    soundBatchRef.current = 0;
    setDisplayed('');
    setIsComplete(false);

    if (charTimerRef.current) clearInterval(charTimerRef.current);

    charTimerRef.current = setInterval(() => {
      if (indexRef.current < text.length) {
        indexRef.current++;
        batchRef.current++;

        if (batchRef.current >= BATCH_SIZE || indexRef.current >= text.length) {
          setDisplayed(text.slice(0, indexRef.current));
          batchRef.current = 0;
          soundBatchRef.current++;
          if (soundBatchRef.current >= soundIntervalRef.current) {
            onCharRef.current?.();
            soundBatchRef.current = 0;
          }
        }
      } else {
        if (charTimerRef.current) clearInterval(charTimerRef.current);
        setIsComplete(true);
      }
    }, speed);

    return () => {
      if (charTimerRef.current) clearInterval(charTimerRef.current);
    };
  }, [text, speed, started]);

  return { displayed, isComplete };
}
