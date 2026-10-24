import { WeatherCategory, WeatherConditionMeta } from '../types/weather';

export function getWeatherConditionMeta(code: number, isDay: boolean = true): WeatherConditionMeta {
  // 0: Açık / Güneşli veya Açık Gece
  if (code === 0) {
    if (isDay) {
      return {
        code,
        label: 'Açık & Güneşli',
        category: 'clear',
        isDay: true,
        bgGradient: 'from-amber-500/25 via-sky-600/30 to-sky-950',
        cardBg: 'bg-white/10 border-amber-300/20 text-amber-100',
        accentColor: '#f59e0b',
        textColor: 'text-amber-200',
        shortDesc: 'Gökyüzü berrak, güneşli ve ferah bir hava hakim.',
      };
    } else {
      return {
        code,
        label: 'Açık & Yıldızlı',
        category: 'clear',
        isDay: false,
        bgGradient: 'from-indigo-900/40 via-slate-900/80 to-slate-950',
        cardBg: 'bg-indigo-950/40 border-indigo-500/20 text-indigo-100',
        accentColor: '#818cf8',
        textColor: 'text-indigo-200',
        shortDesc: 'Açık ve berrak gece, yıldızlar net şekilde görünüyor.',
      };
    }
  }

  // 1: Az Bulutlu
  if (code === 1) {
    return {
      code,
      label: isDay ? 'Çoğunlukla Açık' : 'Az Bulutlu Gece',
      category: 'partly_cloudy',
      isDay,
      bgGradient: isDay
        ? 'from-sky-500/25 via-blue-700/30 to-slate-950'
        : 'from-slate-800/40 via-indigo-950/70 to-slate-950',
      cardBg: 'bg-white/10 border-sky-400/20 text-sky-100',
      accentColor: '#38bdf8',
      textColor: 'text-sky-200',
      shortDesc: isDay ? 'Güneş ağırlıklı, hafif geçişli bulutlar var.' : 'Sakin ve yer yer hafif bulutlu gökyüzü.',
    };
  }

  // 2: Parçalı Bulutlu
  if (code === 2) {
    return {
      code,
      label: 'Parçalı Bulutlu',
      category: 'partly_cloudy',
      isDay,
      bgGradient: isDay
        ? 'from-cyan-600/25 via-slate-800/50 to-slate-950'
        : 'from-slate-800/50 via-slate-900/80 to-slate-950',
      cardBg: 'bg-white/10 border-cyan-400/20 text-cyan-100',
      accentColor: '#06b6d4',
      textColor: 'text-cyan-200',
      shortDesc: 'Zaman zaman güneş kendini gösteriyor, hafif rüzgar hissedilebilir.',
    };
  }

  // 3: Çok Bulutlu / Kapalı
  if (code === 3) {
    return {
      code,
      label: 'Kapalı & Çok Bulutlu',
      category: 'cloudy',
      isDay,
      bgGradient: 'from-slate-700/35 via-slate-800/60 to-slate-950',
      cardBg: 'bg-slate-800/40 border-slate-600/30 text-slate-200',
      accentColor: '#94a3b8',
      textColor: 'text-slate-300',
      shortDesc: 'Gökyüzü bulut örtüsüyle kaplı, ılık ve sakin bir atmosfer.',
    };
  }

  // 45, 48: Sisli
  if (code === 45 || code === 48) {
    return {
      code,
      label: code === 48 ? 'Kırağılı Yoğun Sis' : 'Sisli',
      category: 'fog',
      isDay,
      bgGradient: 'from-teal-800/25 via-zinc-800/50 to-slate-950',
      cardBg: 'bg-teal-950/30 border-teal-500/20 text-teal-100',
      accentColor: '#2dd4bf',
      textColor: 'text-teal-200',
      shortDesc: 'Görüş mesafesi düşük. Seyahat ederken dikkatli olunmalı.',
    };
  }

  // 51, 53, 55: Çisenti
  if (code >= 51 && code <= 55) {
    return {
      code,
      label: code === 51 ? 'Hafif Çisenti' : 'Çiseleyen Yağmur',
      category: 'drizzle',
      isDay,
      bgGradient: 'from-blue-700/25 via-slate-800/60 to-slate-950',
      cardBg: 'bg-blue-900/30 border-blue-400/20 text-blue-100',
      accentColor: '#60a5fa',
      textColor: 'text-blue-200',
      shortDesc: 'İnce ince çiseleyen hafif yağmur serinlik getiriyor.',
    };
  }

  // 56, 57: Dondurucu Çisenti
  if (code === 56 || code === 57) {
    return {
      code,
      label: 'Dondurucu Çisenti',
      category: 'drizzle',
      isDay,
      bgGradient: 'from-cyan-900/35 via-slate-900/70 to-slate-950',
      cardBg: 'bg-cyan-950/40 border-cyan-400/20 text-cyan-100',
      accentColor: '#a5f3fc',
      textColor: 'text-cyan-200',
      shortDesc: 'Buzlanma tehlikesi mevcut, zemin kaygan olabilir.',
    };
  }

  // 61, 63, 65, 80, 81, 82: Yağmurlu & Sağanak
  if ((code >= 61 && code <= 65) || (code >= 80 && code <= 82)) {
    const isHeavy = code === 65 || code === 82;
    return {
      code,
      label: isHeavy ? 'Şiddetli Sağanak Yağış' : 'Sağanak Yağmurlu',
      category: 'rain',
      isDay,
      bgGradient: 'from-blue-900/40 via-sky-950/60 to-slate-950',
      cardBg: 'bg-blue-950/40 border-blue-500/25 text-blue-100',
      accentColor: '#38bdf8',
      textColor: 'text-blue-200',
      shortDesc: isHeavy
        ? 'Kuvvetli yağış etkili oluyor. Şemsiyenizi yanınıza almayı unutmayın.'
        : 'Düzenli aralıklarla devam eden yağışlı bir hava.',
    };
  }

  // 66, 67: Dondurucu Yağmur
  if (code === 66 || code === 67) {
    return {
      code,
      label: 'Dondurucu Yağmur',
      category: 'rain',
      isDay,
      bgGradient: 'from-sky-900/40 via-slate-900/70 to-slate-950',
      cardBg: 'bg-sky-950/40 border-sky-400/25 text-sky-100',
      accentColor: '#7dd3fc',
      textColor: 'text-sky-200',
      shortDesc: 'Düşük sıcaklıkta yağış, yollarda gizli buzlanma riski.',
    };
  }

  // 71, 73, 75, 77, 85, 86: Kar Yağışlı
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) {
    const isHeavy = code === 75 || code === 86;
    return {
      code,
      label: isHeavy ? 'Yoğun Kar Yağışı' : 'Kar Yağışlı',
      category: 'snow',
      isDay,
      bgGradient: 'from-indigo-800/30 via-slate-800/60 to-slate-950',
      cardBg: 'bg-indigo-950/40 border-indigo-300/25 text-indigo-100',
      accentColor: '#c7d2fe',
      textColor: 'text-indigo-100',
      shortDesc: isHeavy
        ? 'Yoğun kar fırtınası beyaz bir örtü bırakıyor, sıcak giyinin.'
        : 'Hafif ve lapa lapa yağan kar manzarası.',
    };
  }

  // 95, 96, 99: Fırtına & Dolu
  if (code >= 95) {
    const hasHail = code === 96 || code === 99;
    return {
      code,
      label: hasHail ? 'Dolu & Gök Gürültülü Fırtına' : 'Gök Gürültülü Fırtına',
      category: 'thunderstorm',
      isDay,
      bgGradient: 'from-amber-700/30 via-purple-950/60 to-slate-950',
      cardBg: 'bg-purple-950/40 border-amber-500/25 text-amber-100',
      accentColor: '#f59e0b',
      textColor: 'text-amber-200',
      shortDesc: 'Şimşek ve ani rüzgar hamleleri görülebilir. Korunaklı kalın.',
    };
  }

  // Default fallback
  return {
    code,
    label: 'Ilıman',
    category: 'partly_cloudy',
    isDay,
    bgGradient: 'from-slate-800/40 via-slate-900/70 to-slate-950',
    cardBg: 'bg-slate-800/30 border-slate-700/30 text-slate-200',
    accentColor: '#38bdf8',
    textColor: 'text-slate-200',
    shortDesc: 'Hava koşulları mevsim normallerinde seyrediyor.',
  };
}

export function formatDayName(dateString: string): string {
  try {
    const date = new Date(dateString);
    const today = new Date();
    if (date.toDateString() === today.toDateString()) {
      return 'Bugün';
    }
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    if (date.toDateString() === tomorrow.toDateString()) {
      return 'Yarın';
    }
    return date.toLocaleDateString('tr-TR', { weekday: 'short' });
  } catch {
    return dateString;
  }
}

export function formatHour(timeString: string): string {
  try {
    const date = new Date(timeString);
    return date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
  } catch {
    return timeString.split('T')[1]?.slice(0, 5) || timeString;
  }
}

export function getWindDirectionText(degrees: number): string {
  const directions = ['Kuzey (K)', 'Kuzeydoğu (KD)', 'Doğu (D)', 'Güneydoğu (GD)', 'Güney (G)', 'Güneybatı (GB)', 'Batı (B)', 'Kuzeybatı (KB)'];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
}

export function getUVLevel(uvIndex: number): { label: string; color: string; advice: string } {
  if (uvIndex <= 2) return { label: 'Düşük', color: 'text-emerald-400', advice: 'Güneş korumasına gerek duyulmaz.' };
  if (uvIndex <= 5) return { label: 'Orta', color: 'text-amber-400', advice: 'Öğle saatlerinde şapka ve güneş gözlüğü önerilir.' };
  if (uvIndex <= 7) return { label: 'Yüksek', color: 'text-orange-400', advice: 'Güneş kremi kullanılması tavsiye edilir.' };
  if (uvIndex <= 10) return { label: 'Çok Yüksek', color: 'text-rose-400', advice: '11:00-16:00 arası doğrudan güneşte kalmaktan kaçının.' };
  return { label: 'Aşırı', color: 'text-purple-400', advice: 'Açık havada kalmaktan kaçının, koruyucu önlemler şart.' };
}
