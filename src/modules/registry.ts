import { lazy } from 'react';
import type { AppModule } from './types';

const Days365 = lazy(() => import('./365-days'));

export const modules: AppModule[] = [
  {
    id: '365-days',
    name: '365 Days',
    icon: '📁',
    description: 'رحلة 365 يوم من الذكريات',
    accentColor: '#D4AF37',
    component: Days365,
    badge: 'v1.0',
  },
];

export function getModule(id: string): AppModule | undefined {
  return modules.find((m) => m.id === id);
}
