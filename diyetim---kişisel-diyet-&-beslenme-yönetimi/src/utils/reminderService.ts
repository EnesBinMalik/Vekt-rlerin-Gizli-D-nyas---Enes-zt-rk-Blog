import { MealReminder } from '../types/diet';

export const DEFAULT_REMINDERS: MealReminder[] = [
  {
    id: 'rem_breakfast',
    mealType: 'breakfast',
    title: 'Kahvaltı Vakti',
    time: '08:30',
    isEnabled: true,
    days: [0, 1, 2, 3, 4, 5, 6],
    soundEnabled: true,
    message: 'Güne enerjik bir başlangıç için besleyici kahvaltınızı yapma zamanı!',
  },
  {
    id: 'rem_morning_snack',
    mealType: 'morning_snack',
    title: 'Kuşluk Ara Öğünü',
    time: '11:00',
    isEnabled: true,
    days: [1, 2, 3, 4, 5],
    soundEnabled: true,
    message: 'Kan şekerinizi dengede tutmak için meyve ve kuruyemiş ara öğününüzü unutmayın.',
  },
  {
    id: 'rem_lunch',
    mealType: 'lunch',
    title: 'Öğle Yemeği Vakti',
    time: '13:00',
    isEnabled: true,
    days: [0, 1, 2, 3, 4, 5, 6],
    soundEnabled: true,
    message: 'Öğle menünüz hazır. Dengeli protein ve sebze tabağınız sizi bekliyor.',
  },
  {
    id: 'rem_afternoon_snack',
    mealType: 'afternoon_snack',
    title: 'İkindi Ara Öğünü',
    time: '16:30',
    isEnabled: true,
    days: [0, 1, 2, 3, 4, 5, 6],
    soundEnabled: true,
    message: 'Akşam öncesi tokluk sürenizi uzatmak için sağlıklı ara öğün ve 1 bardak su zamanı.',
  },
  {
    id: 'rem_dinner',
    mealType: 'dinner',
    title: 'Akşam Yemeği Vakti',
    time: '19:30',
    isEnabled: true,
    days: [0, 1, 2, 3, 4, 5, 6],
    soundEnabled: true,
    message: 'Sindirim sisteminizi yormayacak hafif ve doyurucu akşam yemeği saati.',
  },
  {
    id: 'rem_night_snack',
    mealType: 'night_snack',
    title: 'Gece Dinlenme & Bitki Çayı',
    time: '21:30',
    isEnabled: false,
    days: [0, 1, 2, 3, 4, 5, 6],
    soundEnabled: false,
    message: 'Günü kapatırken sindirimi destekleyici yeşil çay veya papatya çayı içebilirsiniz.',
  },
];

/**
 * Plays a pleasant acoustic chime using the Web Audio API.
 * Guaranteed to work without external asset dependencies.
 */
export function playMealChimeSound(): void {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const playTone = (freq: number, startDelay: number, duration: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + startDelay);

      // Smooth chime envelope
      gain.gain.setValueAtTime(0.001, ctx.currentTime + startDelay);
      gain.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + startDelay + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startDelay + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + startDelay);
      osc.stop(ctx.currentTime + startDelay + duration);
    };

    // Melodic ascending chime (E5, G#5, B5, E6)
    playTone(659.25, 0.0, 0.6);
    playTone(830.61, 0.15, 0.7);
    playTone(987.77, 0.30, 0.8);
    playTone(1318.51, 0.45, 1.2);
  } catch {
    // Audio context may fail if user hasn't interacted yet
  }
}

/**
 * Request browser notification permission
 */
export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) {
    return 'denied';
  }
  if (Notification.permission === 'granted') {
    return 'granted';
  }
  return await Notification.requestPermission();
}

/**
 * Dispatches a native browser notification
 */
export function sendDesktopNotification(title: string, body: string): void {
  if ('Notification' in window && Notification.permission === 'granted') {
    try {
      new Notification(`Diyetim: ${title}`, {
        body,
        icon: '/favicon.ico',
        tag: 'diyetim-meal-reminder',
      });
    } catch {
      // Ignore if in restricted context
    }
  }
}
