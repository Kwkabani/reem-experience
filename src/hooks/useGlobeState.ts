import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * Globe animation states
 */
export type GlobeState = 'hidden' | 'rotating' | 'zooming' | 'done';

/**
 * Hook to manage globe state transitions
 */
export function useGlobeState(initialState: GlobeState = 'hidden') {
  const [state, setState] = useState<GlobeState>(initialState);
  const stateRef = useRef(state);

  // Keep ref in sync
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const show = useCallback(() => {
    setState('rotating');
  }, []);

  const startZoom = useCallback(() => {
    setState('zooming');
  }, []);

  const finish = useCallback(() => {
    setState('done');
  }, []);

  const hide = useCallback(() => {
    setState('hidden');
  }, []);

  return {
    state,
    stateRef,
    show,
    startZoom,
    finish,
    hide,
  };
}

/**
 * Hook to manage globe timing
 */
export function useGlobeTiming(options?: {
  rotateDuration?: number;
  zoomDuration?: number;
  fadeDuration?: number;
}) {
  const rotateDuration = options?.rotateDuration ?? 7500;
  const zoomDuration = options?.zoomDuration ?? 2700;
  const fadeDuration = options?.fadeDuration ?? 1000;

  const startTime = useRef<number>(0);
  const phase = useRef<'idle' | 'rotating' | 'zooming' | 'fading'>('idle');

  const start = useCallback(() => {
    startTime.current = performance.now();
    phase.current = 'rotating';
  }, []);

  const update = useCallback(() => {
    const now = performance.now();
    const elapsed = now - startTime.current;

    if (phase.current === 'rotating') {
      if (elapsed >= rotateDuration) {
        phase.current = 'zooming';
        startTime.current = now;
        return 'startZoom';
      }
      return 'rotating';
    }

    if (phase.current === 'zooming') {
      const progress = Math.min(elapsed / zoomDuration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // cubic ease out

      if (progress >= 1) {
        phase.current = 'fading';
        startTime.current = now;
        return 'startFade';
      }
      return { type: 'zooming', progress: eased };
    }

    if (phase.current === 'fading') {
      const progress = Math.min(elapsed / fadeDuration, 1);

      if (progress >= 1) {
        phase.current = 'idle';
        return 'complete';
      }
      return { type: 'fading', progress };
    }

    return 'idle';
  }, [rotateDuration, zoomDuration, fadeDuration]);

  const reset = useCallback(() => {
    phase.current = 'idle';
    startTime.current = 0;
  }, []);

  return { start, update, reset };
}
