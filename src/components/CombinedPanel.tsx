
import React from 'react';
import { Settings, X, Menu, Globe, Clock, ZoomIn, MousePointer2, Play, Pause, RotateCw, Maximize, Minimize } from 'lucide-react';

interface CombinedPanelProps {
  isOpen: boolean;
  onClose: () => void;
  rotationSpeed: number;
  setRotationSpeed: (speed: number) => void;
  autoRotate: boolean;
  setAutoRotate: (auto: boolean) => void;
  theme: 'blue' | 'green' | 'purple';
  setTheme: (theme: 'blue' | 'green' | 'purple') => void;
}

const CombinedPanel: React.FC<CombinedPanelProps> = ({
  isOpen,
  onClose,
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 背景遮罩 */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* 面板内容 */}
      <div className="relative bg-black/80 backdrop-blur-xl border border-white/20 rounded-2xl p-6 w-full max-w-3xl shadow-2xl z-10">
        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all"
        >
          <X className="w-6 h-6 text-gray-300" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 左侧：控制面板 */}
          <div>
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

          {/* 右侧：信息面板 */}
          <div>
            {/* 主标题卡片 */}
            <div className="bg-black/40 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-8 h-8 text-blue-400" />
                <div>
                  <h1 className="text-2xl font-bold text-white">3D 地球</h1>
                  <p className="text-gray-400 text-sm">沉浸式体验</p>
                </div>
              </div>
              <div className="text-gray-300 text-sm leading-relaxed">
                探索这颗美丽的蓝色星球，感受宇宙的浩瀚与地球的壮丽。
              </div>
            </div>

            {/* 使用说明卡片 */}
            <div className="bg-black/40 backdrop-blur-lg border border-white/20 rounded-2xl p-5 shadow-xl mb-6">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <MousePointer2 className="w-4 h-4 text-blue-400" />
                操作提示
              </h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  拖拽旋转地球
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  滚轮缩放视角
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  点击地球标记位置
                </li>
              </ul>
            </div>

            {/* 状态信息 */}
            <div className="bg-black/40 backdrop-blur-lg border border-white/20 rounded-2xl p-5 shadow-xl">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="w-5 h-5 text-blue-400" />
                  </div>
                  <p className="text-white font-bold">60 FPS</p>
                  <p className="text-gray-500 text-xs">渲染帧率</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <ZoomIn className="w-5 h-5 text-green-400" />
                  </div>
                  <p className="text-white font-bold">4K</p>
                  <p className="text-gray-500 text-xs">渲染质量</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 底部标语 */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-xs">
            我们的地球，共同的家园 🌍
          </p>
        </div>
      </div>
    </div>
  );
};

export default CombinedPanel;
