import { DailyLogEntry, MealPlanItem, MealType } from '../types/diet';
import { INITIAL_FOOD_DATABASE } from './foodDatabase';

const findFood = (id: string) => INITIAL_FOOD_DATABASE.find(f => f.id === id)!;

const createLogItem = (foodId: string, multiplier = 1.0): MealPlanItem => {
  const f = findFood(foodId);
  return {
    id: `hist_${Math.random().toString(36).slice(2, 9)}`,
    foodId: f.id,
    name: f.name,
    category: f.category,
    portionMultiplier: multiplier,
    servingSize: f.servingSize,
    calories: Math.round(f.calories * multiplier),
    protein: Math.round(f.protein * multiplier * 10) / 10,
    carbs: Math.round(f.carbs * multiplier * 10) / 10,
    fat: Math.round(f.fat * multiplier * 10) / 10,
    fiber: Math.round(f.fiber * multiplier * 10) / 10,
  };
};

/**
 * Returns past 10 days of realistic diet logs
 */
export function generateInitialHistory(): DailyLogEntry[] {
  const history: DailyLogEntry[] = [];
  const today = new Date();

  const presets: Array<{
    meals: Record<MealType, MealPlanItem[]>;
    water: number;
    feeling: 'harika' | 'iyi' | 'orta' | 'yorgun';
    notes: string;
  }> = [
    // Day 0 (Today)
    {
      meals: {
        breakfast: [
          createLogItem('food_1', 2), // 2 yumurta
          createLogItem('food_4', 1), // Beyaz peynir
          createLogItem('food_5', 1), // Zeytin
          createLogItem('food_7', 2), // 2 dilim ekmek
          createLogItem('food_15', 1), // Domates-salatalık
        ],
        morning_snack: [
          createLogItem('food_29', 1), // Yeşil elma
          createLogItem('food_34', 1), // Badem
        ],
        lunch: [
          createLogItem('food_16', 1), // Tavuk göğsü
          createLogItem('food_22', 1), // Bulgur
          createLogItem('food_12', 1), // Salata
          createLogItem('food_28', 1), // Ayran
        ],
        afternoon_snack: [
          createLogItem('food_26', 1), // Süzme yoğurt
          createLogItem('food_31', 1), // Çilek
        ],
        dinner: [
          createLogItem('food_11', 1), // Taze fasulye
          createLogItem('food_21', 1), // Mercimek çorbası
          createLogItem('food_12', 1), // Akdeniz salatası
        ],
        night_snack: [
          createLogItem('food_37', 1), // Yeşil çay
        ],
      },
      water: 9, // 2.25L
      feeling: 'harika',
      notes: 'Öğün saatlerine tam uyuldu, tokluk hissi gün boyu devam etti.',
    },
    // Day -1
    {
      meals: {
        breakfast: [
          createLogItem('food_2', 1), // Lorlu omlet
          createLogItem('food_7', 1), // Ekmek
          createLogItem('food_8', 0.5), // Avokado
          createLogItem('food_15', 1),
        ],
        morning_snack: [
          createLogItem('food_30', 1), // Muz
          createLogItem('food_33', 1), // Ceviz
        ],
        lunch: [
          createLogItem('food_18', 1.2), // Izgara köfte
          createLogItem('food_10', 1), // Fırın brokoli
          createLogItem('food_26', 1), // Yoğurt
        ],
        afternoon_snack: [
          createLogItem('food_27', 1), // Kefir
          createLogItem('food_34', 1), // Badem
        ],
        dinner: [
          createLogItem('food_9', 1), // Ispanak
          createLogItem('food_22', 1), // Bulgur
          createLogItem('food_28', 1), // Ayran
        ],
        night_snack: [
          createLogItem('food_37', 1),
          createLogItem('food_39', 1), // Bitter çikolata
        ],
      },
      water: 10,
      feeling: 'iyi',
      notes: 'Akşam hafif tutuldu, sindirim rahat.',
    },
    // Day -2
    {
      meals: {
        breakfast: [
          createLogItem('food_6', 1), // Yulaf
          createLogItem('food_26', 1), // Yoğurt
          createLogItem('food_31', 1), // Çilek
          createLogItem('food_36', 1), // Chia
        ],
        morning_snack: [
          createLogItem('food_38', 1), // Kahve
          createLogItem('food_34', 1), // Badem
        ],
        lunch: [
          createLogItem('food_17', 1), // Fırın somon
          createLogItem('food_24', 1), // Kinoa
          createLogItem('food_12', 1), // Salata
        ],
        afternoon_snack: [
          createLogItem('food_29', 1), // Elma
          createLogItem('food_3', 1), // Lor
        ],
        dinner: [
          createLogItem('food_23', 1), // Nohut yemeği
          createLogItem('food_28', 1), // Ayran
          createLogItem('food_13', 1), // Köz kapya
        ],
        night_snack: [],
      },
      water: 8,
      feeling: 'harika',
      notes: 'Omega-3 zengin öğünler, enerji düzeyi yüksek.',
    },
    // Day -3
    {
      meals: {
        breakfast: [
          createLogItem('food_1', 2),
          createLogItem('food_4', 1),
          createLogItem('food_7', 2),
          createLogItem('food_5', 1),
        ],
        morning_snack: [
          createLogItem('food_27', 1), // Kefir
        ],
        lunch: [
          createLogItem('food_19', 1), // Hindi but fırın
          createLogItem('food_21', 1), // Mercimek çorbası
          createLogItem('food_12', 1),
        ],
        afternoon_snack: [
          createLogItem('food_40', 1), // İncir ceviz
          createLogItem('food_37', 1),
        ],
        dinner: [
          createLogItem('food_14', 1.5), // Enginar kalbi
          createLogItem('food_26', 1), // Yoğurt
          createLogItem('food_7', 1),
        ],
        night_snack: [
          createLogItem('food_37', 1),
        ],
      },
      water: 9,
      feeling: 'iyi',
      notes: 'Sebze porsiyonu boldu.',
    },
    // Day -4
    {
      meals: {
        breakfast: [
          createLogItem('food_2', 1),
          createLogItem('food_15', 1),
          createLogItem('food_8', 0.5),
          createLogItem('food_7', 1),
        ],
        morning_snack: [
          createLogItem('food_29', 1),
          createLogItem('food_33', 1),
        ],
        lunch: [
          createLogItem('food_16', 1.2), // Tavuk
          createLogItem('food_22', 1),
          createLogItem('food_10', 1), // Brokoli
        ],
        afternoon_snack: [
          createLogItem('food_28', 1),
          createLogItem('food_34', 1),
        ],
        dinner: [
          createLogItem('food_25', 1), // Kuru fasulye
          createLogItem('food_12', 1),
          createLogItem('food_26', 1),
        ],
        night_snack: [],
      },
      water: 11,
      feeling: 'harika',
      notes: 'Su tüketimi çok iyi, spor sonrası toparlanma sağlandı.',
    },
    // Day -5
    {
      meals: {
        breakfast: [
          createLogItem('food_1', 2),
          createLogItem('food_4', 1),
          createLogItem('food_5', 1),
          createLogItem('food_7', 2),
        ],
        morning_snack: [
          createLogItem('food_32', 1), // Portakal
        ],
        lunch: [
          createLogItem('food_20', 1), // Ton balığı
          createLogItem('food_12', 1.5), // Büyük salata
          createLogItem('food_7', 1),
        ],
        afternoon_snack: [
          createLogItem('food_26', 1),
          createLogItem('food_31', 1),
        ],
        dinner: [
          createLogItem('food_11', 1), // Taze fasulye
          createLogItem('food_21', 1),
          createLogItem('food_28', 1),
        ],
        night_snack: [
          createLogItem('food_37', 1),
        ],
      },
      water: 8,
      feeling: 'orta',
      notes: 'Günün ortasında hafif açlık hissi oluştu, su ile desteklendi.',
    },
    // Day -6
    {
      meals: {
        breakfast: [
          createLogItem('food_6', 1.2),
          createLogItem('food_27', 1),
          createLogItem('food_30', 1),
          createLogItem('food_33', 1),
        ],
        morning_snack: [
          createLogItem('food_38', 1),
        ],
        lunch: [
          createLogItem('food_18', 1), // Köfte
          createLogItem('food_22', 1),
          createLogItem('food_15', 1),
          createLogItem('food_28', 1),
        ],
        afternoon_snack: [
          createLogItem('food_3', 1),
          createLogItem('food_29', 1),
        ],
        dinner: [
          createLogItem('food_9', 1), // Ispanak
          createLogItem('food_26', 1),
          createLogItem('food_13', 1),
        ],
        night_snack: [
          createLogItem('food_39', 1),
        ],
      },
      water: 9,
      feeling: 'harika',
      notes: 'Haftalık program disiplini mükemmel işliyor.',
    },
  ];

  for (let i = 0; i < presets.length; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];

    const preset = presets[i];
    history.push({
      id: `log_${dateStr}`,
      date: dateStr,
      meals: preset.meals,
      waterGlasses: preset.water,
      feeling: preset.feeling,
      notes: preset.notes,
    });
  }

  return history;
}
