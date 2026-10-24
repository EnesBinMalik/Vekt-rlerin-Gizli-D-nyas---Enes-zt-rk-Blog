export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface LocationInfo {
  latitude: number;
  longitude: number;
  city: string; // İl (e.g. İstanbul)
  district: string; // İlçe (e.g. Kadıköy)
  country: string; // Ülke
  formattedName: string; // e.g. "Kadıköy, İstanbul"
  isCurrentLocation: boolean;
  discoveredAt?: string;
}

export type WeatherCategory =
  | 'clear'
  | 'partly_cloudy'
  | 'cloudy'
  | 'fog'
  | 'drizzle'
  | 'rain'
  | 'snow'
  | 'thunderstorm'
  | 'windy';

export interface WeatherConditionMeta {
  code: number;
  label: string;
  category: WeatherCategory;
  isDay: boolean;
  bgGradient: string;
  cardBg: string;
  accentColor: string;
  textColor: string;
  shortDesc: string;
}

export interface CurrentWeather {
  temperature: number;
  apparentTemperature: number;
  relativeHumidity: number;
  surfacePressure: number;
  windSpeed: number;
  windDirection: number;
  weatherCode: number;
  isDay: boolean;
  precipitation: number;
  uvIndex?: number;
  time: string;
}

export interface HourlyForecastItem {
  time: string;
  temperature: number;
  weatherCode: number;
  isDay: boolean;
  humidity?: number;
}

export interface DailyForecastItem {
  date: string;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
  uvIndexMax: number;
  sunrise: string;
  sunset: string;
  precipitationProbability: number;
}

export interface WeatherData {
  current: CurrentWeather;
  hourly: HourlyForecastItem[];
  daily: DailyForecastItem[];
  location: LocationInfo;
  fetchedAt: Date;
}
