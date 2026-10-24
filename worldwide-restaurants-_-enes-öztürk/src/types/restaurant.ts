export type PriceLevel = '$' | '$$' | '$$$' | '$$$$';

export type Continent = 'Avrupa' | 'Asya' | 'Kuzey Amerika' | 'Güney Amerika' | 'Okyanusya' | 'Afrika';

export interface OperatingDay {
  dayName: string; // Pazartesi, Salı, vb.
  dayIndex: number; // 0: Pazar, 1: Pazartesi ... 6: Cumartesi
  isOpen: boolean;
  openTime?: string; // e.g. "12:00" or "18:30"
  closeTime?: string; // e.g. "23:30"
  lunchShift?: string; // e.g. "12:00 - 15:00"
  dinnerShift?: string; // e.g. "18:30 - 23:30"
  note?: string;
}

export interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number; // 1 to 5
  date: string;
  title: string;
  comment: string;
  recommendedDishes?: string[];
  visitType?: 'Akşam Yemeği' | 'Özel Kutlama' | 'Öğle Yemeği' | 'İş Toplantısı';
}

export interface SignatureDish {
  id: string;
  name: string;
  description: string;
  price: string;
  category: 'Başlangıç' | 'Ana Yemek' | 'Tatlı' | 'Tadım Menüsü' | 'İçecek';
  imageUrl?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  city: string;
  country: string;
  continent: Continent;
  cuisine: string;
  priceLevel: PriceLevel;
  averagePricePerPerson: string;
  rating: number;
  reviewCount: number;
  michelinStars?: 1 | 2 | 3;
  michelinGuideNote?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  address: string;
  phone: string;
  website: string;
  dressCode: string;
  reservationRequired: boolean;
  reservationDeposit?: string;
  operatingHours: OperatingDay[];
  heroImage: string;
  galleryImages: string[];
  description: string;
  features: string[];
  signatureDishes: SignatureDish[];
  reviews: Review[];
  ratingsBreakdown: {
    food: number;
    service: number;
    ambiance: number;
    value: number;
  };
}

export interface Reservation {
  id: string;
  restaurantId: string;
  restaurantName: string;
  restaurantCity: string;
  restaurantImage: string;
  date: string;
  timeSlot: string;
  guests: number;
  seatingArea: 'Ana Salon' | 'Şef Masası' | 'Manzaralı Teras' | 'Özel VIP Oda';
  specialRequests?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  status: 'Onaylandı' | 'İptal Edildi';
  createdAt: string;
}

export interface FilterState {
  searchQuery: string;
  cuisine: string;
  continent: string;
  city: string;
  priceLevel: string;
  minRating: number;
  michelinOnly: boolean;
  openNowOnly: boolean;
  sortBy: 'recommended' | 'rating' | 'reviews' | 'priceAsc' | 'priceDesc';
}
