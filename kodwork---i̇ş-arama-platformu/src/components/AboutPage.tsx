import React from 'react';
import { ShieldCheck, Award, Code, CheckCircle, ExternalLink, Sparkles, Heart } from 'lucide-react';
import { useJobs } from '../context/JobContext';

export const AboutPage: React.FC = () => {
  const { setActivePage } = useJobs();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-in fade-in duration-200">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-3 border border-indigo-100">
          <Award className="w-3.5 h-3.5" />
          <span>kodwork Proje Künyesi & İmzası</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
          kodwork İş Arama Platformu
        </h1>
        <p className="text-sm text-slate-600 mt-2">
          Geliştirici: <strong className="text-slate-900 font-bold">Enes Öztürk</strong>
        </p>
      </div>

      {/* Main Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Project Signature Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-base shadow-xs">
              EÖ
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Geliştirici İmzası</h2>
              <p className="text-xs text-indigo-600 font-medium">Enes Öztürk</p>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Bu proje, Patika / Kodluyoruz iş arama platformu spesifikasyonuna sadık kalınarak, modern React 19, TypeScript ve Tailwind CSS mimarisi ile <strong>Enes Öztürk</strong> tarafından özenle kodlanmış ve geliştirilmiştir.
          </p>
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Tüm hakları saklıdır © 2026 kodwork.</span>
          </div>
        </div>

        {/* The Muse API Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-base shadow-xs">
              API
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Veri Kaynağı: The Muse</h2>
              <p className="text-xs text-slate-500 font-medium">Developers API v2</p>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            İş ilanları, şirket verileri, pozisyon seviyeleri ve konumlar <strong>The Muse API v2</strong> üzerinden canlı olarak sorgulanmakta; olası tarayıcı CORS kısıtlamalarına karşı kesintisiz fallback veri yapısıyla desteklenmektedir.
          </p>
          <div className="mt-4 pt-4 border-t border-slate-100">
            <a
              href="https://www.themuse.com/developers/api/v2"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-indigo-600 hover:underline inline-flex items-center gap-1 font-medium"
            >
              The Muse API Dokümantasyonunu Aç <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* HTML Rendering Explanation Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs mb-8">
        <div className="flex items-center gap-2.5 mb-3 text-slate-900">
          <Code className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-bold">
            &ldquo;İş detayı HTML geliyor, peki nasıl görüntülüyoruz?&rdquo;
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
          The Muse API iş açıklamalarını ham HTML dizgisi olarak iletir. Projemizde bu veriyi ekranda güvenle ve kusursuz görüntülemek için şu adımlar uygulanmıştır:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-1">1. DOMPurify Sanitizasyon</h3>
            <p className="text-slate-600">
              Olası XSS ve zararlı script enjeksiyonlarını engellemek için HTML içeriği DOMPurify ile temizlenir.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-1">2. dangerouslySetInnerHTML</h3>
            <p className="text-slate-600">
              Sterilize edilmiş güvenli HTML içeriği React bileşenine doğrudan aktarılır.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-1">3. Özel CSS Tipografisi</h3>
            <p className="text-slate-600">
              <code>.kodwork-prose</code> sınıfı ile başlıklar, paragraflar, maddeli listeler ve tablolar estetik olarak stillendirilir.
            </p>
          </div>
        </div>
      </div>

      {/* Checklist of Met Requirements */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs mb-8">
        <h2 className="text-base font-bold text-slate-900 mb-4">
          Ödev Gereksinimleri ve Doğrulama Matrisi
        </h2>
        <ul className="space-y-2.5 text-xs text-slate-700">
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span><strong>İş Listesi Sayfası:</strong> Sektördeki işlerin sayfalamalı ve filtreli gösterimi.</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span><strong>İş Detayı Sayfası:</strong> Şirket, konum, seviye ve HTML açıklamasının estetik sunumu.</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span><strong>Yandan Açılır Menü (Drawer):</strong> İş Listesi ve Favoriler sayfaları arasında tek tıkla geçiş.</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span><strong>Favorilerden Kaldırabilme:</strong> Favoriler sayfasından tekil veya toplu silme fonksiyonu.</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span><strong>Mükerrer Kayıt Önleme:</strong> Aynı işin favorilere tekrar tekrar eklenmesi engellenmiştir.</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span><strong>Kalıcılık (LocalStorage):</strong> Favoriler ve başvurular belleğe ve tarayıcıya kaydedilmektedir.</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span><strong>Geliştirici İmzası & Telif Hakları:</strong> Enes Öztürk imzalı, tam telif hakkı bildirimli künye.</span>
          </li>
        </ul>
      </div>

      {/* Return Button */}
      <div className="text-center">
        <button
          onClick={() => setActivePage('jobs')}
          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors"
        >
          İş İlanlarını Keşfetmeye Başla
        </button>
      </div>
    </div>
  );
};
