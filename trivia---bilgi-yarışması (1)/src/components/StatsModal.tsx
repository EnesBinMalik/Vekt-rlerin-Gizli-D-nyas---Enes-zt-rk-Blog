import React from 'react';
import { X, Trophy, CheckCircle2, Clock, Flame, Award, Calendar } from 'lucide-react';
import { GameResult, PlayerStats } from '../types/trivia';
import { CATEGORY_LABELS } from '../data/questions';

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: PlayerStats;
  history: GameResult[];
  onClearHistory?: () => void;
}

export const StatsModal: React.FC<StatsModalProps> = ({
  isOpen,
  onClose,
  stats,
  history,
}) => {
  if (!isOpen) return null;

  const totalAnswered = stats.totalQuestions;
  const overallAccuracy = totalAnswered > 0 ? Math.round((stats.totalCorrect / totalAnswered) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center">
              <Trophy className="w-5 h-5 fill-sky-400/20" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">İstatistikler & Skor Geçmişi</h2>
              <p className="text-xs text-slate-400">Tüm oturumlarınız cihazınızda güvenle saklanır</p>
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
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4">
              <span className="text-[11px] font-semibold text-slate-400 block mb-1">En Yüksek Skor</span>
              <div className="font-mono-numbers text-2xl font-black text-amber-400">
                {stats.highScore.toLocaleString('tr-TR')}
              </div>
            </div>

            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4">
              <span className="text-[11px] font-semibold text-slate-400 block mb-1">Oynanan Oyun</span>
              <div className="font-mono-numbers text-2xl font-bold text-slate-100">
                {stats.gamesPlayed}
              </div>
            </div>

            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4">
              <span className="text-[11px] font-semibold text-slate-400 block mb-1">Genel İsabet</span>
              <div className="font-mono-numbers text-2xl font-bold text-emerald-400">
                %{overallAccuracy}
              </div>
              <span className="text-[10px] text-slate-500">{stats.totalCorrect}/{stats.totalQuestions} Doğru</span>
            </div>

            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4">
              <span className="text-[11px] font-semibold text-slate-400 block mb-1">En İyi Seri</span>
              <div className="font-mono-numbers text-2xl font-bold text-rose-400 flex items-center gap-1">
                <Flame className="w-4 h-4 fill-rose-400" />
                <span>{stats.bestStreak}</span>
              </div>
            </div>
          </div>

          {/* History List */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>Son Oyun Geçmişi ({history.length})</span>
            </h3>

            {history.length === 0 ? (
              <div className="text-center py-8 bg-slate-950/40 rounded-2xl border border-slate-800/80">
                <Clock className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <p className="text-sm text-slate-400 font-medium">Henüz kayıtlı oyun geçmişi yok.</p>
                <p className="text-xs text-slate-500 mt-1">Hemen bir oyun başlatarak ilk skorunuzu kaydedin!</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {history.map((item, idx) => {
                  const catLabel = CATEGORY_LABELS[item.settings.category] || 'Tüm Konular';
                  const dateStr = new Date(item.date).toLocaleDateString('tr-TR', {
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  });

                  return (
                    <div
                      key={item.id || idx}
                      className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 flex items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-semibold text-slate-200">{catLabel}</span>
                          <span className="text-slate-600">•</span>
                          <span className="text-[10px] text-slate-400">
                            {item.settings.questionType === 'true_false' ? 'D/Y' : 'Test'} ({item.totalQuestions} Soru)
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-500">{dateStr}</span>
                      </div>

                      <div className="flex items-center gap-4 text-right">
                        <div>
                          <div className="font-mono-numbers font-bold text-amber-400 text-sm">
                            {item.score.toLocaleString('tr-TR')} Puan
                          </div>
                          <span className="text-[11px] text-emerald-400 font-medium">
                            {item.correctCount}/{item.totalQuestions} Doğru (%{item.accuracy})
                          </span>
                        </div>

                        {item.isHighScore && (
                          <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0" title="En Yüksek Skor">
                            <Trophy className="w-3.5 h-3.5 fill-amber-400" />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs text-slate-500">
          <span>Enes Öztürk İmzalı Trivia Sistemi</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
