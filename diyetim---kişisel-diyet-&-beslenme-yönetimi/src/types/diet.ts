export type FoodCategory =
  | 'vegetable' // Sebzeler & Yeşillikler
  | 'fruit' // Meyveler
  | 'protein' // Et, Tavuk, Balık, Yumurta
  | 'grain' // Tahıllar, Ekmek, Bakliyat
  | 'dairy' // Süt, Yoğurt, Peynir
  | 'healthy_fat' // Kuruyemiş, Zeytinyağı, Tohumlar
  | 'snack_drink'; // İçecekler, Sağlıklı Atıştırmalıklar

export type MealType =
  | 'breakfast' // Kahvaltı
  | 'morning_snack' // Kuşluk (Ara Öğün 1)
  | 'lunch' // Öğle Yemeği
  | 'afternoon_snack' // İkindi (Ara Öğün 2)
  | 'dinner' // Akşam Yemeği
  | 'night_snack'; // Gece Ara Öğünü

export interface FoodItem {
  id: string;
  name: string;
  category: FoodCategory;
  servingSize: string; // e.g. "100g", "1 porsiyon (150g)", "1 dilim (30g)", "1 adet"
  servingGrams: number;
  calories: number; // kcal
  protein: number; // g
  carbs: number; // g
  fat: number; // g
  fiber: number; // g
  waterMl?: number;
  isCustom?: boolean;
}

export interface MealPlanItem {
  id: string;
  foodId: string;
  name: string;
  category: FoodCategory;
  portionMultiplier: number; // e.g. 1.0, 1.5, 2.0
  servingSize: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  notes?: string;
}

export type DayOfWeek = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export interface DietProgram {
  id: string;
  title: string;
  subtitle: string;
  targetCalories: number;
  targetProtein: number; // g
  targetCarbs: number; // g
  targetFat: number; // g
  targetFiber: number; // g
  targetWaterLiters: number;
  focusTag: string;
  description: string;
  weeklySchedule: Record<DayOfWeek, Record<MealType, MealPlanItem[]>>;
  isCustom?: boolean;
  createdAt: string;
}

export interface MealReminder {
  id: string;
  mealType: MealType;
  title: string;
  time: string; // "HH:MM" 24h format
  isEnabled: boolean;
  days: number[]; // 0 for Sun, 1 for Mon, ..., 6 for Sat
  soundEnabled: boolean;
  message: string;
  lastTriggeredDate?: string; // YYYY-MM-DD
}

export interface DailyLogEntry {
  id: string;
  date: string; // "YYYY-MM-DD"
  meals: Record<MealType, MealPlanItem[]>;
  waterGlasses: number; // 250ml each
  notes?: string;
  feeling?: 'harika' | 'iyi' | 'orta' | 'yorgun';
}

export interface NutritionSummary {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  waterLiters: number;
}

export interface FoodGroupStat {
  category: FoodCategory;
  nameTr: string;
  count: number;
  portionShare: number; // percentage
  calories: number;
  color: string;
  bgLight: string;
}

export interface UserPreferences {
  userName: string;
  age: number;
  weightKg: number;
  heightCm: number;
  targetWeightKg: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active';
  gender: 'female' | 'male';
  dailyCalorieTarget: number;
  dailyWaterTargetLiters: number;
  activeProgramId: string;
}
