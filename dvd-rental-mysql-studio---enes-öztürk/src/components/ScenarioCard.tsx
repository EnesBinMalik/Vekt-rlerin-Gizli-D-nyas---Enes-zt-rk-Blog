import React, { useState, useEffect } from 'react';
import { Play, CheckCircle, HelpCircle, Table as TableIcon, Zap, Lightbulb, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Scenario } from '../data/scenarios';
import { dvdRentalDb, QueryResult } from '../services/db';
import { SqlCodeViewer } from './SqlCodeViewer';
import {
  RatingVisualizer,
  ReplacementCostVisualizer,
  StoreVisualizer,
  CountryVisualizer,
} from './Visualizers';

interface ScenarioCardProps {
  scenario: Scenario;
}

export const ScenarioCard: React.FC<ScenarioCardProps> = ({ scenario }) => {
  const [activeQueryType, setActiveQueryType] = useState<'standard' | 'alternative'>('standard');
  const [activeDetailTab, setActiveDetailTab] = useState<'syntax' | 'interview' | 'summary'>('syntax');
  const [result, setResult] = useState<QueryResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const currentSql = activeQueryType === 'standard' || !scenario.alternativeQuery
    ? scenario.sqlQuery
    : scenario.alternativeQuery;

  // İlk yüklemede sorguyu otomatik çalıştırarak hazır sonuç sun
  useEffect(() => {
    executeCurrentQuery(false);
  }, [scenario.id, activeQueryType]);

  const executeCurrentQuery = (triggerConfetti = true) => {
    setIsRunning(true);
    setTimeout(() => {
      const res = dvdRentalDb.runQuery(currentSql);
      setResult(res);
      setIsRunning(false);

      if (triggerConfetti && !res.error) {
        confetti({
          particleCount: 25,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#06b6d4', '#3b82f6', '#10b981'],
        });
      }
    }, 100);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm overflow-hidden shadow-xl transition-all hover:border-slate-700/80 mb-8">
      {/* Kart Başlık Bölümü */}
      <div className="p-5 sm:p-6 border-b border-slate-800 bg-slate-900/60">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-black font-mono">
              #{scenario.id}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
              {scenario.category}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-blue-950/60 text-blue-300 border border-blue-800/40">
              Tablo: {scenario.targetTable}
            </span>
          </div>

          <div className="text-xs font-semibold text-emerald-400 bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-800/40 flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>{scenario.highlightMetricLabel}</span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-slate-100 mb-2">
          {scenario.title}
        </h3>

        {/* Orijinal Soru Metni */}
        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300 text-xs sm:text-sm font-medium flex items-start gap-2.5">
          <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-slate-400 font-semibold block text-[11px] uppercase tracking-wider mb-0.5">
              İstenen Senaryo:
            </span>
            <span>&ldquo;{scenario.question}&rdquo;</span>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6 space-y-6">
        {/* Sorgu Seçici & Çalıştırıcı */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 p-1 rounded-lg bg-slate-950 border border-slate-800 text-xs">
              <button
                onClick={() => setActiveQueryType('standard')}
                className={`px-3 py-1.5 rounded-md font-medium transition ${
                  activeQueryType === 'standard'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Standart MySQL Çözümü
              </button>

              {scenario.alternativeQuery && (
                <button
                  onClick={() => setActiveQueryType('alternative')}
                  className={`px-3 py-1.5 rounded-md font-medium transition ${
                    activeQueryType === 'alternative'
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Gelişmiş / JOIN Alternatifi
                </button>
              )}
            </div>

            <button
              onClick={() => executeCurrentQuery(true)}
              disabled={isRunning}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-xs shadow-lg shadow-cyan-500/20 transition active:scale-95 disabled:opacity-50"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isRunning ? 'Çalıştırılıyor...' : 'Sorguyu Çalıştır'}</span>
            </button>
          </div>

          {/* MySQL Kod Editörü */}
          <SqlCodeViewer
            code={currentSql}
            title={`MySQL 8.0 — ${scenario.shortTitle}`}
            onRun={() => executeCurrentQuery(true)}
            isRunning={isRunning}
          />
        </div>

        {/* Çalışma Sonuçları ve Tablo */}
        {result && (
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <TableIcon className="w-4 h-4 text-cyan-400" />
                <span>Sorgu Çıktısı (Query Result)</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="text-slate-400">
                  Satır: <strong className="text-slate-200">{result.rowCount}</strong>
                </span>
                <span className="text-slate-700">•</span>
                <span className="text-slate-400 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-400" />
                  Süre: <strong className="text-emerald-400">{result.executionTimeMs} ms</strong>
                </span>
              </div>
            </div>

            {/* Sonuç Tablosu */}
            <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950/70 shadow-inner">
              <div className="overflow-x-auto max-h-72">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 border-b border-slate-800 sticky top-0 z-10 text-slate-300 font-semibold font-mono">
                    <tr>
                      <th className="py-2.5 px-4 w-12 text-slate-500 text-center">#</th>
                      {result.columns.map((col) => (
                        <th key={col} className="py-2.5 px-4 text-cyan-400">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
                    {result.rows.map((row, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-slate-900/60 transition-colors odd:bg-slate-950/30"
                      >
                        <td className="py-2 px-4 text-slate-600 text-center text-[11px]">
                          {idx + 1}
                        </td>
                        {result.columns.map((col) => {
                          const val = row[col];
                          const isNumeric = typeof val === 'number';
                          return (
                            <td
                              key={col}
                              className={`py-2 px-4 ${
                                isNumeric ? 'text-emerald-300 font-semibold' : 'text-slate-200'
                              }`}
                            >
                              {val !== null && val !== undefined ? String(val) : 'NULL'}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Görselleştirme Grafiği */}
            {result.rows.length > 0 && (
              <div className="mt-4">
                {scenario.id === 1 && (
                  <RatingVisualizer data={result.rows as any} />
                )}
                {scenario.id === 2 && (
                  <ReplacementCostVisualizer data={result.rows as any} />
                )}
                {scenario.id === 3 && (
                  <StoreVisualizer data={result.rows as any} />
                )}
                {scenario.id === 4 && (
                  <CountryVisualizer data={result.rows as any} />
                )}
              </div>
            )}
          </div>
        )}

        {/* Detaylı Açıklama & Mülakat Rehberi Sekmeleri */}
        <div className="mt-6 pt-5 border-t border-slate-800">
          <div className="flex items-center gap-2 mb-4 border-b border-slate-800/80 pb-2 text-xs">
            <button
              onClick={() => setActiveDetailTab('syntax')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
                activeDetailTab === 'syntax'
                  ? 'bg-slate-800 text-cyan-400 border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Sözdizimi ve Mantık Analizi</span>
            </button>

            <button
              onClick={() => setActiveDetailTab('interview')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
                activeDetailTab === 'interview'
                  ? 'bg-slate-800 text-amber-400 border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Mülakat Notu &amp; Kritik Fark</span>
            </button>

            <button
              onClick={() => setActiveDetailTab('summary')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
                activeDetailTab === 'summary'
                  ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Sonuç &amp; Değerlendirme</span>
            </button>
          </div>

          {/* Sekme 1: Sözdizimi Analizi */}
          {activeDetailTab === 'syntax' && (
            <div className="space-y-3 text-xs leading-relaxed">
              <p className="text-slate-300">{scenario.explanation}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mt-3">
                {scenario.syntaxBreakdown.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 font-mono"
                  >
                    <div className="text-cyan-400 font-bold mb-1">{item.clause}</div>
                    <div className="text-slate-400 font-sans text-[11px]">
                      {item.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sekme 2: Mülakat Notu */}
          {activeDetailTab === 'interview' && (
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <Lightbulb className="w-4 h-4" />
                <span>Teknik Mülakat &amp; SQL Mimari İpucu</span>
              </div>
              <p className="text-slate-300 leading-relaxed font-medium">
                {scenario.interviewTip}
              </p>
            </div>
          )}

          {/* Sekme 3: Sonuç Çıkarımı */}
          {activeDetailTab === 'summary' && (
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <CheckCircle className="w-4 h-4" />
                <span>Veri Tabanı Analiz Özeti</span>
              </div>
              <p className="text-slate-300 leading-relaxed font-medium">
                {scenario.keyTakeaway}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
