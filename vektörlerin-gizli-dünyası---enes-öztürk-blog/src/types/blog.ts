export interface Author {
  name: string;
  title: string;
  bio: string;
  avatarUrl: string;
  location: string;
  socials: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    email?: string;
  };
}

export interface TableOfContentItem {
  id: string;
  title: string;
  readTime: string;
  level: number;
}

export interface HighlightItem {
  id: string;
  text: string;
  note?: string;
  date: string;
  color: 'amber' | 'emerald' | 'sky' | 'rose';
}

export type ReaderTheme = 'light' | 'sepia' | 'dark';
export type FontSize = 'sm' | 'base' | 'lg' | 'xl';
