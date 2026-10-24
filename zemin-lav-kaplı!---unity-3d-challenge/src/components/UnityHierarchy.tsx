import React from 'react';
import {
  Box,
  Circle,
  Plus,
  Trash2,
  Copy,
  ChevronRight,
  ChevronDown,
  Layers,
  Flame,
  Camera,
  Sun,
  Eye,
  Flag,
  Zap,
  RotateCw,
  Trophy,
} from 'lucide-react';
import { GameObjectConfig, ObjectType } from '../types';
import { soundManager } from '../audio/soundManager';

interface UnityHierarchyProps {
  objects: GameObjectConfig[];
  selectedObjectId: string | null;
  onSelectObject: (id: string | null) => void;
  onAddObject: (type: ObjectType) => void;
  onDeleteObject: (id: string) => void;
  onDuplicateObject: (id: string) => void;
  isOpen: boolean;
  onToggleOpen: () => void;
}

export const UnityHierarchy: React.FC<UnityHierarchyProps> = ({
  objects,
  selectedObjectId,
  onSelectObject,
  onAddObject,
  onDeleteObject,
  onDuplicateObject,
  isOpen,
  onToggleOpen,
}) => {
  const [showAddMenu, setShowAddMenu] = React.useState(false);

  const getIcon = (type: ObjectType) => {
    switch (type) {
      case 'cube':
        return <Box className="w-3.5 h-3.5 text-blue-400" />;
      case 'ramp':
        return <Layers className="w-3.5 h-3.5 text-orange-400" />;
      case 'cylinder':
        return <Circle className="w-3.5 h-3.5 text-amber-400" />;
      case 'trampoline':
        return <Zap className="w-3.5 h-3.5 text-purple-400" />;
      case 'booster':
        return <Zap className="w-3.5 h-3.5 text-cyan-400" />;
      case 'spinner':
        return <RotateCw className="w-3.5 h-3.5 text-rose-400" />;
      case 'finishRing':
        return <Trophy className="w-3.5 h-3.5 text-yellow-400" />;
      case 'checkpoint':
        return <Flag className="w-3.5 h-3.5 text-emerald-400" />;
      default:
        return <Box className="w-3.5 h-3.5 text-zinc-400" />;
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={onToggleOpen}
        className="absolute top-14 left-2 z-20 flex items-center gap-1.5 px-2.5 py-1.5 bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 text-xs rounded-md border border-zinc-700 shadow-lg backdrop-blur-xs transition-colors"
        title="Unity Hierarchy Panelini Aç"
      >
        <Layers className="w-3.5 h-3.5 text-sky-400" />
        <span className="font-medium">Hierarchy ({objects.length + 4})</span>
      </button>
    );
  }

  return (
    <div className="absolute top-14 left-2 z-20 w-64 max-h-[calc(100vh-140px)] flex flex-col bg-zinc-900/95 border border-zinc-800 rounded-lg shadow-2xl backdrop-blur-md text-zinc-200 select-none text-xs">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-zinc-950/70 border-b border-zinc-800 rounded-t-lg">
        <div className="flex items-center gap-1.5 font-semibold text-zinc-100">
          <Layers className="w-4 h-4 text-sky-400" />
          <span>Hierarchy (Sahne Ağacı)</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowAddMenu(!showAddMenu)}
            className="p-1 hover:bg-zinc-800 rounded text-emerald-400 hover:text-emerald-300 transition-colors"
            title="Yeni İlkel Obje Ekle (+)"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={onToggleOpen}
            className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-zinc-200 transition-colors"
            title="Paneli Gizle"
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Add Object Dropdown */}
      {showAddMenu && (
        <div className="p-2 bg-zinc-950 border-b border-zinc-800 grid grid-cols-2 gap-1 animate-in fade-in duration-100">
          <button
            onClick={() => {
              onAddObject('cube');
              setShowAddMenu(false);
            }}
            className="flex items-center gap-1.5 p-1.5 bg-zinc-900 hover:bg-zinc-800 rounded text-left border border-zinc-800"
          >
            <Box className="w-3.5 h-3.5 text-blue-400" />
            <span>+ 3D Küp</span>
          </button>
          <button
            onClick={() => {
              onAddObject('ramp');
              setShowAddMenu(false);
            }}
            className="flex items-center gap-1.5 p-1.5 bg-zinc-900 hover:bg-zinc-800 rounded text-left border border-zinc-800"
          >
            <Layers className="w-3.5 h-3.5 text-orange-400" />
            <span>+ Eğimli Rampa</span>
          </button>
          <button
            onClick={() => {
              onAddObject('cylinder');
              setShowAddMenu(false);
            }}
            className="flex items-center gap-1.5 p-1.5 bg-zinc-900 hover:bg-zinc-800 rounded text-left border border-zinc-800"
          >
            <Circle className="w-3.5 h-3.5 text-amber-400" />
            <span>+ Silindir Sütun</span>
          </button>
          <button
            onClick={() => {
              onAddObject('trampoline');
              setShowAddMenu(false);
            }}
            className="flex items-center gap-1.5 p-1.5 bg-zinc-900 hover:bg-zinc-800 rounded text-left border border-zinc-800"
          >
            <Zap className="w-3.5 h-3.5 text-purple-400" />
            <span>+ Trambolin</span>
          </button>
          <button
            onClick={() => {
              onAddObject('booster');
              setShowAddMenu(false);
            }}
            className="flex items-center gap-1.5 p-1.5 bg-zinc-900 hover:bg-zinc-800 rounded text-left border border-zinc-800"
          >
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>+ Nitro Pad</span>
          </button>
          <button
            onClick={() => {
              onAddObject('spinner');
              setShowAddMenu(false);
            }}
            className="flex items-center gap-1.5 p-1.5 bg-zinc-900 hover:bg-zinc-800 rounded text-left border border-zinc-800"
          >
            <RotateCw className="w-3.5 h-3.5 text-rose-400" />
            <span>+ Dönen Çekiç</span>
          </button>
        </div>
      )}

      {/* Tree Content */}
      <div className="flex-1 overflow-y-auto p-1.5 space-y-0.5 divide-y divide-zinc-800/40">
        {/* Built-in System Nodes */}
        <div className="pb-1 space-y-0.5">
          <div className="flex items-center gap-1.5 px-2 py-1 text-zinc-400 rounded hover:bg-zinc-800/50">
            <Camera className="w-3.5 h-3.5 text-zinc-500" />
            <span>Main Camera (Kamera)</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 text-zinc-400 rounded hover:bg-zinc-800/50">
            <Sun className="w-3.5 h-3.5 text-amber-500/80" />
            <span>Directional Light (Işık)</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 text-red-300 rounded hover:bg-zinc-800/50">
            <Flame className="w-3.5 h-3.5 text-red-500" />
            <span className="font-semibold">Floor (Zemin Lav Okyanusu)</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 text-sky-300 rounded hover:bg-zinc-800/50">
            <Circle className="w-3.5 h-3.5 text-sky-400" />
            <span className="font-semibold">Marble Ball (RigidBody)</span>
          </div>
        </div>

        {/* Dynamic Track GameObjects */}
        <div className="pt-1 space-y-0.5">
          <div className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 px-2 py-0.5">
            Parkur Objeleri ({objects.length})
          </div>

          {objects.map((obj) => {
            const isSelected = selectedObjectId === obj.id;
            return (
              <div
                key={obj.id}
                onClick={() => {
                  onSelectObject(obj.id);
                  soundManager.playClick();
                }}
                className={`group flex items-center justify-between px-2 py-1 rounded cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-sky-600 text-white font-medium'
                    : 'hover:bg-zinc-800 text-zinc-300'
                }`}
              >
                <div className="flex items-center gap-1.5 truncate">
                  {getIcon(obj.type)}
                  <span className="truncate">{obj.name}</span>
                </div>

                <div className="hidden group-hover:flex items-center gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDuplicateObject(obj.id);
                      soundManager.playClick();
                    }}
                    className="p-0.5 hover:text-white rounded"
                    title="Kopyala (Duplicate)"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteObject(obj.id);
                      soundManager.playClick();
                    }}
                    className="p-0.5 hover:text-red-400 rounded"
                    title="Sil (Delete)"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
