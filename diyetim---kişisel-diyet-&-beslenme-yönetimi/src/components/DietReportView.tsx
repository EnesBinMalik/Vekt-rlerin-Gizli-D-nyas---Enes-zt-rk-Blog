import React, { useState, useMemo } from 'react';
import {
  FileText,
  Printer,
  TrendingUp,
  PieChart,
  Award,
  Calendar,
  CheckCircle2,
  Droplets,
  Flame,
  ShieldCheck,
  Sparkles,
  UtensilsCrossed,
} from 'lucide-react';
import { DailyLogEntry, DietProgram, FoodCategory } from '../types/diet';
import { generateDietReport } from '../utils/nutritionCalculations';
import { CATEGORY_LABELS } from '../data/foodDatabase';

interface DietReportViewProps {
  logs: DailyLogEntry[];
  activeProgram: DietProgram;
}

export const DietReportView: React.FC<DietReportViewProps> = ({ logs, activeProgram }) => {
  const [selectedRange, setSelectedRange] = useState<'7' | '14' | '30' | 'all'>('7');

  // Filter logs according to range
  const filteredLogs = useMemo(() => {
    if (selectedRange === 'all') return logs;
    const days = parseInt(selectedRange, 10);
    return logs.slice(0, days);
  }, [logs, selectedRange]);

  const report = useMemo(() => {
    return generateDietReport(
      filteredLogs,
      activeProgram.targetCalories || 2000,
      activeProgram.targetWaterLiters || 2.5
    );
  }, [filteredLogs, activeProgram]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Controls Banner (Hidden in Print) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4 no-print">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-1">
            <Award className="w-4 h-4" />
            Enes Öztürk İmzalı Bütünsel Beslenme Raporu
          </div>
          <h2 className="text-xl font-bold text-slate-900">Diyet Analizi & Yemek Alışkanlıkları Raporu</h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Tükettiğiniz besin değerleri, ağırlıklı tercih ettiğiniz besin grupları ve beslenme alışkanlığınızın detaylı özet incelemesi.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Range Selector */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-medium">
            <button
              onClick={() => setSelectedRange('7')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                selectedRange === '7' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Son 7 Gün
            </button>
            <button
              onClick={() => setSelectedRange('14')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                selectedRange === '14' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Son 14 Gün
            </button>
            <button
              onClick={() => setSelectedRange('30')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                selectedRange === '30' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Son 30 Gün
            </button>
            <button
              onClick={() => setSelectedRange('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                selectedRange === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tümü ({logs.length})
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors shadow-xs inline-flex items-center gap-1.5"
            title="Raporu Yazdır veya PDF olarak kaydet"
          >
            <Printer className="w-3.5 h-3.5" />
            Raporu Yazdır
          </button>
        </div>
      </div>

      {/* Printable Report Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-medium mb-3 border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Resmi Beslenme & Diyet Analiz Belgesi
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Bütünsel Diyet & Tercih Raporu
            </h1>
            <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Bu rapor, kullanıcının kayıtlı öğün geçmişi, tüketilen toplam ve ortalama besin değerleri ile ağırlıklı besin grubu tercihleri doğrultusunda derlenmiştir.
            </p>
          </div>

          {/* Enes Öztürk Signature Stamp */}
          <div className="bg-white/10 backdrop-blur-xs p-4 rounded-xl border border-white/20 text-right shrink-0">
            <span className="text-[10px] text-emerald-400 font-mono tracking-widest uppercase block">
              DİYET VE SAĞLIK SİSTEMİ
            </span>
            <div className="text-lg font-extrabold text-white tracking-wide mt-0.5">
              ENES ÖZTÜRK
            </div>
            <div className="text-xs text-slate-300 mt-1 italic">
              İmzalı Uzman Metodolojisi
            </div>
            <div className="text-[11px] font-mono text-slate-400 mt-2 border-t border-white/10 pt-1 tabular-nums">
              Rapor Dönemi: {report.daysCount} Gün
            </div>
          </div>
        </div>
      </div>

      {/* Top Aggregate Cards: Totals and Averages */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* Calories */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Kalori</span>
            <Flame className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-lg font-bold font-mono text-slate-900 tabular-nums">
            {report.totalCalories.toLocaleString('tr-TR')}{' '}
            <span className="text-[11px] text-slate-400 font-sans font-normal">toplam</span>
          </div>
          <div className="text-xs font-mono font-semibold text-emerald-600 mt-1 tabular-nums">
            Ort. {report.avgCalories} kcal/gün
          </div>
        </div>

        {/* Protein */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Protein</span>
            <span className="text-rose-600 font-bold">%4 kcal/g</span>
          </div>
          <div className="text-lg font-bold font-mono text-slate-900 tabular-nums">
            {report.totalProtein}{' '}
            <span className="text-[11px] text-slate-400 font-sans font-normal">g toplam</span>
          </div>
          <div className="text-xs font-mono font-semibold text-rose-600 mt-1 tabular-nums">
            Ort. {report.avgProtein} g/gün
          </div>
        </div>

        {/* Carbs */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Karbonhidrat</span>
            <span className="text-amber-600 font-bold">%4 kcal/g</span>
          </div>
          <div className="text-lg font-bold font-mono text-slate-900 tabular-nums">
            {report.totalCarbs}{' '}
            <span className="text-[11px] text-slate-400 font-sans font-normal">g toplam</span>
          </div>
          <div className="text-xs font-mono font-semibold text-amber-600 mt-1 tabular-nums">
            Ort. {report.avgCarbs} g/gün
          </div>
        </div>

        {/* Fat */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Sağlıklı Yağ</span>
            <span className="text-violet-600 font-bold">%9 kcal/g</span>
          </div>
          <div className="text-lg font-bold font-mono text-slate-900 tabular-nums">
            {report.totalFat}{' '}
            <span className="text-[11px] text-slate-400 font-sans font-normal">g toplam</span>
          </div>
          <div className="text-xs font-mono font-semibold text-violet-600 mt-1 tabular-nums">
            Ort. {report.avgFat} g/gün
          </div>
        </div>

        {/* Fiber */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Diyet Lifi</span>
            <span className="text-emerald-600 font-bold">Lif</span>
          </div>
          <div className="text-lg font-bold font-mono text-slate-900 tabular-nums">
            {report.totalFiber}{' '}
            <span className="text-[11px] text-slate-400 font-sans font-normal">g toplam</span>
          </div>
          <div className="text-xs font-mono font-semibold text-emerald-600 mt-1 tabular-nums">
            Ort. {report.avgFiber} g/gün
          </div>
        </div>

        {/* Water */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Sıvı / Su</span>
            <Droplets className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-lg font-bold font-mono text-slate-900 tabular-nums">
            {report.totalWaterLiters}{' '}
            <span className="text-[11px] text-slate-400 font-sans font-normal">L toplam</span>
          </div>
          <div className="text-xs font-mono font-semibold text-sky-600 mt-1 tabular-nums">
            Ort. {report.avgWaterLiters} L/gün
          </div>
        </div>
      </div>

      {/* Dominant Food Group Preferences & Habit Summary (KEY USER REQUIREMENT) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Dominant Food Group Analysis Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <PieChart className="w-4 h-4 text-emerald-600" />
                Ağırlıklı Tercih Edilen Besin Grupları
              </h3>
              {report.dominantCategory && (
                <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-200">
                  Lider: {report.dominantCategory.nameTr} (%{report.dominantCategory.portionShare})
                </span>
              )}
            </div>

            <p className="text-xs text-slate-600 mb-5 leading-relaxed">
              Kayıtlı öğünleriniz taranarak hangi besin grubunu ne sıklıkla tercih ettiğiniz oransal olarak hesaplanmıştır.
            </p>

            {/* Visual Distribution Bar */}
            <div className="h-4 w-full rounded-full overflow-hidden flex bg-slate-100 mb-6">
              {report.foodGroupStats.map(stat => (
                <div
                  key={stat.category}
                  className="h-full transition-all"
                  style={{
                    width: `${stat.portionShare}%`,
                    backgroundColor: stat.color,
                  }}
                  title={`${stat.nameTr}: %${stat.portionShare}`}
                />
              ))}
            </div>

            {/* Food Group Breakdown List */}
            <div className="space-y-3">
              {report.foodGroupStats.map(stat => (
                <div key={stat.category} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: stat.color }}
                    />
                    <span className="font-semibold text-slate-800">{stat.nameTr}</span>
                    <span className="text-slate-400 font-mono">({stat.count} porsiyon)</span>
                  </div>

                  <div className="flex items-center gap-3 font-mono tabular-nums">
                    <span className="text-slate-500">{stat.calories} kcal</span>
                    <span className="font-bold text-slate-900 w-12 text-right">
                      %{stat.portionShare}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500">
            Enes Öztürk Kuralı: Dengeli bir tabakta sebzelerin payı minimum %30, protein kaynaklarının payı ise %25-30 bandında olmalıdır.
          </div>
        </div>

        {/* Top 5 Most Consumed Foods & Macro Ratio */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-3">
              <UtensilsCrossed className="w-4 h-4 text-emerald-600" />
              En Sık Tüketilen 5 Besin
            </h3>
            <p className="text-xs text-slate-600 mb-4">
              Geçmiş öğünlerinizde en çok tercih ettiğiniz favori yemekler ve toplam kalori katkıları:
            </p>

            <div className="space-y-2.5">
              {report.topFoods.map((f, idx) => (
                <div
                  key={f.name}
                  className="p-3 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 font-mono font-bold flex items-center justify-center text-[10px]">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="font-semibold text-slate-900">{f.name}</div>
                      <div className="text-[11px] text-slate-500">
                        {CATEGORY_LABELS[f.category]?.label || 'Besin'}
                      </div>
                    </div>
                  </div>

                  <div className="text-right font-mono tabular-nums">
                    <div className="font-bold text-slate-900">{f.count} kez tüketildi</div>
                    <div className="text-[11px] text-emerald-600">{f.totalCalories} kcal katkı</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Macro Energy Ratios */}
            <div className="mt-5 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold text-slate-800">Enerji Dağılımı (Makro Oranları)</span>
                <span className="text-slate-400 font-mono">100% Toplam</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono tabular-nums">
                <div className="bg-rose-50 p-2 rounded-lg border border-rose-100">
                  <span className="text-[10px] text-rose-700 block font-sans">Protein</span>
                  <span className="font-bold text-rose-800">%{report.macroRatios.proteinPct}</span>
                </div>
                <div className="bg-amber-50 p-2 rounded-lg border border-amber-100">
                  <span className="text-[10px] text-amber-700 block font-sans">Karbonhidrat</span>
                  <span className="font-bold text-amber-800">%{report.macroRatios.carbsPct}</span>
                </div>
                <div className="bg-violet-50 p-2 rounded-lg border border-violet-100">
                  <span className="text-[10px] text-violet-700 block font-sans">Yağ</span>
                  <span className="font-bold text-violet-800">%{report.macroRatios.fatPct}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Hedefe Uyum Başarısı:</span>
            <span className="font-bold font-mono text-emerald-600">
              {report.goalComplianceScore} / 100 Puan
            </span>
          </div>
        </div>
      </div>

      {/* Official Enes Öztürk Dietitian Assessment & Recommendations */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-emerald-200 shadow-sm relative">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Enes Öztürk Beslenme Alışkanlığı Özeti & Değerlendirmesi
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                Kişiselleştirilmiş Bütünsel Değerlendirme ve Eylem Planı
              </p>
            </div>
          </div>

          <div className="hidden sm:block text-right">
            <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-600 font-semibold block">
              Onaylı Rapor
            </span>
            <span className="text-xs font-semibold text-slate-800 italic">
              Enes Öztürk İmzasıyla
            </span>
          </div>
        </div>

        {/* Narrative assessment */}
        <div className="bg-emerald-50/40 p-4 rounded-xl border border-emerald-100 text-sm text-slate-800 leading-relaxed mb-5">
          {report.habitSummary}
        </div>

        {/* Key Recommendations */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Dikkate Alınması Gereken Öncelikli Tavsiyeler:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {report.recommendations.map((rec, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/60 text-xs text-slate-700 leading-relaxed flex items-start gap-2.5"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{rec}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Signature Box */}
        <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            <p>Rapor Oluşturulma Tarihi: {new Date().toLocaleDateString('tr-TR')}</p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Diyetim Sağlık ve Beslenme Yönetim Platformu © 2026
            </p>
          </div>

          <div className="text-left sm:text-right">
            <div className="font-serif italic text-xl font-bold text-emerald-800 tracking-wider">
              Enes Öztürk
            </div>
            <div className="text-[11px] uppercase tracking-wider text-slate-500 font-mono">
              Bütünsel Beslenme Sistemleri Lideri
            </div>
          </div>
        </div>
      </div>

      {/* Historical Logs Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-600" />
            Günlük Yemek Geçmişi Kayıtları
          </h3>
          <span className="text-xs font-mono text-slate-500">
            {filteredLogs.length} Gün Kayıtlı
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
              <tr>
                <th className="py-3 px-4">Tarih</th>
                <th className="py-3 px-4">Toplam Kalori</th>
                <th className="py-3 px-4">Protein (g)</th>
                <th className="py-3 px-4">Karb (g)</th>
                <th className="py-3 px-4">Yağ (g)</th>
                <th className="py-3 px-4">Lif (g)</th>
                <th className="py-3 px-4">Su (Bardak)</th>
                <th className="py-3 px-4">Ruh Hali / Not</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono tabular-nums">
              {filteredLogs.map(log => {
                let dayKcal = 0;
                let dayP = 0;
                let dayC = 0;
                let dayF = 0;
                let dayFiber = 0;

                Object.values(log.meals).forEach(items => {
                  items.forEach(it => {
                    dayKcal += it.calories;
                    dayP += it.protein;
                    dayC += it.carbs;
                    dayF += it.fat;
                    dayFiber += it.fiber;
                  });
                });

                return (
                  <tr key={log.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4 font-sans font-semibold text-slate-900">
                      {new Date(log.date).toLocaleDateString('tr-TR', {
                        day: '2-digit',
                        month: 'short',
                        weekday: 'short',
                      })}
                    </td>
                    <td className="py-3 px-4 font-bold text-emerald-600">
                      {Math.round(dayKcal)} kcal
                    </td>
                    <td className="py-3 px-4 text-rose-600">{Math.round(dayP * 10) / 10}</td>
                    <td className="py-3 px-4 text-amber-600">{Math.round(dayC * 10) / 10}</td>
                    <td className="py-3 px-4 text-violet-600">{Math.round(dayF * 10) / 10}</td>
                    <td className="py-3 px-4 text-emerald-600">{Math.round(dayFiber * 10) / 10}</td>
                    <td className="py-3 px-4 text-sky-600">{log.waterGlasses} bdk</td>
                    <td className="py-3 px-4 font-sans text-slate-500 max-w-xs truncate">
                      {log.notes || (log.feeling ? `Durum: ${log.feeling}` : '-')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
