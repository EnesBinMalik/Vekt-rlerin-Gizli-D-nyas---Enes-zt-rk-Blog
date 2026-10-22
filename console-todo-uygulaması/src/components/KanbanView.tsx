import React, { useState } from 'react';
import {
  BoardState,
  BuyuklukEnum,
  BUYUKLUK_LABELS,
  Kart,
  LineType,
  LINE_LABELS,
} from '../types/todo';
import {
  Plus,
  ArrowRight,
  ArrowLeft,
  Trash2,
  Edit3,
  User,
  Search,
  Filter,
  Layers,
  Sparkles,
} from 'lucide-react';

interface KanbanViewProps {
  boardState: BoardState;
  onMoveCard: (cardId: string, toLine: LineType) => void;
  onDeleteCard: (cardId: string) => void;
  onOpenAddModal: (defaultLine?: LineType) => void;
  onOpenEditModal: (card: Kart) => void;
}

const BUYUKLUK_COLORS: Record<BuyuklukEnum, { bg: string; text: string; border: string }> = {
  [BuyuklukEnum.XS]: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  [BuyuklukEnum.S]: { bg: 'bg-teal-500/10', text: 'text-teal-400', border: 'border-teal-500/30' },
  [BuyuklukEnum.M]: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' },
  [BuyuklukEnum.L]: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30' },
  [BuyuklukEnum.XL]: { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/30' },
};

const COLUMN_CONFIG: Record<
  LineType,
  {
    title: string;
    color: string;
    badgeBg: string;
    borderTop: string;
    leftLine: LineType | null;
    rightLine: LineType | null;
  }
> = {
  TODO: {
    title: 'TODO Line',
    color: 'text-blue-400',
    badgeBg: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    borderTop: 'border-t-blue-500',
    leftLine: null,
    rightLine: 'IN_PROGRESS',
  },
  IN_PROGRESS: {
    title: 'IN PROGRESS Line',
    color: 'text-amber-400',
    badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    borderTop: 'border-t-amber-500',
    leftLine: 'TODO',
    rightLine: 'DONE',
  },
  DONE: {
    title: 'DONE Line',
    color: 'text-emerald-400',
    badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    borderTop: 'border-t-emerald-500',
    leftLine: 'IN_PROGRESS',
    rightLine: null,
  },
};

export const KanbanView: React.FC<KanbanViewProps> = ({
  boardState,
  onMoveCard,
  onDeleteCard,
  onOpenAddModal,
  onOpenEditModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMemberFilter, setSelectedMemberFilter] = useState<number | 'ALL'>('ALL');
  const [draggedCardId, setDraggedCardId] = useState<string | null>(null);

  const lines: LineType[] = ['TODO', 'IN_PROGRESS', 'DONE'];

  // Filter cards by search query & member filter
  const filterCards = (cards: Kart[]) => {
    return cards.filter((k) => {
      const matchSearch =
        k.baslik.toLowerCase().includes(searchQuery.toLowerCase()) ||
        k.icerik.toLowerCase().includes(searchQuery.toLowerCase());
      const matchMember =
        selectedMemberFilter === 'ALL' || k.atananKisiId === selectedMemberFilter;
      return matchSearch && matchMember;
    });
  };

  const handleDragStart = (cardId: string) => {
    setDraggedCardId(cardId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetLine: LineType) => {
    if (draggedCardId) {
      onMoveCard(draggedCardId, targetLine);
      setDraggedCardId(null);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden backdrop-blur-sm">
      {/* Kanban Header & Filters */}
      <div className="p-4 bg-slate-900 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-gradient-to-tr from-cyan-600 to-blue-600 rounded-xl shadow-md text-white">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              Görsel Kanban Board
              <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                Canlı Senkronize
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Konsoldaki tüm işlemler (Ekleme, Silme, Taşıma) bu panoya anlık yansır.
            </p>
          </div>
        </div>

        {/* Search, Filter & Add Button */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Kartlarda ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 bg-slate-800/80 border border-slate-700 rounded-lg text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-500 w-36 sm:w-44 transition"
            />
          </div>

          {/* Member Filter */}
          <div className="relative">
            <select
              value={selectedMemberFilter}
              onChange={(e) =>
                setSelectedMemberFilter(
                  e.target.value === 'ALL' ? 'ALL' : Number(e.target.value)
                )
              }
              className="py-1.5 px-3 bg-slate-800/80 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500 transition cursor-pointer"
            >
              <option value="ALL">Tüm Üyeler</option>
              {Object.values(boardState.takimUyeleri).map((m) => (
                <option key={m.id} value={m.id}>
                  {m.isim} (ID: {m.id})
                </option>
              ))}
            </select>
          </div>

          {/* Add Card Button */}
          <button
            onClick={() => onOpenAddModal('TODO')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-lg text-xs font-semibold shadow-md transition transform active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Kart Ekle</span>
          </button>
        </div>
      </div>

      {/* 3 Columns Grid */}
      <div className="flex-1 p-4 overflow-x-auto grid grid-cols-1 md:grid-cols-3 gap-4 items-start bg-slate-950/40">
        {lines.map((lineKey) => {
          const config = COLUMN_CONFIG[lineKey];
          const allColumnCards = boardState.lines[lineKey] || [];
          const filteredCards = filterCards(allColumnCards);

          return (
            <div
              key={lineKey}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(lineKey)}
              className={`flex flex-col bg-slate-900/80 rounded-xl border border-slate-800/80 border-t-4 ${config.borderTop} shadow-lg min-h-[460px] max-h-[calc(100vh-250px)] overflow-hidden transition-all`}
            >
              {/* Column Header */}
              <div className="p-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <h3 className={`font-bold text-sm tracking-wide ${config.color}`}>
                    {config.title}
                  </h3>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-bold border ${config.badgeBg}`}
                  >
                    {allColumnCards.length}
                  </span>
                </div>

                <button
                  onClick={() => onOpenAddModal(lineKey)}
                  className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition"
                  title={`${config.title}'a Yeni Kart Ekle`}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Cards Container */}
              <div className="flex-1 p-3 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
                {filteredCards.length === 0 ? (
                  <div className="py-12 px-4 text-center border-2 border-dashed border-slate-800/70 rounded-xl">
                    <p className="font-mono text-slate-500 text-sm">~ BOŞ ~</p>
                    <p className="text-xs text-slate-600 mt-1">Bu kolonda kart bulunmuyor</p>
                    <button
                      onClick={() => onOpenAddModal(lineKey)}
                      className="mt-3 text-xs text-cyan-400 hover:underline inline-flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> İlk kartı ekleyin
                    </button>
                  </div>
                ) : (
                  filteredCards.map((kart) => {
                    const atanan = boardState.takimUyeleri[kart.atananKisiId];
                    const sizeInfo = BUYUKLUK_COLORS[kart.buyukluk] || BUYUKLUK_COLORS[BuyuklukEnum.M];
                    const sizeLabel = BUYUKLUK_LABELS[kart.buyukluk] || 'M';

                    return (
                      <div
                        key={kart.id}
                        draggable
                        onDragStart={() => handleDragStart(kart.id)}
                        className="group bg-slate-850 hover:bg-slate-800/90 bg-slate-800/60 rounded-xl p-3.5 border border-slate-700/60 hover:border-slate-600 transition-all shadow-md hover:shadow-xl cursor-grab active:cursor-grabbing relative"
                      >
                        {/* Top: Size Badge & Action Menu */}
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold border ${sizeInfo.bg} ${sizeInfo.text} ${sizeInfo.border}`}
                            title={`Büyüklük: ${sizeLabel} (Değer: ${kart.buyukluk})`}
                          >
                            {sizeLabel}
                          </span>

                          <div className="flex items-center space-x-1 opacity-70 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => onOpenEditModal(kart)}
                              className="p-1 text-slate-400 hover:text-cyan-300 hover:bg-slate-700/50 rounded transition"
                              title="Kartı Düzenle"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => onDeleteCard(kart.id)}
                              className="p-1 text-slate-400 hover:text-rose-400 hover:bg-slate-700/50 rounded transition"
                              title="Kartı Sil"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Title */}
                        <h4 className="text-sm font-semibold text-slate-100 group-hover:text-cyan-200 transition-colors leading-snug">
                          {kart.baslik}
                        </h4>

                        {/* Content */}
                        <p className="text-xs text-slate-300/80 mt-1.5 line-clamp-3 leading-relaxed">
                          {kart.icerik}
                        </p>

                        {/* Assignee Footer */}
                        <div className="mt-3 pt-2.5 border-t border-slate-700/40 flex items-center justify-between text-xs">
                          <div className="flex items-center space-x-2">
                            <div
                              className={`w-5 h-5 rounded-full bg-gradient-to-tr ${
                                atanan?.avatarColor || 'from-slate-600 to-slate-700'
                              } flex items-center justify-center text-[10px] font-bold text-white shadow-xs`}
                              title={atanan ? `${atanan.isim} (${atanan.unvan})` : 'Tanımsız Kişi'}
                            >
                              {atanan ? atanan.isim.charAt(0) : '?'}
                            </div>
                            <span className="text-slate-300 text-[11px] font-medium truncate max-w-[110px]">
                              {atanan?.isim || 'Bilinmiyor'}
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono">
                              #{kart.atananKisiId}
                            </span>
                          </div>

                          {/* Quick Shift buttons */}
                          <div className="flex items-center space-x-1">
                            {config.leftLine && (
                              <button
                                onClick={() => onMoveCard(kart.id, config.leftLine!)}
                                className="p-1 text-slate-400 hover:text-white hover:bg-slate-700/60 rounded transition"
                                title={`Sola Taşı (${LINE_LABELS[config.leftLine]})`}
                              >
                                <ArrowLeft className="w-3 h-3" />
                              </button>
                            )}
                            {config.rightLine && (
                              <button
                                onClick={() => onMoveCard(kart.id, config.rightLine!)}
                                className="p-1 text-slate-400 hover:text-white hover:bg-slate-700/60 rounded transition"
                                title={`Sağa Taşı (${LINE_LABELS[config.rightLine]})`}
                              >
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
