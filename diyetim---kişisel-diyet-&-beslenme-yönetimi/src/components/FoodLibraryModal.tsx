import React, { useState, useMemo } from 'react';
import { Search, Plus, X, Flame, Shield, Wheat, Droplets, Sparkles } from 'lucide-react';
import { FoodCategory, FoodItem, MealPlanItem, MealType } from '../types/diet';
import { CATEGORY_LABELS, MEAL_LABELS } from '../data/foodDatabase';

interface FoodLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetMeal: MealType;
  foodDatabase: FoodItem[];
  onAddFoodToMeal: (item: MealPlanItem, targetMeal: MealType) => void;
  onAddNewCustomFood: (food: FoodItem) => void;
}

export const FoodLibraryModal: React.FC<FoodLibraryModalProps> = ({
  isOpen,
  onClose,
  targetMeal,
  foodDatabase,
  onAddFoodToMeal,
  onAddNewCustomFood,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory | 'all'>('all');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [portionMultiplier, setPortionMultiplier] = useState<number>(1.0);
  const [isCreatingCustom, setIsCreatingCustom] = useState(false);

  // New Custom Food Form State
  const [customName, setCustomName] = useState('');
  const [customCategory, setCustomCategory] = useState<FoodCategory>('vegetable');
  const [customServing, setCustomServing] = useState('1 Porsiyon (100g)');
  const [customGrams, setCustomGrams] = useState(100);
  const [customCalories, setCustomCalories] = useState(150);
  const [customProtein, setCustomProtein] = useState(5);
  const [customCarbs, setCustomCarbs] = useState(15);
  const [customFat, setCustomFat] = useState(4);
  const [customFiber, setCustomFiber] = useState(3);

  const filteredFoods = useMemo(() => {
    return foodDatabase.filter(food => {
      const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || food.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [foodDatabase, searchQuery, selectedCategory]);

  if (!isOpen) return null;

  const handleAddSelection = (food: FoodItem, mult: number) => {
    const newItem: MealPlanItem = {
      id: `item_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      foodId: food.id,
      name: food.name,
      category: food.category,
      portionMultiplier: mult,
      servingSize: food.servingSize,
      calories: Math.round(food.calories * mult),
      protein: Math.round(food.protein * mult * 10) / 10,
      carbs: Math.round(food.carbs * mult * 10) / 10,
      fat: Math.round(food.fat * mult * 10) / 10,
      fiber: Math.round(food.fiber * mult * 10) / 10,
    };
    onAddFoodToMeal(newItem, targetMeal);
    setSelectedFood(null);
    onClose();
  };

  const handleCreateCustom = (e: React.FormEvent) => {
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
    setIsCreatingCustom(false);
    // Add immediately to current meal
    handleAddSelection(newFood, 1.0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div>
            <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
              {MEAL_LABELS[targetMeal]?.title || 'Öğün'} için Besin Seçimi
            </div>
            <h2 className="text-xl font-bold text-slate-900">Besin Değeri & Menü Kütüphanesi</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCreatingCustom(!isCreatingCustom)}
              className="px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors inline-flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              {isCreatingCustom ? 'Listeye Dön' : 'Özel Besin Ekle'}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Custom Food Creation Mode */}
        {isCreatingCustom ? (
          <form onSubmit={handleCreateCustom} className="p-6 overflow-y-auto space-y-4">
            <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-100 text-sm text-emerald-900 flex items-start gap-2.5">
              <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold">Özel Besin / Tarif Tanımlama:</strong>
                <p className="text-xs text-emerald-800 mt-0.5">
                  Kendi pişirdiğiniz veya tükettiğiniz özel bir yemeği besin değerleriyle birlikte kütüphaneye kaydedebilir ve anında öğününüze ekleyebilirsiniz.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Yemek / Besin Adı *</label>
                <input
                  type="text"
                  required
                  placeholder="Örn: Ev Yapımı Sebzeli Mücver"
                  value={customName}
                  onChange={e => setCustomName(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Besin Grubu *</label>
                <select
                  value={customCategory}
                  onChange={e => setCustomCategory(e.target.value as FoodCategory)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-emerald-500 bg-white"
                >
                  {Object.entries(CATEGORY_LABELS).map(([key, val]) => (
                    <option key={key} value={key}>
                      {val.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Porsiyon Tanımı</label>
                <input
                  type="text"
                  placeholder="Örn: 2 Adet (140g)"
                  value={customServing}
                  onChange={e => setCustomServing(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Gramaj (g)</label>
                <input
                  type="number"
                  min="1"
                  value={customGrams}
                  onChange={e => setCustomGrams(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-emerald-500"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <div className="text-xs font-semibold text-slate-700 mb-2">Porsiyon Başı Besin Değerleri</div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">Kalori (kcal)</span>
                  <input
                    type="number"
                    min="0"
                    value={customCalories}
                    onChange={e => setCustomCalories(Number(e.target.value))}
                    className="w-full mt-1 px-2 py-1 text-sm font-semibold border rounded"
                  />
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="text-[11px] text-rose-600 block">Protein (g)</span>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={customProtein}
                    onChange={e => setCustomProtein(Number(e.target.value))}
                    className="w-full mt-1 px-2 py-1 text-sm font-semibold border rounded"
                  />
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="text-[11px] text-amber-600 block">Karb (g)</span>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={customCarbs}
                    onChange={e => setCustomCarbs(Number(e.target.value))}
                    className="w-full mt-1 px-2 py-1 text-sm font-semibold border rounded"
                  />
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="text-[11px] text-violet-600 block">Yağ (g)</span>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={customFat}
                    onChange={e => setCustomFat(Number(e.target.value))}
                    className="w-full mt-1 px-2 py-1 text-sm font-semibold border rounded"
                  />
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="text-[11px] text-emerald-600 block">Lif (g)</span>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={customFiber}
                    onChange={e => setCustomFiber(Number(e.target.value))}
                    className="w-full mt-1 px-2 py-1 text-sm font-semibold border rounded"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <button
                type="button"
                onClick={() => setIsCreatingCustom(false)}
                className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Vazgeç
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-sm bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg shadow-xs"
              >
                Kaydet ve Öğüne Ekle
              </button>
            </div>
          </form>
        ) : (
          <>
            {/* Filter and Search Bar */}
            <div className="p-4 border-b border-slate-100 space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Besin veya yemek adı ara (örn: Somon, Yumurta, Yulaf, Ispanak...)"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-emerald-500 bg-slate-50/50"
                />
              </div>

              {/* Category Segmented Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Tümü ({foodDatabase.length})
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

            {/* Food Grid */}
            <div className="flex-1 overflow-y-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredFoods.map(food => {
                const catInfo = CATEGORY_LABELS[food.category];
                return (
                  <div
                    key={food.id}
                    className="p-3.5 rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-xs transition-all bg-white flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[11px] font-medium text-slate-500">
                            {catInfo?.label}
                          </span>
                          <h4 className="text-sm font-semibold text-slate-900">{food.name}</h4>
                          <span className="text-xs text-slate-500 font-mono">
                            {food.servingSize}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-base font-bold font-mono text-emerald-600 tabular-nums">
                            {food.calories}
                          </span>
                          <span className="text-[11px] text-slate-400 block font-normal">kcal</span>
                        </div>
                      </div>

                      {/* Macronutrient breakdown */}
                      <div className="grid grid-cols-4 gap-1.5 mt-3 pt-2.5 border-t border-slate-100 text-[11px] font-mono tabular-nums">
                        <div className="bg-rose-50/70 p-1.5 rounded text-center">
                          <span className="text-[10px] text-rose-600 block font-sans">Protein</span>
                          <span className="font-semibold text-rose-700">{food.protein}g</span>
                        </div>
                        <div className="bg-amber-50/70 p-1.5 rounded text-center">
                          <span className="text-[10px] text-amber-600 block font-sans">Karb</span>
                          <span className="font-semibold text-amber-700">{food.carbs}g</span>
                        </div>
                        <div className="bg-violet-50/70 p-1.5 rounded text-center">
                          <span className="text-[10px] text-violet-600 block font-sans">Yağ</span>
                          <span className="font-semibold text-violet-700">{food.fat}g</span>
                        </div>
                        <div className="bg-emerald-50/70 p-1.5 rounded text-center">
                          <span className="text-[10px] text-emerald-600 block font-sans">Lif</span>
                          <span className="font-semibold text-emerald-700">{food.fiber}g</span>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="mt-3 pt-2 flex items-center justify-between border-t border-slate-50">
                      <div className="flex items-center gap-1 text-xs">
                        <span className="text-slate-400">Porsiyon:</span>
                        {[0.5, 1.0, 1.5, 2.0].map(mult => (
                          <button
                            key={mult}
                            type="button"
                            onClick={() => handleAddSelection(food, mult)}
                            className="px-2 py-1 text-[11px] font-medium bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 text-slate-700 rounded transition-colors"
                            title={`${mult} porsiyon ekle`}
                          >
                            {mult}x
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() => handleAddSelection(food, 1.0)}
                        className="px-3 py-1 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors inline-flex items-center gap-1 shadow-2xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Ekle
                      </button>
                    </div>
                  </div>
                );
              })}

              {filteredFoods.length === 0 && (
                <div className="col-span-2 py-12 text-center text-slate-400">
                  <p className="text-sm">Aradığınız kriterde besin bulunamadı.</p>
                  <button
                    onClick={() => setIsCreatingCustom(true)}
                    className="mt-2 text-xs font-semibold text-emerald-600 hover:underline"
                  >
                    + Bu besini özel olarak eklemek için tıklayın
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
