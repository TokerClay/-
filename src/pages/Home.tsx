import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import Earth3D from '@/components/Earth3D';
import ControlPanel from '@/components/ControlPanel';
import InfoPanel from '@/components/InfoPanel';

export default function Home() {
  const [rotationSpeed, setRotationSpeed] = useState(0.5);
  const [autoRotate, setAutoRotate] = useState(true);
  const [theme, setTheme] = useState<'blue' | 'green' | 'purple'>('blue');

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

      {/* 控制面板 */}
      <ControlPanel
        rotationSpeed={rotationSpeed}
        setRotationSpeed={setRotationSpeed}
        autoRotate={autoRotate}
        setAutoRotate={setAutoRotate}
        theme={theme}
        setTheme={setTheme}
      />

      {/* 信息面板 */}
      <InfoPanel />
    </div>
  );
}