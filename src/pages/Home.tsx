import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import Earth3D from '@/components/Earth3D';
import CombinedPanel from '@/components/CombinedPanel';
import { Menu } from 'lucide-react';

export default function Home() {
  const [rotationSpeed, setRotationSpeed] = useState(0.5);
  const [autoRotate, setAutoRotate] = useState(true);
  const [theme, setTheme] = useState<'blue' | 'green' | 'purple'>('blue');
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  return (
    <div className="w-screen h-screen overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-black">
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
          <Suspense fallback={null}>
            <Earth3D rotationSpeed={rotationSpeed} autoRotate={autoRotate} />
            <EffectComposer>
              <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} intensity={1.5} />
            </EffectComposer>
          </Suspense>
        </Canvas>
      </div>

      {/* 菜单按钮 */}
      <button
        onClick={() => setIsPanelOpen(true)}
        className="fixed top-6 right-6 p-3 bg-black/40 backdrop-blur-lg border border-white/20 rounded-full shadow-lg hover:bg-black/60 transition-all z-40"
      >
        <Menu className="w-6 h-6 text-white" />
      </button>

      {/* 组合面板 */}
      <CombinedPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        rotationSpeed={rotationSpeed}
        setRotationSpeed={setRotationSpeed}
        autoRotate={autoRotate}
        setAutoRotate={setAutoRotate}
        theme={theme}
        setTheme={setTheme}
      />
    </div>
  );
}