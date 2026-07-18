import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { modules } from '../modules/registry';
import type { AppModule } from '../modules/types';
import ModuleLauncher from './ModuleLauncher';

export default function HomeScreen() {
  const [selectedModule, setSelectedModule] = useState<AppModule | null>(null);
  const [time] = useState(() => {
    const d = new Date();
    return d.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
  });

  const greeting = useMemo(() => {
    const h = new Date().getHours();
    if (h < 6) return 'مساء الخير';
    if (h < 12) return 'صباح النور';
    if (h < 17) return 'مساء النور';
    return 'مساء الخير';
  }, []);

  if (selectedModule) {
    return <ModuleLauncher module={selectedModule} onExit={() => setSelectedModule(null)} />;
  }

  return (
    <div className="min-h-[100dvh] bg-night flex flex-col overflow-hidden">
      {/* Status bar */}
      <div className="flex items-center justify-between px-6 pt-3 pb-2">
        <span className="text-silver-blue/60 text-xs font-mono">{time}</span>
        <div className="flex gap-1.5 items-center">
          <div className="w-4 h-2.5 border border-silver-blue/40 rounded-sm relative">
            <div className="absolute inset-0.5 bg-gold/60 rounded-[1px]" style={{ width: '70%' }} />
          </div>
        </div>
      </div>

      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-6 pt-6 pb-2"
      >
        <h1 className="text-warm-white font-display font-bold text-2xl">
          {greeting} <span className="text-gold">ريم</span>
        </h1>
        <p className="text-silver-blue/50 text-sm font-body mt-1">اختاري تجربتك</p>
      </motion.div>

      {/* Divider */}
      <div className="mx-6 my-4 h-px bg-gradient-to-l from-transparent via-gold/20 to-transparent" />

      {/* Module grid */}
      <div className="flex-1 px-6">
        <div className="grid grid-cols-3 gap-5 max-w-sm mx-auto">
          {modules.map((mod, i) => (
            <ModuleIcon key={mod.id} module={mod} index={i} onSelect={setSelectedModule} />
          ))}

          {/* Future module placeholders */}
          {futureModules.map((fm, i) => (
            <FutureIcon key={fm.id} future={fm} index={modules.length + i} />
          ))}
        </div>
      </div>

      {/* Bottom indicator */}
      <div className="flex justify-center pb-6 pt-4">
        <div className="w-10 h-1 rounded-full bg-silver-blue/20" />
      </div>
    </div>
  );
}

function ModuleIcon({
  module,
  index,
  onSelect,
}: {
  module: AppModule;
  index: number;
  onSelect: (m: AppModule) => void;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1 + index * 0.05, type: 'spring', stiffness: 300 }}
      whileTap={{ scale: 0.92 }}
      onClick={() => onSelect(module)}
      className="flex flex-col items-center gap-2 group"
    >
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl
                    transition-all duration-200 group-active:scale-95"
        style={{
          background: `linear-gradient(135deg, ${module.accentColor}22, ${module.accentColor}08)`,
          border: `1px solid ${module.accentColor}33`,
          boxShadow: `0 4px 20px ${module.accentColor}15`,
        }}
      >
        {module.icon}
        {module.badge && (
          <span
            className="absolute -top-1 -right-1 text-[9px] font-mono px-1 py-0.5 rounded-full"
            style={{
              background: `${module.accentColor}33`,
              color: module.accentColor,
            }}
          >
            {module.badge}
          </span>
        )}
      </div>
      <span className="text-silver-blue/70 text-xs font-body text-center leading-tight group-hover:text-warm-white transition-colors">
        {module.name}
      </span>
    </motion.button>
  );
}

function FutureIcon({
  future,
  index,
}: {
  future: { id: string; name: string; icon: string };
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1 + index * 0.05 }}
      className="flex flex-col items-center gap-2"
    >
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl
                    opacity-30 border border-dashed border-silver-blue/15"
      >
        {future.icon}
      </div>
      <span className="text-silver-blue/25 text-xs font-body text-center leading-tight">
        {future.name}
      </span>
    </motion.div>
  );
}

const futureModules = [
  { id: 'letter', name: 'Letter', icon: '💌' },
  { id: 'birthday', name: 'Birthday', icon: '🎂' },
  { id: 'coffee', name: 'Coffee', icon: '☕' },
  { id: 'trip', name: 'Trip', icon: '✈️' },
  { id: 'surprise', name: 'Surprise', icon: '🎁' },
  { id: 'ramadan', name: 'Ramadan', icon: '🌙' },
];
