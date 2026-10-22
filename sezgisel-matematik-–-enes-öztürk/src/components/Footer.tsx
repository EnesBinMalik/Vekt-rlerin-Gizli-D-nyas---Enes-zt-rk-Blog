import React from 'react';
import { ShieldCheck, Heart, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenCopyright: () => void;
  onOpenCitation: () => void;
  onOpenShare: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenCopyright,
  onOpenCitation,
  onOpenShare,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 border-t border-stone-200/80 bg-white/90 text-stone-600 text-xs py-12 px-6">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 font-serif text-base font-bold text-stone-900">
            <span>Enes Öztürk</span>
            <span className="text-stone-300">·</span>
            <span className="font-sans text-xs font-normal text-stone-500">
              Temel Matematik Modülü Özel Projesi
            </span>
          </div>
          <p className="mt-1 text-stone-500 text-[11px] leading-relaxed max-w-md">
            © 2026 Enes Öztürk. Bu blog yazısının tüm fikri ve sınai telif hakları yazara aittir.
            Ezbere karşı sezgisel anlama ve geometrik düşünceyi yaygınlaştırmak amacıyla hazırlanmıştır.
          </p>
        </div>

        {/* Links and utility */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onOpenCopyright}
            className="hover:text-stone-900 transition-colors underline underline-offset-4"
          >
            Telif Hakları & Lisans
          </button>
          <span className="text-stone-300">/</span>
          <button
            type="button"
            onClick={onOpenCitation}
            className="hover:text-stone-900 transition-colors underline underline-offset-4"
          >
            Alıntı Yap
          </button>
          <span className="text-stone-300">/</span>
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1 p-2 rounded-lg hover:bg-stone-100 text-stone-700 transition-colors"
            title="Başa Dön"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
