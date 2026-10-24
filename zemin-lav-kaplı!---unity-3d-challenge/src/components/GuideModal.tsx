import React from 'react';
import { X, CheckCircle, Flame, Layers, Box, Camera, Activity, Palette, Sparkles } from 'lucide-react';

interface GuideModalProps {
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-zinc-900 border border-zinc-700/80 rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl text-zinc-200 text-xs">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-zinc-950/80 border-b border-zinc-800 rounded-t-2xl">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-600/20 border border-orange-500/50 flex items-center justify-center text-orange-400">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Challenge: Zemin lav kaplı!</h2>
              <div className="text-[11px] text-zinc-400">Unity Learn 3D Temel Beceriler Meydan Okuması</div>
            </div>
          </div>
          <button onClick={onClose} className="p-1 hover:text-white text-zinc-400 rounded-md">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-5 leading-relaxed text-zinc-300">
          <div className="p-3 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 border border-amber-500/30 rounded-xl">
            <p className="font-medium text-amber-200 mb-1">Yeni becerilerini sınama zamanı!</p>
            <p className="text-[11px] text-zinc-300">
              Bu meydan okuma ödevinde, bir topun yere değmeden üzerinde yuvarlanacağı bir yol yaratacaksın. Yolu istediğin kadar uzun yap, ama topun düşmesine izin verme, çünkü zemin lav kaplı.
            </p>
            <div className="mt-2 text-[11px] text-amber-400 font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Hazırlayan & Onaylayan: Enes Öztürk</span>
            </div>
          </div>

          {/* Aşama 1 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-sky-300 border-b border-zinc-800 pb-1">
              <Layers className="w-4 h-4 text-sky-400" />
              <span>Aşama 1: Genel Bakış</span>
            </div>
            <p className="text-zinc-400">
              Bu meydan okumada, ilkel GameObject’leri ve ücretsiz öğeleri (asset) kullanarak kendi Sahneni (Scene) inşa edeceksin. Bu meydan okuma süresince yapacakların:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <div className="flex items-start gap-2 bg-zinc-950/60 p-2.5 rounded-lg border border-zinc-800">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Yeni bir 3B Sahne yaratmak:</strong> Üç boyutlu boşluk ve lav tabanı hazırlığı.</span>
              </div>
              <div className="flex items-start gap-2 bg-zinc-950/60 p-2.5 rounded-lg border border-zinc-800">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Yeni ilkel objeler yaratmak:</strong> Küp, Rampa, Silindir, Trambolin ekleme.</span>
              </div>
              <div className="flex items-start gap-2 bg-zinc-950/60 p-2.5 rounded-lg border border-zinc-800">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Sahne görünümünde gezinmek:</strong> 3B uzayda fare ile serbest orbit, pan, zoom.</span>
              </div>
              <div className="flex items-start gap-2 bg-zinc-950/60 p-2.5 rounded-lg border border-zinc-800">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>GameObjects Transform:</strong> Pozisyon, rotasyon ve ölçeklendirme.</span>
              </div>
              <div className="flex items-start gap-2 bg-zinc-950/60 p-2.5 rounded-lg border border-zinc-800">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Main Camera:</strong> Takip kamerası ve serbest açı konumlandırma.</span>
              </div>
              <div className="flex items-start gap-2 bg-zinc-950/60 p-2.5 rounded-lg border border-zinc-800">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>RigidBody Bileşeni:</strong> Kütle, yerçekimi, esneklik (bounciness) ve sürtünme.</span>
              </div>
              <div className="flex items-start gap-2 bg-zinc-950/60 p-2.5 rounded-lg border border-zinc-800">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Yeni Materyaller yaratmak:</strong> Renk, metalik, pürüzsüzlük ve doku atama.</span>
              </div>
              <div className="flex items-start gap-2 bg-zinc-950/60 p-2.5 rounded-lg border border-zinc-800">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Oyun Görünümünde Test:</strong> Topu parkurda yuvarlayarak test etme.</span>
              </div>
            </div>
          </div>

          {/* Aşama 2 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-amber-300 border-b border-zinc-800 pb-1">
              <Box className="w-4 h-4 text-amber-400" />
              <span>Aşama 2: Sahneni İnşa Et</span>
            </div>
            <p className="text-zinc-300">
              Önce zemin objesini yaratıp sonra diğer öğeler ve ilkel objeleri kullanarak Sahneni düzenle. Küreyi katı yapmak adımlarını kullanarak; top, çizdiğin yolda yuvarlanabilir hale gelene dek ilgili elemanlara RigidBody ve sürtünme değerleri tanımla.
            </p>
            <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800 text-[11px] text-zinc-400 space-y-1">
              <div className="text-zinc-200 font-semibold">💡 İpucu:</div>
              <div>Alt bardaki <strong>İlkel Objeler</strong> sekmesinden Rampa, Küp veya Trambolin ekleyebilir; sağdaki <strong>Inspector</strong> panelinden açısını ve pozisyonunu milimetrik ayarlayabilirsin.</div>
            </div>
          </div>

          {/* Aşama 3 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-emerald-300 border-b border-zinc-800 pb-1">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Aşama 3: Sonraki Adımlar & Ödev Teslimi</span>
            </div>
            <p className="text-zinc-300">
              Topu sektirdin mi? Zemini lav kapladın mı? Projeni tamamladığında üst menüdeki <strong>"Ödevi Gönder"</strong> butonuna basarak Unity Learn topluluğuna teslim edebilir, <strong>Enes Öztürk</strong> onaylı sertifikanı alabilirsin.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-zinc-950/80 border-t border-zinc-800 rounded-b-2xl flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-sky-600 hover:bg-sky-500 text-white font-medium rounded-lg text-xs transition-colors"
          >
            Anladım, Sahneye Dön
          </button>
        </div>
      </div>
    </div>
  );
};
