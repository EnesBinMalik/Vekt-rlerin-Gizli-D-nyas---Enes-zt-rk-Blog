/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import WhyClassesSection from './components/WhyClassesSection';
import SyntaxAnatomySection from './components/SyntaxAnatomySection';
import ClassBuilderSection from './components/ClassBuilderSection';
import AccessModifiersSection from './components/AccessModifiersSection';
import QuizSection from './components/QuizSection';
import SummaryCheatSheet from './components/SummaryCheatSheet';
import Footer from './components/Footer';
import { X, Check, Copy, Download, BookOpen } from 'lucide-react';

export default function App() {
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [modalCopied, setModalCopied] = useState(false);

  const lessonSummaryText = `# C# Sınıf Sözdizimi, Field ve Metot Tanımlama, Erişim Belirleyiciler
Hazırlayan / İmza: Enes Öztürk

1. Sınıf Nedir, Neden İhtiyaç Duyarız ?
- Sınıflar Nesne Yönelimli Programlamanın (OOP) en önemli öğesidir.
- C# %100 nesne yönelimli bir dil olduğu için tüm metot ve özellikler sınıflar içerisinde yer alır.
- Metotlardan bahsederken bütün işlemleri tek bir metot içerisinde yazmak yerine, parçalarına yani alt metotlara ayırmak kod tekrarını azaltırken okunabilirliği arttırır demiştik. Üstelik bu şekilde yazdığınız programların daha kolay genişleyebildiğini görürsünüz.
- Aynı şekilde program geliştirirken bütün metotları tek bir sınıf içerisinde yazmak yerine benzer görevleri olan metotları tek bir sınıf içerisinde toplamak en doğru yaklaşımdır.

2. Bir Sınıfın Temel Öğeleri:
Bir sınıfın temelde 2 tipte öğesi vardır; field/özellik ve metotlar.
Aşağıda örnek bir sınıf tanımının söz dizimini görebilirsiniz:

class SinifAdi
{
    [Erişim Belirleyici][Veri Tipi] ÖzellikAdı;
    [Erişim Belirleyici][Geri Dönüş Değerinin Tipi] MetotAdi([Parametreler])
    {
        // Metot Gövdesi
    }
}

3. Erişim Belirleyiciler:
Erişim belirleyiciler önüne geldiği öğenin projenin nerelerinden erişilebileceğini belirler. Öğeleri korur gibi düşünebilirsiniz.

1. Public : Her yerden erişilebilir.
2. Private : Sadece tanımlandığı sınıf içerisinden erişilebilir.
3. Internal : Sadece bulunduğu proje içerisinden erişilebilir.
4. Protected : Sadece tanımlandığı sınıfta ya da o sınıfı miras alan sınıflardan erişilebilir.

İmza: Enes Öztürk
`;

  const handleDownloadFromModal = () => {
    const blob = new Blob([lessonSummaryText], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'csharp-oop-ozet-enes-ozturk.md');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyFromModal = () => {
    navigator.clipboard.writeText(lessonSummaryText);
    setModalCopied(true);
    setTimeout(() => setModalCopied(false), 2000);
  };

  const scrollToNotesOrOpenModal = () => {
    const el = document.getElementById('ozet');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setShowNotesModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white">
      {/* Top Bar */}
      <Navbar onDownloadNotes={() => setShowNotesModal(true)} />

      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* 1. Sınıf Nedir? Neden İhtiyaç Duyarız? */}
        <WhyClassesSection />

        {/* 2. Sınıf Sözdizimi Anatomisi */}
        <SyntaxAnatomySection />

        {/* 3. Canlı Sınıf & Metot Oluşturucu */}
        <ClassBuilderSection />

        {/* 4. Erişim Belirleyiciler & Canlı Simülatör */}
        <AccessModifiersSection />

        {/* 5. İnteraktif Test & Başarı Belgesi */}
        <QuizSection />

        {/* 6. Hızlı Referans & İmzalı Not Kartı */}
        <SummaryCheatSheet />
      </main>

      {/* Footer */}
      <Footer />

      {/* Quick Notes Download / Preview Modal */}
      {showNotesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  C# Ders Notları — Enes Öztürk
                </h3>
              </div>
              <button
                onClick={() => setShowNotesModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 max-h-[60vh] overflow-y-auto font-mono text-xs text-slate-800 whitespace-pre-wrap leading-relaxed bg-slate-50/50">
              {lessonSummaryText}
            </div>

            <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-t border-slate-200">
              <span className="text-xs text-slate-500 font-medium">
                İmzalı C# OOP Özeti
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyFromModal}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  {modalCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{modalCopied ? 'Kopyalandı' : 'Kopyala'}</span>
                </button>
                <button
                  onClick={handleDownloadFromModal}
                  className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Dosyayı İndir</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
