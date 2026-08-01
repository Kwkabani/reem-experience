export type AvatarType = 'explorer' | 'dreamer' | 'funny';
export type PersonalityType = 'explorer' | 'dreamer' | 'funny';

export interface Player {
  name: string;
  avatar: AvatarType;
  personality: PersonalityType;
  characterId: string;
  characterName: string;
  characterAppearance: import('./characters/types').CharacterAppearance;
  createdAt: number;
}

export interface Island {
  level: number;
  growth: number;
  unlockedLocations: string[];
}

export interface GameState {
  currentScene: number;
  player: Player | null;
  island: Island;
  completedScenes: number[];
}

export const SCENES = {
  Ocean: 0,
  Bottle: 1,
  CharacterCreation: 2,
  IslandReveal: 3,
  IslandExplore: 4,
} as const;

export type Scene = (typeof SCENES)[keyof typeof SCENES];
export const SCENE_COUNT = 5;

export const SAVE_KEY = 'island-story-save';
