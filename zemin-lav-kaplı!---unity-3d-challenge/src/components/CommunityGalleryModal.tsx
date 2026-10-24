import React from 'react';
import { X, Share2, Heart, Play, CheckCircle2, Box, Sparkles, Clock } from 'lucide-react';
import { CommunitySubmission, LevelData } from '../types';
import { soundManager } from '../audio/soundManager';

interface CommunityGalleryModalProps {
  submissions: CommunitySubmission[];
  onLoadLevel: (level: LevelData) => void;
  onLikeSubmission: (id: string) => void;
  onClose: () => void;
}

export const CommunityGalleryModal: React.FC<CommunityGalleryModalProps> = ({
  submissions,
  onLoadLevel,
  onLikeSubmission,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-zinc-900 border border-zinc-700/80 rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl text-zinc-200 text-xs">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-zinc-950/80 border-b border-zinc-800 rounded-t-2xl">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-violet-600/20 border border-violet-500/50 flex items-center justify-center text-violet-400">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Topluluk Galerisi & Gönderilen Ödevler</h2>
              <div className="text-[11px] text-zinc-400">Diğer Unity Learn öğrencilerinin tasarımlarını incele ve test et</div>
            </div>
          </div>
          <button onClick={onClose} className="p-1 hover:text-white text-zinc-400 rounded-md">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List of Submissions */}
        <div className="p-5 overflow-y-auto space-y-3.5 flex-1">
          {submissions.map((sub) => {
            const isEnes = sub.author.toLowerCase().includes('enes öztürk');
            return (
              <div
                key={sub.id}
                className={`p-4 rounded-xl border transition-all ${
                  isEnes
                    ? 'bg-gradient-to-r from-amber-950/30 via-zinc-900 to-zinc-900 border-amber-500/50 shadow-md shadow-amber-950/30'
                    : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white">{sub.title}</h3>
                      {sub.verified && (
                        <span className="flex items-center gap-1 text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full font-medium">
                          <CheckCircle2 className="w-3 h-3 text-amber-400" />
                          <span>Onaylı Teslim</span>
                        </span>
                      )}
                      <span className="text-[10px] px-2 py-0.5 bg-zinc-800 text-zinc-300 rounded font-mono">
                        {sub.difficulty}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-1 text-[11px] text-zinc-400">
                      <span>Tasarımcı:</span>
                      <strong className={isEnes ? 'text-amber-300' : 'text-zinc-200'}>
                        {sub.author}
                      </strong>
                      <span>•</span>
                      <span>{sub.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onLikeSubmission(sub.id)}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-zinc-300 hover:text-red-400 transition-colors"
                    >
                      <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500/20" />
                      <span className="font-mono text-xs">{sub.likes}</span>
                    </button>

                    <button
                      onClick={() => {
                        onLoadLevel(sub.levelData);
                        soundManager.playClick();
                        onClose();
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white font-medium rounded-lg shadow-sm transition-all"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Yükle & Oyna</span>
                    </button>
                  </div>
                </div>

                <p className="text-xs text-zinc-300 mb-3">{sub.description}</p>

                <div className="flex items-center gap-4 text-[11px] text-zinc-400 border-t border-zinc-800/80 pt-2">
                  <div className="flex items-center gap-1">
                    <Box className="w-3.5 h-3.5 text-sky-400" />
                    <span>{sub.objectsCount} GameObject</span>
                  </div>
                  {sub.bestTime && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>En İyi Derece: {sub.bestTime} sn</span>
                    </div>
                  )}
                  {isEnes && (
                    <div className="ml-auto flex items-center gap-1 text-amber-300 font-medium">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Enes Öztürk Özel İmzası</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 bg-zinc-950/80 border-t border-zinc-800 rounded-b-2xl flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-xs"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
