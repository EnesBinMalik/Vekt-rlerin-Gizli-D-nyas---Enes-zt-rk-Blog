import React, { useState } from 'react';
import { REACT_NATIVE_FILES } from '../data/rnCode';
import { X, Copy, Check, FileCode, Smartphone, Sparkles } from 'lucide-react';

interface CodeViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CodeViewerModal: React.FC<CodeViewerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentFile = REACT_NATIVE_FILES[activeTab] || REACT_NATIVE_FILES[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative bg-slate-900 text-slate-100 rounded-2xl max-w-4xl w-full h-[88vh] flex flex-col shadow-2xl border border-slate-700/60 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Başlık Alanı */}
        <div className="p-4 sm:px-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-base">
                  PatikaStore React Native Kaynak Kodları
                </h3>
                <span className="text-xs bg-purple-900/60 text-purple-300 font-semibold px-2 py-0.5 rounded-full border border-purple-500/30">
                  Enes Öztürk Ödevi
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                FlatList, numColumns=2, TextInput ve bileşen mimarisi
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dosya Sekmeleri (Tabs) */}
        <div className="flex items-center gap-1.5 px-4 sm:px-6 py-2.5 bg-slate-900/90 border-b border-slate-800 overflow-x-auto text-xs font-mono scrollbar-none">
          {REACT_NATIVE_FILES.map((file, idx) => (
            <button
              key={file.name}
              onClick={() => {
                setActiveTab(idx);
                setCopied(false);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === idx
                  ? 'bg-purple-600 text-white font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>{file.name}</span>
            </button>
          ))}
        </div>

        {/* Dosya Açıklaması & Kopyalama Barı */}
        <div className="px-4 sm:px-6 py-2.5 bg-slate-950/70 border-b border-slate-800/60 flex items-center justify-between text-xs text-slate-300">
          <div className="truncate pr-2">
            <span className="text-purple-400 font-semibold mr-1.5">Açıklama:</span>
            {currentFile.description}
          </div>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-purple-600 hover:bg-purple-500 text-white active:scale-95'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Kopyalandı!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Kodu Kopyala</span>
              </>
            )}
          </button>
        </div>

        {/* Kod Görüntüleyici */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 font-mono text-xs sm:text-sm bg-[#0d1117] text-slate-200 leading-relaxed selection:bg-purple-800">
          <pre className="overflow-x-auto whitespace-pre">
            <code>{currentFile.code}</code>
          </pre>
        </div>

        {/* Alt Bilgi */}
        <div className="p-3 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Patika.dev React Native Bootcamp Ödev Teslim Standardına Uygundur</span>
          </div>
          <span className="font-semibold text-slate-300">İmza: Enes Öztürk</span>
        </div>
      </div>
    </div>
  );
};
