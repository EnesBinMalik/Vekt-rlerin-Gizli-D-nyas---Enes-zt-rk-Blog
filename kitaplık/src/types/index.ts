export type BookGenre =
  | 'Roman'
  | 'Klasik'
  | 'Bilim Kurgu'
  | 'Polisiye & Gerilim'
  | 'Felsefe'
  | 'Tarih'
  | 'Psikoloji'
  | 'Şiir'
  | 'Biyografi & Anı'
  | 'Fantastik'
  | 'Kişisel Gelişim'
  | 'Deneme & İnceleme';

export const ALL_GENRES: BookGenre[] = [
  'Roman',
  'Klasik',
  'Bilim Kurgu',
  'Polisiye & Gerilim',
  'Felsefe',
  'Tarih',
  'Psikoloji',
  'Şiir',
  'Biyografi & Anı',
  'Fantastik',
  'Kişisel Gelişim',
  'Deneme & İnceleme',
];

export type ReadingStatus = 'okudum' | 'okuyorum' | 'okuyacagim';

export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  favoriteQuote?: string;
  favoriteQuoteAuthor?: string;
  location?: string;
  joinedDate: string;
  badge?: string;
  readingGoal: {
    target: number;
    current: number;
    year: number;
  };
  stats: {
    booksRead: number;
    reviewsCount: number;
    followersCount: number;
    followingCount: number;
  };
}

export interface FavoriteBook {
  id: string;
  userId: string;
  userName: string;
  userUsername: string;
  userAvatar: string;
  title: string;
  author: string;
  genre: BookGenre;
  rating: number; // 1-5
  status: ReadingStatus;
  pageCount?: number;
  coverColor: string; // e.g. "from-amber-700 to-amber-950"
  coverImage?: string;
  reviewNote?: string;
  favoriteQuote?: string;
  addedAt: string;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userUsername: string;
  userAvatar: string;
  content: string;
  createdAt: string;
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userUsername: string;
  userAvatar: string;
  userBadge?: string;
  bookTitle: string;
  bookAuthor: string;
  bookGenre: BookGenre;
  rating: number; // 1-5
  content: string;
  quote?: string;
  pageCount?: number;
  photoUrl?: string;
  likes: string[]; // user IDs
  comments: Comment[];
  isSpoiler?: boolean;
  readStatus?: ReadingStatus;
  createdAt: string;
}

export type ViewTab = 'feed' | 'explore' | 'favorites' | 'community' | 'profile';
