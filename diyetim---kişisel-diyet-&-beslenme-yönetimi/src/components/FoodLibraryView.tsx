import React, { useState, useMemo } from 'react';
import { Search, Plus, Sparkles, Filter, Apple, Utensils } from 'lucide-react';
import { FoodCategory, FoodItem, MealPlanItem, MealType } from '../types/diet';
import { CATEGORY_LABELS, MEAL_LABELS } from '../data/foodDatabase';

interface FoodLibraryViewProps {
  foodDatabase: FoodItem[];
  onAddNewCustomFood: (food: FoodItem) => void;
  onAddFoodToToday: (item: MealPlanItem, meal: MealType) => void;
}

export const FoodLibraryView: React.FC<FoodLibraryViewProps> = ({
  foodDatabase,
  onAddNewCustomFood,
  onAddFoodToToday,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory | 'all'>('all');
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // Quick Add to Meal State
  const [selectedFoodForAdd, setSelectedFoodForAdd] = useState<FoodItem | null>(null);
  const [targetMeal, setTargetMeal] = useState<MealType>('lunch');
  const [portionMult, setPortionMult] = useState(1.0);

  // New Custom Food Form State
  const [customName, setCustomName] = useState('');
  const [customCategory, setCustomCategory] = useState<FoodCategory>('vegetable');
  const [customServing, setCustomServing] = useState('1 Porsiyon (100g)');
  const [customGrams, setCustomGrams] = useState(100);
  const [customCalories, setCustomCalories] = useState(120);
  const [customProtein, setCustomProtein] = useState(6);
  const [customCarbs, setCustomCarbs] = useState(12);
  const [customFat, setCustomFat] = useState(3);
  const [customFiber, setCustomFiber] = useState(4);

  const filteredFoods = useMemo(() => {
    return foodDatabase.filter(food => {
      const matchSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCat = selectedCategory === 'all' || food.category === selectedCategory;
      return matchSearch && matchCat;
    });
  }, [foodDatabase, searchQuery, selectedCategory]);

  const handleCreateFood = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;

    const newFood: FoodItem = {
      id: `custom_${Date.now()}`,
      name: customName.trim(),
      category: customCategory,
      servingSize: customServing,
      servingGrams: Number(customGrams) || 100,
      calories: Number(customCalories) || 0,
      protein: Number(customProtein) || 0,
      carbs: Number(customCarbs) || 0,
      fat: Number(customFat) || 0,
      fiber: Number(customFiber) || 0,
      isCustom: true,
    };

    onAddNewCustomFood(newFood);
    setIsCreatingNew(false);
    setCustomName('');
  };

  const handleConfirmQuickAdd = () => {
    if (!selectedFoodForAdd) return;

    const planItem: MealPlanItem = {
      id: `logged_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      foodId: selectedFoodForAdd.id,
      name: selectedFoodForAdd.name,
      category: selectedFoodForAdd.category,
      portionMultiplier: portionMult,
      servingSize: selectedFoodForAdd.servingSize,
      calories: Math.round(selectedFoodForAdd.calories * portionMult),
      protein: Math.round(selectedFoodForAdd.protein * portionMult * 10) / 10,
      carbs: Math.round(selectedFoodForAdd.carbs * portionMult * 10) / 10,
      fat: Math.round(selectedFoodForAdd.fat * portionMult * 10) / 10,
      fiber: Math.round(selectedFoodForAdd.fiber * portionMult * 10) / 10,
    };

    onAddFoodToToday(planItem, targetMeal);
    setSelectedFoodForAdd(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-1">
            <Apple className="w-4 h-4" />
            Besin Değerleri Rehberi
          </div>
          <h2 className="text-xl font-bold text-slate-900">Besin Değeri Kütüphanesi</h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Tüm gıdaların kalori, protein, karbonhidrat, yağ ve lif değerlerini inceleyin; dilediğiniz besini anında bugünkü öğününüze ekleyin.
          </p>
        </div>

        <button
          onClick={() => setIsCreatingNew(!isCreatingNew)}
          className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-xs inline-flex items-center gap-1.5 whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          Özel Besin / Tarif Ekle
        </button>
      </div>

      {/* Create Custom Food Card */}
      {isCreatingNew && (
        <form
          onSubmit={handleCreateFood}
          className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-200 space-y-4 animate-in fade-in"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-emerald-950 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Yeni Özel Besin / Tarif Tanımla
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
              <label className="block text-xs font-medium text-slate-700 mb-1">Besin / Yemek Adı *</label>
              <input
                type="text"
                required
                value={customName}
                onChange={e => setCustomName(e.target.value)}
                placeholder="Örn: Ev Yapımı Zeytinyağlı Kereviz"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Besin Grubu *</label>
              <select
                value={customCategory}
                onChange={e => setCustomCategory(e.target.value as FoodCategory)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-emerald-500"
              >
                {Object.entries(CATEGORY_LABELS).map(([key, val]) => (
                  <option key={key} value={key}>
                    {val.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Porsiyon Açıklaması</label>
              <input
                type="text"
                value={customServing}
                onChange={e => setCustomServing(e.target.value)}
                placeholder="Örn: 1 Porsiyon (150g)"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Gramaj (g)</label>
              <input
                type="number"
                min="1"
                value={customGrams}
                onChange={e => setCustomGrams(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-emerald-500"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-emerald-200/60">
            <div className="text-xs font-semibold text-slate-700 mb-2">Porsiyon Başı Besin Değerleri</div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-[11px] text-slate-500 block">Kalori (kcal)</span>
                <input
                  type="number"
                  value={customCalories}
                  onChange={e => setCustomCalories(Number(e.target.value))}
                  className="w-full mt-1 px-2 py-1 text-sm font-semibold border rounded"
                />
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-[11px] text-rose-600 block">Protein (g)</span>
                <input
                  type="number"
                  step="0.1"
                  value={customProtein}
                  onChange={e => setCustomProtein(Number(e.target.value))}
                  className="w-full mt-1 px-2 py-1 text-sm font-semibold border rounded"
                />
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-[11px] text-amber-600 block">Karb (g)</span>
                <input
                  type="number"
                  step="0.1"
                  value={customCarbs}
                  onChange={e => setCustomCarbs(Number(e.target.value))}
                  className="w-full mt-1 px-2 py-1 text-sm font-semibold border rounded"
                />
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-[11px] text-violet-600 block">Yağ (g)</span>
                <input
                  type="number"
                  step="0.1"
                  value={customFat}
                  onChange={e => setCustomFat(Number(e.target.value))}
                  className="w-full mt-1 px-2 py-1 text-sm font-semibold border rounded"
                />
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-[11px] text-emerald-600 block">Lif (g)</span>
                <input
                  type="number"
                  step="0.1"
                  value={customFiber}
                  onChange={e => setCustomFiber(Number(e.target.value))}
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
              Kütüphaneye Kaydet
            </button>
          </div>
        </form>
      )}

      {/* Search & Category Filter Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Besin veya yemek adı filtrele (örn: Mercimek, Somon, Yumurta, Avokado...)"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-emerald-500 bg-slate-50/50"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Tüm Besinler ({foodDatabase.length})
          </button>
          {Object.entries(CATEGORY_LABELS).map(([catKey, info]) => {
            const isSelected = selectedCategory === catKey;
            return (
              <button
                key={catKey}
                onClick={() => setSelectedCategory(catKey as FoodCategory)}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  isSelected
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {info.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Foods Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFoods.map(food => {
          const catInfo = CATEGORY_LABELS[food.category];
          return (
            <div
              key={food.id}
              className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                      {catInfo?.label}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mt-0.5">{food.name}</h4>
                    <span className="text-xs text-slate-500 font-mono">{food.servingSize}</span>
                  </div>

                  <div className="text-right">
                    <span className="text-lg font-bold font-mono text-emerald-600 tabular-nums">
                      {food.calories}
                    </span>
                    <span className="text-[11px] text-slate-400 block font-normal">kcal</span>
                  </div>
                </div>

                {/* Macro breakdown pills */}
                <div className="grid grid-cols-4 gap-1.5 mt-3 pt-3 border-t border-slate-100 text-[11px] font-mono tabular-nums text-center">
                  <div className="bg-rose-50/70 p-1.5 rounded">
                    <span className="text-[10px] text-rose-600 block font-sans">Protein</span>
                    <span className="font-semibold text-rose-800">{food.protein}g</span>
                  </div>
                  <div className="bg-amber-50/70 p-1.5 rounded">
                    <span className="text-[10px] text-amber-600 block font-sans">Karb</span>
                    <span className="font-semibold text-amber-800">{food.carbs}g</span>
                  </div>
                  <div className="bg-violet-50/70 p-1.5 rounded">
                    <span className="text-[10px] text-violet-600 block font-sans">Yağ</span>
                    <span className="font-semibold text-violet-800">{food.fat}g</span>
                  </div>
                  <div className="bg-emerald-50/70 p-1.5 rounded">
                    <span className="text-[10px] text-emerald-600 block font-sans">Lif</span>
                    <span className="font-semibold text-emerald-800">{food.fiber}g</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  {food.isCustom ? 'Özel Eklenen Besin' : 'Referans Veri'}
                </span>
                <button
                  onClick={() => setSelectedFoodForAdd(food)}
                  className="px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors inline-flex items-center gap-1"
                >
                  <Utensils className="w-3.5 h-3.5" />
                  Bugüne Ekle
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Add Modal */}
      {selectedFoodForAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-slate-200 p-5 space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              {selectedFoodForAdd.name}
            </h3>
            <p className="text-xs text-slate-500">
              Bu besini bugünkü hangi öğününüze eklemek istersiniz?
            </p>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Öğün Seçin</label>
              <select
                value={targetMeal}
                onChange={e => setTargetMeal(e.target.value as MealType)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
              >
                {Object.entries(MEAL_LABELS).map(([k, info]) => (
                  <option key={k} value={k}>
                    {info.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Porsiyon Miktarı</label>
              <div className="grid grid-cols-4 gap-1.5">
                {[0.5, 1.0, 1.5, 2.0].map(m => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setPortionMult(m)}
                    className={`py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors ${
                      portionMult === m
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {m}x
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs font-mono flex items-center justify-between">
              <span>Toplam Kalori:</span>
              <strong className="text-emerald-600 font-bold text-sm">
                {Math.round(selectedFoodForAdd.calories * portionMult)} kcal
              </strong>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedFoodForAdd(null)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                İptal
              </button>
              <button
                type="button"
                onClick={handleConfirmQuickAdd}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs"
              >
                Öğüne Ekle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
