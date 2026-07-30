import type { GameState, AvatarType, PersonalityType } from '../types';
import { SAVE_KEY, SCENE_COUNT } from '../types';

const AVATAR_VALUES: AvatarType[] = ['explorer', 'dreamer', 'funny'];
const PERSONALITY_VALUES: PersonalityType[] = ['explorer', 'dreamer', 'funny'];

export function saveGameState(state: GameState): void {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  } catch {
    // localStorage full or unavailable
  }
}

export function loadGameState(): GameState | null {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<GameState>;
    if (!isValidState(parsed)) return null;
    return parsed as GameState;
  } catch {
    return null;
  }
}

export function clearGameState(): void {
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch {
    // ignore
  }
}

function isValidState(state: Partial<GameState>): boolean {
  if (typeof state.currentScene !== 'number') return false;
  if (state.currentScene < 0 || state.currentScene >= SCENE_COUNT) return false;
  if (!Array.isArray(state.completedScenes)) return false;
  if (state.completedScenes.some((s) => typeof s !== 'number')) return false;

  if (state.player !== null && state.player !== undefined) {
    if (typeof state.player !== 'object') return false;
    const p = state.player as unknown as Record<string, unknown>;
    if (typeof p.name !== 'string' || !p.name.trim()) return false;
    if (!AVATAR_VALUES.includes(p.avatar as AvatarType)) return false;
    if (!PERSONALITY_VALUES.includes(p.personality as PersonalityType)) return false;
    if (typeof p.createdAt !== 'number') return false;
    if (p.characterId !== undefined && typeof p.characterId !== 'string') return false;
    if (p.characterName !== undefined && typeof p.characterName !== 'string') return false;
    if (p.characterAppearance !== undefined && typeof p.characterAppearance !== 'object')
      return false;
  }

  if (state.island !== null && state.island !== undefined) {
    if (typeof state.island !== 'object') return false;
    const island = state.island as unknown as Record<string, unknown>;
    if (typeof island.level !== 'number' || island.level < 1) return false;
    if (typeof island.growth !== 'number' || island.growth < 0) return false;
    if (!Array.isArray(island.unlockedLocations)) return false;
  }

  return true;
}
