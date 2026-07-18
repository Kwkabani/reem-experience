// Fisher-Yates shuffle algorithm - extracted from House.tsx and LifeLoading.tsx
export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = a[i] as T;
    a[i] = a[j] as T;
    a[j] = temp;
  }
  return a;
}
