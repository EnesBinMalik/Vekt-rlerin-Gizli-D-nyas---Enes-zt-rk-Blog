import React, { useState } from 'react';
import {
  Box,
  Circle,
  Layers,
  Zap,
  RotateCw,
  Trophy,
  Flag,
  Camera,
  ChevronDown,
  ChevronUp,
  Sliders,
  Sparkles,
  Keyboard,
} from 'lucide-react';
import { ObjectType } from '../types';
import { soundManager } from '../audio/soundManager';

interface UnityBottomDockProps {
  onAddObject: (type: ObjectType) => void;
  cameraMode: 'follow' | 'orbit' | 'topDown';
  onChangeCameraMode: (mode: 'follow' | 'orbit' | 'topDown') => void;
  isPlayMode: boolean;
}

export const UnityBottomDock: React.FC<UnityBottomDockProps> = ({
  onAddObject,
  cameraMode,
  onChangeCameraMode,
  isPlayMode,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<'primitives' | 'camera' | 'controls'>('primitives');

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-auto max-w-[min(940px,94vw)] w-full">
      {/* Collapse / Expand Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="mb-1.5 flex items-center gap-1.5 px-3 py-1 bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 text-xs rounded-full border border-zinc-700/80 shadow-md backdrop-blur-md transition-all cursor-pointer"
        title="Alt Kontrol Panelini Gizle / Göster"
      >
        {isCollapsed ? (
          <>
            <ChevronUp className="w-3.5 h-3.5 text-sky-400" />
            <span className="font-medium">Kontrolleri Göster</span>
          </>
        ) : (
          <>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
            <span className="font-medium">Sinematik Görünüm (Gizle)</span>
          </>
        )}
      </button>

      {/* Main Dock Container */}
      {!isCollapsed && (
        <div className="w-full bg-zinc-900/95 border border-zinc-800 rounded-xl shadow-2xl backdrop-blur-md overflow-hidden text-zinc-200 text-xs">
          {/* Dock Header Tabs */}
          <div className="flex items-center justify-between px-3 py-1.5 bg-zinc-950/70 border-b border-zinc-800">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveTab('primitives')}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1.5 ${
                  activeTab === 'primitives'
                    ? 'bg-zinc-800 text-sky-300 border border-sky-500/30'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Box className="w-3.5 h-3.5" />
                <span>İlkel Objeler (Asset)</span>
              </button>

              <button
                onClick={() => setActiveTab('camera')}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1.5 ${
                  activeTab === 'camera'
                    ? 'bg-zinc-800 text-sky-300 border border-sky-500/30'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Kamera Bakış Açısı</span>
              </button>

              <button
                onClick={() => setActiveTab('controls')}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1.5 ${
                  activeTab === 'controls'
                    ? 'bg-zinc-800 text-sky-300 border border-sky-500/30'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Keyboard className="w-3.5 h-3.5" />
                <span>Tuşlar & İpuçları</span>
              </button>
            </div>

            <div className="text-[11px] text-zinc-400 hidden sm:flex items-center gap-1.5">
              <span>Zemin Lav:</span>
              <span className="text-red-400 font-medium">🔥 Tehlikeli</span>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-2.5">
            {activeTab === 'primitives' && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
                <button
                  onClick={() => {
                    onAddObject('cube');
                    soundManager.playClick();
                  }}
                  className="flex flex-col items-center justify-center p-2 min-w-[76px] bg-zinc-950 hover:bg-zinc-800 rounded border border-zinc-800 hover:border-sky-500/50 transition-all group"
                  title="3D Küp / Zemin Platformu Ekle"
                >
                  <Box className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform mb-1" />
                  <span className="font-medium text-[11px]">3D Küp</span>
                </button>

                <button
                  onClick={() => {
                    onAddObject('ramp');
                    soundManager.playClick();
                  }}
                  className="flex flex-col items-center justify-center p-2 min-w-[76px] bg-zinc-950 hover:bg-zinc-800 rounded border border-zinc-800 hover:border-orange-500/50 transition-all group"
                  title="Eğimli Rampa Ekle"
                >
                  <Layers className="w-5 h-5 text-orange-400 group-hover:scale-110 transition-transform mb-1" />
                  <span className="font-medium text-[11px]">Rampa</span>
                </button>

                <button
                  onClick={() => {
                    onAddObject('cylinder');
                    soundManager.playClick();
                  }}
                  className="flex flex-col items-center justify-center p-2 min-w-[76px] bg-zinc-950 hover:bg-zinc-800 rounded border border-zinc-800 hover:border-amber-500/50 transition-all group"
                  title="Silindir Ada Sütunu Ekle"
                >
                  <Circle className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform mb-1" />
                  <span className="font-medium text-[11px]">Silindir</span>
                </button>

                <button
                  onClick={() => {
                    onAddObject('trampoline');
                    soundManager.playClick();
                  }}
                  className="flex flex-col items-center justify-center p-2 min-w-[76px] bg-zinc-950 hover:bg-zinc-800 rounded border border-zinc-800 hover:border-purple-500/50 transition-all group"
                  title="Süper Zıplama Trambolini Ekle"
                >
                  <Zap className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform mb-1" />
                  <span className="font-medium text-[11px]">Trambolin</span>
                </button>

                <button
                  onClick={() => {
                    onAddObject('booster');
                    soundManager.playClick();
                  }}
                  className="flex flex-col items-center justify-center p-2 min-w-[76px] bg-zinc-950 hover:bg-zinc-800 rounded border border-zinc-800 hover:border-cyan-500/50 transition-all group"
                  title="Nitro Hızlandırıcı Pad Ekle"
                >
                  <Zap className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform mb-1" />
                  <span className="font-medium text-[11px]">Nitro Pad</span>
                </button>

                <button
                  onClick={() => {
                    onAddObject('spinner');
                    soundManager.playClick();
                  }}
                  className="flex flex-col items-center justify-center p-2 min-w-[76px] bg-zinc-950 hover:bg-zinc-800 rounded border border-zinc-800 hover:border-rose-500/50 transition-all group"
                  title="Dönen Tehlikeli Çekiç Ekle"
                >
                  <RotateCw className="w-5 h-5 text-rose-400 group-hover:scale-110 transition-transform mb-1" />
                  <span className="font-medium text-[11px]">Dönen Çekiç</span>
                </button>

                <button
                  onClick={() => {
                    onAddObject('checkpoint');
                    soundManager.playClick();
                  }}
                  className="flex flex-col items-center justify-center p-2 min-w-[76px] bg-zinc-950 hover:bg-zinc-800 rounded border border-zinc-800 hover:border-emerald-500/50 transition-all group"
                  title="Kontrol Noktası Ekle"
                >
                  <Flag className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform mb-1" />
                  <span className="font-medium text-[11px]">Checkpoint</span>
                </button>

                <button
                  onClick={() => {
                    onAddObject('finishRing');
                    soundManager.playClick();
                  }}
                  className="flex flex-col items-center justify-center p-2 min-w-[76px] bg-zinc-950 hover:bg-zinc-800 rounded border border-zinc-800 hover:border-yellow-500/50 transition-all group"
                  title="Zafer Çemberi (Hedef) Ekle"
                >
                  <Trophy className="w-5 h-5 text-yellow-400 group-hover:scale-110 transition-transform mb-1" />
                  <span className="font-medium text-[11px]">Bitiş Halkası</span>
                </button>
              </div>
            )}

            {activeTab === 'camera' && (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    onChangeCameraMode('follow');
                    soundManager.playClick();
                  }}
                  className={`flex-1 p-2 rounded border text-left transition-all ${
                    cameraMode === 'follow'
                      ? 'bg-sky-950/70 border-sky-500 text-sky-200'
                      : 'bg-zinc-950 border-zinc-800 hover:bg-zinc-800 text-zinc-300'
                  }`}
                >
                  <div className="font-semibold text-xs mb-0.5">🎮 Takip Kamerası</div>
                  <div className="text-[10px] text-zinc-400">Topu arkadan dinamik olarak takip eder (Oyun modu için ideal).</div>
                </button>

                <button
                  onClick={() => {
                    onChangeCameraMode('orbit');
                    soundManager.playClick();
                  }}
                  className={`flex-1 p-2 rounded border text-left transition-all ${
                    cameraMode === 'orbit'
                      ? 'bg-sky-950/70 border-sky-500 text-sky-200'
                      : 'bg-zinc-950 border-zinc-800 hover:bg-zinc-800 text-zinc-300'
                  }`}
                >
                  <div className="font-semibold text-xs mb-0.5">🛠️ Serbest Editör Kamerası</div>
                  <div className="text-[10px] text-zinc-400">Fare ile sahne etrafında 360° dön, yakınlaş ve kaydır.</div>
                </button>

                <button
                  onClick={() => {
                    onChangeCameraMode('topDown');
                    soundManager.playClick();
                  }}
                  className={`flex-1 p-2 rounded border text-left transition-all ${
                    cameraMode === 'topDown'
                      ? 'bg-sky-950/70 border-sky-500 text-sky-200'
                      : 'bg-zinc-950 border-zinc-800 hover:bg-zinc-800 text-zinc-300'
                  }`}
                >
                  <div className="font-semibold text-xs mb-0.5">🗺️ Kuşbakışı (Top-Down)</div>
                  <div className="text-[10px] text-zinc-400">Lav zeminini ve parkur rotasını yukarıdan izle.</div>
                </button>
              </div>
            )}

            {activeTab === 'controls' && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-zinc-300 text-[11px]">
                <div className="bg-zinc-950 p-2 rounded border border-zinc-800">
                  <span className="text-sky-400 font-mono font-bold block">W / A / S / D veya Oklar</span>
                  <span className="text-zinc-400">Topu yuvarla ve yönlendir</span>
                </div>
                <div className="bg-zinc-950 p-2 rounded border border-zinc-800">
                  <span className="text-purple-400 font-mono font-bold block">Boşluk (Space)</span>
                  <span className="text-zinc-400">Zıpla (Yerdeyken)</span>
                </div>
                <div className="bg-zinc-950 p-2 rounded border border-zinc-800">
                  <span className="text-amber-400 font-mono font-bold block">Sol Tık & Sürükle</span>
                  <span className="text-zinc-400">Kamerayı çevir / Obje seç</span>
                </div>
                <div className="bg-zinc-950 p-2 rounded border border-zinc-800">
                  <span className="text-emerald-400 font-mono font-bold block">R Tuşu</span>
                  <span className="text-zinc-400">Topu son noktaya sıfırla</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
