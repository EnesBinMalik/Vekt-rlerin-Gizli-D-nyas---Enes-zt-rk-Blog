export type ReadingTheme = 'paper' | 'clean' | 'dark';
export type FontSize = 'normal' | 'large' | 'larger';

export interface AuthorInfo {
  name: string;
  title: string;
  affiliation: string;
  bio: string;
  license: string;
  copyrightYear: number;
  contact: string;
}

export interface SectionItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: {
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  insight: string;
}
