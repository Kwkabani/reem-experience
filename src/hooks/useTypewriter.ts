import { useState, useEffect, useRef } from 'react';

interface Options {
  speed?: number;
  delay?: number;
  onChar?: () => void;
}

// BUG-10 FIX: return { displayed, isComplete } so callers can stop the cursor
export default function useTypewriter(text: string, { speed = 40, delay = 0, onChar }: Options = {}) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const indexRef = useRef(0);
  const charTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onCharRef = useRef(onChar);
  onCharRef.current = onChar;

  useEffect(() => {
    const delayTimer = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(delayTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    indexRef.current = 0;
    setDisplayed('');
    setIsComplete(false); // reset on text/speed change

    if (charTimerRef.current) clearInterval(charTimerRef.current);

    charTimerRef.current = setInterval(() => {
      if (indexRef.current < text.length) {
        setDisplayed(text.slice(0, indexRef.current + 1));
        indexRef.current++;
        onCharRef.current?.();
      } else {
        if (charTimerRef.current) clearInterval(charTimerRef.current);
        setIsComplete(true); // typing finished
      }
    }, speed);

    return () => {
      if (charTimerRef.current) clearInterval(charTimerRef.current);
    };
  }, [text, speed, started]);

  return { displayed, isComplete };
}
