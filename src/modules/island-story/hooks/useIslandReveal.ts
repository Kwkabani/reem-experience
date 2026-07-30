import { useState, useEffect, useCallback, useRef } from 'react';
import { REVEAL_SEQUENCE, LOCATIONS, LOCATION_REVEAL_MAP } from '../island/config';

export function useIslandReveal(onPhaseChange?: (phase: string) => void) {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [revealedLocations, setRevealedLocations] = useState<Set<string>>(new Set());
  const onPhaseChangeRef = useRef(onPhaseChange);
  onPhaseChangeRef.current = onPhaseChange;

  const currentPhase = REVEAL_SEQUENCE[phaseIndex]!;

  const advancePhase = useCallback(() => {
    setPhaseIndex((prev) => {
      const next = prev + 1;
      if (next < REVEAL_SEQUENCE.length) {
        const phase = REVEAL_SEQUENCE[next]!;
        onPhaseChangeRef.current?.(phase.id);

        const newLocation = LOCATIONS.find((loc) => LOCATION_REVEAL_MAP[loc.id] === phase!.id);
        if (newLocation) {
          setRevealedLocations((prevSet) => {
            const nextSet = new Set(prevSet);
            nextSet.add(newLocation.id);
            return nextSet;
          });
        }
      }
      return Math.min(next, REVEAL_SEQUENCE.length - 1);
    });
  }, []);

  useEffect(() => {
    if (phaseIndex === 0) {
      const t = setTimeout(() => advancePhase(), 1500);
      return () => clearTimeout(t);
    }
    if (phaseIndex >= REVEAL_SEQUENCE.length - 1) return;
    const t = setTimeout(() => advancePhase(), currentPhase.duration);
    return () => clearTimeout(t);
  }, [phaseIndex, advancePhase, currentPhase.duration]);

  const isLocationRevealed = useCallback(
    (id: string) => revealedLocations.has(id),
    [revealedLocations],
  );

  return {
    phase: currentPhase.id,
    phaseIndex,
    cameraZoom: currentPhase.cameraZoom,
    cameraX: currentPhase.cameraX,
    cameraY: currentPhase.cameraY,
    fogOpacity: currentPhase.fogOpacity,
    fogParticleCount: currentPhase.fogParticleCount,
    isLocationRevealed,
    isAllLocationsRevealed: revealedLocations.size >= LOCATIONS.length,
    hasEnteredWelcome: phaseIndex >= REVEAL_SEQUENCE.length - 1,
    advancePhase,
  };
}
