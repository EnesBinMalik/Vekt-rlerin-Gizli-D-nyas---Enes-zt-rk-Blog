import React, { useState } from 'react';
import { CSHARP_SOURCE_CODE } from '../data/csharpSourceCode';
import { X, Copy, Check, Download, FileCode, Terminal } from 'lucide-react';

interface CSharpCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CSharpCodeModal: React.FC<CSharpCodeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CSHARP_SOURCE_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleDownload = () => {
    const blob = new Blob([CSHARP_SOURCE_CODE], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Program.cs';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-950 border border-slate-800 rounded-2xl w-full max-w-4xl h-[85vh] shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-purple-500/20 text-purple-400 rounded-xl">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>C# Kaynak Kodu: Program.cs</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono">
                  Enes Öztürk İmzalı
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Visual Studio veya .NET CLI (`dotnet run`) ile doğrudan derlenebilir tam kod.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-850 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg text-xs font-semibold border border-slate-700 transition"
              title="Kodu Kopyala"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Kopyalandı!' : 'Kopyala'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-900/40 hover:bg-cyan-850 text-cyan-300 hover:text-white rounded-lg text-xs font-semibold border border-cyan-700/50 transition"
              title="Program.cs olarak İndir"
            >
              <Download className="w-3.5 h-3.5" />
              <span>İndir (.cs)</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Code Content */}
        <div className="flex-1 p-5 overflow-auto bg-[#0a0e17] font-mono text-xs text-slate-300 leading-relaxed scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
          <pre className="select-text whitespace-pre">{CSHARP_SOURCE_CODE}</pre>
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>.NET 8.0 / 9.0 SDK Uyumlu Console Application</span>
          </span>
          <span className="text-slate-500 font-mono">Enes Öztürk © 2026</span>
        </div>
      </div>
    </div>
  );
};
