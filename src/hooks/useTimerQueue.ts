import { useRef, useCallback, useEffect } from 'react';

// Reusable timer management hook
// Replaces duplicated timer patterns in PsychologyLab, LifeLoading, Welcome
export function useTimerQueue() {
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Clean up all timers when the component unmounts
  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, []);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const tmr = useCallback((ms: number, fn: () => void) => {
    const id = setTimeout(() => {
      timersRef.current = timersRef.current.filter((t) => t !== id);
      fn();
    }, ms);
    timersRef.current.push(id);
  }, []);

  return { tmr, clearTimers };
}
