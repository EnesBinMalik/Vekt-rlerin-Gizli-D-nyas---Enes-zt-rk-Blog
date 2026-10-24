import { INITIAL_QUESTIONS } from '../data/questions';
import { GameSettings, Question } from '../types/trivia';

// Fisher-Yates shuffle
export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function pickQuestions(settings: GameSettings, customPool?: Question[]): Question[] {
  const pool = customPool && customPool.length > 0 ? customPool : INITIAL_QUESTIONS;

  let filtered = pool.filter((q) => {
    // Filter by question type
    if (settings.questionType !== 'mixed') {
      if (q.type !== settings.questionType) return false;
    }

    // Filter by category
    if (settings.category !== 'all') {
      if (q.category !== settings.category) return false;
    }

    // Filter by difficulty
    if (settings.difficulty !== 'all') {
      if (q.difficulty !== settings.difficulty) return false;
    }

    return true;
  });

  // If filtered result has fewer questions than requested, relax difficulty filter first, then category
  if (filtered.length < settings.questionCount) {
    filtered = pool.filter((q) => {
      if (settings.questionType !== 'mixed') {
        if (q.type !== settings.questionType) return false;
      }
      if (settings.category !== 'all') {
        if (q.category !== settings.category) return false;
      }
      return true;
    });
  }

  // If still not enough, only enforce questionType
  if (filtered.length < settings.questionCount && settings.questionType !== 'mixed') {
    filtered = pool.filter((q) => q.type === settings.questionType);
  }

  // If still not enough, take whatever is available from the pool
  if (filtered.length === 0) {
    filtered = [...pool];
  }

  const shuffled = shuffleArray(filtered);
  const selected = shuffled.slice(0, Math.min(settings.questionCount, shuffled.length));

  // Also randomize options for multiple-choice questions
  return selected.map((q) => {
    if (q.type === 'multiple_choice' && q.options && q.options.length > 0) {
      return {
        ...q,
        options: shuffleArray(q.options),
      };
    }
    return q;
  });
}
