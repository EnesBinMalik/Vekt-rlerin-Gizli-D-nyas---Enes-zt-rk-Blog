import { DayOfWeek, DietProgram, MealPlanItem, MealType } from '../types/diet';
import { INITIAL_FOOD_DATABASE } from './foodDatabase';

const findFood = (id: string) => INITIAL_FOOD_DATABASE.find(f => f.id === id)!;

const createPlanItem = (
  foodId: string,
  multiplier: number = 1.0,
  notes?: string
): MealPlanItem => {
  const food = findFood(foodId);
  return {
    id: `item_${Math.random().toString(36).slice(2, 9)}`,
    foodId: food.id,
    name: food.name,
    category: food.category,
    portionMultiplier: multiplier,
    servingSize: food.servingSize,
    calories: Math.round(food.calories * multiplier),
    protein: Math.round(food.protein * multiplier * 10) / 10,
    carbs: Math.round(food.carbs * multiplier * 10) / 10,
    fat: Math.round(food.fat * multiplier * 10) / 10,
    fiber: Math.round(food.fiber * multiplier * 10) / 10,
    notes,
  };
};

// Standard Mediterranean Day
const getMedDay = (): Record<MealType, MealPlanItem[]> => ({
  breakfast: [
    createPlanItem('food_1', 2), // 2 haşlanmış yumurta
    createPlanItem('food_4', 1), // Beyaz peynir
    createPlanItem('food_5', 1), // Zeytin
    createPlanItem('food_7', 2), // 2 dilim tam buğday ekmeği
    createPlanItem('food_15', 1), // Domates-salatalık
  ],
  morning_snack: [
    createPlanItem('food_29', 1), // Yeşil elma
    createPlanItem('food_34', 1), // 12 adet badem
  ],
  lunch: [
    createPlanItem('food_16', 1), // Izgara tavuk
    createPlanItem('food_22', 1), // Bulgur pilavı
    createPlanItem('food_12', 1), // Akdeniz salatası
    createPlanItem('food_28', 1), // Yayık ayranı
  ],
  afternoon_snack: [
    createPlanItem('food_26', 1), // Süzme yoğurt
    createPlanItem('food_31', 1), // Çilek & yaban mersini
    createPlanItem('food_36', 1), // Chia tohumu
  ],
  dinner: [
    createPlanItem('food_11', 1), // Zeytinyağlı taze fasulye
    createPlanItem('food_21', 1), // Mercimek çorbası
    createPlanItem('food_12', 1), // Salata
    createPlanItem('food_7', 1), // 1 dilim ekmek
  ],
  night_snack: [
    createPlanItem('food_37', 1), // Şekersiz yeşil çay
    createPlanItem('food_39', 1), // 2 kare bitter çikolata
  ],
});

// High Protein Athlete Day
const getProteinDay = (): Record<MealType, MealPlanItem[]> => ({
  breakfast: [
    createPlanItem('food_2', 1), // Sebzeli lorlu omlet
    createPlanItem('food_6', 1.5), // Yulaf
    createPlanItem('food_27', 1), // Kefir
    createPlanItem('food_8', 0.5), // Avokado
  ],
  morning_snack: [
    createPlanItem('food_30', 1), // Muz
    createPlanItem('food_33', 1), // Ceviz içi
  ],
  lunch: [
    createPlanItem('food_17', 1), // Somon balığı
    createPlanItem('food_24', 1.2), // Kinoa & karabuğday
    createPlanItem('food_10', 1), // Fırında brokoli
  ],
  afternoon_snack: [
    createPlanItem('food_3', 1.5), // Lor peyniri
    createPlanItem('food_29', 1), // Yeşil elma
    createPlanItem('food_38', 1), // Filtre kahve
  ],
  dinner: [
    createPlanItem('food_18', 1.2), // Yağsız ızgara köfte
    createPlanItem('food_23', 1), // Nohut yemeği
    createPlanItem('food_12', 1), // Akdeniz salata
  ],
  night_snack: [
    createPlanItem('food_26', 1), // Süzme yoğurt
  ],
});

// Intermittent Fasting Day
const getIntermittentDay = (): Record<MealType, MealPlanItem[]> => ({
  breakfast: [],
  morning_snack: [
    createPlanItem('food_37', 1, 'Açlık penceresi: Şekersiz yeşil çay'),
    createPlanItem('food_38', 1, 'Sade filtre kahve'),
  ],
  lunch: [
    createPlanItem('food_16', 1.2), // Tavuk göğsü
    createPlanItem('food_21', 1), // Mercimek çorbası
    createPlanItem('food_12', 1), // Salata
    createPlanItem('food_8', 1), // Avokado
  ],
  afternoon_snack: [
    createPlanItem('food_27', 1), // Kefir
    createPlanItem('food_33', 1), // Ceviz
    createPlanItem('food_31', 1), // Orman meyveleri
  ],
  dinner: [
    createPlanItem('food_17', 1), // Somon balığı
    createPlanItem('food_10', 1), // Fırın brokoli
    createPlanItem('food_22', 1), // Bulgur pilavı
  ],
  night_snack: [],
});

const generateWeekSchedule = (
  dayGenerator: () => Record<MealType, MealPlanItem[]>
): Record<DayOfWeek, Record<MealType, MealPlanItem[]>> => ({
  mon: dayGenerator(),
  tue: dayGenerator(),
  wed: dayGenerator(),
  thu: dayGenerator(),
  fri: dayGenerator(),
  sat: dayGenerator(),
  sun: dayGenerator(),
});

export const SAMPLE_PROGRAMS: DietProgram[] = [
  {
    id: 'prog_mediterranean',
    title: 'Akdeniz Tipi Dengeli Yaşam',
    subtitle: 'Enes Öztürk İmzalı Klasik Bütünsel Beslenme',
    targetCalories: 1850,
    targetProtein: 95,
    targetCarbs: 210,
    targetFat: 68,
    targetFiber: 34,
    targetWaterLiters: 2.5,
    focusTag: 'Sürdürülebilir & Sağlıklı Yaşam',
    description:
      'Kalp sağlığını destekleyen, bol lifli sebzeler, zeytinyağı, kaliteli protein ve bakliyatlarla dengelenmiş uzun vadeli sürdürülebilir beslenme modeli.',
    weeklySchedule: generateWeekSchedule(getMedDay),
    createdAt: '2026-10-01',
  },
  {
    id: 'prog_high_protein',
    title: 'Yüksek Protein & Atletik Güç',
    subtitle: 'Kas Koruma & Yağ Yakımı Odaklı Sporcu Menüsü',
    targetCalories: 2250,
    targetProtein: 145,
    targetCarbs: 230,
    targetFat: 75,
    targetFiber: 30,
    targetWaterLiters: 3.2,
    focusTag: 'Kas Gelişimi & Performans',
    description:
      'Yüksek biyoyararlanıma sahip protein kaynakları, kompleks karbonhidratlar ve kaliteli yağlarla antrenman verimini ve tokluk süresini maksimize eden plan.',
    weeklySchedule: generateWeekSchedule(getProteinDay),
    createdAt: '2026-10-05',
  },
  {
    id: 'prog_intermittent_fasting',
    title: 'Aralıklı Oruç (16:8) Metabolik Reset',
    subtitle: 'Hücresel Yenilenme & İnsülin Dengesi',
    targetCalories: 1680,
    targetProtein: 105,
    targetCarbs: 155,
    targetFat: 65,
    targetFiber: 28,
    targetWaterLiters: 3.0,
    focusTag: 'Hızlı Yağ Yakımı & Canlılık',
    description:
      '12:00 - 20:00 saatleri arasındaki 8 saatlik beslenme penceresinde kaliteli mikro ve makro besinlerle metabolizmayı hızlandıran etkili oruç rutini.',
    weeklySchedule: generateWeekSchedule(getIntermittentDay),
    createdAt: '2026-10-10',
  },
];
