import { DailyLogEntry, FoodCategory, FoodGroupStat, MealPlanItem, MealType, NutritionSummary } from '../types/diet';
import { CATEGORY_LABELS } from '../data/foodDatabase';

export function calculateMealNutrition(items: MealPlanItem[]): NutritionSummary {
  return items.reduce(
    (acc, item) => ({
      calories: acc.calories + item.calories,
      protein: Math.round((acc.protein + item.protein) * 10) / 10,
      carbs: Math.round((acc.carbs + item.carbs) * 10) / 10,
      fat: Math.round((acc.fat + item.fat) * 10) / 10,
      fiber: Math.round((acc.fiber + item.fiber) * 10) / 10,
      waterLiters: 0,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, waterLiters: 0 }
  );
}

export function calculateDailyNutrition(log: DailyLogEntry): NutritionSummary {
  let calories = 0;
  let protein = 0;
  let carbs = 0;
  let fat = 0;
  let fiber = 0;

  const mealKeys: MealType[] = ['breakfast', 'morning_snack', 'lunch', 'afternoon_snack', 'dinner', 'night_snack'];
  for (const m of mealKeys) {
    const items = log.meals[m] || [];
    for (const item of items) {
      calories += item.calories;
      protein += item.protein;
      carbs += item.carbs;
      fat += item.fat;
      fiber += item.fiber;
    }
  }

  const waterLiters = (log.waterGlasses * 250) / 1000;

  return {
    calories: Math.round(calories),
    protein: Math.round(protein * 10) / 10,
    carbs: Math.round(carbs * 10) / 10,
    fat: Math.round(fat * 10) / 10,
    fiber: Math.round(fiber * 10) / 10,
    waterLiters: Math.round(waterLiters * 10) / 10,
  };
}

export interface DetailedReportStats {
  daysCount: number;
  totalCalories: number;
  avgCalories: number;
  totalProtein: number;
  avgProtein: number;
  totalCarbs: number;
  avgCarbs: number;
  totalFat: number;
  avgFat: number;
  totalFiber: number;
  avgFiber: number;
  totalWaterLiters: number;
  avgWaterLiters: number;

  macroRatios: {
    proteinPct: number;
    carbsPct: number;
    fatPct: number;
  };

  foodGroupStats: FoodGroupStat[];
  topFoods: Array<{ name: string; category: FoodCategory; count: number; totalCalories: number }>;
  dominantCategory: FoodGroupStat | null;
  habitSummary: string;
  recommendations: string[];
  goalComplianceScore: number;
}

export function generateDietReport(
  logs: DailyLogEntry[],
  calorieTarget: number = 2000,
  waterTarget: number = 2.5
): DetailedReportStats {
  if (logs.length === 0) {
    return {
      daysCount: 0,
      totalCalories: 0,
      avgCalories: 0,
      totalProtein: 0,
      avgProtein: 0,
      totalCarbs: 0,
      avgCarbs: 0,
      totalFat: 0,
      avgFat: 0,
      totalFiber: 0,
      avgFiber: 0,
      totalWaterLiters: 0,
      avgWaterLiters: 0,
      macroRatios: { proteinPct: 0, carbsPct: 0, fatPct: 0 },
      foodGroupStats: [],
      topFoods: [],
      dominantCategory: null,
      habitSummary: 'Henüz yeterli besin kaydı bulunmamaktadır. Günlük öğünlerinizi kaydettikçe burada detaylı analiz oluşacaktır.',
      recommendations: ['Günlük öğünlerinizi eksiksiz kaydedin.'],
      goalComplianceScore: 0,
    };
  }

  let totalCalories = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFat = 0;
  let totalFiber = 0;
  let totalWater = 0;

  const categoryCounts: Record<FoodCategory, { count: number; calories: number }> = {
    vegetable: { count: 0, calories: 0 },
    fruit: { count: 0, calories: 0 },
    protein: { count: 0, calories: 0 },
    grain: { count: 0, calories: 0 },
    dairy: { count: 0, calories: 0 },
    healthy_fat: { count: 0, calories: 0 },
    snack_drink: { count: 0, calories: 0 },
  };

  const foodUsageMap: Record<string, { name: string; category: FoodCategory; count: number; totalCalories: number }> = {};

  const mealKeys: MealType[] = ['breakfast', 'morning_snack', 'lunch', 'afternoon_snack', 'dinner', 'night_snack'];

  let totalItemsCount = 0;

  for (const log of logs) {
    const dailyNut = calculateDailyNutrition(log);
    totalCalories += dailyNut.calories;
    totalProtein += dailyNut.protein;
    totalCarbs += dailyNut.carbs;
    totalFat += dailyNut.fat;
    totalFiber += dailyNut.fiber;
    totalWater += dailyNut.waterLiters;

    for (const m of mealKeys) {
      const items = log.meals[m] || [];
      for (const item of items) {
        totalItemsCount += 1;
        const cat = item.category || 'vegetable';
        if (categoryCounts[cat]) {
          categoryCounts[cat].count += 1;
          categoryCounts[cat].calories += item.calories;
        }

        if (!foodUsageMap[item.name]) {
          foodUsageMap[item.name] = {
            name: item.name,
            category: item.category,
            count: 0,
            totalCalories: 0,
          };
        }
        foodUsageMap[item.name].count += 1;
        foodUsageMap[item.name].totalCalories += item.calories;
      }
    }
  }

  const daysCount = logs.length;
  const avgCalories = Math.round(totalCalories / daysCount);
  const avgProtein = Math.round((totalProtein / daysCount) * 10) / 10;
  const avgCarbs = Math.round((totalCarbs / daysCount) * 10) / 10;
  const avgFat = Math.round((totalFat / daysCount) * 10) / 10;
  const avgFiber = Math.round((totalFiber / daysCount) * 10) / 10;
  const avgWaterLiters = Math.round((totalWater / daysCount) * 10) / 10;

  // Macro Energy Ratios: Protein: 4kcal/g, Carbs: 4kcal/g, Fat: 9kcal/g
  const proteinKcal = totalProtein * 4;
  const carbsKcal = totalCarbs * 4;
  const fatKcal = totalFat * 9;
  const macroTotalKcal = proteinKcal + carbsKcal + fatKcal || 1;

  const proteinPct = Math.round((proteinKcal / macroTotalKcal) * 100);
  const carbsPct = Math.round((carbsKcal / macroTotalKcal) * 100);
  const fatPct = Math.round((fatKcal / macroTotalKcal) * 100);

  // Food Group Stats
  const foodGroupStats: FoodGroupStat[] = (Object.keys(categoryCounts) as FoodCategory[])
    .map(cat => {
      const info = CATEGORY_LABELS[cat];
      const count = categoryCounts[cat].count;
      const share = totalItemsCount > 0 ? Math.round((count / totalItemsCount) * 100) : 0;
      return {
        category: cat,
        nameTr: info.label,
        count,
        portionShare: share,
        calories: categoryCounts[cat].calories,
        color: info.color,
        bgLight: info.bg,
      };
    })
    .sort((a, b) => b.count - a.count);

  const dominantCategory = foodGroupStats[0] || null;

  // Top Consumed Foods
  const topFoods = Object.values(foodUsageMap)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Goal Compliance Score calculation
  const calDeltaRatio = Math.abs(avgCalories - calorieTarget) / calorieTarget;
  const calScore = Math.max(0, 100 - calDeltaRatio * 100);
  const waterScore = Math.min(100, (avgWaterLiters / waterTarget) * 100);
  const fiberScore = Math.min(100, (avgFiber / 25) * 100);
  const goalComplianceScore = Math.round(calScore * 0.4 + waterScore * 0.3 + fiberScore * 0.3);

  // Personalized Expert Dietitian Assessment (Enes Öztürk İmzasıyla)
  const habitSummary = `Geçtiğimiz ${daysCount} günlük kayıt verilerinize göre, beslenme alışkanlığınızda en ağırlıklı tercih edilen grup %${dominantCategory ? dominantCategory.portionShare : 0} pay ile "${dominantCategory ? dominantCategory.nameTr : 'Dengeli'}" olmuştur. Günlük ortalama ${avgCalories.toLocaleString('tr-TR')} kcal tüketiminiz bulunmaktadır. Makro besin dağılımınız %${proteinPct} Protein, %${carbsPct} Karbonhidrat ve %${fatPct} Sağlıklı Yağ olarak şekillenmiştir.`;

  const recommendations: string[] = [];
  if (avgFiber < 25) {
    recommendations.push(
      `Günlük ortalama lif alımınız (${avgFiber}g) ideal seviyenin (25-30g) altındadır. Öğünlerinize daha fazla çiğ yeşillik, taze bakliyat ve tam tahıl eklemeniz sindirim ve tokluk açısından faydalı olacaktır.`
    );
  } else {
    recommendations.push(
      `Mükemmel lif alımı! Günlük ortalama ${avgFiber}g lif tüketerek bağırsak mikrobiyotanızı ve uzun süreli tokluk hissinizi başarıyla koruyorsunuz.`
    );
  }

  if (avgWaterLiters < waterTarget) {
    recommendations.push(
      `Sıvı tüketiminiz (${avgWaterLiters} L) hedeflenen ${waterTarget} L seviyesinin altında. Yemek hatırlatıcılarınızdaki su alarmlarını aktif tutarak tüketimi artırabilirsiniz.`
    );
  } else {
    recommendations.push(
      `Harika hidrasyon! Günlük ${avgWaterLiters} L su tüketerek metabolik toksin atımını ve yağ oksidasyonunu üst düzeyde destekliyorsunuz.`
    );
  }

  if (proteinPct < 20) {
    recommendations.push(
      'Protein oranınız (% ' + proteinPct + ') kas kütlesinin korunması için bir miktar artırılabilir. Kahvaltıya yumurta veya lor, ana öğünlere ızgara balık/tavuk ekleyebilirsiniz.'
    );
  } else {
    recommendations.push(
      `Dengeli protein dağılımı: Toplam enerjinizin %${proteinPct}'i proteinden gelmektedir. Bu oran kas onarımı ve termik etki için oldukça uygundur.`
    );
  }

  return {
    daysCount,
    totalCalories: Math.round(totalCalories),
    avgCalories,
    totalProtein: Math.round(totalProtein * 10) / 10,
    avgProtein,
    totalCarbs: Math.round(totalCarbs * 10) / 10,
    avgCarbs,
    totalFat: Math.round(totalFat * 10) / 10,
    avgFat,
    totalFiber: Math.round(totalFiber * 10) / 10,
    avgFiber,
    totalWaterLiters: Math.round(totalWater * 10) / 10,
    avgWaterLiters,
    macroRatios: { proteinPct, carbsPct, fatPct },
    foodGroupStats,
    topFoods,
    dominantCategory,
    habitSummary,
    recommendations,
    goalComplianceScore,
  };
}
