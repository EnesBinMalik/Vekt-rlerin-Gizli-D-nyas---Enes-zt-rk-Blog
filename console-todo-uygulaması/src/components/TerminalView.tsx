import React, { useRef, useEffect, useState } from 'react';
import { TerminalLine, ConsoleStep, BoardState, BuyuklukEnum } from '../types/todo';
import {
  Terminal as TerminalIcon,
  RotateCcw,
  Trash2,
  Send,
  CornerDownLeft,
  Volume2,
  VolumeX,
  Sparkles,
  Users,
} from 'lucide-react';

interface TerminalViewProps {
  lines: TerminalLine[];
  currentStep: ConsoleStep;
  currentPrompt: string;
  inputValue: string;
  setInputValue: (v: string) => void;
  onCommand: (cmd: string) => void;
  onClear: () => void;
  onReset: () => void;
  boardState: BoardState;
  commandHistory: string[];
}

export const TerminalView: React.FC<TerminalViewProps> = ({
  lines,
  currentStep,
  currentPrompt,
  inputValue,
  setInputValue,
  onCommand,
  onClear,
  onReset,
  boardState,
  commandHistory,
}) => {
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Auto-scroll to bottom on new lines
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines, currentPrompt]);

  // Focus input when user clicks anywhere inside terminal body
  const focusInput = () => {
    inputRef.current?.focus();
  };

  const playClickSound = () => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // AudioContext not allowed or unsupported
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    playClickSound();
    onCommand(inputValue);
    setInputValue('');
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputValue(commandHistory[nextIndex] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandHistory.length === 0 || historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInputValue('');
      } else {
        setHistoryIndex(nextIndex);
        setInputValue(commandHistory[nextIndex] || '');
      }
    }
  };

  // Helper for quick click input
  const quickSend = (val: string) => {
    playClickSound();
    onCommand(val);
    setInputValue('');
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden font-mono text-sm">
      {/* Top Bar (Terminal Window Header) */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800 select-none">
        <div className="flex items-center space-x-2">
          {/* Mac/Linux terminal dots */}
          <div className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-500 cursor-pointer transition-colors" title="Kapat" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-500 cursor-pointer transition-colors" title="Simge Durumuna Küçült" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 cursor-pointer transition-colors" title="Ekranı Kapla" />
          <div className="h-4 w-px bg-slate-800 mx-2" />
          <div className="flex items-center space-x-2 text-slate-300">
            <TerminalIcon className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-xs tracking-wider text-slate-200">
              enes@ozturk: ~/Proje2-ConsoleToDo (C# dotnet)
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
            title={soundEnabled ? 'Terminal Seslerini Kapat' : 'Terminal Seslerini Aç'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4" />}
          </button>
          <button
            onClick={onClear}
            className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors flex items-center gap-1.5 border border-slate-700/60"
            title="Ekranı Temizle (cls)"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>cls</span>
          </button>
          <button
            onClick={onReset}
            className="px-2.5 py-1 text-xs bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 hover:text-rose-100 rounded-lg transition-colors flex items-center gap-1.5 border border-rose-800/50"
            title="Varsayılan Duruma Sıfırla"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Sıfırla</span>
          </button>
        </div>
      </div>

      {/* Terminal Output Window */}
      <div
        onClick={focusInput}
        className="flex-1 p-4 md:p-5 overflow-y-auto space-y-1 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent cursor-text select-text bg-[#0b0f19]"
        style={{ minHeight: '380px' }}
      >
        {lines.map((line) => {
          let colorClass = 'text-slate-300';
          if (line.type === 'header') colorClass = 'text-emerald-400 font-bold';
          else if (line.type === 'system') colorClass = 'text-amber-400 font-medium';
          else if (line.type === 'card') colorClass = 'text-sky-300 font-bold';
          else if (line.type === 'error') colorClass = 'text-rose-400 font-semibold bg-rose-950/30 px-1 py-0.5 rounded';
          else if (line.type === 'success') colorClass = 'text-emerald-300 font-semibold bg-emerald-950/30 px-1 py-0.5 rounded';
          else if (line.type === 'input') colorClass = 'text-yellow-300 font-semibold';
          else if (line.type === 'prompt') colorClass = 'text-cyan-400 font-bold';

          return (
            <div key={line.id} className="leading-relaxed whitespace-pre-wrap break-words">
              <span className={colorClass}>{line.text}</span>
            </div>
          );
        })}

        {/* Active Command Line */}
        <form onSubmit={handleSubmit} className="flex items-center pt-2">
          <span className="text-cyan-400 font-bold whitespace-nowrap select-none">{currentPrompt}</span>
          <div className="relative flex-1 flex items-center ml-1">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              className="w-full bg-transparent text-yellow-300 font-semibold focus:outline-none caret-emerald-400 pr-8"
              spellCheck={false}
              autoComplete="off"
            />
            <button
              type="submit"
              className="absolute right-0 text-slate-500 hover:text-emerald-400 transition-colors p-1"
              title="Komutu Gönder (Enter)"
            >
              <CornerDownLeft className="w-4 h-4" />
            </button>
          </div>
        </form>

        <div ref={terminalEndRef} />
      </div>

      {/* Contextual Quick Action Helper Bar */}
      <div className="px-3 py-2.5 bg-slate-900/90 border-t border-slate-800 text-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-slate-400 flex items-center gap-1 text-[11px] font-sans font-medium mr-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            Hızlı Seçim:
          </span>

          {currentStep === 'MAIN_MENU' && (
            <>
              <button
                onClick={() => quickSend('1')}
                className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-sky-300 hover:text-white rounded border border-slate-700 transition"
              >
                (1) Board Listele
              </button>
              <button
                onClick={() => quickSend('2')}
                className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-emerald-300 hover:text-white rounded border border-slate-700 transition"
              >
                (2) Kart Ekle
              </button>
              <button
                onClick={() => quickSend('3')}
                className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-rose-300 hover:text-white rounded border border-slate-700 transition"
              >
                (3) Kart Sil
              </button>
              <button
                onClick={() => quickSend('4')}
                className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-amber-300 hover:text-white rounded border border-slate-700 transition"
              >
                (4) Kart Taşı
              </button>
              <button
                onClick={() => quickSend('5')}
                className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-purple-300 hover:text-white rounded border border-slate-700 transition"
              >
                (5) Kart Güncelle
              </button>
              <button
                onClick={() => quickSend('6')}
                className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-indigo-300 hover:text-white rounded border border-slate-700 transition"
              >
                (6) Takım Listesi
              </button>
            </>
          )}

          {currentStep === 'ADD_SIZE' && (
            <>
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  onClick={() => quickSend(String(s))}
                  className="px-2.5 py-1 bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-300 rounded transition font-bold"
                >
                  {s} ({s === 1 ? 'XS' : s === 2 ? 'S' : s === 3 ? 'M' : s === 4 ? 'L' : 'XL'})
                </button>
              ))}
            </>
          )}

          {(currentStep === 'ADD_MEMBER' || (currentStep === 'UPDATE_FIELD_VALUE' && currentPrompt.includes('Kişi'))) && (
            <>
              {Object.values(boardState.takimUyeleri).map((m) => (
                <button
                  key={m.id}
                  onClick={() => quickSend(String(m.id))}
                  className="px-2 py-1 bg-indigo-950/70 hover:bg-indigo-900 border border-indigo-700/60 text-indigo-200 rounded transition"
                >
                  ID {m.id}: {m.isim}
                </button>
              ))}
            </>
          )}

          {currentStep === 'MOVE_SELECT_LINE' && (
            <>
              <button
                onClick={() => quickSend('1')}
                className="px-2.5 py-1 bg-blue-950/70 hover:bg-blue-900 border border-blue-700/60 text-blue-300 rounded transition font-semibold"
              >
                (1) TODO
              </button>
              <button
                onClick={() => quickSend('2')}
                className="px-2.5 py-1 bg-amber-950/70 hover:bg-amber-900 border border-amber-700/60 text-amber-300 rounded transition font-semibold"
              >
                (2) IN PROGRESS
              </button>
              <button
                onClick={() => quickSend('3')}
                className="px-2.5 py-1 bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-300 rounded transition font-semibold"
              >
                (3) DONE
              </button>
            </>
          )}

          {(currentStep === 'DELETE_NOT_FOUND_CHOICE' || currentStep === 'MOVE_NOT_FOUND_CHOICE') && (
            <>
              <button
                onClick={() => quickSend('1')}
                className="px-2.5 py-1 bg-rose-950/70 hover:bg-rose-900 border border-rose-700/60 text-rose-300 rounded transition font-semibold"
              >
                (1) İşlemi Sonlandır
              </button>
              <button
                onClick={() => quickSend('2')}
                className="px-2.5 py-1 bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-300 rounded transition font-semibold"
              >
                (2) Yeniden Dene
              </button>
            </>
          )}

          {currentStep === 'UPDATE_FIELD_CHOICE' && (
            <>
              <button onClick={() => quickSend('1')} className="px-2 py-1 bg-slate-800 text-slate-200 rounded border border-slate-700">1: Başlık</button>
              <button onClick={() => quickSend('2')} className="px-2 py-1 bg-slate-800 text-slate-200 rounded border border-slate-700">2: İçerik</button>
              <button onClick={() => quickSend('3')} className="px-2 py-1 bg-slate-800 text-slate-200 rounded border border-slate-700">3: Büyüklük</button>
              <button onClick={() => quickSend('4')} className="px-2 py-1 bg-slate-800 text-slate-200 rounded border border-slate-700">4: Kişi</button>
              <button onClick={() => quickSend('0')} className="px-2 py-1 bg-rose-950 text-rose-300 rounded border border-rose-800">0: İptal</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
