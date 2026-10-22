import React from 'react';
import { X, ShieldCheck, Database, Award, CheckCircle2, Sparkles, Terminal } from 'lucide-react';

interface AboutSignatureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutSignatureModal: React.FC<AboutSignatureModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Enes Öztürk İmzalı Proje</h3>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Onaylı Çözüm
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                MySQL 8.0 Sakila Database & SQL Studio
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 text-xs text-slate-300">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="font-semibold text-slate-200 text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Ödev Gereksinimleri & Çözüm İmzası</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Bu stüdyo, Enes Öztürk imzasıyla hazırlanmış olup MySQL Sakila veritabanında yer alan 
              <strong className="text-slate-200"> film</strong> ve <strong className="text-slate-200">actor</strong> tabloları üzerindeki
              tüm filtreleme gereksinimlerini eksiksiz karşılamaktadır.
            </p>
          </div>

          <div className="space-y-2.5">
            <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider">
              Tamamlanan SQL Görevleri:
            </h4>

            <div className="space-y-2">
              <div className="p-3 rounded-lg bg-slate-850/50 border border-slate-800 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-200 block">Görev 1: BETWEEN - AND Filtresi</span>
                  <span className="text-slate-400 font-mono text-[11px]">
                    SELECT * FROM film WHERE replacement_cost BETWEEN 12.99 AND 16.99 ORDER BY replacement_cost ASC;
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-850/50 border border-slate-800 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-200 block">Görev 2: IN Operatörü ile Aktör Sorgusu</span>
                  <span className="text-slate-400 font-mono text-[11px]">
                    SELECT first_name, last_name FROM actor WHERE first_name IN ('Penelope', 'Nick', 'Ed') ORDER BY first_name ASC, last_name ASC;
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-850/50 border border-slate-800 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-200 block">Görev 3: Çoklu IN ve AND Koşulu</span>
                  <span className="text-slate-400 font-mono text-[11px]">
                    SELECT * FROM film WHERE rental_rate IN (0.99, 2.99, 4.99) AND replacement_cost IN (12.99, 15.99, 28.99) ORDER BY rental_rate ASC, replacement_cost ASC;
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-slate-400">
            <span>İmza Sahibi: <strong className="text-amber-300">Enes Öztürk</strong></span>
            <span className="font-mono text-[11px]">Sakila MySQL DB · 2026</span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-950/80 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="cursor-pointer px-4 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs transition-colors"
          >
            Kapat ve Sorgulamaya Başla
          </button>
        </div>
      </div>
    </div>
  );
};
