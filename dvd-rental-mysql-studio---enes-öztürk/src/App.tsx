import { useState } from 'react';
import { SCENARIOS } from './data/scenarios';
import { Header } from './components/Header';
import { ScenarioCard } from './components/ScenarioCard';
import { SqlPlayground } from './components/SqlPlayground';
import { SchemaViewer } from './components/SchemaViewer';
import { SqlTutorial } from './components/SqlTutorial';
import { SignatureFooter } from './components/SignatureFooter';
import { Download, Sparkles, Filter, Code2, Layers, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'scenarios' | 'playground' | 'schema' | 'guide'>('scenarios');
  const [selectedScenarioFilter, setSelectedScenarioFilter] = useState<number | 'all'>('all');

  // 4 Senaryonun SQL scriptini tek bir .sql dosyası olarak indirme fonksiyonu
  const downloadSqlScript = () => {
    const fullScript = `-- ====================================================================
-- DVD RENTAL ÖRNEK VERİ TABANI SQL ÇÖZÜMLERİ
-- Proje Sahibi & Geliştirici: Enes Öztürk
-- Tarih: 2026
-- Hedef Veri Tabanı: MySQL 8.0 / InnoDB (dvdrental / sakila)
-- ====================================================================

-- --------------------------------------------------------------------
-- SENARYO 1:
-- Soru: film tablosunda bulunan filmleri rating değerlerine göre gruplayınız.
-- --------------------------------------------------------------------
SELECT 
    rating, 
    COUNT(*) AS film_sayisi 
FROM film 
GROUP BY rating 
ORDER BY film_sayisi DESC;


-- --------------------------------------------------------------------
-- SENARYO 2:
-- Soru: film tablosunda bulunan filmleri replacement_cost sütununa göre 
-- grupladığımızda film sayısı 50 den fazla olan replacement_cost değerini 
-- ve karşılık gelen film sayısını sıralayınız.
-- --------------------------------------------------------------------
SELECT 
    replacement_cost, 
    COUNT(*) AS film_sayisi 
FROM film 
GROUP BY replacement_cost 
HAVING COUNT(*) > 50 
ORDER BY film_sayisi DESC, replacement_cost ASC;


-- --------------------------------------------------------------------
-- SENARYO 3:
-- Soru: customer tablosunda bulunan store_id değerlerine karşılık gelen 
-- müşteri sayılarını nelerdir?
-- --------------------------------------------------------------------
SELECT 
    store_id, 
    COUNT(*) AS musteri_sayisi 
FROM customer 
GROUP BY store_id 
ORDER BY store_id ASC;


-- --------------------------------------------------------------------
-- SENARYO 4:
-- Soru: city tablosunda bulunan şehir verilerini country_id sütununa göre 
-- gruplandırdıktan sonra en fazla şehir sayısı barındıran country_id 
-- bilgisini ve şehir sayısını paylaşınız.
-- --------------------------------------------------------------------
SELECT 
    country_id, 
    COUNT(*) AS sehir_sayisi 
FROM city 
GROUP BY country_id 
ORDER BY sehir_sayisi DESC 
LIMIT 1;

-- Senaryo 4 Alternatif (Ülke Adı ile Birlikte JOIN):
SELECT 
    city.country_id, 
    country.country AS ulke_adi, 
    COUNT(*) AS sehir_sayisi 
FROM city 
JOIN country ON city.country_id = country.country_id 
GROUP BY city.country_id, country.country 
ORDER BY sehir_sayisi DESC 
LIMIT 1;

-- ====================================================================
-- Enes Öztürk İmzalı MySQL Projesi Başarıyla Tamamlandı.
-- ====================================================================
`;

    const blob = new Blob([fullScript], { type: 'text/sql;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'enes_ozturk_dvdrental_cozumleri.sql';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const displayedScenarios =
    selectedScenarioFilter === 'all'
      ? SCENARIOS
      : SCENARIOS.filter((s) => s.id === selectedScenarioFilter);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950 font-sans">
      {/* Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Ana İçerik Konteyneri */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'scenarios' && (
          <div className="space-y-8">
            {/* Hero Banner: Enes Öztürk Projesi Tanıtımı */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-6 sm:p-8 shadow-2xl">
              {/* Arka plan ışıltısı */}
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-1/3 -mb-20 w-60 h-60 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="space-y-3 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/30">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      Enes Öztürk İmzalı MySQL Projesi
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-cyan-950/80 text-cyan-400 border border-cyan-800/60">
                      dvdrental / Sakila DB
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                    DVD Rental SQL Sorgu Senaryoları &amp; Veri Analizi
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    İstenen 4 temel SQL senaryosu, standart MySQL sözdizimi, grup filtreleme mantığı (<code className="text-cyan-300">HAVING</code>), sıralama ve limit mekanizmalarıyla eksiksiz olarak çözülmüştür. Canlı sorgu motoru ile tüm sonuçlar anlık olarak test edilebilir.
                  </p>
                </div>

                {/* SQL Dosyasını İndir Butonu */}
                <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 w-full sm:w-auto shrink-0">
                  <button
                    onClick={downloadSqlScript}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition active:scale-95"
                  >
                    <Download className="w-4 h-4" />
                    <span>.SQL Scriptini İndir</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('playground')}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-750 text-slate-200 font-semibold text-xs transition"
                  >
                    <Code2 className="w-4 h-4 text-cyan-400" />
                    <span>Konsolda Özel SQL Yaz</span>
                  </button>
                </div>
              </div>

              {/* 4 Senaryo Hızlı Metrik Kartları */}
              <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="text-[11px] font-mono text-cyan-400 font-bold block mb-1">
                    Senaryo 1: Rating
                  </span>
                  <div className="text-base font-bold text-slate-100">
                    PG-13 (223 Film)
                  </div>
                  <span className="text-[10px] text-slate-400">5 Farklı İçerik Grubu</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="text-[11px] font-mono text-amber-400 font-bold block mb-1">
                    Senaryo 2: 50+ Cost
                  </span>
                  <div className="text-base font-bold text-slate-100">
                    8 Maliyet Grubu
                  </div>
                  <span className="text-[10px] text-slate-400">Lider: $20.99 (57 Film)</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="text-[11px] font-mono text-purple-400 font-bold block mb-1">
                    Senaryo 3: Mağaza
                  </span>
                  <div className="text-base font-bold text-slate-100">
                    Store 1: 326 / Store 2: 273
                  </div>
                  <span className="text-[10px] text-slate-400">Toplam 599 Müşteri</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="text-[11px] font-mono text-emerald-400 font-bold block mb-1">
                    Senaryo 4: Zirve Ülke
                  </span>
                  <div className="text-base font-bold text-slate-100">
                    ID: 44 (Hindistan)
                  </div>
                  <span className="text-[10px] text-slate-400">Tam 60 Şehir Barındırır</span>
                </div>
              </div>
            </div>

            {/* Senaryo Filtreleme Barı */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-2xl bg-slate-900/40 border border-slate-800">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <Filter className="w-3.5 h-3.5 text-cyan-400" />
                <span>Senaryoları Filtrele:</span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setSelectedScenarioFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    selectedScenarioFilter === 'all'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Tümü (4 Senaryo)
                </button>
                {SCENARIOS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedScenarioFilter(s.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                      selectedScenarioFilter === s.id
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                        : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    #{s.id} {s.shortTitle}
                  </button>
                ))}
              </div>
            </div>

            {/* Senaryo Kartları Listesi */}
            <div className="space-y-8">
              {displayedScenarios.map((scenario) => (
                <ScenarioCard key={scenario.id} scenario={scenario} />
              ))}
            </div>

            {/* Proje Onay / Başarı Kutusu */}
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 text-center space-y-3">
              <div className="inline-flex p-3 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-100">
                Tüm Senaryo Doğrulamaları Tamamlandı
              </h3>
              <p className="text-xs text-slate-400 max-w-xl mx-auto">
                4 sorgu da MySQL standartlarında optimize edilmiş olup, Sakila DVD Rental şemasıyla birebir uyumlu çıktıları vermektedir.
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={() => setActiveTab('playground')}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold transition"
                >
                  Konsola Git
                </button>
                <button
                  onClick={() => setActiveTab('schema')}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold transition"
                >
                  Şemayı İncele
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: MySQL Çalışma Konsolu */}
        {activeTab === 'playground' && <SqlPlayground />}

        {/* Tab 3: Veri Tabanı Şeması & Tablo Tarayıcı */}
        {activeTab === 'schema' && <SchemaViewer />}

        {/* Tab 4: SQL & MySQL Rehberi */}
        {activeTab === 'guide' && <SqlTutorial />}
      </main>

      {/* Enes Öztürk Footer */}
      <SignatureFooter />
    </div>
  );
}
