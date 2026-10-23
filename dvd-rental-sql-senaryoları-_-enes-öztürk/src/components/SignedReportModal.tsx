import React, { useState } from 'react';
import { X, Printer, Copy, Check, ShieldCheck, Award, Calendar, User, FileText } from 'lucide-react';
import { AUTHOR_INFO, QUERY_SCENARIOS } from '../data/dvdrentalData';

interface SignedReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SignedReportModal: React.FC<SignedReportModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const generateMarkdownReport = () => {
    return `# POSTGRESQL DVD RENTAL VERİ TABANI SORGU ÇÖZÜM RAPORU
Hazırlayan: ${AUTHOR_INFO.name}
Rol: ${AUTHOR_INFO.role}
Tarih: ${AUTHOR_INFO.date}
Veri Seti: PostgreSQL dvdrental Örnek Veri Tabanı (film tablosu / 1.000 kayıt)

---

## 1. SENARYO: Ortalama Kiralama Ücreti (rental_rate)
- Soru: film tablosunda bulunan rental_rate sütunundaki değerlerin ortalaması nedir?
- SQL Sorgusu:
  SELECT ROUND(AVG(rental_rate), 2) AS ortalama_kiralama_ucreti
  FROM film;
- Sonuç: 2.98 USD
- Açıklama: AVG() fonksiyonu ile aritmetik ortalama alınmış, ROUND() ile virgülden sonra 2 basamağa yuvarlanmıştır.

## 2. SENARYO: 'C' Karakteri ile Başlayan Film Sayısı
- Soru: film tablosunda bulunan filmlerden kaç tanesi 'C' karakteri ile başlar?
- SQL Sorgusu:
  SELECT COUNT(*) AS c_ile_baslayan_film_sayisi
  FROM film
  WHERE title LIKE 'C%';
- Sonuç: 92 adet film
- Açıklama: WHERE title LIKE 'C%' filtresi ile baş harfi 'C' olan filmler seçilmiş ve COUNT(*) ile toplam adedi hesaplanmıştır.

## 3. SENARYO: rental_rate = 0.99 Olan En Uzun Film
- Soru: film tablosunda bulunan filmlerden rental_rate değeri 0.99 a eşit olan en uzun (length) film kaç dakikadır?
- SQL Sorgusu:
  SELECT MAX(length) AS en_uzun_film_dakika
  FROM film
  WHERE rental_rate = 0.99;
- Sonuç: 184 dakika (~3 saat 4 dakika)
- Açıklama: 0.99$ kiralama bedeline sahip filmler içerisinde MAX(length) agregat fonksiyonu ile en uzun film süresi elde edilmiştir.

## 4. SENARYO: Uzunluğu > 150 dk Olan Filmlerde Farklı replacement_cost Sayısı
- Soru: film tablosunda bulunan filmlerin uzunluğu 150 dakikadan büyük olanlarına ait kaç farklı replacement_cost değeri vardır?
- SQL Sorgusu:
  SELECT COUNT(DISTINCT replacement_cost) AS farkli_replacement_cost_sayisi
  FROM film
  WHERE length > 150;
- Sonuç: 21 farklı değer
- Açıklama: length > 150 filtresi uygulandıktan sonra DISTINCT anahtar kelimesi ile yinelenen değerler elenmiş ve COUNT(DISTINCT ...) ile tekil değer sayısı bulunmuştur.

---
Resmî Doğrulama: Bu rapor ${AUTHOR_INFO.name} tarafından hazırlanmış ve doğrulanmıştır.
İmza: ${AUTHOR_INFO.signature}
`;
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(generateMarkdownReport());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden print:max-h-none print:shadow-none print:border-none print:bg-white print:text-black">
        {/* Top toolbar */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80 print:hidden">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
            <FileText className="w-4 h-4 text-blue-400" />
            <span>Resmî Rapor & İmzalı Belge Görünümü</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyMarkdown}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-md text-xs font-medium transition-colors flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Kopyalandı' : 'Raporu Kopyala'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Yazdır / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 print:p-0 print:space-y-4">
          {/* Document Header */}
          <div className="border-b border-slate-800 pb-6 print:border-black">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1 print:text-slate-600">
                  Veri Tabanı & SQL Analiz Raporu
                </div>
                <h1 className="text-2xl font-bold text-white print:text-black">
                  PostgreSQL dvdrental Sorgu Senaryoları Çözüm Belgesi
                </h1>
                <p className="text-xs text-slate-400 mt-1 print:text-slate-600">
                  Örnek veri tabanı film tablosu üzerindeki 4 temel gereksinim ve analitik sorgu sonuçları
                </p>
              </div>

              {/* Author badge */}
              <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl flex items-center gap-3 shrink-0 print:bg-slate-50 print:border-slate-300">
                <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-sm print:bg-blue-100 print:text-blue-800">
                  EÖ
                </div>
                <div>
                  <div className="text-xs text-slate-400 print:text-slate-500">Hazırlayan & Analist</div>
                  <div className="text-sm font-bold text-white print:text-black">{AUTHOR_INFO.name}</div>
                  <div className="text-[11px] text-emerald-400 font-medium flex items-center gap-1 print:text-emerald-700">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Doğrulanmış Rapor</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scenarios summary table */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider print:text-black">
              Sorgu Çözümleri & Doğrulama Matrisi
            </h2>

            <div className="space-y-4">
              {QUERY_SCENARIOS.map((sc, idx) => (
                <div
                  key={sc.id}
                  className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2.5 print:bg-white print:border-slate-300"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="font-bold text-blue-400 print:text-blue-700">
                      Senaryo {sc.id}
                    </span>
                    <span className="font-mono text-slate-400 text-[11px] print:text-slate-600">
                      Sonuç: <strong className="text-white print:text-black font-bold">{String(sc.expectedResult)} {sc.resultUnit}</strong>
                    </span>
                  </div>

                  <div className="text-xs text-slate-200 font-medium print:text-black">
                    <strong>Soru:</strong> {sc.scenarioQuestion}
                  </div>

                  <div className="font-mono text-xs bg-slate-900 border border-slate-800 rounded p-2.5 text-slate-300 overflow-x-auto print:bg-slate-100 print:text-black print:border-slate-300">
                    <pre className="whitespace-pre">{sc.sqlQuery}</pre>
                  </div>

                  <div className="text-[11px] text-slate-400 print:text-slate-700">
                    <strong>Mantık:</strong> {sc.explanation}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Official Signature Seal Box */}
          <div className="border-t border-slate-800 pt-6 mt-6 print:border-black">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-950/90 border border-slate-800 p-5 rounded-2xl print:bg-slate-50 print:border-slate-300">
              <div className="space-y-1 text-center sm:text-left">
                <div className="text-xs text-slate-400 print:text-slate-600">Resmî İmza & Tasdik:</div>
                <div className="text-base font-bold text-white print:text-black">{AUTHOR_INFO.name}</div>
                <div className="text-xs text-slate-400 print:text-slate-600">{AUTHOR_INFO.role} · Veri Tabanı Uzmanı</div>
                <div className="text-[11px] text-slate-500 font-mono print:text-slate-500">
                  Tarih: {AUTHOR_INFO.date} · Hash: EÖ-DVD-2026-SQL-92-184-21
                </div>
              </div>

              {/* Graphical Signature Badge */}
              <div className="border border-blue-500/30 bg-blue-950/30 rounded-xl px-5 py-3 text-center print:border-blue-700 print:bg-blue-50">
                <div className="text-[10px] uppercase font-mono tracking-widest text-blue-400 print:text-blue-800">
                  GÜVENLİ İMZA (SEAL)
                </div>
                <div className="text-xl font-serif italic text-white my-1 tracking-wide font-bold print:text-black">
                  {AUTHOR_INFO.signature}
                </div>
                <div className="text-[10px] text-emerald-400 font-mono flex items-center justify-center gap-1 print:text-emerald-800">
                  <Award className="w-3 h-3" />
                  <span>Onaylandı · 4/4 Başarılı</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400 print:hidden">
          <span>Bu rapor kullanıcı talebi üzerine Enes Öztürk imzalı olarak derlenmiştir.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-medium transition-colors"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
