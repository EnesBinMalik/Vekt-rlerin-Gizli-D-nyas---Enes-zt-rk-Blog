import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Trophy,
  Check,
  X,
  Clock,
  RotateCcw,
  Sliders,
  Home,
  Flame,
  Award,
  ChevronDown,
  ChevronUp,
  Share2,
} from 'lucide-react';
import { GameResult } from '../types/trivia';
import { CATEGORY_LABELS } from '../data/questions';
import { soundManager } from '../utils/audio';

interface ResultScreenProps {
  result: GameResult;
  highScore: number;
  onPlayAgain: () => void;
  onOpenSettings: () => void;
  onGoHome: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  result,
  highScore,
  onPlayAgain,
  onOpenSettings,
  onGoHome,
}) => {
  const [filter, setFilter] = useState<'all' | 'correct' | 'wrong'>('all');
  const [copied, setCopied] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (result.isHighScore) {
      soundManager.playFanfare();
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#38bdf8', '#10b981', '#f43f5e', '#a855f7'],
        });
      } catch {
        // ignore
      }
    } else {
      soundManager.playFanfare();
    }
  }, [result.isHighScore]);

  const handleShare = () => {
    soundManager.playClick();
    const text = `Trivia Bilgi Yarışması'nda ${result.score} puan aldım! (${result.correctCount}/${result.totalQuestions} Doğru) ⚡ Enes Öztürk İmzalı`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const filteredRecords = result.records.filter((rec) => {
    if (filter === 'correct') return rec.isCorrect;
    if (filter === 'wrong') return !rec.isCorrect;
    return true;
  });

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6">
      {/* Result Hero Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 text-center shadow-2xl relative overflow-hidden mb-6 backdrop-blur-xl">
        <div className="absolute top-0 right-1/2 translate-x-1/2 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl -z-10" />

        {result.isHighScore && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold mb-4 animate-bounce">
            <Trophy className="w-3.5 h-3.5 fill-amber-400" />
            <span>YENİ EN YÜKSEK SKOR!</span>
          </div>
        )}

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
          Oyun Tamamlandı!
        </h1>
        <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
          12 saniye kuralıyla yarıştınız. İşte performans raporunuz ve soru incelemeleriniz.
        </p>

        {/* Big Score Box */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 max-w-xs mx-auto mb-8 shadow-inner">
          <span className="text-xs uppercase font-bold tracking-wider text-slate-400 block mb-1">
            Toplam Skor
          </span>
          <div className="font-mono-numbers text-5xl font-black text-amber-400 tracking-tight">
            {result.score.toLocaleString('tr-TR')}
          </div>
          <div className="mt-2 text-xs text-slate-400 flex items-center justify-center gap-2">
            <span>En Yüksek:</span>
            <span className="font-mono-numbers font-bold text-amber-300">
              {highScore.toLocaleString('tr-TR')}
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
          <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Doğru</span>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="font-mono-numbers text-2xl font-bold text-emerald-400">
              {result.correctCount}{' '}
              <span className="text-xs text-slate-500 font-normal">/ {result.totalQuestions}</span>
            </div>
          </div>

          <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Yanlış</span>
              <X className="w-3.5 h-3.5 text-rose-400" />
            </div>
            <div className="font-mono-numbers text-2xl font-bold text-rose-400">
              {result.wrongCount}
            </div>
          </div>

          <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Süre Aşımı</span>
              <Clock className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="font-mono-numbers text-2xl font-bold text-amber-400">
              {result.timeoutCount}
            </div>
          </div>

          <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Başarı Oranı</span>
              <Award className="w-3.5 h-3.5 text-sky-400" />
            </div>
            <div className="font-mono-numbers text-2xl font-bold text-sky-400">
              %{result.accuracy}
            </div>
          </div>
        </div>

        {/* Secondary Details */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-around gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>En İyi Seri: </span>
            <strong className="text-white font-mono-numbers">{result.bestStreak} Soru</strong>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-slate-400" />
            <span>Ortalama Cevap Süresi: </span>
            <strong className="text-white font-mono-numbers">{result.averageTime} sn</strong>
          </div>
          <div className="flex items-center gap-1.5">
            <Award className="w-4 h-4 text-indigo-400" />
            <span>Format: </span>
            <strong className="text-white">
              {result.settings.questionType === 'true_false'
                ? 'Doğru / Yanlış'
                : result.settings.questionType === 'multiple_choice'
                ? 'Çoktan Seçmeli'
                : 'Karışık'}
            </strong>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onPlayAgain();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-6 py-3 rounded-xl shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Tekrar Oyna</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onOpenSettings();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold px-5 py-3 rounded-xl border border-slate-700 hover:border-slate-600 transition"
          >
            <Sliders className="w-4 h-4 text-amber-400" />
            <span>Ayarları Değiştir</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onGoHome();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-semibold px-4 py-3 rounded-xl border border-slate-800 transition"
          >
            <Home className="w-4 h-4" />
            <span>Ana Sayfa</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-semibold px-4 py-3 rounded-xl border border-slate-800 transition"
          >
            <Share2 className="w-4 h-4 text-sky-400" />
            <span>{copied ? 'Kopyalandı!' : 'Skoru Paylaş'}</span>
          </button>
        </div>
      </div>

      {/* Question By Question Detailed Review */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-white">Soru & Cevap Detayları</h2>
            <p className="text-xs text-slate-400">
              Yarışmadaki tüm soruları, verdiğiniz cevapları ve açıklamaları inceleyin
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-lg font-medium transition ${
                filter === 'all' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Tümü ({result.totalQuestions})
            </button>
            <button
              onClick={() => setFilter('correct')}
              className={`px-3 py-1 rounded-lg font-medium transition ${
                filter === 'correct' ? 'bg-emerald-950/80 text-emerald-300 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Doğru ({result.correctCount})
            </button>
            <button
              onClick={() => setFilter('wrong')}
              className={`px-3 py-1 rounded-lg font-medium transition ${
                filter === 'wrong' ? 'bg-rose-950/80 text-rose-300 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Yanlış ({result.wrongCount})
            </button>
          </div>
        </div>

        {/* Questions list */}
        <div className="space-y-3">
          {filteredRecords.map((rec, index) => {
            const isExpanded = expandedId === rec.questionId || (filteredRecords.length <= 5);
            const categoryName = CATEGORY_LABELS[rec.category] || 'Genel';

            return (
              <div
                key={rec.questionId || index}
                className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 transition-all duration-200"
              >
                <div
                  className="flex items-start justify-between gap-3 cursor-pointer select-none"
                  onClick={() => setExpandedId(isExpanded && filteredRecords.length > 5 ? null : rec.questionId)}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                        rec.isCorrect
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}
                    >
                      {rec.isCorrect ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-semibold text-slate-400">
                          Soru {index + 1}
                        </span>
                        <span className="text-[11px] text-slate-500">•</span>
                        <span className="text-[11px] text-slate-400">{categoryName}</span>
                        {rec.timedOut && (
                          <span className="text-[10px] font-bold text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-500/20">
                            Süre Doldu
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm font-semibold text-slate-200 leading-snug">
                        {rec.questionText}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-mono-numbers text-xs font-bold text-amber-300">
                      +{rec.pointsEarned}p
                    </span>
                    {filteredRecords.length > 5 && (
                      <button className="text-slate-400 p-1">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-slate-900 text-xs space-y-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className="bg-slate-900/60 p-2.5 rounded-lg">
                        <span className="text-slate-500 block mb-0.5">Sizin Cevabınız:</span>
                        <span
                          className={`font-semibold ${
                            rec.isCorrect ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {rec.userAnswer ? rec.userAnswer : 'Cevap Verilmedi (Süre Doldu)'}
                        </span>
                      </div>
                      <div className="bg-slate-900/60 p-2.5 rounded-lg">
                        <span className="text-slate-500 block mb-0.5">Doğru Cevap:</span>
                        <span className="font-semibold text-emerald-400">{rec.correctAnswer}</span>
                      </div>
                    </div>

                    {rec.explanation && (
                      <div className="text-slate-400 bg-slate-900/30 p-2.5 rounded-lg leading-relaxed">
                        <strong className="text-amber-300 font-semibold mr-1">Açıklama:</strong>
                        {rec.explanation}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
