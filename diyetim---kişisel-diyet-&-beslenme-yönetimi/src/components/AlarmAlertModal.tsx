import React from 'react';
import { Bell, Check, X, Utensils, Volume2 } from 'lucide-react';
import { MealReminder } from '../types/diet';

interface AlarmAlertModalProps {
  reminder: MealReminder | null;
  onClose: () => void;
  onGoToMeal: (mealType: string) => void;
}

export const AlarmAlertModal: React.FC<AlarmAlertModalProps> = ({
  reminder,
  onClose,
  onGoToMeal,
}) => {
  if (!reminder) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all scale-100">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/20 transition-colors text-white/90"
            title="Kapat"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 mx-auto mb-3 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-xs ring-4 ring-white/10 animate-bounce">
            <Bell className="w-8 h-8 text-white" />
          </div>

          <div className="flex items-center justify-center gap-2 mb-1 text-xs tracking-wider uppercase font-semibold text-emerald-100">
            <Volume2 className="w-4 h-4" />
            Yemek Hatırlatıcısı
          </div>
          <h3 className="text-2xl font-bold">{reminder.title}</h3>
          <div className="text-3xl font-mono font-bold mt-1 text-white tabular-nums tracking-tight">
            {reminder.time}
          </div>
        </div>

        <div className="p-6">
          <p className="text-slate-600 text-sm leading-relaxed mb-6 text-center">
            {reminder.message}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                onGoToMeal(reminder.mealType);
                onClose();
              }}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl text-sm transition-colors shadow-sm"
            >
              <Utensils className="w-4 h-4" />
              Öğünümü Kaydet
            </button>
            <button
              onClick={onClose}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl text-sm transition-colors"
            >
              <Check className="w-4 h-4 text-emerald-600" />
              Yedim / Anladım
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
