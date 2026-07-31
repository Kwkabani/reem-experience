import { useState, useEffect, useCallback, useRef } from 'react';
import { REVEAL_SEQUENCE, LOCATIONS, LOCATION_REVEAL_MAP } from '../island/config';

export function useIslandReveal(onPhaseChange?: (phase: string) => void) {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [revealedLocations, setRevealedLocations] = useState<Set<string>>(new Set());
  const onPhaseChangeRef = useRef(onPhaseChange);
  onPhaseChangeRef.current = onPhaseChange;

  const currentPhase = REVEAL_SEQUENCE[phaseIndex]!;

  const advancePhase = useCallback(() => {
    setPhaseIndex((prev) => Math.min(prev + 1, REVEAL_SEQUENCE.length - 1));
  }, []);

  useEffect(() => {
    const phase = REVEAL_SEQUENCE[phaseIndex];
    if (!phase) return;
    onPhaseChangeRef.current?.(phase.id);

    const newLocation = LOCATIONS.find((loc) => LOCATION_REVEAL_MAP[loc.id] === phase.id);
    if (newLocation) {
      setRevealedLocations((prevSet) => {
        const nextSet = new Set(prevSet);
        nextSet.add(newLocation.id);
        return nextSet;
      });
    }
  }, [phaseIndex]);

  useEffect(() => {
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
    isLocationRevealed,
    isAllLocationsRevealed: revealedLocations.size >= LOCATIONS.length,
    hasEnteredWelcome: phaseIndex >= REVEAL_SEQUENCE.length - 1,
    advancePhase,
  };
}
