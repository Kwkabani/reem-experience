import { useState, useCallback, useMemo, useEffect, type ReactNode } from 'react';
import type { GameState, AvatarType, PersonalityType } from '../types';
import type { CharacterAppearance } from '../characters/types';
import { SCENE_COUNT, SCENES } from '../types';
import { saveGameState, loadGameState, clearGameState } from '../systems/SaveSystem';
import { GameContext, type GameContextType } from './game-context';

const INITIAL_STATE: GameState = {
  currentScene: SCENES.Ocean,
  player: null,
  island: {
    level: 1,
    growth: 0,
    unlockedLocations: [],
  },
  completedScenes: [],
};

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>(() => {
    const saved = loadGameState();
    if (saved) {
      return saved;
    }
    return INITIAL_STATE;
  });

  useEffect(() => {
    saveGameState(state);
  }, [state]);

  const goToNextScene = useCallback(() => {
    setState((prev) => {
      const next = prev.currentScene + 1;
      if (next >= SCENE_COUNT) return prev;
      return { ...prev, currentScene: next };
    });
  }, []);

  const setPlayer = useCallback(
    (
      name: string,
      avatar: AvatarType,
      personality: PersonalityType,
      characterId?: string,
      characterName?: string,
      characterAppearance?: CharacterAppearance,
    ) => {
      setState((prev) => ({
        ...prev,
        player: {
          name,
          avatar,
          personality,
          characterId: characterId || '',
          characterName: characterName || '',
          characterAppearance: characterAppearance || {
            hairColor: '',
            outfitColor: '',
            accentColor: '',
            skinTone: '',
          },
          createdAt: Date.now(),
        },
      }));
    },
    [],
  );

  const completeScene = useCallback((sceneId: number) => {
    setState((prev) => {
      if (prev.completedScenes.includes(sceneId)) return prev;
      return {
        ...prev,
        completedScenes: [...prev.completedScenes, sceneId],
      };
    });
  }, []);

  const hasCompletedScene = useCallback(
    (sceneId: number) => state.completedScenes.includes(sceneId),
    [state.completedScenes],
  );

  const unlockLocations = useCallback((ids: string[]) => {
    setState((prev) => {
      const merged = [...prev.island.unlockedLocations];
      let changed = false;
      for (const id of ids) {
        if (!merged.includes(id)) {
          merged.push(id);
          changed = true;
        }
      }
      if (!changed) return prev;
      return { ...prev, island: { ...prev.island, unlockedLocations: merged } };
    });
  }, []);

  const resetGame = useCallback(() => {
    clearGameState();
    setState(INITIAL_STATE);
  }, []);

  const value = useMemo<GameContextType>(
    () => ({
      ...state,
      goToNextScene,
      setPlayer,
      completeScene,
      hasCompletedScene,
      unlockLocations,
      resetGame,
    }),
    [state, goToNextScene, setPlayer, completeScene, hasCompletedScene, unlockLocations, resetGame],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
