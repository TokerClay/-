
import React from 'react';
import { Play, Pause, RotateCw, Maximize, Minimize, Settings } from 'lucide-react';

interface ControlPanelProps {
  rotationSpeed: number;
  setRotationSpeed: (speed: number) => void;
  autoRotate: boolean;
  setAutoRotate: (auto: boolean) => void;
  theme: 'blue' | 'green' | 'purple';
  setTheme: (theme: 'blue' | 'green' | 'purple') => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  rotationSpeed,
  setRotationSpeed,
  autoRotate,
  setAutoRotate,
  theme,
  setTheme,
}) => {
  const themes = [
    { id: 'blue', name: '蓝色地球', color: 'bg-blue-600' },
    { id: 'green', name: '绿色地球', color: 'bg-green-600' },
    { id: 'purple', name: '紫色地球', color: 'bg-purple-600' },
  ] as const;

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-lg border border-white/20 rounded-2xl p-6 w-72 shadow-2xl z-10">
      <div className="flex items-center gap-3 mb-6">
        <Settings className="w-6 h-6 text-blue-400" />
        <h2 className="text-xl font-bold text-white">控制面板</h2>
      </div>

      {/* 旋转控制 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-gray-300 text-sm font-medium">自动旋转</span>
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`p-2 rounded-xl transition-all ${
              autoRotate ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' : 'bg-white/10 text-gray-400 hover:bg-white/20'
            }`}
          >
            {autoRotate ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 旋转速度 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-gray-300 text-sm font-medium">旋转速度</span>
          <span className="text-blue-400 text-sm font-mono">{rotationSpeed.toFixed(2)}x</span>
        </div>
        <input
          type="range"
          min="0"
          max="2"
          step="0.1"
          value={rotationSpeed}
          onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
          className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 transition-all"
        />
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>慢速</span>
          <span>快速</span>
        </div>
      </div>

      {/* 主题选择 */}
      <div className="mb-6">
        <span className="text-gray-300 text-sm font-medium mb-3 block">主题颜色</span>
        <div className="grid grid-cols-3 gap-2">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all ${
                theme === t.id
                  ? `${t.color} text-white shadow-lg scale-105`
                  : 'bg-white/10 text-gray-400 hover:bg-white/20'
              }`}
            >
              <div className={`w-6 h-6 rounded-full ${t.color}`} />
              <span className="text-xs">{t.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 快捷操作 */}
      <div className="border-t border-white/10 pt-4">
        <span className="text-gray-300 text-sm font-medium mb-3 block">快捷操作</span>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setRotationSpeed(0.5)}
            className="flex items-center justify-center gap-2 p-3 bg-white/10 hover:bg-white/20 rounded-xl text-gray-300 transition-all"
          >
            <Minimize className="w-4 h-4" />
            <span className="text-xs">慢速</span>
          </button>
          <button
            onClick={() => setRotationSpeed(1.5)}
            className="flex items-center justify-center gap-2 p-3 bg-white/10 hover:bg-white/20 rounded-xl text-gray-300 transition-all"
          >
            <Maximize className="w-4 h-4" />
            <span className="text-xs">快速</span>
          </button>
          <button
            onClick={() => setRotationSpeed(1)}
            className="flex items-center justify-center gap-2 p-3 bg-white/10 hover:bg-white/20 rounded-xl text-gray-300 transition-all"
          >
            <RotateCw className="w-4 h-4" />
            <span className="text-xs">默认</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
