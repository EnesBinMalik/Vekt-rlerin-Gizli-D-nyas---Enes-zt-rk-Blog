import {
  WeatherData,
  LocationInfo,
  CurrentWeather,
  HourlyForecastItem,
  DailyForecastItem,
} from '../types/weather';
import { getRandomLocation } from '../data/randomLocations';

// Varsayılan Güvenilir Konum (GPS izin vermezse veya hata olursa Kadıköy, İstanbul)
export const DEFAULT_LOCATION: LocationInfo = {
  latitude: 40.9927,
  longitude: 29.0277,
  city: 'İstanbul',
  district: 'Kadıköy',
  country: 'Türkiye',
  formattedName: 'Kadıköy, İstanbul',
  isCurrentLocation: false,
};

/**
 * Verilen enlem ve boylam için Reverse Geocoding (Ters Coğrafi Kodlama) yapar.
 * İl (City/Province) ve İlçe (District/Locality) bilgilerini Türkçe olarak tespit eder.
 */
export async function reverseGeocode(latitude: number, longitude: number): Promise<{
  city: string;
  district: string;
  country: string;
  formattedName: string;
}> {
  // 1. Birincil Hızlı API: BigDataCloud Reverse Geocode Client (CORS destekli, API anahtarı gerekmez, Türkçe destekli)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4500);

    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=tr`,
      { signal: controller.signal }
    );
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const city = data.principalSubdivision || data.city || 'Bilinmeyen İl';
      const district = data.locality || data.district || city;
      const country = data.countryName || 'Türkiye';

      // Formatlı ad: "Kadıköy, İstanbul"
      const formattedName = district !== city ? `${district}, ${city}` : city;
      return { city, district, country, formattedName };
    }
  } catch (err) {
    console.warn('BigDataCloud reverse geocode uyarısı, Nominatim deneniyor:', err);
  }

  // 2. İkincil Yedek API: OpenStreetMap Nominatim
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4500);

    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=tr`,
      {
        headers: { 'User-Agent': 'Wheather-EnesOzturk-App/1.0' },
        signal: controller.signal,
      }
    );
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const addr = data.address || {};
      const city = addr.province || addr.city || addr.state || 'Bilinmeyen Şehir';
      const district = addr.suburb || addr.town || addr.district || addr.county || city;
      const country = addr.country || 'Türkiye';
      const formattedName = district !== city ? `${district}, ${city}` : city;
      return { city, district, country, formattedName };
    }
  } catch (err) {
    console.warn('Nominatim reverse geocode uyarısı:', err);
  }

  // Fallback
  return {
    city: 'Belirlenen Konum',
    district: `${latitude.toFixed(2)}°K, ${longitude.toFixed(2)}°D`,
    country: 'Türkiye',
    formattedName: `${latitude.toFixed(3)}°, ${longitude.toFixed(3)}°`,
  };
}

/**
 * Open-Meteo ücretsiz ve açık hava durumu API'sinden anlık, saatlik ve 7 günlük tahminleri çeker.
 */
export async function fetchWeatherData(location: LocationInfo): Promise<WeatherData> {
  const { latitude, longitude } = location;

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,relative_humidity_2m,weather_code,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max&timezone=auto`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Hava durumu verisi alınamadı (${res.status})`);
  }

  const data = await res.json();

  const currentRaw = data.current;
  const current: CurrentWeather = {
    temperature: Math.round(currentRaw.temperature_2m),
    apparentTemperature: Math.round(currentRaw.apparent_temperature),
    relativeHumidity: Math.round(currentRaw.relative_humidity_2m),
    surfacePressure: Math.round(currentRaw.surface_pressure),
    windSpeed: Math.round(currentRaw.wind_speed_10m),
    windDirection: currentRaw.wind_direction_10m,
    weatherCode: currentRaw.weather_code,
    isDay: currentRaw.is_day === 1,
    precipitation: currentRaw.precipitation || 0,
    uvIndex: data.daily?.uv_index_max?.[0] || 4,
    time: currentRaw.time,
  };

  // Saatlik tahmin (Sonraki 24 saat)
  const hourly: HourlyForecastItem[] = [];
  if (data.hourly && data.hourly.time) {
    const nowISO = new Date().toISOString();
    let startIndex = data.hourly.time.findIndex((t: string) => t >= nowISO.slice(0, 13));
    if (startIndex === -1) startIndex = 0;

    for (let i = startIndex; i < Math.min(startIndex + 24, data.hourly.time.length); i++) {
      hourly.push({
        time: data.hourly.time[i],
        temperature: Math.round(data.hourly.temperature_2m[i]),
        weatherCode: data.hourly.weather_code[i],
        isDay: data.hourly.is_day[i] === 1,
        humidity: data.hourly.relative_humidity_2m ? Math.round(data.hourly.relative_humidity_2m[i]) : undefined,
      });
    }
  }

  // 7 Günlük Günlük tahmin
  const daily: DailyForecastItem[] = [];
  if (data.daily && data.daily.time) {
    for (let i = 0; i < Math.min(7, data.daily.time.length); i++) {
      daily.push({
        date: data.daily.time[i],
        weatherCode: data.daily.weather_code[i],
        tempMax: Math.round(data.daily.temperature_2m_max[i]),
        tempMin: Math.round(data.daily.temperature_2m_min[i]),
        uvIndexMax: Math.round(data.daily.uv_index_max?.[i] || 0),
        sunrise: data.daily.sunrise?.[i] || '',
        sunset: data.daily.sunset?.[i] || '',
        precipitationProbability: data.daily.precipitation_probability_max?.[i] || 0,
      });
    }
  }

  return {
    current,
    hourly,
    daily,
    location,
    fetchedAt: new Date(),
  };
}

/**
 * Tarayıcı Geolocation API'si ile kullanıcının anlık konumunu otomatik tespit eder.
 */
export async function detectUserCurrentLocation(): Promise<LocationInfo> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Cihazınız konum özelliğini desteklemiyor.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          const geo = await reverseGeocode(lat, lon);
          resolve({
            latitude: lat,
            longitude: lon,
            city: geo.city,
            district: geo.district,
            country: geo.country,
            formattedName: geo.formattedName,
            isCurrentLocation: true,
          });
        } catch {
          resolve({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            city: 'Mevcut Konum',
            district: 'Saptanan İlçe',
            country: 'Türkiye',
            formattedName: 'Mevcut Konum',
            isCurrentLocation: true,
          });
        }
      },
      (err) => {
        reject(err);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  });
}

/**
 * Rastgele bir konum seçip o konumun bilgilerini hazırlar.
 */
export function getNextRandomLocation(currentName?: string): LocationInfo {
  const chosen = getRandomLocation(currentName);
  return {
    latitude: chosen.latitude,
    longitude: chosen.longitude,
    city: chosen.city,
    district: chosen.district,
    country: chosen.country,
    formattedName: chosen.name,
    isCurrentLocation: false,
    discoveredAt: chosen.tagline,
  };
}
