import React, { useState } from 'react';
import {
  Calendar,
  Plus,
  Trash2,
  Droplets,
  Flame,
  Utensils,
  ChevronLeft,
  ChevronRight,
  Smile,
  Copy,
  Sparkles,
} from 'lucide-react';
import { DailyLogEntry, DietProgram, FoodItem, MealPlanItem, MealType } from '../types/diet';
import { CATEGORY_LABELS, MEAL_LABELS } from '../data/foodDatabase';
import { calculateDailyNutrition } from '../utils/nutritionCalculations';
import { FoodLibraryModal } from './FoodLibraryModal';

interface DailyTrackerProps {
  currentLog: DailyLogEntry;
  selectedDate: string; // YYYY-MM-DD
  onDateChange: (date: string) => void;
  onUpdateCurrentLog: (updated: DailyLogEntry) => void;
  activeProgram: DietProgram;
  foodDatabase: FoodItem[];
  onAddNewCustomFood: (food: FoodItem) => void;
}

export const DailyTracker: React.FC<DailyTrackerProps> = ({
  currentLog,
  selectedDate,
  onDateChange,
  onUpdateCurrentLog,
  activeProgram,
  foodDatabase,
  onAddNewCustomFood,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetMeal, setTargetMeal] = useState<MealType>('breakfast');

  const nutrition = calculateDailyNutrition(currentLog);
  const targetCalories = activeProgram.targetCalories || 2000;
  const calPercent = Math.min(100, Math.round((nutrition.calories / targetCalories) * 100));

  // Date navigation helpers
  const handleShiftDay = (delta: number) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + delta);
    onDateChange(d.toISOString().split('T')[0]);
  };

  const handleOpenFoodPicker = (meal: MealType) => {
    setTargetMeal(meal);
    setIsModalOpen(true);
  };

  const handleAddFoodToMeal = (item: MealPlanItem, meal: MealType) => {
    const existingItems = currentLog.meals[meal] || [];
    const updatedMeals = {
      ...currentLog.meals,
      [meal]: [...existingItems, item],
    };

    onUpdateCurrentLog({
      ...currentLog,
      meals: updatedMeals,
    });
  };

  const handleRemoveFood = (meal: MealType, itemId: string) => {
    const existingItems = currentLog.meals[meal] || [];
    const updatedMeals = {
      ...currentLog.meals,
      [meal]: existingItems.filter(i => i.id !== itemId),
    };

    onUpdateCurrentLog({
      ...currentLog,
      meals: updatedMeals,
    });
  };

  const handleUpdateWater = (delta: number) => {
    const newGlasses = Math.max(0, currentLog.waterGlasses + delta);
    onUpdateCurrentLog({
      ...currentLog,
      waterGlasses: newGlasses,
    });
  };

  // Copy planned meal from active diet program for current weekday
  const handleImportFromActiveProgram = (meal: MealType) => {
    const dateObj = new Date(selectedDate);
    const dayIndex = dateObj.getDay(); // 0 is Sunday, 1 is Mon...
    const dayKeys: Array<'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat'> = [
      'sun',
      'mon',
      'tue',
      'wed',
      'thu',
      'fri',
      'sat',
    ];
    const key = dayKeys[dayIndex];

    const plannedItems = activeProgram.weeklySchedule[key]?.[meal] || [];
    if (plannedItems.length === 0) return;

    // Clone with fresh IDs
    const clonedItems = plannedItems.map(it => ({
      ...it,
      id: `logged_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    }));

    const existing = currentLog.meals[meal] || [];
    onUpdateCurrentLog({
      ...currentLog,
      meals: {
        ...currentLog.meals,
        [meal]: [...existing, ...clonedItems],
      },
    });
  };

  const isToday = selectedDate === new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-6">
      {/* Date Navigation & Status Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-100 rounded-xl p-1">
            <button
              onClick={() => handleShiftDay(-1)}
              className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-white transition-all"
              title="Önceki Gün"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleShiftDay(1)}
              className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-white transition-all"
              title="Sonraki Gün"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-bold text-slate-900">
                {new Date(selectedDate).toLocaleDateString('tr-TR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              {isToday && (
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  Bugün
                </span>
              )}
            </div>
            <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
              <span>Aktif Program:</span>
              <span className="font-semibold text-slate-700">{activeProgram.title}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="date"
            value={selectedDate}
            onChange={e => onDateChange(e.target.value)}
            className="px-3 py-1.5 text-xs font-medium border border-slate-200 rounded-xl bg-slate-50 focus:outline-emerald-500"
          />
        </div>
      </div>

      {/* Main KPI Summary Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Calories Progress Card */}
        <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-emerald-200 font-semibold">
              Günlük Kalori
            </span>
            <Flame className="w-5 h-5 text-emerald-300" />
          </div>

          <div className="my-3">
            <div className="text-3xl font-extrabold font-mono tracking-tight tabular-nums">
              {nutrition.calories}{' '}
              <span className="text-sm font-normal text-emerald-200 font-sans">
                / {targetCalories} kcal
              </span>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-black/20 h-2 rounded-full mt-2.5 overflow-hidden">
              <div
                className="bg-white h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, calPercent)}%` }}
              />
            </div>
          </div>

          <div className="text-xs text-emerald-100 flex items-center justify-between">
            <span>Hedefe Ulaşım: %{calPercent}</span>
            <span>
              {targetCalories - nutrition.calories > 0
                ? `${targetCalories - nutrition.calories} kcal kaldı`
                : `${Math.abs(targetCalories - nutrition.calories)} kcal aşıldı`}
            </span>
          </div>
        </div>

        {/* Macronutrients Cards */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-rose-600 font-bold">
              Protein
            </span>
            <span className="text-xs font-mono text-slate-400">hedef: {activeProgram.targetProtein}g</span>
          </div>
          <div className="my-2">
            <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
              {nutrition.protein} <span className="text-xs font-normal text-slate-500">gram</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-rose-500 h-full rounded-full"
                style={{
                  width: `${Math.min(100, Math.round((nutrition.protein / (activeProgram.targetProtein || 100)) * 100))}%`,
                }}
              />
            </div>
          </div>
          <div className="text-[11px] text-slate-500">
            Kas dokusu onarımı & uzun süreli tokluk
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-amber-600 font-bold">
              Karbonhidrat
            </span>
            <span className="text-xs font-mono text-slate-400">hedef: {activeProgram.targetCarbs}g</span>
          </div>
          <div className="my-2">
            <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
              {nutrition.carbs} <span className="text-xs font-normal text-slate-500">gram</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-amber-500 h-full rounded-full"
                style={{
                  width: `${Math.min(100, Math.round((nutrition.carbs / (activeProgram.targetCarbs || 150)) * 100))}%`,
                }}
              />
            </div>
          </div>
          <div className="text-[11px] text-slate-500">
            Lif: <strong className="text-emerald-700 font-mono">{nutrition.fiber}g</strong> (bağırsak sağlığı)
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-violet-600 font-bold">
              Sağlıklı Yağ
            </span>
            <span className="text-xs font-mono text-slate-400">hedef: {activeProgram.targetFat}g</span>
          </div>
          <div className="my-2">
            <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
              {nutrition.fat} <span className="text-xs font-normal text-slate-500">gram</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-violet-500 h-full rounded-full"
                style={{
                  width: `${Math.min(100, Math.round((nutrition.fat / (activeProgram.targetFat || 60)) * 100))}%`,
                }}
              />
            </div>
          </div>
          <div className="text-[11px] text-slate-500">
            Hormonal denge & A, D, E, K vitamin emilimi
          </div>
        </div>
      </div>

      {/* Water Tracker Strip */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="w-11 h-11 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
            <Droplets className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-sky-600">
              Günlük Hidrasyon
            </div>
            <div className="text-lg font-bold text-slate-900">
              {nutrition.waterLiters} Litre{' '}
              <span className="text-xs text-slate-400 font-normal">
                ({currentLog.waterGlasses} bardak / hedef 2.5 L)
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleUpdateWater(-1)}
            disabled={currentLog.waterGlasses <= 0}
            className="w-8 h-8 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center font-bold text-base transition-colors"
            title="1 bardak eksilt"
          >
            -
          </button>
          <div className="flex items-center gap-1">
            {Array.from({ length: 10 }).map((_, i) => (
              <button
                key={i}
                onClick={() => onUpdateCurrentLog({ ...currentLog, waterGlasses: i + 1 })}
                className={`w-4 h-7 rounded-xs transition-colors ${
                  i < currentLog.waterGlasses
                    ? 'bg-sky-500 hover:bg-sky-600'
                    : 'bg-slate-100 hover:bg-slate-200'
                }`}
                title={`${i + 1} bardak`}
              />
            ))}
          </div>
          <button
            onClick={() => handleUpdateWater(1)}
            className="w-8 h-8 rounded-lg bg-sky-500 hover:bg-sky-600 text-white flex items-center justify-center font-bold text-base transition-colors shadow-2xs"
            title="1 bardak (250ml) ekle"
          >
            +
          </button>
        </div>
      </div>

      {/* Meals Grid (6 Meal Slots) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Utensils className="w-4 h-4 text-emerald-600" />
            Günün Öğünleri & Tüketilen Besinler
          </h3>
          <span className="text-xs text-slate-500">
            Her öğünü detaylı kaydedebilir veya programınızdan aktarabilirsiniz
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {(Object.keys(MEAL_LABELS) as MealType[]).map(meal => {
            const items = currentLog.meals[meal] || [];
            const mealNutrition = items.reduce(
              (acc, it) => ({
                kcal: acc.kcal + it.calories,
                p: acc.p + it.protein,
                c: acc.c + it.carbs,
                f: acc.f + it.fat,
              }),
              { kcal: 0, p: 0, c: 0, f: 0 }
            );

            return (
              <div
                key={meal}
                className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col justify-between"
              >
                {/* Meal Header */}
                <div className="p-4 border-b border-slate-100 bg-slate-50/70">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{MEAL_LABELS[meal].title}</h4>
                      <span className="text-[11px] text-slate-400 font-mono">
                        Planlanan saat: {MEAL_LABELS[meal].defaultTime}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold font-mono text-emerald-600 tabular-nums">
                        {mealNutrition.kcal} kcal
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono tabular-nums">
                        {Math.round(mealNutrition.p)}g P · {Math.round(mealNutrition.c)}g K
                      </div>
                    </div>
                  </div>
                </div>

                {/* Items in meal */}
                <div className="p-4 flex-1 space-y-2.5 overflow-y-auto max-h-[260px]">
                  {items.length === 0 ? (
                    <div className="py-6 text-center text-slate-400 text-xs">
                      Henüz besin kaydedilmedi.
                    </div>
                  ) : (
                    items.map(it => {
                      const catInfo = CATEGORY_LABELS[it.category];
                      return (
                        <div
                          key={it.id}
                          className="p-2.5 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/40 text-xs flex items-center justify-between gap-2"
                        >
                          <div className="min-w-0">
                            <div className="font-semibold text-slate-900 truncate">{it.name}</div>
                            <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1.5">
                              <span>{it.portionMultiplier}x</span>
                              <span>·</span>
                              <span className="font-semibold text-emerald-600">{it.calories} kcal</span>
                              <span>·</span>
                              <span>P: {it.protein}g</span>
                            </div>
                          </div>

                          <button
                            onClick={() => handleRemoveFood(meal, it.id)}
                            className="p-1 text-slate-300 hover:text-rose-500 rounded transition-colors shrink-0"
                            title="Öğünden Kaldır"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Actions Footer */}
                <div className="p-3 border-t border-slate-100 bg-white flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleOpenFoodPicker(meal)}
                    className="px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors inline-flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Besin Ekle
                  </button>

                  <button
                    onClick={() => handleImportFromActiveProgram(meal)}
                    className="px-2.5 py-1.5 text-[11px] font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors inline-flex items-center gap-1"
                    title="Aktif diyet programındaki menüyü bu öğüne yükle"
                  >
                    <Copy className="w-3 h-3 text-slate-400" />
                    Programdan Al
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Daily Notes & Feeling */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-800 flex items-center gap-2">
            <Smile className="w-4 h-4 text-emerald-600" />
            Günün Beslenme & Enerji Değerlendirmesi
          </label>
          <div className="flex items-center gap-2 text-xs">
            {(['harika', 'iyi', 'orta', 'yorgun'] as const).map(f => (
              <button
                key={f}
                onClick={() => onUpdateCurrentLog({ ...currentLog, feeling: f })}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium capitalize transition-colors ${
                  currentLog.feeling === f
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <textarea
          rows={2}
          value={currentLog.notes || ''}
          onChange={e => onUpdateCurrentLog({ ...currentLog, notes: e.target.value })}
          placeholder="Bugün nasıl hissettiniz? Açlık, tokluk durumu veya kaçamaklar hakkında kendinize not düşün..."
          className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-emerald-500 bg-slate-50/50"
        />
      </div>

      {/* Food Picker Modal */}
      <FoodLibraryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        targetMeal={targetMeal}
        foodDatabase={foodDatabase}
        onAddFoodToMeal={handleAddFoodToMeal}
        onAddNewCustomFood={onAddNewCustomFood}
      />
    </div>
  );
};
