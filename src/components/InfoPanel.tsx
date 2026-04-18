
import React from 'react';
import { Globe, Clock, ZoomIn, MousePointer2 } from 'lucide-react';

const InfoPanel: React.FC = () => {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 space-y-4 z-10">
      {/* 主标题卡片 */}
      <div className="bg-black/40 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-2xl max-w-xs">
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
      <div className="bg-black/40 backdrop-blur-lg border border-white/20 rounded-2xl p-5 shadow-2xl max-w-xs">
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
      <div className="bg-black/40 backdrop-blur-lg border border-white/20 rounded-2xl p-5 shadow-2xl max-w-xs">
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

      {/* 底部标语 */}
      <div className="text-center">
        <p className="text-gray-500 text-xs">
          我们的地球，共同的家园 🌍
        </p>
      </div>
    </div>
  );
};

export default InfoPanel;
