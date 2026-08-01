import { createContext } from 'react';
import type { GameState, AvatarType, PersonalityType } from '../types';
import type { CharacterAppearance } from '../characters/types';

export interface GameContextType extends GameState {
  goToNextScene: () => void;
  setPlayer: (
    name: string,
    avatar: AvatarType,
    personality: PersonalityType,
    characterId?: string,
    characterName?: string,
    characterAppearance?: CharacterAppearance,
  ) => void;
  completeScene: (sceneId: number) => void;
  hasCompletedScene: (sceneId: number) => boolean;
  unlockLocations: (ids: string[]) => void;
  resetGame: () => void;
}

export const GameContext = createContext<GameContextType | null>(null);
