export interface LocationConfig {
  id: string;
  x: number;
  y: number;
  revealOrder: number;
  animationType: 'float' | 'gentle' | 'glow' | 'pulse' | 'none';
  scale: number;
  depthLayer: number;
  revealText: string;
}

export interface RevealPhase {
  id: string;
  duration: number;
  cameraZoom: number;
  cameraX: number;
  cameraY: number;
  fogOpacity: number;
}

export interface RevealState {
  phase: string;
  cameraZoom: number;
  cameraX: number;
  cameraY: number;
  fogOpacity: number;
  isLocationRevealed: (id: string) => boolean;
  isAllLocationsRevealed: boolean;
  hasEnteredWelcome: boolean;
}
