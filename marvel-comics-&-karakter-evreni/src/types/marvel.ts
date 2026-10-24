export type Alignment = 'hero' | 'anti-hero' | 'villain';

export interface PowerGrid {
  intelligence: number; // 1-7
  strength: number;     // 1-7
  speed: number;        // 1-7
  durability: number;   // 1-7
  energyProjection: number; // 1-7
  fightingSkills: number;   // 1-7
}

export interface CharacterStory {
  id: string;
  name: string;
  type: 'cover' | 'story' | 'interiorStory';
  summary: string;
}

export interface MarvelCharacter {
  id: string;
  name: string;
  realName: string;
  alias: string;
  description: string;
  alignment: Alignment;
  teams: string[];
  powers: string[];
  powerGrid: PowerGrid;
  firstAppearance: {
    comicTitle: string;
    issueNumber: string;
    year: number;
  };
  thumbnail: string;
  comicIds: string[];
  stories: CharacterStory[];
  quote?: string;
  species: string;
  citizenship: string;
}

export interface ComicCreator {
  name: string;
  role: 'Yazar' | 'Çizer' | 'Kapak Sanatçısı' | 'Renklendirici' | 'Editör' | 'Mürekkepçi';
}

export interface ComicStory {
  id: string;
  name: string;
  type: string;
  synopsis: string;
}

export interface MarvelComic {
  id: string;
  title: string;
  issueNumber: number;
  variantDescription?: string;
  description: string;
  series: string;
  format: 'Comic' | 'Trade Paperback' | 'Hardcover' | 'Digital';
  pageCount: number;
  printPrice: number;
  onSaleDate: string;
  coverUrl: string;
  isbn?: string;
  upc?: string;
  creators: ComicCreator[];
  characterIds: string[];
  stories: ComicStory[];
  events: string[];
  rating: number; // 1 to 5
}

export type ReadingStatus = 'to-read' | 'reading' | 'completed';

export interface ReadingItem {
  comicId: string;
  status: ReadingStatus;
  addedAt: string;
  userRating?: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  favorites: string[]; // character IDs
  readingList: ReadingItem[];
  joinedAt: string;
}
