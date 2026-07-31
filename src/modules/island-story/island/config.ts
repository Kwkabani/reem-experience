import type { LocationConfig, RevealPhase } from './types';

export const LOCATIONS: LocationConfig[] = [
  {
    id: 'beach',
    x: 50,
    y: 78,
    revealOrder: 0,
    animationType: 'gentle',
    scale: 1.3,
    depthLayer: 4,
    revealText: 'وصلتِ إلى الشاطئ',
  },
  {
    id: 'house',
    x: 28,
    y: 52,
    revealOrder: 1,
    animationType: 'glow',
    scale: 1,
    depthLayer: 3,
    revealText: 'بيت صغير ينتظر حكاية',
  },
  {
    id: 'tree',
    x: 72,
    y: 48,
    revealOrder: 2,
    animationType: 'float',
    scale: 1.1,
    depthLayer: 2,
    revealText: 'شجرة تحمل أسرار الجزيرة',
  },
  {
    id: 'cave',
    x: 20,
    y: 38,
    revealOrder: 3,
    animationType: 'pulse',
    scale: 0.85,
    depthLayer: 1,
    revealText: 'مكان لم يكتشفه أحد',
  },
  {
    id: 'tower',
    x: 80,
    y: 32,
    revealOrder: 4,
    animationType: 'none',
    scale: 0.7,
    depthLayer: 0,
    revealText: 'من هنا تبدأ الحكاية',
  },
];

export const REVEAL_SEQUENCE: RevealPhase[] = [
  {
    id: 'fog',
    duration: 2500,
    cameraZoom: 0.92,
    cameraX: 0,
    cameraY: 0,
    fogOpacity: 0.95,
  },
  {
    id: 'rising',
    duration: 1800,
    cameraZoom: 0.94,
    cameraX: 0,
    cameraY: -2,
    fogOpacity: 0.85,
  },
  {
    id: 'clearing',
    duration: 2500,
    cameraZoom: 0.97,
    cameraX: 0,
    cameraY: -4,
    fogOpacity: 0.5,
  },
  {
    id: 'beach_reveal',
    duration: 2000,
    cameraZoom: 1.05,
    cameraX: 0,
    cameraY: 6,
    fogOpacity: 0.3,
  },
  {
    id: 'house_reveal',
    duration: 1800,
    cameraZoom: 1.12,
    cameraX: 22,
    cameraY: 2,
    fogOpacity: 0.2,
  },
  {
    id: 'tree_reveal',
    duration: 1800,
    cameraZoom: 1.12,
    cameraX: -15,
    cameraY: 0,
    fogOpacity: 0.12,
  },
  {
    id: 'cave_reveal',
    duration: 1800,
    cameraZoom: 1.16,
    cameraX: 30,
    cameraY: -6,
    fogOpacity: 0.06,
  },
  {
    id: 'tower_reveal',
    duration: 2000,
    cameraZoom: 1.2,
    cameraX: -20,
    cameraY: -8,
    fogOpacity: 0,
  },
];

export const LOCATION_REVEAL_MAP: Record<string, string> = {
  beach: 'beach_reveal',
  house: 'house_reveal',
  tree: 'tree_reveal',
  cave: 'cave_reveal',
  tower: 'tower_reveal',
};

export const ISLAND_ASPECT_RATIO = 4 / 3;

export const PARALLAX_FACTORS = {
  background: 0.15,
  environment: 0.4,
  terrain: 0.7,
  locations: 1.0,
  effects: 0.6,
};
