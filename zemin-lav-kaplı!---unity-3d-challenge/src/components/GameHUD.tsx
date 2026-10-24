import React from 'react';
import { Flame, Trophy, RotateCcw, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Zap } from 'lucide-react';
import { PhysicsControls } from '../physics/ballPhysics';

interface GameHUDProps {
  isPlayMode: boolean;
  isLavaDeath: boolean;
  isWon: boolean;
  winTime: number;
  onRestart: () => void;
  controlsState: PhysicsControls;
  onSetControls: (c: PhysicsControls) => void;
}

export const GameHUD: React.FC<GameHUDProps> = ({
  isPlayMode,
  isLavaDeath,
  isWon,
  winTime,
  onRestart,
  controlsState,
  onSetControls,
}) => {
  if (!isPlayMode) return null;

  return (
    <>
      {/* Top Banner Warning */}
      <div className="absolute top-14 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center">
        <div className="bg-red-950/80 border border-red-700/60 text-red-200 px-3.5 py-1 rounded-full shadow-lg backdrop-blur-md flex items-center gap-2 text-xs font-medium">
          <Flame className="w-3.5 h-3.5 text-red-400" />
          <span>Zemin Lav Kaplı! Topu düşürmeden yolda tut</span>
        </div>
      </div>

      {/* Lava Death Screen Overlay */}
      {isLavaDeath && (
        <div className="absolute inset-0 z-40 bg-red-950/40 backdrop-blur-xs flex items-center justify-center animate-in fade-in duration-200 pointer-events-none">
          <div className="bg-zinc-950/90 border border-red-600/80 p-5 rounded-xl shadow-2xl text-center max-w-sm mx-4">
            <Flame className="w-10 h-10 text-red-500 mx-auto mb-2" />
            <h2 className="text-lg font-bold text-white mb-1">LAVA DÜŞTÜN!</h2>
            <p className="text-xs text-red-300">Zemin tamamen erimiş lavla kaplı. Top kontrolden çıktı!</p>
            <div className="mt-3 text-[11px] text-zinc-400 font-mono">Kontrol noktasına dönülüyor...</div>
          </div>
        </div>
      )}

      {/* Victory Modal */}
      {isWon && (
        <div className="absolute inset-0 z-40 bg-black/60 backdrop-blur-sm flex items-center justify-center animate-in zoom-in-95 duration-200">
          <div className="bg-zinc-900 border border-amber-500/80 p-6 rounded-2xl shadow-2xl text-center max-w-md mx-4 text-zinc-100">
            <div className="w-14 h-14 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-3 border border-amber-500/50">
              <Trophy className="w-7 h-7 text-amber-400" />
            </div>
            <h2 className="text-xl font-bold text-amber-300 mb-1">TEBRİKLER! PARKURU TAMAMLADIN!</h2>
            <p className="text-xs text-zinc-300 mb-3">
              Topu lav zeminine düşürmeden başarıyla bitiş halkasına ulaştırdın.
            </p>

            <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 mb-4 inline-block px-6">
              <span className="text-[11px] text-zinc-400 block uppercase">Tamamlama Süresi</span>
              <span className="text-2xl font-mono font-bold text-amber-400">{winTime.toFixed(2)} sn</span>
            </div>

            <div className="flex gap-2 justify-center">
              <button
                onClick={onRestart}
                className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-semibold rounded-lg text-xs shadow-md transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Tekrar Oyna</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* On-Screen Mobile / Touch Virtual Controls */}
      <div className="md:hidden fixed bottom-24 left-4 z-30 pointer-events-auto">
        <div className="grid grid-cols-3 gap-1 bg-zinc-950/70 p-2 rounded-xl border border-zinc-800 backdrop-blur-md">
          <div />
          <button
            onTouchStart={() => onSetControls({ ...controlsState, forward: true })}
            onTouchEnd={() => onSetControls({ ...controlsState, forward: false })}
            onMouseDown={() => onSetControls({ ...controlsState, forward: true })}
            onMouseUp={() => onSetControls({ ...controlsState, forward: false })}
            className="p-3 bg-zinc-800/80 active:bg-sky-600 rounded text-zinc-200 flex items-center justify-center"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
          <div />

          <button
            onTouchStart={() => onSetControls({ ...controlsState, left: true })}
            onTouchEnd={() => onSetControls({ ...controlsState, left: false })}
            onMouseDown={() => onSetControls({ ...controlsState, left: true })}
            onMouseUp={() => onSetControls({ ...controlsState, left: false })}
            className="p-3 bg-zinc-800/80 active:bg-sky-600 rounded text-zinc-200 flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <button
            onTouchStart={() => onSetControls({ ...controlsState, backward: true })}
            onTouchEnd={() => onSetControls({ ...controlsState, backward: false })}
            onMouseDown={() => onSetControls({ ...controlsState, backward: true })}
            onMouseUp={() => onSetControls({ ...controlsState, backward: false })}
            className="p-3 bg-zinc-800/80 active:bg-sky-600 rounded text-zinc-200 flex items-center justify-center"
          >
            <ArrowDown className="w-5 h-5" />
          </button>

          <button
            onTouchStart={() => onSetControls({ ...controlsState, right: true })}
            onTouchEnd={() => onSetControls({ ...controlsState, right: false })}
            onMouseDown={() => onSetControls({ ...controlsState, right: true })}
            onMouseUp={() => onSetControls({ ...controlsState, right: false })}
            className="p-3 bg-zinc-800/80 active:bg-sky-600 rounded text-zinc-200 flex items-center justify-center"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="md:hidden fixed bottom-24 right-4 z-30 pointer-events-auto">
        <button
          onTouchStart={() => onSetControls({ ...controlsState, jump: true })}
          onTouchEnd={() => onSetControls({ ...controlsState, jump: false })}
          onMouseDown={() => onSetControls({ ...controlsState, jump: true })}
          onMouseUp={() => onSetControls({ ...controlsState, jump: false })}
          className="w-16 h-16 bg-purple-600/90 active:bg-purple-500 rounded-full border-2 border-purple-400 text-white font-bold flex flex-col items-center justify-center shadow-lg"
        >
          <Zap className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] uppercase font-mono">Zıpla</span>
        </button>
      </div>
    </>
  );
};
