import React from 'react';
import {
  Sliders,
  Maximize2,
  RotateCw,
  Move,
  Palette,
  Shield,
  Activity,
  ChevronDown,
  X,
  Gauge,
} from 'lucide-react';
import { GameObjectConfig, MaterialTheme } from '../types';

interface UnityInspectorProps {
  selectedObject: GameObjectConfig | null;
  onUpdateObject: (updated: GameObjectConfig) => void;
  onClose: () => void;
  isOpen: boolean;
  onToggleOpen: () => void;
}

export const UnityInspector: React.FC<UnityInspectorProps> = ({
  selectedObject,
  onUpdateObject,
  onClose,
  isOpen,
  onToggleOpen,
}) => {
  if (!isOpen) {
    return (
      <button
        onClick={onToggleOpen}
        className="absolute top-14 right-2 z-20 flex items-center gap-1.5 px-2.5 py-1.5 bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 text-xs rounded-md border border-zinc-700 shadow-lg backdrop-blur-xs transition-colors"
        title="Unity Inspector Panelini Aç"
      >
        <Sliders className="w-3.5 h-3.5 text-amber-400" />
        <span className="font-medium">Inspector</span>
      </button>
    );
  }

  if (!selectedObject) {
    return (
      <div className="absolute top-14 right-2 z-20 w-72 bg-zinc-900/95 border border-zinc-800 rounded-lg shadow-2xl backdrop-blur-md p-4 text-zinc-400 text-xs select-none">
        <div className="flex items-center justify-between pb-2 border-b border-zinc-800 mb-3">
          <span className="font-semibold text-zinc-200 flex items-center gap-1.5">
            <Sliders className="w-4 h-4 text-amber-400" />
            Inspector
          </span>
          <button onClick={onToggleOpen} className="p-1 hover:text-white">
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
        <p className="text-center py-6 text-zinc-400">
          Düzenlemek için 3D Sahneden veya Hierarchy ağacından bir GameObject seçin.
        </p>
      </div>
    );
  }

  const updateField = <K extends keyof GameObjectConfig>(field: K, value: GameObjectConfig[K]) => {
    onUpdateObject({ ...selectedObject, [field]: value });
  };

  const updateNested = (category: 'position' | 'rotation' | 'scale', axis: 'x' | 'y' | 'z', val: number) => {
    onUpdateObject({
      ...selectedObject,
      [category]: {
        ...selectedObject[category],
        [axis]: Number(val),
      },
    });
  };

  return (
    <div className="absolute top-14 right-2 z-20 w-76 max-h-[calc(100vh-140px)] flex flex-col bg-zinc-900/95 border border-zinc-800 rounded-lg shadow-2xl backdrop-blur-md text-zinc-200 select-none text-xs">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-zinc-950/70 border-b border-zinc-800 rounded-t-lg">
        <div className="flex items-center gap-1.5 font-semibold text-zinc-100 truncate">
          <Sliders className="w-4 h-4 text-amber-400" />
          <span className="truncate">{selectedObject.name}</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={onClose} className="p-1 hover:text-white text-zinc-400" title="Kapat">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {/* GameObject Name Input */}
        <div>
          <label className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 block mb-1">
            GameObject Adı
          </label>
          <input
            type="text"
            value={selectedObject.name}
            onChange={(e) => updateField('name', e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-700 rounded px-2 py-1 text-xs text-zinc-100 outline-none focus:border-sky-500"
          />
        </div>

        {/* 1. Transform Component (Unity Standard) */}
        <div className="bg-zinc-950/60 p-2.5 rounded border border-zinc-800/80 space-y-2">
          <div className="flex items-center gap-1.5 font-semibold text-sky-300 pb-1 border-b border-zinc-800/80">
            <Move className="w-3.5 h-3.5 text-sky-400" />
            <span>Transform Bileşeni</span>
          </div>

          {/* Position */}
          <div>
            <div className="text-[10px] text-zinc-400 mb-1 flex justify-between">
              <span>Position (X, Y, Z)</span>
            </div>
            <div className="grid grid-cols-3 gap-1">
              {(['x', 'y', 'z'] as const).map((axis) => (
                <div key={axis} className="flex items-center bg-zinc-900 rounded border border-zinc-700/60 overflow-hidden">
                  <span className="w-4 text-center font-mono text-[10px] text-zinc-400 uppercase bg-zinc-800/80 py-1">
                    {axis}
                  </span>
                  <input
                    type="number"
                    step="0.5"
                    value={Math.round(selectedObject.position[axis] * 100) / 100}
                    onChange={(e) => updateNested('position', axis, parseFloat(e.target.value) || 0)}
                    className="w-full bg-transparent px-1 py-0.5 text-xs text-right outline-none text-zinc-100"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Rotation */}
          <div>
            <div className="text-[10px] text-zinc-400 mb-1 flex justify-between">
              <span>Rotation (Derece)</span>
            </div>
            <div className="grid grid-cols-3 gap-1">
              {(['x', 'y', 'z'] as const).map((axis) => (
                <div key={axis} className="flex items-center bg-zinc-900 rounded border border-zinc-700/60 overflow-hidden">
                  <span className="w-4 text-center font-mono text-[10px] text-zinc-400 uppercase bg-zinc-800/80 py-1">
                    {axis}
                  </span>
                  <input
                    type="number"
                    step="5"
                    value={Math.round(selectedObject.rotation[axis])}
                    onChange={(e) => updateNested('rotation', axis, parseFloat(e.target.value) || 0)}
                    className="w-full bg-transparent px-1 py-0.5 text-xs text-right outline-none text-zinc-100"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Scale */}
          <div>
            <div className="text-[10px] text-zinc-400 mb-1 flex justify-between">
              <span>Scale (Ölçek)</span>
            </div>
            <div className="grid grid-cols-3 gap-1">
              {(['x', 'y', 'z'] as const).map((axis) => (
                <div key={axis} className="flex items-center bg-zinc-900 rounded border border-zinc-700/60 overflow-hidden">
                  <span className="w-4 text-center font-mono text-[10px] text-zinc-400 uppercase bg-zinc-800/80 py-1">
                    {axis}
                  </span>
                  <input
                    type="number"
                    step="0.2"
                    min="0.2"
                    value={Math.round(selectedObject.scale[axis] * 100) / 100}
                    onChange={(e) => updateNested('scale', axis, Math.max(0.1, parseFloat(e.target.value) || 1))}
                    className="w-full bg-transparent px-1 py-0.5 text-xs text-right outline-none text-zinc-100"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Mesh Renderer & Material */}
        <div className="bg-zinc-950/60 p-2.5 rounded border border-zinc-800/80 space-y-2">
          <div className="flex items-center gap-1.5 font-semibold text-emerald-300 pb-1 border-b border-zinc-800/80">
            <Palette className="w-3.5 h-3.5 text-emerald-400" />
            <span>Mesh Renderer & Materyaller</span>
          </div>

          <div>
            <label className="text-[10px] text-zinc-400 block mb-1">Materyal Teması</label>
            <select
              value={selectedObject.materialTheme}
              onChange={(e) => updateField('materialTheme', e.target.value as MaterialTheme)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-xs text-zinc-100 outline-none"
            >
              <option value="unity_orange">Unity Dev (Turuncu Çizgili)</option>
              <option value="sci_fi_grid">Siber Grid (Mavi Ağ)</option>
              <option value="dark_metal">Endüstriyel Koyu Çelik</option>
              <option value="gold_luxury">Lüks Parlak Altın</option>
              <option value="neon_green">Neon Cyber Yeşil</option>
              <option value="magma_rock">Volkanik Lav Taşı</option>
            </select>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[10px] text-zinc-400">Renk Tint</span>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={selectedObject.color}
                onChange={(e) => updateField('color', e.target.value)}
                className="w-6 h-6 rounded border border-zinc-600 bg-transparent cursor-pointer"
              />
              <span className="font-mono text-[10px] text-zinc-300">{selectedObject.color}</span>
            </div>
          </div>
        </div>

        {/* 3. Rigidbody & Physics Material */}
        <div className="bg-zinc-950/60 p-2.5 rounded border border-zinc-800/80 space-y-2">
          <div className="flex items-center gap-1.5 font-semibold text-purple-300 pb-1 border-b border-zinc-800/80">
            <Activity className="w-3.5 h-3.5 text-purple-400" />
            <span>Rigidbody & Fizik Özellikleri</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-zinc-300 text-xs">Is Kinematic (Statik Sabit)</span>
            <input
              type="checkbox"
              checked={selectedObject.isKinematic}
              onChange={(e) => updateField('isKinematic', e.target.checked)}
              className="rounded accent-sky-500 w-4 h-4 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-[10px] text-zinc-400 mb-1">
              <span>Bounciness (Esneklik / Zıplama)</span>
              <span className="font-mono text-zinc-200">{selectedObject.bounciness.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="1.8"
              step="0.05"
              value={selectedObject.bounciness}
              onChange={(e) => updateField('bounciness', parseFloat(e.target.value))}
              className="w-full accent-purple-500 cursor-pointer h-1.5 bg-zinc-800 rounded"
            />
          </div>

          <div>
            <div className="flex justify-between text-[10px] text-zinc-400 mb-1">
              <span>Friction (Yüzey Sürtünmesi)</span>
              <span className="font-mono text-zinc-200">{selectedObject.friction.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.05"
              max="1.0"
              step="0.05"
              value={selectedObject.friction}
              onChange={(e) => updateField('friction', parseFloat(e.target.value))}
              className="w-full accent-purple-500 cursor-pointer h-1.5 bg-zinc-800 rounded"
            />
          </div>

          {selectedObject.type === 'spinner' && (
            <div>
              <div className="flex justify-between text-[10px] text-zinc-400 mb-1">
                <span>Dönme Hızı (rad/s)</span>
                <span className="font-mono text-zinc-200">{selectedObject.speed?.toFixed(1) || '2.0'}</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="6"
                step="0.5"
                value={selectedObject.speed || 2.0}
                onChange={(e) => updateField('speed', parseFloat(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer h-1.5 bg-zinc-800 rounded"
              />
            </div>
          )}

          {selectedObject.type === 'booster' && (
            <div>
              <div className="flex justify-between text-[10px] text-zinc-400 mb-1">
                <span>Hızlandırıcı Gücü</span>
                <span className="font-mono text-zinc-200">{selectedObject.boostPower || 12}</span>
              </div>
              <input
                type="range"
                min="5"
                max="25"
                step="1"
                value={selectedObject.boostPower || 12}
                onChange={(e) => updateField('boostPower', parseInt(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer h-1.5 bg-zinc-800 rounded"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
