import React from 'react';
import { X, Clock, Zap, CheckCircle2, Trophy, Flame, HelpCircle } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Yarışma Kuralları & Hakkında</h2>
              <p className="text-xs text-slate-400">Enes Öztürk İmzalı Trivia Platformu</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto space-y-5 text-slate-300 text-xs sm:text-sm leading-relaxed">
          {/* Rule 1: 12 Seconds */}
          <div className="flex items-start gap-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm mb-1">12 Saniye Kuralı</h3>
              <p className="text-slate-400 text-xs">
                Her soru ekrana geldiğinde tam 12 saniyelik geri sayım başlar. Süre 0\'a ulaştığında soru otomatik olarak yanlış kabul edilir ve sistem sonraki soruya geçer.
              </p>
            </div>
          </div>

          {/* Rule 2: Scoring Formula */}
          <div className="flex items-start gap-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm mb-1">Puanlama ve Hız Bonusu</h3>
              <p className="text-slate-400 text-xs">
                Her doğru cevap için <strong>100 taban puan</strong> verilir. Ne kadar hızlı cevap verirseniz, kalan her saniye için <strong>+10 hız bonus puanı</strong> (maksimum 120 ekstra puan) kazanırsınız.
              </p>
            </div>
          </div>

          {/* Rule 3: Combos */}
          <div className="flex items-start gap-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
              <Flame className="w-4 h-4 fill-rose-400/20" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm mb-1">Seri Çarpanı (Combo)</h3>
              <p className="text-slate-400 text-xs">
                Ardı ardına verdiğiniz her doğru cevap seriyi artırır. 2\'li seride 1.5x, 3\'lü seride 2x, 5 ve üzeri serilerde 3x kat bonus puan kazanırsınız!
              </p>
            </div>
          </div>

          {/* Dedication Banner */}
          <div className="bg-gradient-to-br from-amber-500/10 via-slate-950 to-indigo-950/30 border border-amber-500/20 p-5 rounded-2xl text-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-indigo-600 p-[1.5px] mx-auto mb-2 flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center font-bold text-amber-400 text-sm">
                EÖ
              </div>
            </div>
            <h4 className="font-bold text-white text-sm">Enes Öztürk İmzalı</h4>
            <p className="text-slate-400 text-xs mt-1 max-w-sm mx-auto">
              Bu trivia platformu, bilgi yarışması tutkunlarına süratli ve kaliteli bir deneyim sunmak üzere Enes Öztürk tarafından tasarlanmıştır.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition"
          >
            Anladım, Hazırım!
          </button>
        </div>
      </div>
    </div>
  );
};
