import React from 'react';
import { Reservation } from '../types/restaurant';
import { SafeImage } from './SafeImage';
import { X, Calendar, Clock, MapPin, Users, Trash2, CheckCircle } from 'lucide-react';

interface MyReservationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  reservations: Reservation[];
  onCancelReservation: (id: string) => void;
}

export const MyReservationsDrawer: React.FC<MyReservationsDrawerProps> = ({
  isOpen,
  onClose,
  reservations,
  onCancelReservation
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1200] flex justify-end bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md h-full bg-[#12151e] border-l border-stone-800 text-stone-100 flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between bg-[#0e1118]">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white font-display">Rezervasyonlarım</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold">
              {reservations.length}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Kapat"
            className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List Body */}
        <div className="p-4 flex-1 overflow-y-auto space-y-4">
          {reservations.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-stone-900 border border-stone-800 text-stone-500 flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-semibold text-stone-300">Henüz rezervasyonunuz bulunmuyor</h4>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Dünya genelindeki seçkin restoranları inceleyip hemen masanızı ayırtabilirsiniz.
              </p>
            </div>
          ) : (
            reservations.map((res) => (
              <div
                key={res.id}
                className="p-4 rounded-xl bg-stone-900/60 border border-stone-800 space-y-3 relative group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                      <SafeImage
                        src={res.restaurantImage}
                        alt={res.restaurantName}
                        aspectRatioClass="aspect-square"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white font-display">{res.restaurantName}</h4>
                      <span className="text-xs text-amber-400">{res.restaurantCity}</span>
                    </div>
                  </div>

                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-medium border border-emerald-500/20">
                    {res.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-stone-300 pt-2 border-t border-stone-800/80">
                  <div className="flex items-center gap-1.5 text-stone-300">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>{res.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-stone-300">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{res.timeSlot}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-stone-400">
                    <Users className="w-3.5 h-3.5 text-stone-500" />
                    <span>{res.guests} Kişi ({res.seatingArea})</span>
                  </div>
                  <div className="text-right text-[11px] text-stone-500">
                    Kod: <span className="font-mono text-stone-300">{res.id.slice(-6).toUpperCase()}</span>
                  </div>
                </div>

                {res.specialRequests && (
                  <p className="text-[11px] text-stone-400 italic bg-stone-950/40 p-2 rounded">
                    "{res.specialRequests}"
                  </p>
                )}

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => onCancelReservation(res.id)}
                    className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 px-2.5 py-1 rounded bg-rose-500/10 hover:bg-rose-500/20 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>İptal Et</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-800 bg-[#0e1118]">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-lg transition-colors"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
