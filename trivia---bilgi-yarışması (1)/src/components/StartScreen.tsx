import React, { useState } from 'react';
import {
  Play,
  Trophy,
  Sliders,
  Sparkles,
  Zap,
  Clock,
  CheckCircle2,
  ListFilter,
  Check,
  Flame,
  Target,
  Wand2,
  Loader2,
} from 'lucide-react';
import { GameSettings, CategoryFilter, QuestionTypeFilter, DifficultyFilter, PlayerStats } from '../types/trivia';
import { CATEGORIES } from '../data/questions';
import { soundManager } from '../utils/audio';

interface StartScreenProps {
  stats: PlayerStats;
  settings: GameSettings;
  onUpdateSettings: (newSettings: Partial<GameSettings>) => void;
  onStartGame: (overrideSettings?: Partial<GameSettings>) => void;
  onStartAIGame: (topic: string) => Promise<void>;
  isLoadingAI: boolean;
}

export const StartScreen: React.FC<StartScreenProps> = ({
  stats,
  settings,
  onUpdateSettings,
  onStartGame,
  onStartAIGame,
  isLoadingAI,
}) => {
  const [showSettingsTab, setShowSettingsTab] = useState(false);
  const [aiTopicInput, setAiTopicInput] = useState('');
  const [aiError, setAiError] = useState<string | null>(null);

  const handleQuickStartDefault = () => {
    soundManager.playClick();
    // Default mode: 10 questions, True/False format as specified in the prompt:
    // "varsayılan olarak 10 soruluk, doğru yanlış şeklinde bir oyun oluşturulmalıdır"
    onStartGame({
      questionCount: 10,
      questionType: 'true_false',
      category: 'all',
      difficulty: 'all',
      timePerQuestion: 12,
    });
  };

  const handleStartCustom = () => {
    soundManager.playClick();
    onStartGame();
  };

  const handleGenerateAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiTopicInput.trim()) return;
    setAiError(null);
    try {
      soundManager.playClick();
      await onStartAIGame(aiTopicInput.trim());
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Yapay zeka soruları üretilirken bir hata oluştu.';
      setAiError(message);
    }
  };

  const suggestedAITopics = [
    'Yeşilçam Sineması',
    'Osmanlı Padişahları',
    'Olimpiyatlar ve Rekorlar',
    'Güneş Sistemi & Gezegenler',
    '90\'lar Türk Pop Müziği',
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* High Score Hero Showcase */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden mb-8 backdrop-blur-xl">
        {/* Glow ambient background */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Column: Title & Rules summary */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-semibold mb-4">
              <Zap className="w-3.5 h-3.5 fill-amber-400" />
              <span>12 Saniye • Hızlı Bilgi Yarışması</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-3">
              Bilgini Test Et, <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-indigo-400 bg-clip-text text-transparent">
                Zamana Karşı Yarış!
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-lg mb-6 leading-relaxed">
              Her soru için tam <strong>12 saniyen</strong> var. Hızlı ve doğru cevap vererek puanları topla, seriler yakala ve en yüksek skorunu egale et!
            </p>

            {/* Quick Feature Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-400 mb-8">
              <span className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>12 sn / Soru</span>
              </span>
              <span className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Doğru / Yanlış & Çoktan Seçmeli</span>
              </span>
              <span className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
                <Flame className="w-4 h-4 text-rose-400" />
                <span>Hız ve Seri Çarpanı</span>
              </span>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              {/* Default Start Button */}
              <button
                type="button"
                onClick={handleQuickStartDefault}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-base px-8 py-4 rounded-2xl shadow-xl shadow-amber-500/25 hover:scale-[1.03] active:scale-[0.98] transition group"
              >
                <Play className="w-5 h-5 fill-slate-950 group-hover:translate-x-0.5 transition-transform" />
                <span>Oyunu Başlat</span>
                <span className="text-xs font-semibold text-slate-900/80 bg-amber-400/80 px-2 py-0.5 rounded-md">
                  Varsayılan: 10 Soru D/Y
                </span>
              </button>

              {/* Customize / Settings Button */}
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setShowSettingsTab(!showSettingsTab);
                }}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm font-semibold px-6 py-4 rounded-2xl border transition ${
                  showSettingsTab
                    ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                    : 'bg-slate-900 hover:bg-slate-850 text-slate-200 border-slate-800 hover:border-slate-700'
                }`}
              >
                <Sliders className="w-4 h-4 text-amber-400" />
                <span>{showSettingsTab ? 'Ayarları Kapat' : 'Oyun Ayarlarını Belirle'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: High Score Trophy Card */}
          <div className="w-full sm:w-80 shrink-0">
            <div className="bg-slate-950/90 border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden text-center">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-amber-500/10">
                <Trophy className="w-7 h-7 fill-amber-400/20" />
              </div>

              <span className="text-xs uppercase font-bold tracking-wider text-slate-400 block mb-1">
                Sistemde Kayıtlı En Yüksek Skor
              </span>
              <div className="font-mono-numbers text-4xl sm:text-5xl font-black text-amber-400 tracking-tight my-1">
                {stats.highScore.toLocaleString('tr-TR')}
              </div>
              <p className="text-xs text-slate-500 mb-5">
                {stats.highScore > 0
                  ? 'Tebrikler! Yeni rekor için yarışmaya başla.'
                  : 'Henüz rekor belirlenmedi. İlk oyunu oyna!'}
              </p>

              {/* Sub-stats row */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-800/80 text-left">
                <div className="bg-slate-900/60 p-2 rounded-xl">
                  <span className="text-[10px] text-slate-500 block">Oyun</span>
                  <span className="font-mono-numbers font-bold text-slate-200 text-sm">
                    {stats.gamesPlayed}
                  </span>
                </div>
                <div className="bg-slate-900/60 p-2 rounded-xl">
                  <span className="text-[10px] text-slate-500 block">Doğru</span>
                  <span className="font-mono-numbers font-bold text-emerald-400 text-sm">
                    {stats.totalCorrect}
                  </span>
                </div>
                <div className="bg-slate-900/60 p-2 rounded-xl">
                  <span className="text-[10px] text-slate-500 block">En İyi Seri</span>
                  <span className="font-mono-numbers font-bold text-amber-400 text-sm">
                    {stats.bestStreak}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Game Settings Panel */}
      {showSettingsTab && (
        <div className="bg-slate-900/95 border border-slate-800 rounded-3xl p-6 sm:p-8 mb-8 shadow-2xl backdrop-blur-xl animate-fadeIn">
          <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-amber-400" />
                <h2 className="text-xl font-bold text-white">Özel Oyun Ayarları</h2>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Soruların formatını, zorluk derecesini, soru adedini ve konusunu dilediğiniz gibi belirleyin
              </p>
            </div>

            <button
              onClick={handleStartCustom}
              className="hidden sm:inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 transition"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>Bu Ayarlarla Başlat</span>
            </button>
          </div>

          <div className="space-y-6">
            {/* Setting 1: Question Format (Doğru-Yanlış / Çoktan Seçmeli / Karışık) */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                Soru Formatı
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'true_false' as QuestionTypeFilter, title: 'Doğru / Yanlış (Varsayılan)', desc: 'İki seçenekli hızlı soru turu' },
                  { id: 'multiple_choice' as QuestionTypeFilter, title: 'Çoktan Seçmeli', desc: '4 şıklı klasik test soruları' },
                  { id: 'mixed' as QuestionTypeFilter, title: 'Karışık Format', desc: 'Hem D/Y hem çoktan seçmeli' },
                ].map((type) => {
                  const isSelected = settings.questionType === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => onUpdateSettings({ questionType: type.id })}
                      className={`p-3.5 rounded-2xl border text-left transition ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-500/60 text-white ring-1 ring-amber-500/40'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-sm">{type.title}</span>
                        {isSelected && <Check className="w-4 h-4 text-amber-400" />}
                      </div>
                      <span className="text-[11px] text-slate-400 block">{type.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Setting 2: Question Count (5, 10, 15, 20) */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                Soru Sayısı
              </label>
              <div className="grid grid-cols-4 gap-2.5">
                {[5, 10, 15, 20].map((count) => {
                  const isSelected = settings.questionCount === count;
                  return (
                    <button
                      key={count}
                      type="button"
                      onClick={() => onUpdateSettings({ questionCount: count })}
                      className={`py-3 px-2 rounded-xl border text-center transition font-mono-numbers ${
                        isSelected
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <div className="text-lg font-bold">{count} Soru</div>
                      {count === 10 && <span className="text-[9px] uppercase tracking-wider text-amber-400 block">Varsayılan</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Setting 3: Difficulty (Kolay, Orta, Zor, Karışık) */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                Zorluk Seviyesi
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'all' as DifficultyFilter, label: 'Karışık (Dengeli)' },
                  { id: 'easy' as DifficultyFilter, label: 'Kolay' },
                  { id: 'medium' as DifficultyFilter, label: 'Orta' },
                  { id: 'hard' as DifficultyFilter, label: 'Zor' },
                ].map((diff) => {
                  const isSelected = settings.difficulty === diff.id;
                  return (
                    <button
                      key={diff.id}
                      type="button"
                      onClick={() => onUpdateSettings({ difficulty: diff.id })}
                      className={`py-2.5 px-3 rounded-xl border text-center text-xs font-semibold transition ${
                        isSelected
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      {diff.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Setting 4: Category / Soru Konusu */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                Soru Konusu / Kategori
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CATEGORIES.map((cat) => {
                  const isSelected = settings.category === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => onUpdateSettings({ category: cat.id })}
                      className={`p-3 rounded-xl border text-left transition flex items-center justify-between ${
                        isSelected
                          ? 'bg-indigo-500/20 border-indigo-500 text-indigo-200 ring-1 ring-indigo-500/30'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <span className="text-xs font-semibold truncate mr-2">{cat.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* AI Generator Option: Custom Trivia on Any Topic */}
            <div className="bg-gradient-to-r from-indigo-950/50 via-slate-900 to-amber-950/30 border border-indigo-900/40 rounded-2xl p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-2">
                <Wand2 className="w-4 h-4 text-indigo-400" />
                <h3 className="text-sm font-bold text-white">Yapay Zeka ile Özel Konulu Trivia Üret</h3>
                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-1.5 py-0.5 rounded font-semibold">
                  Gemini AI
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-3">
                Aklınıza gelen herhangi bir konuyu yazın (örn: Türk Rock Müziği, Antik Mısır, Marvel Sinematik Evreni) ve anında 10 özel soru üretip yarışın!
              </p>

              <form onSubmit={handleGenerateAI} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Özel bir konu yazın (Örn: Yeşilçam Filmleri)..."
                  value={aiTopicInput}
                  onChange={(e) => setAiTopicInput(e.target.value)}
                  disabled={isLoadingAI}
                  className="flex-1 bg-slate-950 border border-slate-700 focus:border-indigo-400 focus:outline-none rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500"
                />
                <button
                  type="submit"
                  disabled={isLoadingAI || !aiTopicInput.trim()}
                  className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold px-4 py-2.5 rounded-xl text-xs transition"
                >
                  {isLoadingAI ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Üretiliyor...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Konuyu Üret & Başla</span>
                    </>
                  )}
                </button>
              </form>

              {aiError && (
                <div className="text-xs text-rose-400 mt-2 bg-rose-500/10 p-2 rounded-lg border border-rose-500/20">
                  {aiError}
                </div>
              )}

              {/* Suggestion Chips */}
              <div className="flex flex-wrap items-center gap-1.5 mt-3">
                <span className="text-[10px] text-slate-500 mr-1">Öneriler:</span>
                {suggestedAITopics.map((sug) => (
                  <button
                    key={sug}
                    type="button"
                    onClick={() => setAiTopicInput(sug)}
                    className="text-[10px] bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white px-2 py-0.5 rounded-md border border-slate-800 transition"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Launch Button inside settings */}
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={handleStartCustom}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>Belirlenen Ayarlarla Oyuna Başla</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Category Grid */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ListFilter className="w-4 h-4 text-amber-400" />
            <h2 className="text-base font-bold text-white">Hızlı Kategori Seçimi</h2>
          </div>
          <span className="text-xs text-slate-400">Doğrudan kategoriyi seçip başlatabilirsiniz</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {CATEGORIES.slice(1).map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                soundManager.playClick();
                onStartGame({ category: cat.id, questionCount: 10, questionType: 'true_false' });
              }}
              className="bg-slate-900/70 hover:bg-slate-800/90 border border-slate-800 hover:border-amber-500/40 p-4 rounded-2xl text-left transition group shadow-sm"
            >
              <div className="text-sm font-bold text-slate-200 group-hover:text-amber-400 transition mb-1 flex items-center justify-between">
                <span>{cat.label}</span>
                <Play className="w-3.5 h-3.5 text-slate-600 group-hover:text-amber-400 group-hover:translate-x-0.5 transition" />
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                {cat.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
