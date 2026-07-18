import { Suspense, useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { getModule } from './modules/registry';
import HomeScreen from './components/HomeScreen';
import ModuleLauncher from './components/ModuleLauncher';

function ActiveModule({ moduleId, onExit }: { moduleId: string; onExit: () => void }) {
  const mod = getModule(moduleId);
  if (!mod) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center bg-night">
        <p className="text-silver-blue font-mono text-sm">Module not found: {moduleId}</p>
      </div>
    );
  }
  return <ModuleLauncher module={mod} onExit={onExit} />;
}

export default function App() {
  const [activeModule, setActiveModule] = useState<string | null>(null);

  const handleExit = useCallback(() => {
    setActiveModule(null);
  }, []);

  return (
    <div className="min-h-[100dvh] bg-night">
      <AnimatePresence mode="wait">
        {activeModule ? (
          <Suspense
            key={activeModule}
            fallback={
              <div className="min-h-[100dvh] flex items-center justify-center bg-night">
                <p className="text-silver-blue/50 text-sm font-mono">جاري التحميل...</p>
              </div>
            }
          >
            <ActiveModule moduleId={activeModule} onExit={handleExit} />
          </Suspense>
        ) : (
          <HomeScreen key="home" />
        )}
      </AnimatePresence>
    </div>
  );
}
