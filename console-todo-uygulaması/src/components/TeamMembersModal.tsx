import React from 'react';
import { BoardState, TakimUyesi } from '../types/todo';
import { X, Users, Award, ShieldCheck, Hash } from 'lucide-react';

interface TeamMembersModalProps {
  isOpen: boolean;
  onClose: () => void;
  takimUyeleri: BoardState['takimUyeleri'];
}

export const TeamMembersModal: React.FC<TeamMembersModalProps> = ({
  isOpen,
  onClose,
  takimUyeleri,
}) => {
  if (!isOpen) return null;

  const membersList = Object.values(takimUyeleri);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-850 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-xl">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Takım Üyeleri Listesi (Dictionary&lt;int, TakimUyesi&gt;)
              </h3>
              <p className="text-xs text-slate-400">
                Kart atamaları bu ID değerleri üzerinden gerçekleştirilir.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Members List */}
        <div className="p-6 space-y-3 max-h-[60vh] overflow-y-auto">
          {membersList.map((uye) => {
            const isLead = uye.id === 1;
            return (
              <div
                key={uye.id}
                className={`p-3.5 rounded-xl border flex items-center justify-between transition ${
                  isLead
                    ? 'bg-gradient-to-r from-emerald-950/40 to-slate-900 border-emerald-500/40'
                    : 'bg-slate-850 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-tr ${uye.avatarColor} flex items-center justify-center text-sm font-bold text-white shadow-md`}
                  >
                    {uye.isim.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-100">{uye.isim}</span>
                      {isLead && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 font-medium">
                          <Award className="w-3 h-3" /> Proje Sahibi
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{uye.unvan}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-1.5 px-3 py-1 bg-slate-900 rounded-lg border border-slate-800 text-xs font-mono font-bold text-cyan-300">
                  <Hash className="w-3 h-3 text-slate-500" />
                  <span>ID: {uye.id}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-850 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Toplam {membersList.length} kayıtlı takım üyesi</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
