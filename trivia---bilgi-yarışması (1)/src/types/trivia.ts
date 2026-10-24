export type QuestionType = 'true_false' | 'multiple_choice';
export type QuestionTypeFilter = 'true_false' | 'multiple_choice' | 'mixed';

export type Difficulty = 'easy' | 'medium' | 'hard';
export type DifficultyFilter = 'easy' | 'medium' | 'hard' | 'all';

export type Category = 
  | 'general'
  | 'history'
  | 'geography'
  | 'science'
  | 'cinema_art'
  | 'sports'
  | 'technology'
  | 'literature';

export type CategoryFilter = Category | 'all';

export interface CategoryInfo {
  id: CategoryFilter;
  label: string;
  icon: string;
  description: string;
}

export interface Question {
  id: string;
  question: string;
  type: QuestionType;
  options?: string[]; // 4 options for multiple_choice
  correctAnswer: string; // 'Doğru' | 'Yanlış' or exact text matching one option
  explanation: string;
  category: Category;
  difficulty: Difficulty;
}

export interface UserAnswerRecord {
  questionId: string;
  questionText: string;
  type: QuestionType;
  userAnswer: string | null; // null if timed out
  correctAnswer: string;
  isCorrect: boolean;
  timedOut: boolean;
  timeRemaining: number; // 0 to 12
  timeSpent: number; // 12 - timeRemaining
  pointsEarned: number;
  explanation: string;
  category: Category;
}

export interface GameSettings {
  questionCount: number; // Default 10
  questionType: QuestionTypeFilter; // Default 'true_false'
  difficulty: DifficultyFilter; // Default 'all'
  category: CategoryFilter; // Default 'all'
  timePerQuestion: number; // 12 seconds
  soundEnabled: boolean;
  customTopic?: string;
}

export interface GameResult {
  id: string;
  date: string;
  score: number;
  isHighScore: boolean;
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  timeoutCount: number;
  accuracy: number;
  totalTimeSpent: number;
  averageTime: number;
  bestStreak: number;
  settings: GameSettings;
  records: UserAnswerRecord[];
}

export interface PlayerStats {
  highScore: number;
  gamesPlayed: number;
  totalCorrect: number;
  totalQuestions: number;
  totalTimeouts: number;
  bestStreak: number;
}
