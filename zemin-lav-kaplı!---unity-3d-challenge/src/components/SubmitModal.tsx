import React, { useState } from 'react';
import { X, Award, Check, Sparkles, Send, Download } from 'lucide-react';
import { CommunitySubmission, LevelData } from '../types';
import { soundManager } from '../audio/soundManager';

interface SubmitModalProps {
  currentLevel: LevelData;
  onSubmit: (submission: CommunitySubmission) => void;
  onClose: () => void;
}

export const SubmitModal: React.FC<SubmitModalProps> = ({
  currentLevel,
  onSubmit,
  onClose,
}) => {
  const [authorName, setAuthorName] = useState('Enes Öztürk');
  const [title, setTitle] = useState(currentLevel.title);
  const [difficulty, setDifficulty] = useState(currentLevel.difficulty);
  const [description, setDescription] = useState(
    'Unity Learn Zemin Lav Kaplı Challenge ödevim. İlkel objeler ve RigidBody fizik özellikleri kullanılarak topun lav zeminine temas etmeden ilerleyeceği bir parkur tasarlandı.'
  );
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playVictory();

    const newSubmission: CommunitySubmission = {
      id: `sub-${Date.now()}`,
      title,
      author: authorName,
      date: new Date().toISOString().split('T')[0],
      difficulty,
      description,
      likes: 1,
      objectsCount: currentLevel.objects.length,
      verified: true,
      levelData: {
        ...currentLevel,
        title,
        author: authorName,
        difficulty,
        description,
      },
    };

    onSubmit(newSubmission);
    setIsSubmitted(true);
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(currentLevel, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute('href', dataStr);
    dlAnchorElem.setAttribute('download', `${title.replace(/\s+/g, '_')}_UnityScene.json`);
    dlAnchorElem.click();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-zinc-900 border border-zinc-700/80 rounded-2xl max-w-lg w-full shadow-2xl text-zinc-200 text-xs">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-zinc-950/80 border-b border-zinc-800 rounded-t-2xl">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Aşama 3: Ödevini Gönder</h2>
              <div className="text-[11px] text-zinc-400">Unity Learn Topluluğu İncelemesi</div>
            </div>
          </div>
          <button onClick={onClose} className="p-1 hover:text-white text-zinc-400 rounded-md">
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/50 rounded-full flex items-center justify-center mx-auto text-emerald-400">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-white">Ödevin Başarıyla Gönderildi!</h3>
            <p className="text-xs text-zinc-300">
              Tebrikler <strong>{authorName}</strong>! Parkur tasarımın kaydedildi ve Topluluk Galerisine eklendi.
            </p>
            <div className="flex gap-2 justify-center pt-2">
              <button
                onClick={handleExportJson}
                className="flex items-center gap-1.5 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg text-xs"
              >
                <Download className="w-3.5 h-3.5 text-sky-400" />
                <span>Unity Sahne JSON İndir</span>
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg text-xs"
              >
                Tamam
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-center gap-2 text-amber-200">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                Bu ödev teslimi <strong>Enes Öztürk</strong> imzası ve onay mührü ile kaydedilecektir.
              </span>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-zinc-300 block mb-1">
                Öğrenci / Tasarımcı Adı
              </label>
              <input
                type="text"
                required
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-zinc-100 outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-zinc-300 block mb-1">
                Parkur Başlığı
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-zinc-100 outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-zinc-300 block mb-1">
                  Zorluk Derecesi
                </label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as any)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-zinc-100 outline-none"
                >
                  <option value="Kolay">Kolay</option>
                  <option value="Orta">Orta</option>
                  <option value="Zor">Zor</option>
                  <option value="Uzman">Uzman</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-zinc-300 block mb-1">
                  İlkel Obje Sayısı
                </label>
                <div className="bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-zinc-400">
                  {currentLevel.objects.length} Adet GameObject
                </div>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-zinc-300 block mb-1">
                Ödev Açıklaması & Notlar
              </label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-2 text-xs text-zinc-100 outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={handleExportJson}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg text-xs text-zinc-300"
              >
                <Download className="w-3.5 h-3.5" />
                <span>JSON Olarak Kaydet</span>
              </button>

              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-semibold rounded-lg text-xs shadow-md transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Ödevi Gönder & Paylaş</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
