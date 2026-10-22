import React from 'react';
import { ShieldCheck, Award, FileText, Share2, BookOpen, ExternalLink } from 'lucide-react';

interface AuthorProfileProps {
  onOpenCopyright: () => void;
  onOpenCitation: () => void;
  onOpenShare: () => void;
}

export const AuthorProfile: React.FC<AuthorProfileProps> = ({
  onOpenCopyright,
  onOpenCitation,
  onOpenShare,
}) => {
  return (
    <div className="my-14 rounded-2xl border border-stone-200/90 bg-white p-6 sm:p-9 shadow-xs">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-stone-100">
        <div className="flex items-center gap-4 sm:gap-5">
          {/* Author Monogram / Avatar with artistic aesthetic */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-stone-900 text-stone-100 flex items-center justify-center font-serif text-2xl sm:text-3xl font-bold shadow-md shrink-0 border-2 border-stone-100">
            <span>EÖ</span>
            <div
              className="absolute -bottom-1 -right-1 bg-amber-500 text-stone-950 p-1 rounded-full border border-white shadow-xs"
              title="Doğrulanmış Yazar & Eser Sahibi"
            >
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 tracking-tight">
                Enes Öztürk
              </h3>
              <span className="text-[11px] font-sans font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                Doğrulanmış Yazar
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 font-sans mt-0.5">
              Matematik Araştırmacısı, Görsel Düşünür & Sezgisel Pedagoji Yazarı
            </p>
            <div className="flex flex-wrap items-center gap-2 text-xs text-stone-400 mt-1 font-mono">
              <span>© 2026 Enes Öztürk</span>
              <span>·</span>
              <span>Tüm Hakları Saklıdır</span>
              <span>·</span>
              <span>Yayın No: EÖ-MATH-2026-01</span>
            </div>
          </div>
        </div>

        {/* Action utility buttons */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <button
            type="button"
            onClick={onOpenCitation}
            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-stone-600" /> Alıntı Yap
          </button>
          <button
            type="button"
            onClick={onOpenCopyright}
            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-medium text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-700" /> Telif & Lisans
          </button>
          <button
            type="button"
            onClick={onOpenShare}
            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-medium text-stone-900 bg-stone-900 hover:bg-stone-800 text-white rounded-lg transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" /> Paylaş
          </button>
        </div>
      </div>

      {/* Author Statement & Bio */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-stone-600 leading-relaxed font-sans">
        <div className="md:col-span-2">
          <h4 className="font-serif font-bold text-stone-900 text-sm mb-1.5 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-stone-700" /> Yazarın Bildirisi & Metodolojisi
          </h4>
          <p>
            Bu çalışma, <em>Temel Matematik Modülü</em> kapsamında ezbere dayalı formül ezberletme geleneğine bir itiraz olarak kaleme alınmıştır.
            Matematik formülleri, keşfedilmiş canlı hakikatlerin sadece son durağındaki tabelalardır. Tabelayı ezberlemek yolu yürümek değildir.
            Buradaki tüm pedagojik anlatılar, dinamik simülasyonlar ve düşünce deneyleri; zihnin doğayı aracısız görmesini sağlamak için tasarlanmıştır.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80">
          <h4 className="font-serif font-bold text-stone-900 text-xs mb-1.5 uppercase tracking-wider">
            Fikri Mülkiyet & Alıntı İzni
          </h4>
          <p className="text-[11px] text-stone-600">
            Bu yayının pedagojik kurgusu, özgün benzetmeleri ve simülasyon mantığı <strong>Enes Öztürk</strong> mülkiyetindedir.
            Eğitim amaçlı kullanımlarda yazar adı ve kaynak bağlantısı belirtilmek kaydıyla serbestçe alıntılanabilir.
          </p>
          <button
            type="button"
            onClick={onOpenCopyright}
            className="mt-2 text-[11px] font-semibold text-amber-900 hover:underline inline-flex items-center gap-1"
          >
            Detaylı Telif Şartlarını Oku <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
