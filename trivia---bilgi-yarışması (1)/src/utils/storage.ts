import { GameResult, PlayerStats } from '../types/trivia';

const STORAGE_KEY_HIGH_SCORE = 'trivia_high_score';
const STORAGE_KEY_STATS = 'trivia_player_stats';
const STORAGE_KEY_HISTORY = 'trivia_game_history';
const STORAGE_KEY_SOUND = 'trivia_sound_setting';

export function getStoredHighScore(): number {
  try {
    const val = localStorage.getItem(STORAGE_KEY_HIGH_SCORE);
    return val ? parseInt(val, 10) : 0;
  } catch {
    return 0;
  }
}

export function saveHighScore(score: number): boolean {
  try {
    const currentHigh = getStoredHighScore();
    if (score > currentHigh) {
      localStorage.setItem(STORAGE_KEY_HIGH_SCORE, score.toString());
      return true; // New record
    }
    return false;
  } catch {
    return false;
  }
}

export function getStoredStats(): PlayerStats {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_STATS);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // fallback
  }
  return {
    highScore: getStoredHighScore(),
    gamesPlayed: 0,
    totalCorrect: 0,
    totalQuestions: 0,
    totalTimeouts: 0,
    bestStreak: 0,
  };
}

export function saveGameResult(result: GameResult): { isNewHighScore: boolean; updatedStats: PlayerStats } {
  let isNewHighScore = false;
  const currentHigh = getStoredHighScore();
  if (result.score > currentHigh) {
    isNewHighScore = true;
    try {
      localStorage.setItem(STORAGE_KEY_HIGH_SCORE, result.score.toString());
    } catch {
      // ignore
    }
  }

  // Update Stats
  const stats = getStoredStats();
  stats.gamesPlayed += 1;
  stats.totalCorrect += result.correctCount;
  stats.totalQuestions += result.totalQuestions;
  stats.totalTimeouts += result.timeoutCount;
  stats.highScore = Math.max(stats.highScore, result.score);
  stats.bestStreak = Math.max(stats.bestStreak, result.bestStreak);

  try {
    localStorage.setItem(STORAGE_KEY_STATS, JSON.stringify(stats));
  } catch {
    // ignore
  }

  // Update History (keep up to 30 past games)
  try {
    const history = getStoredHistory();
    history.unshift(result);
    if (history.length > 30) history.pop();
    localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(history));
  } catch {
    // ignore
  }

  return { isNewHighScore, updatedStats: stats };
}

export function getStoredHistory(): GameResult[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_HISTORY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // ignore
  }
  return [];
}

export function getSoundSetting(): boolean {
  try {
    const val = localStorage.getItem(STORAGE_KEY_SOUND);
    return val !== null ? val === 'true' : true; // Default sound enabled
  } catch {
    return true;
  }
}

export function saveSoundSetting(enabled: boolean) {
  try {
    localStorage.setItem(STORAGE_KEY_SOUND, enabled.toString());
  } catch {
    // ignore
  }
}
