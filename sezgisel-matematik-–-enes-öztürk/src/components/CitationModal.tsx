import React, { useState } from 'react';
import { X, Copy, Check, BookOpen } from 'lucide-react';

interface CitationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CitationModal: React.FC<CitationModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'apa' | 'mla' | 'bibtex'>('apa');
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const citations = {
    apa: `Öztürk, E. (2026). Formülsüz matematik: Doğayı ezberlemeden görmek. Sezgisel Matematik Yayınları. https://ais-pre-6dtqkwbunxymhe6sqnzejn-648631049931.europe-west2.run.app`,
    mla: `Öztürk, Enes. "Formülsüz Matematik: Doğayı Ezberlemeden Görmek." Sezgisel Matematik Yayınları, 22 Ekim 2026, ais-pre-6dtqkwbunxymhe6sqnzejn-648631049931.europe-west2.run.app.`,
    bibtex: `@article{ozturk2026sezgisel,
  author    = {Enes Öztürk},
  title     = {Formülsüz Matematik: Doğayı Ezberlemeden Görmek},
  journal   = {Sezgisel Matematik Yayınları},
  year      = {2026},
  month     = {10},
  day       = {22},
  url       = {https://ais-pre-6dtqkwbunxymhe6sqnzejn-648631049931.europe-west2.run.app}
}`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(citations[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-stone-700" />
            <h3 className="font-serif font-bold text-stone-900 text-base">
              Yazıya Atıfta Bulun / Alıntı Yap
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="p-6">
          <div className="flex items-center gap-2 pb-4 border-b border-stone-200">
            {(['apa', 'mla', 'bibtex'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg uppercase tracking-wider transition-colors ${
                  activeTab === tab
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="mt-4">
            <label className="text-xs font-medium text-stone-500 mb-1.5 block">
              Formatlanmış Kaynak Gösterimi:
            </label>
            <div className="relative p-4 rounded-xl bg-stone-50 border border-stone-200 font-mono text-xs text-stone-800 leading-relaxed break-words whitespace-pre-wrap select-all">
              {citations[activeTab]}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-stone-200 bg-stone-50 flex items-center justify-between">
          <span className="text-xs text-stone-500">
            Yazar: Enes Öztürk (2026)
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-amber-800 hover:bg-amber-900 rounded-lg transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" /> Kopyalandı
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" /> Alıntıyı Kopyala
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
