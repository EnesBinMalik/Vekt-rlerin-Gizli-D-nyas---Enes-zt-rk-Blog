import React, { useState } from 'react';
import { Plus, Trash2, Check, Sparkles, Calendar, Utensils, Shield, Info } from 'lucide-react';
import { DayOfWeek, DietProgram, FoodItem, MealPlanItem, MealType } from '../types/diet';
import { CATEGORY_LABELS, MEAL_LABELS } from '../data/foodDatabase';
import { FoodLibraryModal } from './FoodLibraryModal';

const DAY_LABELS: Record<DayOfWeek, string> = {
  mon: 'Pazartesi',
  tue: 'Salı',
  wed: 'Çarşamba',
  thu: 'Perşembe',
  fri: 'Cuma',
  sat: 'Cumartesi',
  sun: 'Pazar',
};

interface DietProgramBuilderProps {
  programs: DietProgram[];
  activeProgramId: string;
  onSelectActiveProgram: (programId: string) => void;
  onSaveProgram: (program: DietProgram) => void;
  onDeleteProgram: (programId: string) => void;
  foodDatabase: FoodItem[];
  onAddNewCustomFood: (food: FoodItem) => void;
  onTransferMealToToday: (mealType: MealType, items: MealPlanItem[]) => void;
}

export const DietProgramBuilder: React.FC<DietProgramBuilderProps> = ({
  programs,
  activeProgramId,
  onSelectActiveProgram,
  onSaveProgram,
  onDeleteProgram,
  foodDatabase,
  onAddNewCustomFood,
  onTransferMealToToday,
}) => {
  const [selectedProgramId, setSelectedProgramId] = useState<string>(activeProgramId || programs[0]?.id);
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('mon');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetMealSlot, setTargetMealSlot] = useState<MealType>('breakfast');
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // New program creation states
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newTargetKcal, setNewTargetKcal] = useState(1900);
  const [newTargetProtein, setNewTargetProtein] = useState(110);
  const [newTargetCarbs, setNewTargetCarbs] = useState(200);
  const [newTargetFat, setNewTargetFat] = useState(65);
  const [newTargetFiber, setNewTargetFiber] = useState(30);

  const currentProgram = programs.find(p => p.id === selectedProgramId) || programs[0];

  const handleOpenFoodPicker = (meal: MealType) => {
    setTargetMealSlot(meal);
    setIsModalOpen(true);
  };

  const handleAddFoodToCurrentProgram = (newItem: MealPlanItem, meal: MealType) => {
    if (!currentProgram) return;

    const daySchedule = currentProgram.weeklySchedule[selectedDay] || {
      breakfast: [],
      morning_snack: [],
      lunch: [],
      afternoon_snack: [],
      dinner: [],
      night_snack: [],
    };

    const updatedMealItems = [...(daySchedule[meal] || []), newItem];

    const updatedProgram: DietProgram = {
      ...currentProgram,
      isCustom: true,
      weeklySchedule: {
        ...currentProgram.weeklySchedule,
        [selectedDay]: {
          ...daySchedule,
          [meal]: updatedMealItems,
        },
      },
    };

    onSaveProgram(updatedProgram);
  };

  const handleRemoveFoodFromProgram = (meal: MealType, itemId: string) => {
    if (!currentProgram) return;

    const daySchedule = currentProgram.weeklySchedule[selectedDay];
    const updatedMealItems = (daySchedule[meal] || []).filter(item => item.id !== itemId);

    const updatedProgram: DietProgram = {
      ...currentProgram,
      weeklySchedule: {
        ...currentProgram.weeklySchedule,
        [selectedDay]: {
          ...daySchedule,
          [meal]: updatedMealItems,
        },
      },
    };

    onSaveProgram(updatedProgram);
  };

  const handleCreateNewProgram = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const emptyDay = (): Record<MealType, MealPlanItem[]> => ({
      breakfast: [],
      morning_snack: [],
      lunch: [],
      afternoon_snack: [],
      dinner: [],
      night_snack: [],
    });

    const newProg: DietProgram = {
      id: `custom_prog_${Date.now()}`,
      title: newTitle.trim(),
      subtitle: newSubtitle.trim() || 'Kişiselleştirilmiş Diyet Programı',
      description: newDesc.trim() || 'Kullanıcı tarafından oluşturulmuş özel beslenme planı.',
      targetCalories: Number(newTargetKcal),
      targetProtein: Number(newTargetProtein),
      targetCarbs: Number(newTargetCarbs),
      targetFat: Number(newTargetFat),
      targetFiber: Number(newTargetFiber),
      targetWaterLiters: 2.5,
      focusTag: 'Kişisel Özel Diyet',
      weeklySchedule: {
        mon: emptyDay(),
        tue: emptyDay(),
        wed: emptyDay(),
        thu: emptyDay(),
        fri: emptyDay(),
        sat: emptyDay(),
        sun: emptyDay(),
      },
      isCustom: true,
      createdAt: new Date().toISOString().split('T')[0],
    };

    onSaveProgram(newProg);
    setSelectedProgramId(newProg.id);
    setIsCreatingNew(false);
  };

  // Day total nutrients calculation
  const dayMeals = currentProgram?.weeklySchedule?.[selectedDay] || {
    breakfast: [],
    morning_snack: [],
    lunch: [],
    afternoon_snack: [],
    dinner: [],
    night_snack: [],
  };

  const dayTotals = Object.values(dayMeals).reduce(
    (acc, items) => {
      items.forEach(it => {
        acc.calories += it.calories;
        acc.protein += it.protein;
        acc.carbs += it.carbs;
        acc.fat += it.fat;
        acc.fiber += it.fiber;
      });
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }
  );

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-1">
            <Utensils className="w-4 h-4" />
            Özelleştirilebilir Beslenme Programları
          </div>
          <h2 className="text-xl font-bold text-slate-900">Diyet Programı & Yemek Menüsü Oluşturucu</h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            İstediğiniz programı seçin veya sıfırdan kendi haftalık menünüzü tasarlayın. Her öğünün kalori ve makro besin değerleri anlık hesaplanır.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full lg:w-auto">
          <button
            onClick={() => setIsCreatingNew(!isCreatingNew)}
            className="flex-1 lg:flex-initial px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors shadow-xs inline-flex items-center justify-center gap-1.5 whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            Yeni Program Oluştur
          </button>
        </div>
      </div>

      {/* New Program Form */}
      {isCreatingNew && (
        <form
          onSubmit={handleCreateNewProgram}
          className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-200 space-y-4 animate-in fade-in"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-emerald-950 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Sıfırdan Yeni Diyet Programı Tanımla
            </h3>
            <button
              type="button"
              onClick={() => setIsCreatingNew(false)}
              className="text-xs text-slate-500 hover:text-slate-800"
            >
              Kapat
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Program Başlığı *</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder="Örn: 21 Günlük Fit & Enerjik Diyet"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Alt Başlık / Odak</label>
              <input
                type="text"
                value={newSubtitle}
                onChange={e => setNewSubtitle(e.target.value)}
                placeholder="Örn: Yağ Yakımı ve Sindirim Rahatlatıcı"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Açıklama</label>
            <input
              type="text"
              value={newDesc}
              onChange={e => setNewDesc(e.target.value)}
              placeholder="Programın hedefi ve dikkat edilmesi gereken noktalar"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-emerald-500"
            />
          </div>

          <div className="pt-2 border-t border-emerald-200/60">
            <div className="text-xs font-semibold text-slate-700 mb-2">Günlük Hedef Besin Değerleri</div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-[11px] text-slate-500 block">Hedef Kalori (kcal)</span>
                <input
                  type="number"
                  value={newTargetKcal}
                  onChange={e => setNewTargetKcal(Number(e.target.value))}
                  className="w-full mt-1 px-2 py-1 text-sm font-semibold border rounded"
                />
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-[11px] text-rose-600 block">Hedef Protein (g)</span>
                <input
                  type="number"
                  value={newTargetProtein}
                  onChange={e => setNewTargetProtein(Number(e.target.value))}
                  className="w-full mt-1 px-2 py-1 text-sm font-semibold border rounded"
                />
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-[11px] text-amber-600 block">Hedef Karb (g)</span>
                <input
                  type="number"
                  value={newTargetCarbs}
                  onChange={e => setNewTargetCarbs(Number(e.target.value))}
                  className="w-full mt-1 px-2 py-1 text-sm font-semibold border rounded"
                />
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-[11px] text-violet-600 block">Hedef Yağ (g)</span>
                <input
                  type="number"
                  value={newTargetFat}
                  onChange={e => setNewTargetFat(Number(e.target.value))}
                  className="w-full mt-1 px-2 py-1 text-sm font-semibold border rounded"
                />
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-[11px] text-emerald-600 block">Hedef Lif (g)</span>
                <input
                  type="number"
                  value={newTargetFiber}
                  onChange={e => setNewTargetFiber(Number(e.target.value))}
                  className="w-full mt-1 px-2 py-1 text-sm font-semibold border rounded"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsCreatingNew(false)}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-200/60 rounded-lg"
            >
              Vazgeç
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs"
            >
              Programı Oluştur ve Düzenle
            </button>
          </div>
        </form>
      )}

      {/* Program Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {programs.map(prog => {
          const isSelected = prog.id === currentProgram?.id;
          const isActive = prog.id === activeProgramId;

          return (
            <button
              key={prog.id}
              onClick={() => setSelectedProgramId(prog.id)}
              className={`p-3.5 rounded-xl border text-left transition-all shrink-0 min-w-[240px] max-w-[320px] ${
                isSelected
                  ? 'border-emerald-500 bg-white ring-2 ring-emerald-500/10 shadow-xs'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-semibold text-emerald-600">
                  {prog.focusTag}
                </span>
                {isActive && (
                  <span className="text-[10px] font-bold text-white bg-emerald-600 px-2 py-0.5 rounded-md inline-flex items-center gap-1">
                    <Check className="w-3 h-3" /> Aktif
                  </span>
                )}
              </div>
              <h4 className="text-sm font-bold text-slate-900 truncate">{prog.title}</h4>
              <div className="flex items-center gap-3 mt-2 text-xs text-slate-500 font-mono">
                <span>{prog.targetCalories} kcal</span>
                <span>·</span>
                <span>{prog.targetProtein}g P</span>
                <span>·</span>
                <span>{prog.targetCarbs}g K</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Program Overview & Activate Action */}
      {currentProgram && (
        <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">
                {currentProgram.focusTag}
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-xs text-slate-400">Enes Öztürk Beslenme Metodolojisi</span>
            </div>
            <h3 className="text-2xl font-bold">{currentProgram.title}</h3>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              {currentProgram.description}
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-slate-300">
              <div className="bg-white/10 px-3 py-1.5 rounded-lg">
                Hedef: <strong className="text-white font-bold">{currentProgram.targetCalories} kcal/gün</strong>
              </div>
              <div className="bg-white/10 px-3 py-1.5 rounded-lg">
                Protein: <strong className="text-emerald-400">{currentProgram.targetProtein}g</strong>
              </div>
              <div className="bg-white/10 px-3 py-1.5 rounded-lg">
                Karb: <strong className="text-amber-400">{currentProgram.targetCarbs}g</strong>
              </div>
              <div className="bg-white/10 px-3 py-1.5 rounded-lg">
                Yağ: <strong className="text-violet-400">{currentProgram.targetFat}g</strong>
              </div>
              <div className="bg-white/10 px-3 py-1.5 rounded-lg">
                Lif: <strong className="text-sky-400">{currentProgram.targetFiber}g</strong>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 shrink-0 w-full md:w-auto">
            {currentProgram.id !== activeProgramId ? (
              <button
                onClick={() => onSelectActiveProgram(currentProgram.id)}
                className="w-full sm:w-auto px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl text-xs transition-colors shadow-sm inline-flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                Bu Programı Aktif Olarak Uygula
              </button>
            ) : (
              <div className="w-full sm:w-auto px-4 py-2 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-semibold text-xs rounded-xl inline-flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                Aktif Olarak Takip Edilen Programınız
              </div>
            )}

            {currentProgram.isCustom && (
              <button
                onClick={() => onDeleteProgram(currentProgram.id)}
                className="w-full sm:w-auto p-2.5 text-rose-400 hover:text-rose-300 hover:bg-white/10 rounded-xl transition-colors"
                title="Özel Programı Sil"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Day Selector (Pzt - Paz) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {(Object.keys(DAY_LABELS) as DayOfWeek[]).map(day => {
          const isSelected = selectedDay === day;
          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors inline-flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              {DAY_LABELS[day]}
            </button>
          );
        })}
      </div>

      {/* Day Nutritional Totals Strip */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-900">{DAY_LABELS[selectedDay]} Günlük Menü Toplamı:</span>
          <span className="font-mono font-bold text-emerald-600 text-sm tabular-nums">
            {Math.round(dayTotals.calories)} kcal
          </span>
          <span className="text-slate-400">/ hedef: {currentProgram?.targetCalories} kcal</span>
        </div>

        <div className="flex items-center gap-3 font-mono text-slate-600 tabular-nums">
          <span>Protein: <strong className="text-rose-600">{Math.round(dayTotals.protein)}g</strong></span>
          <span>·</span>
          <span>Karb: <strong className="text-amber-600">{Math.round(dayTotals.carbs)}g</strong></span>
          <span>·</span>
          <span>Yağ: <strong className="text-violet-600">{Math.round(dayTotals.fat)}g</strong></span>
          <span>·</span>
          <span>Lif: <strong className="text-emerald-600">{Math.round(dayTotals.fiber)}g</strong></span>
        </div>
      </div>

      {/* Meals Grid for the Selected Day */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {(Object.keys(MEAL_LABELS) as MealType[]).map(meal => {
          const items = dayMeals[meal] || [];
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
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs flex flex-col justify-between"
            >
              {/* Meal Header */}
              <div className="p-4 border-b border-slate-100 bg-slate-50/70">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <h4 className="text-sm font-bold text-slate-900">{MEAL_LABELS[meal].title}</h4>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-600 tabular-nums">
                    {mealNutrition.kcal} kcal
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-1.5 text-[11px] text-slate-500 font-mono tabular-nums">
                  <span>{Math.round(mealNutrition.p)}g P</span>
                  <span>·</span>
                  <span>{Math.round(mealNutrition.c)}g K</span>
                  <span>·</span>
                  <span>{Math.round(mealNutrition.f)}g Y</span>
                </div>
              </div>

              {/* Items List */}
              <div className="p-4 flex-1 space-y-2.5 overflow-y-auto max-h-[260px]">
                {items.length === 0 ? (
                  <div className="py-6 text-center text-slate-400 text-xs">
                    Bu öğünde henüz besin bulunmuyor.
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
                          <div className="text-[11px] text-slate-500 flex items-center gap-1.5 font-mono">
                            <span>{it.portionMultiplier}x ({it.servingSize})</span>
                            <span>·</span>
                            <span className="font-semibold text-emerald-600">{it.calories} kcal</span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleRemoveFoodFromProgram(meal, it.id)}
                          className="p-1 text-slate-300 hover:text-rose-500 rounded transition-colors shrink-0"
                          title="Öğünden Çıkar"
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

                {items.length > 0 && (
                  <button
                    onClick={() => onTransferMealToToday(meal, items)}
                    className="px-2.5 py-1.5 text-[11px] font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors inline-flex items-center gap-1"
                    title="Bu öğündeki yemekleri bugünkü günlüğünüze kopyalayın"
                  >
                    Bugüne Aktar
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Food Library Modal */}
      <FoodLibraryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        targetMeal={targetMealSlot}
        foodDatabase={foodDatabase}
        onAddFoodToMeal={handleAddFoodToCurrentProgram}
        onAddNewCustomFood={onAddNewCustomFood}
      />
    </div>
  );
};
