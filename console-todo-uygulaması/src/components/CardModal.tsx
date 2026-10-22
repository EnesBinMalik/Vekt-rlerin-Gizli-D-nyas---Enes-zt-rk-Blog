import React, { useState, useEffect } from 'react';
import {
  BoardState,
  BuyuklukEnum,
  BUYUKLUK_LABELS,
  Kart,
  LineType,
  LINE_LABELS,
} from '../types/todo';
import { X, Check, AlertCircle } from 'lucide-react';

interface CardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (cardData: Omit<Kart, 'id' | 'olusturmaTarihi'>, cardId?: string) => void;
  initialData?: Kart | null;
  defaultLine?: LineType;
  takimUyeleri: BoardState['takimUyeleri'];
}

export const CardModal: React.FC<CardModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  defaultLine = 'TODO',
  takimUyeleri,
}) => {
  const [baslik, setBaslik] = useState('');
  const [icerik, setIcerik] = useState('');
  const [buyukluk, setBuyukluk] = useState<BuyuklukEnum>(BuyuklukEnum.M);
  const [atananKisiId, setAtananKisiId] = useState<number>(1);
  const [line, setLine] = useState<LineType>(defaultLine);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setBaslik(initialData.baslik);
      setIcerik(initialData.icerik);
      setBuyukluk(initialData.buyukluk);
      setAtananKisiId(initialData.atananKisiId);
      setLine(initialData.line);
    } else {
      setBaslik('');
      setIcerik('');
      setBuyukluk(BuyuklukEnum.M);
      // Default to first member
      const firstMemberId = Number(Object.keys(takimUyeleri)[0]) || 1;
      setAtananKisiId(firstMemberId);
      setLine(defaultLine);
    }
    setError(null);
  }, [initialData, defaultLine, takimUyeleri, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!baslik.trim()) {
      setError('Lütfen bir kart başlığı giriniz.');
      return;
    }

    if (!takimUyeleri[atananKisiId]) {
      setError('Lütfen listeden geçerli bir takım üyesi seçiniz.');
      return;
    }

    onSave(
      {
        baslik: baslik.trim(),
        icerik: icerik.trim(),
        buyukluk,
        atananKisiId,
        line,
      },
      initialData?.id
    );
    onClose();
  };

  const buyuklukOptions = [
    { enumVal: BuyuklukEnum.XS, label: 'XS (1) - Çok Küçük' },
    { enumVal: BuyuklukEnum.S, label: 'S (2) - Küçük' },
    { enumVal: BuyuklukEnum.M, label: 'M (3) - Orta' },
    { enumVal: BuyuklukEnum.L, label: 'L (4) - Büyük' },
    { enumVal: BuyuklukEnum.XL, label: 'XL (5) - Çok Büyük' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-850 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span>{initialData ? 'Kartı Düzenle' : 'Yeni Kart Oluştur'}</span>
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-rose-950/50 border border-rose-800 text-rose-300 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Title Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Başlık <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              value={baslik}
              onChange={(e) => setBaslik(e.target.value)}
              placeholder="Örn: C# Konsol Menü Tasarımı"
              className="w-full px-3.5 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
              autoFocus
            />
          </div>

          {/* Content Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">İçerik</label>
            <textarea
              value={icerik}
              onChange={(e) => setIcerik(e.target.value)}
              placeholder="Kartın detayları, görev açıklaması veya notlar..."
              rows={3}
              className="w-full px-3.5 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Size (Enum) Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Büyüklük (Enum) <span className="text-slate-500 font-mono text-[11px]">[1..5]</span>
              </label>
              <select
                value={buyukluk}
                onChange={(e) => setBuyukluk(Number(e.target.value) as BuyuklukEnum)}
                className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-cyan-500 transition cursor-pointer"
              >
                {buyuklukOptions.map((opt) => (
                  <option key={opt.enumVal} value={opt.enumVal}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Target Line */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Kolon (Line)
              </label>
              <select
                value={line}
                onChange={(e) => setLine(e.target.value as LineType)}
                className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-cyan-500 transition cursor-pointer"
              >
                <option value="TODO">TODO Line</option>
                <option value="IN_PROGRESS">IN PROGRESS Line</option>
                <option value="DONE">DONE Line</option>
              </select>
            </div>
          </div>

          {/* Assignee Member Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Atanan Kişi (Takım Üyelerinden Biri)
            </label>
            <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto pr-1">
              {Object.values(takimUyeleri).map((uye) => {
                const isSelected = atananKisiId === uye.id;
                return (
                  <div
                    key={uye.id}
                    onClick={() => setAtananKisiId(uye.id)}
                    className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition ${
                      isSelected
                        ? 'bg-cyan-950/60 border-cyan-500/70 text-cyan-200'
                        : 'bg-slate-800/50 border-slate-700/60 hover:bg-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <div
                        className={`w-6 h-6 rounded-full bg-gradient-to-tr ${uye.avatarColor} flex items-center justify-center text-xs font-bold text-white`}
                      >
                        {uye.isim.charAt(0)}
                      </div>
                      <div>
                        <div className="text-xs font-semibold">{uye.isim}</div>
                        <div className="text-[10px] text-slate-400">{uye.unvan}</div>
                      </div>
                    </div>
                    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-900/60 border border-slate-700">
                      ID: {uye.id}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition"
            >
              İptal
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl text-xs font-bold shadow-lg transition"
            >
              <Check className="w-4 h-4" />
              <span>{initialData ? 'Kaydet' : 'Kartı Oluştur'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
