import { Restaurant } from '../types/restaurant';

export const INITIAL_RESTAURANTS: Restaurant[] = [
  // --- ISTANBUL, TURKEY ---
  {
    id: 'rest-mikla-istanbul',
    name: 'Mikla',
    city: 'İstanbul',
    country: 'Türkiye',
    continent: 'Avrupa',
    cuisine: 'Yeni Anadolu Mutfağı',
    priceLevel: '$$$$',
    averagePricePerPerson: '₺4.200 - ₺5.800',
    rating: 4.9,
    reviewCount: 1680,
    michelinStars: 1,
    michelinGuideNote: 'Şef Mehmet Gürs liderliğinde tarihi yarımada ve Boğaz manzarası eşliğinde çağdaş Anadolu lezzetleri.',
    coordinates: { lat: 41.0315, lng: 28.9744 },
    address: 'The Marmara Pera, Meşrutiyet Cad. No:15, Beyoğlu, İstanbul',
    phone: '+90 212 293 56 56',
    website: 'https://www.miklarestaurant.com',
    dressCode: 'Smart Casual / Şık',
    reservationRequired: true,
    reservationDeposit: 'Kişi başı ₺1.000 (iptal 48 saat öncesi ücretsiz)',
    heroImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Mikla, 2005 yılından bu yana Türk gastronomi sahnesinin öncüsüdür. Şef Mehmet Gürs’ün "Yeni Anadolu Mutfağı" manifestosuyla yerel üreticilerden temin edilen kadim malzemeler, modern tekniklerle sunulur. Terasından tarihi yarımada ve Haliç gün batımı manzarası nefes kesicidir.',
    features: ['Panoramik Boğaz Manzarası', 'Açık Teras Bar', 'Şarap Eşleşmeli Tadım Menüsü', 'Vale Park', 'Vejetaryen Tadım Menüsü'],
    operatingHours: [
      { dayName: 'Pazartesi', dayIndex: 1, isOpen: true, openTime: '18:00', closeTime: '23:30', dinnerShift: '18:00 - 23:30' },
      { dayName: 'Salı', dayIndex: 2, isOpen: true, openTime: '18:00', closeTime: '23:30', dinnerShift: '18:00 - 23:30' },
      { dayName: 'Çarşamba', dayIndex: 3, isOpen: true, openTime: '18:00', closeTime: '23:30', dinnerShift: '18:00 - 23:30' },
      { dayName: 'Perşembe', dayIndex: 4, isOpen: true, openTime: '18:00', closeTime: '23:30', dinnerShift: '18:00 - 23:30' },
      { dayName: 'Cuma', dayIndex: 5, isOpen: true, openTime: '18:00', closeTime: '00:00', dinnerShift: '18:00 - 00:00' },
      { dayName: 'Cumartesi', dayIndex: 6, isOpen: true, openTime: '18:00', closeTime: '00:00', dinnerShift: '18:00 - 00:00' },
      { dayName: 'Pazar', dayIndex: 0, isOpen: false, note: 'Pazar günleri kapalıdır' }
    ],
    signatureDishes: [
      {
        id: 'mikla-1',
        name: 'Kuru Mantı & İsli Yoğurt',
        description: 'Trakya kıvırcık kuzu dolgulu çıtır mantı, sumaklı isli yoğurt, kızgın tereyağında kavrulmuş domates özü.',
        price: '₺780',
        category: 'Başlangıç'
      },
      {
        id: 'mikla-2',
        name: 'Ahtapot & İsli Erikli Firik Pilavı',
        description: 'Odun ateşinde ızgara edilmiş Ege ahtapotu, isli Antakya firiği, taze nane ve nar ekşisi püre.',
        price: '₺1.450',
        category: 'Ana Yemek'
      },
      {
        id: 'mikla-3',
        name: 'Antep Fıstıklı Kıtır & Helva Dondurması',
        description: 'Boz fıstık kreması, tahin helvası dondurması, çıtır kadayıf tülleri ve yabani dağ çileği sosu.',
        price: '₺490',
        category: 'Tatlı'
      }
    ],
    reviews: [
      {
        id: 'rev-m1',
        author: 'Caner Öztürk',
        rating: 5,
        date: '14 Ekim 2026',
        title: 'İstanbul’da fine dining zirvesi',
        comment: 'Teras manzarası zaten büyüleyici ancak şefin 7 aşamalı tadım menüsü gerçek bir şaheser. Özellikle fırınlanmış ahtapot ve yerel şarap eşleşmeleri unutulmazdı. Servis ekibinin detay hakimiyeti kusursuzdu.',
        recommendedDishes: ['Ahtapot & Firik', 'Trakya Kuzu', 'Antep Fıstıklı Tatlı'],
        visitType: 'Özel Kutlama'
      },
      {
        id: 'rev-m2',
        author: 'Elena Rostova',
        rating: 5,
        date: '28 Eylül 2026',
        title: 'Magical sunset over the Bosphorus',
        comment: 'The combination of ancient Anatolian ingredients with contemporary precision is brilliant. Cocktails on the rooftop before dinner are a must.',
        recommendedDishes: ['Kuru Mantı', 'Tasting Menu'],
        visitType: 'Akşam Yemeği'
      },
      {
        id: 'rev-m3',
        author: 'Murat Arslan',
        rating: 4,
        date: '2 Eylül 2026',
        title: 'Lezzet ve ambiyans çok başarılı',
        comment: 'Rezervasyonu en az 3 hafta önceden yaptırmak gerekiyor. Fiyat seviyesi yüksek ama sundukları gastronomi deneyimi ve manzara bunu kesinlikle hak ediyor.',
        visitType: 'İş Toplantısı'
      }
    ],
    ratingsBreakdown: { food: 4.9, service: 4.8, ambiance: 5.0, value: 4.6 }
  },

  {
    id: 'rest-neolokal-istanbul',
    name: 'Neolokal',
    city: 'İstanbul',
    country: 'Türkiye',
    continent: 'Avrupa',
    cuisine: 'Modern Anadolu & Sürdürülebilir',
    priceLevel: '$$$$',
    averagePricePerPerson: '₺4.000 - ₺5.500',
    rating: 4.9,
    reviewCount: 1420,
    michelinStars: 1,
    michelinGuideNote: 'Şef Maksut Aşkar’ın geleneksel Türk reçetelerini sürdürülebilir felsefeyle geleceğe taşıdığı Michelin Yıldızı ve Yeşil Yıldız sahibi mekan.',
    coordinates: { lat: 41.0242, lng: 28.9739 },
    address: 'SALT Galata, Bankalar Cad. No:11, Karaköy, İstanbul',
    phone: '+90 212 233 21 00',
    website: 'https://www.neolokal.com',
    dressCode: 'Smart Casual',
    reservationRequired: true,
    reservationDeposit: 'Kişi başı ₺800',
    heroImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Tarihi SALT Galata binasında yer alan Neolokal, Şef Maksut Aşkar’ın "Geleneklerini bilmeyen geleceğine yön veremez" vizyonuyla şekillendi. Unutulmaya yüz tutmuş yerel tohumlar ve reçeteler modern tekniklerle sunulur. Michelin Yeşil Yıldız sahibidir.',
    features: ['Michelin Yeşil Yıldız', 'SALT Galata Tarihi Doku', 'Organik Yerel Üreticiler', 'Özel Sommelier Seçkisi', 'Glutensiz Seçenekler'],
    operatingHours: [
      { dayName: 'Pazartesi', dayIndex: 1, isOpen: false, note: 'Kapalı' },
      { dayName: 'Salı', dayIndex: 2, isOpen: true, openTime: '18:30', closeTime: '23:30', dinnerShift: '18:30 - 23:30' },
      { dayName: 'Çarşamba', dayIndex: 3, isOpen: true, openTime: '18:30', closeTime: '23:30', dinnerShift: '18:30 - 23:30' },
      { dayName: 'Perşembe', dayIndex: 4, isOpen: true, openTime: '18:30', closeTime: '23:30', dinnerShift: '18:30 - 23:30' },
      { dayName: 'Cuma', dayIndex: 5, isOpen: true, openTime: '18:30', closeTime: '23:30', dinnerShift: '18:30 - 23:30' },
      { dayName: 'Cumartesi', dayIndex: 6, isOpen: true, openTime: '18:30', closeTime: '23:30', dinnerShift: '18:30 - 23:30' },
      { dayName: 'Pazar', dayIndex: 0, isOpen: false, note: 'Kapalı' }
    ],
    signatureDishes: [
      {
        id: 'neo-1',
        name: 'Kadayıflı Karides',
        description: 'Çıtır tel kadayıfa sarılı İskenderun karidesi, acı biber reçeli, fesleğen yağı.',
        price: '₺820',
        category: 'Başlangıç'
      },
      {
        id: 'neo-2',
        name: 'İçli Köfte Deconstruction',
        description: 'Ağır ateşte pişmiş dana yanağı, çıtır bulgur cipsi, süzme yoğurt sos ve ceviz yağı.',
        price: '₺1.200',
        category: 'Ana Yemek'
      }
    ],
    reviews: [
      {
        id: 'rev-n1',
        author: 'Selin Doğan',
        rating: 5,
        date: '3 Ekim 2026',
        title: 'Hem göze hem damağa hitap eden bir sanat',
        comment: 'Maksut Şef’in hikaye anlatımı ve her tabağın arkasındaki Anadolu hafızası beni derinden etkiledi.',
        visitType: 'Akşam Yemeği'
      }
    ],
    ratingsBreakdown: { food: 5.0, service: 4.8, ambiance: 4.9, value: 4.5 }
  },

  // --- TOKYO, JAPAN ---
  {
    id: 'rest-sukiyabashi-jiro-tokyo',
    name: 'Sukiyabashi Jiro',
    city: 'Tokyo',
    country: 'Japonya',
    continent: 'Asya',
    cuisine: 'Edomae Sushi & Omakase',
    priceLevel: '$$$$',
    averagePricePerPerson: '¥55.000 (Yaklaşık ₺12.500)',
    rating: 4.95,
    reviewCount: 3200,
    michelinStars: 3,
    michelinGuideNote: 'Dünyanın en efsanevi suşi ustası Jiro Ono’nun Ginza’daki tapınak niteliğindeki 10 kişilik tezgahı.',
    coordinates: { lat: 35.6722, lng: 139.7634 },
    address: 'Tsukamoto Sogyo Bldg B1F, 2-15, Ginza 4-chome, Chuo-ku, Tokyo',
    phone: '+81 3-3535-3600',
    website: 'https://www.sushi-jiro.jp',
    dressCode: 'Formal / Ceket Zorunlu',
    reservationRequired: true,
    reservationDeposit: 'Tam peşin provizyon',
    heroImage: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Jiro Ono tarafından kurulan ve "Jiro Dreams of Sushi" belgeseliyle ölümsüzleşen mekan, Edomae suşi sanatının doruk noktasıdır. Pirincin vücut sıcaklığındaki mükemmelliği, Toyosu pazarından taze seçilen deniz mahsulleri ve saniyeler içinde sunulan 20 parçalık efsanevi tadım serisi.',
    features: ['Yalnızca 10 Kişilik Tezgah', 'Edomae Geleneksel Usul', 'Sadece Omakase Menü', 'Özel İçecek Eşleşmesi'],
    operatingHours: [
      { dayName: 'Pazartesi', dayIndex: 1, isOpen: true, openTime: '17:30', closeTime: '21:00', lunchShift: '11:30 - 13:30', dinnerShift: '17:30 - 21:00' },
      { dayName: 'Salı', dayIndex: 2, isOpen: true, openTime: '17:30', closeTime: '21:00', lunchShift: '11:30 - 13:30', dinnerShift: '17:30 - 21:00' },
      { dayName: 'Çarşamba', dayIndex: 3, isOpen: true, openTime: '17:30', closeTime: '21:00', lunchShift: '11:30 - 13:30', dinnerShift: '17:30 - 21:00' },
      { dayName: 'Perşembe', dayIndex: 4, isOpen: true, openTime: '17:30', closeTime: '21:00', lunchShift: '11:30 - 13:30', dinnerShift: '17:30 - 21:00' },
      { dayName: 'Cuma', dayIndex: 5, isOpen: true, openTime: '17:30', closeTime: '21:00', lunchShift: '11:30 - 13:30', dinnerShift: '17:30 - 21:00' },
      { dayName: 'Cumartesi', dayIndex: 6, isOpen: true, openTime: '11:30', closeTime: '14:00', lunchShift: '11:30 - 14:00', note: 'Yalnızca öğle servisi' },
      { dayName: 'Pazar', dayIndex: 0, isOpen: false, note: 'Pazar ve ulusal tatillerde kapalı' }
    ],
    signatureDishes: [
      {
        id: 'jiro-1',
        name: 'Otoro Nigiri (Yağlı Mavi Yüzgeçli Orkinos)',
        description: 'Vücut sıcaklığında pirinç üzerinde özel soya sosuyla fırçalanmış marine orkinos karın eti.',
        price: 'Omakase İçeriği',
        category: 'Ana Yemek'
      },
      {
        id: 'jiro-2',
        name: 'Hokkaido Uni (Deniz Kestanesi)',
        description: 'Çıtır fırınlanmış nori yaprağı içinde yoğun kremsi Hokkaido deniz kestanesi.',
        price: 'Omakase İçeriği',
        category: 'Ana Yemek'
      },
      {
        id: 'jiro-3',
        name: 'Karamelize Tamagoyaki',
        description: 'Karamelize karides püresiyle 2 saatte ağır ateşte pişirilen sufle kıvamında geleneksel omlet.',
        price: 'Omakase İçeriği',
        category: 'Tatlı'
      }
    ],
    reviews: [
      {
        id: 'rev-j1',
        author: 'Kenji Takahashi',
        rating: 5,
        date: '19 Ekim 2026',
        title: 'A spiritual culinary experience',
        comment: 'Every piece of sushi is placed directly before you like a gem. The pacing is intense, 20 pieces in about 40 minutes, but the taste profile is unmatched in the world.',
        recommendedDishes: ['Otoro Nigiri', 'Kohada', 'Tamago'],
        visitType: 'Akşam Yemeği'
      }
    ],
    ratingsBreakdown: { food: 5.0, service: 4.9, ambiance: 4.8, value: 4.6 }
  },

  {
    id: 'rest-den-tokyo',
    name: 'Den',
    city: 'Tokyo',
    country: 'Japonya',
    continent: 'Asya',
    cuisine: 'Modern Kaiseki',
    priceLevel: '$$$$',
    averagePricePerPerson: '¥38.000',
    rating: 4.92,
    reviewCount: 1850,
    michelinStars: 2,
    michelinGuideNote: 'Şef Zaiyu Hasegawa’nın esprili, sıcak ve son derece samimi çağdaş Japon kaiseki yorumu.',
    coordinates: { lat: 35.6749, lng: 139.7126 },
    address: '2-3-18 Jingumae, Shibuya-ku, Tokyo',
    phone: '+81 3-6455-5470',
    website: 'https://www.jimbochoden.com',
    dressCode: 'Smart Casual',
    reservationRequired: true,
    heroImage: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Den, geleneksel kaiseki ziyafetlerinin resmiyetini yıkarak Japon mutfağının ruhunu mizah ve kusursuz misafirperverlikle harmanlar. Asya’nın En İyi 50 Restoranı listesinde birincilik kazanmıştır.',
    features: ['Eğlenceli Tabak Sunumları', 'Mevsimsel 8 Tabak', 'Sake & Çay Eşleşmesi', 'Bahçe İçi Ferah Salon'],
    operatingHours: [
      { dayName: 'Pazartesi', dayIndex: 1, isOpen: true, openTime: '18:00', closeTime: '22:30', dinnerShift: '18:00 - 22:30' },
      { dayName: 'Salı', dayIndex: 2, isOpen: true, openTime: '18:00', closeTime: '22:30', dinnerShift: '18:00 - 22:30' },
      { dayName: 'Çarşamba', dayIndex: 3, isOpen: true, openTime: '18:00', closeTime: '22:30', dinnerShift: '18:00 - 22:30' },
      { dayName: 'Perşembe', dayIndex: 4, isOpen: true, openTime: '18:00', closeTime: '22:30', dinnerShift: '18:00 - 22:30' },
      { dayName: 'Cuma', dayIndex: 5, isOpen: true, openTime: '18:00', closeTime: '22:30', dinnerShift: '18:00 - 22:30' },
      { dayName: 'Cumartesi', dayIndex: 6, isOpen: true, openTime: '18:00', closeTime: '22:30', dinnerShift: '18:00 - 22:30' },
      { dayName: 'Pazar', dayIndex: 0, isOpen: false, note: 'Kapalı' }
    ],
    signatureDishes: [
      {
        id: 'den-1',
        name: 'Dentucky Fried Chicken',
        description: 'Özel fast food kutusunda sunulan, içi yapışkan pirinç ve kurutulmuş erikle doldurulmuş çıtır tavuk kanadı.',
        price: 'Menü Dahil',
        category: 'Ana Yemek'
      },
      {
        id: 'den-2',
        name: 'Den Bahçe Salatası (20 Çeşit Sebze)',
        description: 'Her biri farklı yöntemle (fermente, çıtır, buharda, taze) işlenmiş 20 yerel sebze.',
        price: 'Menü Dahil',
        category: 'Başlangıç'
      }
    ],
    reviews: [
      {
        id: 'rev-d1',
        author: 'Ayşe Karaca',
        rating: 5,
        date: '5 Ekim 2026',
        title: 'Japonya seyahatimin en unutulmaz anı',
        comment: 'Her tabakta ayrı bir şaşırtmaca ve olağanüstü lezzet vardı. Şef Zaiyu bizzat masaya gelip teşekkür etti.',
        visitType: 'Özel Kutlama'
      }
    ],
    ratingsBreakdown: { food: 4.9, service: 5.0, ambiance: 4.9, value: 4.7 }
  },

  // --- PARIS, FRANCE ---
  {
    id: 'rest-le-gabriel-paris',
    name: 'Le Gabriel',
    city: 'Paris',
    country: 'Fransa',
    continent: 'Avrupa',
    cuisine: 'Fransız Yüksek Gastronomisi (Haute Cuisine)',
    priceLevel: '$$$$',
    averagePricePerPerson: '€320 - €480',
    rating: 4.94,
    reviewCount: 1980,
    michelinStars: 3,
    michelinGuideNote: 'Şef Jérôme Banctel yönetiminde Champs-Élysées yakınındaki neo-klasik köşkte 3 Michelin Yıldızlı Fransız zarafeti.',
    coordinates: { lat: 48.8698, lng: 2.3126 },
    address: 'La Réserve Paris, 42 Avenue Gabriel, 75008 Paris',
    phone: '+33 1 58 36 60 50',
    website: 'https://www.lareserve-paris.com',
    dressCode: 'Zarif / Ceket Zorunlu',
    reservationRequired: true,
    heroImage: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502301103665-0b95cc738daf?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'La Réserve Paris bünyesinde yer alan Le Gabriel, Napolyon III tarzı görkemli iç mekanı ve Şef Jérôme Banctel’in Brittany kökenli Fransız tekniklerini Asya esintileriyle buluşturduğu tabaklarıyla Paris’in en seçkin adreslerindendir.',
    features: ['Saray Ambiyansı', 'Büyük Şarap Mahzeni', 'Özel Sommelier', 'Sessiz Bahçe Avlusu', 'Öğle & Akşam Menüsü'],
    operatingHours: [
      { dayName: 'Pazartesi', dayIndex: 1, isOpen: true, openTime: '19:30', closeTime: '22:30', lunchShift: '12:30 - 14:00', dinnerShift: '19:30 - 22:30' },
      { dayName: 'Salı', dayIndex: 2, isOpen: true, openTime: '19:30', closeTime: '22:30', lunchShift: '12:30 - 14:00', dinnerShift: '19:30 - 22:30' },
      { dayName: 'Çarşamba', dayIndex: 3, isOpen: true, openTime: '19:30', closeTime: '22:30', lunchShift: '12:30 - 14:00', dinnerShift: '19:30 - 22:30' },
      { dayName: 'Perşembe', dayIndex: 4, isOpen: true, openTime: '19:30', closeTime: '22:30', lunchShift: '12:30 - 14:00', dinnerShift: '19:30 - 22:30' },
      { dayName: 'Cuma', dayIndex: 5, isOpen: true, openTime: '19:30', closeTime: '22:30', lunchShift: '12:30 - 14:00', dinnerShift: '19:30 - 22:30' },
      { dayName: 'Cumartesi', dayIndex: 6, isOpen: true, openTime: '19:30', closeTime: '22:30', dinnerShift: '19:30 - 22:30' },
      { dayName: 'Pazar', dayIndex: 0, isOpen: false, note: 'Pazar kapalı' }
    ],
    signatureDishes: [
      {
        id: 'gab-1',
        name: 'Kireçte Pişmiş Somon & Miso Sos',
        description: 'Bincho kömüründe hafif fümelenmiş yabani somon, fermente soya sosu, narenciye köpüğü.',
        price: '€115',
        category: 'Ana Yemek'
      },
      {
        id: 'gab-2',
        name: 'Trüflü Güvercin (Pigeon de Vendée)',
        description: 'Kakao çekirdekleri ve Perigord siyah trüfü ile dinlendirilmiş fırın güvercin, confit but.',
        price: '€140',
        category: 'Ana Yemek'
      }
    ],
    reviews: [
      {
        id: 'rev-g1',
        author: 'Laurent Mercier',
        rating: 5,
        date: '10 Ekim 2026',
        title: 'L’élégance absolue de la gastronomie française',
        comment: 'Un service d’une précision d’orfèvre, la cuisson du pigeon est la plus remarquable que j’ai pu goûter à Paris.',
        recommendedDishes: ['Pigeon de Vendée', 'Soufflé au Chocolat'],
        visitType: 'Akşam Yemeği'
      }
    ],
    ratingsBreakdown: { food: 5.0, service: 5.0, ambiance: 4.9, value: 4.4 }
  },

  {
    id: 'rest-septime-paris',
    name: 'Septime',
    city: 'Paris',
    country: 'Fransa',
    continent: 'Avrupa',
    cuisine: 'Modern Fransız & Neo-Bistro',
    priceLevel: '$$$',
    averagePricePerPerson: '€120 - €180',
    rating: 4.86,
    reviewCount: 2450,
    michelinStars: 1,
    michelinGuideNote: 'Şef Bertrand Grébaut’nun çevreye duyarlı, dinamik ve rahat atmosferli ikonik neo-bistrosu.',
    coordinates: { lat: 48.8532, lng: 2.3808 },
    address: '80 Rue de Charonne, 75011 Paris',
    phone: '+33 1 43 67 38 29',
    website: 'https://www.septime-charonne.fr',
    dressCode: 'Casual / Rahat',
    reservationRequired: true,
    heroImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Paris 11. bölgede yer alan Septime, modern neo-bistro akımının küresel lideridir. Endüstriyel şıklık, doğal şaraplar ve sürdürülebilir Fransız çiftlik ürünleri sunar.',
    features: ['Doğal Şarap Eşleşmesi', 'Sürdürülebilirlik Ödüllü', 'Dinamik Mevsimsel Menü'],
    operatingHours: [
      { dayName: 'Pazartesi', dayIndex: 1, isOpen: true, openTime: '19:30', closeTime: '23:00', dinnerShift: '19:30 - 23:00' },
      { dayName: 'Salı', dayIndex: 2, isOpen: true, openTime: '19:30', closeTime: '23:00', lunchShift: '12:15 - 14:00', dinnerShift: '19:30 - 23:00' },
      { dayName: 'Çarşamba', dayIndex: 3, isOpen: true, openTime: '19:30', closeTime: '23:00', lunchShift: '12:15 - 14:00', dinnerShift: '19:30 - 23:00' },
      { dayName: 'Perşembe', dayIndex: 4, isOpen: true, openTime: '19:30', closeTime: '23:00', lunchShift: '12:15 - 14:00', dinnerShift: '19:30 - 23:00' },
      { dayName: 'Cuma', dayIndex: 5, isOpen: true, openTime: '19:30', closeTime: '23:00', lunchShift: '12:15 - 14:00', dinnerShift: '19:30 - 23:00' },
      { dayName: 'Cumartesi', dayIndex: 6, isOpen: false, note: 'Hafta sonu kapalı' },
      { dayName: 'Pazar', dayIndex: 0, isOpen: false, note: 'Hafta sonu kapalı' }
    ],
    signatureDishes: [
      {
        id: 'sep-1',
        name: 'Kavrulmuş Mantarlı Dana Tartar',
        description: 'Taze kestane mantarları, arpacık soğan turşusu, estragon mayonezi.',
        price: '€28',
        category: 'Başlangıç'
      }
    ],
    reviews: [
      {
        id: 'rev-s1',
        author: 'Burak Demir',
        rating: 5,
        date: '18 Eylül 2026',
        title: 'Paris’in en iyi neo-bistro deneyimi',
        comment: 'Aylar öncesinden masa bulduk ve her saniyesine değdi. Tabaklar abartısız ama lezzet dengesi kusursuz.',
        visitType: 'Akşam Yemeği'
      }
    ],
    ratingsBreakdown: { food: 4.9, service: 4.8, ambiance: 4.8, value: 4.9 }
  },

  // --- ROME & MODENA, ITALY ---
  {
    id: 'rest-osteria-francescana-modena',
    name: 'Osteria Francescana',
    city: 'Modena',
    country: 'İtalya',
    continent: 'Avrupa',
    cuisine: 'Modern İtalyan & Avangart',
    priceLevel: '$$$$',
    averagePricePerPerson: '€350 - €500',
    rating: 4.98,
    reviewCount: 3800,
    michelinStars: 3,
    michelinGuideNote: 'Şef Massimo Bottura’nın İtalyan mutfak geleneklerini çağdaş sanatla yeniden yorumladığı dünya birincisi restoran.',
    coordinates: { lat: 44.6444, lng: 10.9213 },
    address: 'Via Stella 22, 41121 Modena MO, İtalya',
    phone: '+39 059 223912',
    website: 'https://www.osteriafrancescana.it',
    dressCode: 'Smart Casual / Şık',
    reservationRequired: true,
    reservationDeposit: 'Tam Menü Bedeli',
    heroImage: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Dünyanın En İyi 50 Restoranı listesinde defalarca 1 numara seçilen Osteria Francescana, Emilia-Romagna bölgesinin Parmigiano Reggiano peyniri ve geleneksel balzamik sirkesini birer sanat eserine dönüştürür.',
    features: ['Dünya 1 Numarası', 'Çağdaş Sanat Galerisi Ambiyansı', 'Bölgesel Peynir & Sirke Kavı', 'Şef Massimo İmzası'],
    operatingHours: [
      { dayName: 'Pazartesi', dayIndex: 1, isOpen: false, note: 'Kapalı' },
      { dayName: 'Salı', dayIndex: 2, isOpen: true, openTime: '20:00', closeTime: '23:30', lunchShift: '12:30 - 14:30', dinnerShift: '20:00 - 23:30' },
      { dayName: 'Çarşamba', dayIndex: 3, isOpen: true, openTime: '20:00', closeTime: '23:30', lunchShift: '12:30 - 14:30', dinnerShift: '20:00 - 23:30' },
      { dayName: 'Perşembe', dayIndex: 4, isOpen: true, openTime: '20:00', closeTime: '23:30', lunchShift: '12:30 - 14:30', dinnerShift: '20:00 - 23:30' },
      { dayName: 'Cuma', dayIndex: 5, isOpen: true, openTime: '20:00', closeTime: '23:30', lunchShift: '12:30 - 14:30', dinnerShift: '20:00 - 23:30' },
      { dayName: 'Cumartesi', dayIndex: 6, isOpen: true, openTime: '20:00', closeTime: '23:30', lunchShift: '12:30 - 14:30', dinnerShift: '20:00 - 23:30' },
      { dayName: 'Pazar', dayIndex: 0, isOpen: true, openTime: '12:30', closeTime: '15:30', lunchShift: '12:30 - 15:30', note: 'Sadece öğle servisi' }
    ],
    signatureDishes: [
      {
        id: 'ost-1',
        name: 'Five Ages of Parmigiano Reggiano',
        description: 'Farklı olgunluktaki 5 Parmigiano peynirinin 5 farklı sıcaklık ve dokuda (köpük, krem, gofret, buhar, çıtır) buluşması.',
        price: 'Tadım Menüsü Dahil',
        category: 'Ana Yemek'
      },
      {
        id: 'ost-2',
        name: 'Oops! I Dropped the Lemon Tart',
        description: 'Tabağa bilerek kırılmış gibi fırlatılan, bergamot sorbe, limon krema ve tuzlu sablé bisküvi.',
        price: 'Tadım Menüsü Dahil',
        category: 'Tatlı'
      }
    ],
    reviews: [
      {
        id: 'rev-of1',
        author: 'Gianluca Rossi',
        rating: 5,
        date: '12 Ekim 2026',
        title: 'Un’esperienza che ti cambia la vita',
        comment: 'Le cinque stagionature del Parmigiano sono pura poesia. Massimo Bottura è un genio dell’arte contemporanea applicata al cibo.',
        recommendedDishes: ['Five Ages of Parmigiano', 'Lemon Tart'],
        visitType: 'Özel Kutlama'
      }
    ],
    ratingsBreakdown: { food: 5.0, service: 5.0, ambiance: 5.0, value: 4.8 }
  },

  {
    id: 'rest-roscioli-rome',
    name: 'Roscioli Salumeria con Cucina',
    city: 'Roma',
    country: 'İtalya',
    continent: 'Avrupa',
    cuisine: 'Geleneksel Roma & Şarküteri',
    priceLevel: '$$$',
    averagePricePerPerson: '€60 - €110',
    rating: 4.88,
    reviewCount: 4200,
    michelinStars: 1,
    michelinGuideNote: 'Roma’nın en efsanevi Carbonara ve peynir seçkisini sunan tarihi şarküteri-restoran.',
    coordinates: { lat: 41.8942, lng: 12.4746 },
    address: 'Via dei Giubbonari 21, 00186 Roma, İtalya',
    phone: '+39 06 687 5287',
    website: 'https://www.salumeriaroscioli.com',
    dressCode: 'Casual',
    reservationRequired: true,
    heroImage: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Campo de’ Fiori yakınlarındaki Roscioli, 300’den fazla peynir ve şarküteri çeşidinin arasında masaların yer aldığı, Roma’nın en iyi Carbonara’sına ev sahipliği yapan canlı bir gastronomi tapınağıdır.',
    features: ['Roma’nın En İyi Carbonara’sı', '300+ İtalyan Peyniri', '2.800 Şişelik Şarap Kavı', 'Tarihi Şarküteri'],
    operatingHours: [
      { dayName: 'Pazartesi', dayIndex: 1, isOpen: true, openTime: '12:30', closeTime: '23:30', lunchShift: '12:30 - 16:00', dinnerShift: '19:00 - 23:30' },
      { dayName: 'Salı', dayIndex: 2, isOpen: true, openTime: '12:30', closeTime: '23:30', lunchShift: '12:30 - 16:00', dinnerShift: '19:00 - 23:30' },
      { dayName: 'Çarşamba', dayIndex: 3, isOpen: true, openTime: '12:30', closeTime: '23:30', lunchShift: '12:30 - 16:00', dinnerShift: '19:00 - 23:30' },
      { dayName: 'Perşembe', dayIndex: 4, isOpen: true, openTime: '12:30', closeTime: '23:30', lunchShift: '12:30 - 16:00', dinnerShift: '19:00 - 23:30' },
      { dayName: 'Cuma', dayIndex: 5, isOpen: true, openTime: '12:30', closeTime: '23:30', lunchShift: '12:30 - 16:00', dinnerShift: '19:00 - 23:30' },
      { dayName: 'Cumartesi', dayIndex: 6, isOpen: true, openTime: '12:30', closeTime: '23:30', lunchShift: '12:30 - 16:00', dinnerShift: '19:00 - 23:30' },
      { dayName: 'Pazar', dayIndex: 0, isOpen: true, openTime: '12:30', closeTime: '23:00', lunchShift: '12:30 - 16:00', dinnerShift: '19:00 - 23:00' }
    ],
    signatureDishes: [
      {
        id: 'rosc-1',
        name: 'La Carbonara Tradizionale',
        description: 'Verrigni el yapımı spagettone, çıtır Guanciale, Paolo Parisi yumurta sarısı, Pecorino Romano ve taze çekilmiş Madagaskar karabiberi.',
        price: '€22',
        category: 'Ana Yemek'
      },
      {
        id: 'rosc-2',
        name: 'Burrata Pugliese & Datterini',
        description: 'Apulia’dan günlük gelen taze manda burratası, fırınlanmış Sicilya datterini domatesleri.',
        price: '€18',
        category: 'Başlangıç'
      }
    ],
    reviews: [
      {
        id: 'rev-r1',
        author: 'Emre Yılmaz',
        rating: 5,
        date: '20 Eylül 2026',
        title: 'Hayatımda yediğim en iyi makarna',
        comment: 'Guanciale’nin çıtırlığı ve pecorino kremsiliği tek kelimeyle kusursuz. Şarap önerileri de çok başarılıydı.',
        recommendedDishes: ['La Carbonara', 'Burrata Pugliese'],
        visitType: 'Öğle Yemeği'
      }
    ],
    ratingsBreakdown: { food: 5.0, service: 4.7, ambiance: 4.8, value: 4.8 }
  },

  // --- NEW YORK, USA ---
  {
    id: 'rest-le-bernardin-nyc',
    name: 'Le Bernardin',
    city: 'New York',
    country: 'ABD',
    continent: 'Kuzey Amerika',
    cuisine: 'Çağdaş Deniz Ürünleri & Fransız',
    priceLevel: '$$$$',
    averagePricePerPerson: '$295 - $450',
    rating: 4.96,
    reviewCount: 4600,
    michelinStars: 3,
    michelinGuideNote: 'Şef Eric Ripert’in deniz mahsullerini taçlandırdığı 3 Michelin Yıldızlı Manhattan efsanesi.',
    coordinates: { lat: 40.7615, lng: -73.9818 },
    address: '155 W 51st St, New York, NY 10019, ABD',
    phone: '+1 212-554-1515',
    website: 'https://www.le-bernardin.com',
    dressCode: 'Ceket Zorunlu (Gentlemen Jackets Required)',
    reservationRequired: true,
    reservationDeposit: '$150 / Kişi',
    heroImage: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Manhattan’ın kalbinde 30 yılı aşkın süredir New York Times 4 yıldızını ve 3 Michelin Yıldızını koruyan Le Bernardin, balığı "ana yıldız" olarak kabul eden felsefesiyle dünyanın en iyi deniz ürünleri restoranıdır.',
    features: ['Efsanevi Deniz Ürünleri', 'Manhattan Merkez Konum', 'Kusursuz Beyaz Masa Örtüsü', 'Ödüllü Şarap Menüsü'],
    operatingHours: [
      { dayName: 'Pazartesi', dayIndex: 1, isOpen: true, openTime: '17:00', closeTime: '22:30', lunchShift: '12:00 - 14:00', dinnerShift: '17:00 - 22:30' },
      { dayName: 'Salı', dayIndex: 2, isOpen: true, openTime: '17:00', closeTime: '22:30', lunchShift: '12:00 - 14:00', dinnerShift: '17:00 - 22:30' },
      { dayName: 'Çarşamba', dayIndex: 3, isOpen: true, openTime: '17:00', closeTime: '22:30', lunchShift: '12:00 - 14:00', dinnerShift: '17:00 - 22:30' },
      { dayName: 'Perşembe', dayIndex: 4, isOpen: true, openTime: '17:00', closeTime: '22:30', lunchShift: '12:00 - 14:00', dinnerShift: '17:00 - 22:30' },
      { dayName: 'Cuma', dayIndex: 5, isOpen: true, openTime: '17:00', closeTime: '23:00', lunchShift: '12:00 - 14:00', dinnerShift: '17:00 - 23:00' },
      { dayName: 'Cumartesi', dayIndex: 6, isOpen: true, openTime: '17:00', closeTime: '23:00', dinnerShift: '17:00 - 23:00' },
      { dayName: 'Pazar', dayIndex: 0, isOpen: false, note: 'Kapalı' }
    ],
    signatureDishes: [
      {
        id: 'leb-1',
        name: 'Tuna & Foie Gras Baguette',
        description: 'Çıtır ince ekmek tabanı üzerinde ince dövülmüş sarı yüzgeçli orkinos, kaz ciğeri kreması, frenk soğanı.',
        price: 'Chef Tasting Dahil',
        category: 'Başlangıç'
      },
      {
        id: 'leb-2',
        name: 'Pan-Roasted Dover Sole',
        description: 'Tereyağında altın sarısı kızarmış Dover dili balığı, bademli limon emülsiyonu.',
        price: '$120',
        category: 'Ana Yemek'
      }
    ],
    reviews: [
      {
        id: 'rev-lb1',
        author: 'Sarah Jenkins',
        rating: 5,
        date: '22 Ekim 2026',
        title: 'Masterclass in seafood and hospitality',
        comment: 'Eric Ripert treats every piece of fish like precious gold. The service is invisible yet omnipresent. An essential NY institution.',
        recommendedDishes: ['Tuna & Foie Gras', 'Dover Sole'],
        visitType: 'Akşam Yemeği'
      }
    ],
    ratingsBreakdown: { food: 5.0, service: 5.0, ambiance: 4.9, value: 4.6 }
  },

  {
    id: 'rest-atomix-nyc',
    name: 'Atomix',
    city: 'New York',
    country: 'ABD',
    continent: 'Kuzey Amerika',
    cuisine: 'Kore Çağdaş & Fermantasyon',
    priceLevel: '$$$$',
    averagePricePerPerson: '$395 - $550',
    rating: 4.97,
    reviewCount: 1540,
    michelinStars: 2,
    michelinGuideNote: 'Şef Junghyun Park ve eşi Ellia Park’ın Kore fermantasyon kültürünü kartpostal hikayeleriyle sunduğu U şeklindeki tezgah.',
    coordinates: { lat: 40.7441, lng: -73.9822 },
    address: '104 E 30th St, New York, NY 10016, ABD',
    phone: '+1 646-952-0940',
    website: 'https://www.atomixnyc.com',
    dressCode: 'Smart Casual',
    reservationRequired: true,
    heroImage: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Atomix, U şeklindeki 14 kişilik özel tezgahında, her bir yemeğin kökenini açıklayan özel baskılı kartlar eşliğinde Kore’nin kadim tekniklerini ve fermente soslarını çağdaş dünyaya açar.',
    features: ['14 Kişilik Özel Tezgah', 'Yemek Kartları Hikaye Anlatımı', 'World’s 50 Best Top 10', 'Özel Seramik Sunumları'],
    operatingHours: [
      { dayName: 'Pazartesi', dayIndex: 1, isOpen: false, note: 'Pazartesi kapalı' },
      { dayName: 'Salı', dayIndex: 2, isOpen: true, openTime: '17:30', closeTime: '23:00', dinnerShift: '17:30 - 23:00' },
      { dayName: 'Çarşamba', dayIndex: 3, isOpen: true, openTime: '17:30', closeTime: '23:00', dinnerShift: '17:30 - 23:00' },
      { dayName: 'Perşembe', dayIndex: 4, isOpen: true, openTime: '17:30', closeTime: '23:00', dinnerShift: '17:30 - 23:00' },
      { dayName: 'Cuma', dayIndex: 5, isOpen: true, openTime: '17:30', closeTime: '23:00', dinnerShift: '17:30 - 23:00' },
      { dayName: 'Cumartesi', dayIndex: 6, isOpen: true, openTime: '17:30', closeTime: '23:00', dinnerShift: '17:30 - 23:00' },
      { dayName: 'Pazar', dayIndex: 0, isOpen: true, openTime: '17:30', closeTime: '23:00', dinnerShift: '17:30 - 23:00' }
    ],
    signatureDishes: [
      {
        id: 'atx-1',
        name: 'Langoustine & Doenjang Köpüğü',
        description: 'Tavada mühürlenmiş kerevit, fermente soya fasulyesi kreması, gevrek deniz yosunu.',
        price: 'Menü Dahil',
        category: 'Ana Yemek'
      }
    ],
    reviews: [
      {
        id: 'rev-ax1',
        author: 'David Chang',
        rating: 5,
        date: '1 Ekim 2026',
        title: 'The pinnacle of modern Korean culinary storytelling',
        comment: 'JP and Ellia have set a new world benchmark. The card explanations allow you to connect with centuries of Korean tradition.',
        visitType: 'Akşam Yemeği'
      }
    ],
    ratingsBreakdown: { food: 5.0, service: 5.0, ambiance: 4.9, value: 4.7 }
  },

  // --- LONDON, UK ---
  {
    id: 'rest-the-ledbury-london',
    name: 'The Ledbury',
    city: 'Londra',
    country: 'İngiltere',
    continent: 'Avrupa',
    cuisine: 'Modern İngiliz & Fransız',
    priceLevel: '$$$$',
    averagePricePerPerson: '£210 - £320',
    rating: 4.93,
    reviewCount: 2900,
    michelinStars: 3,
    michelinGuideNote: 'Şef Brett Graham’ın Notting Hill’deki 3 Michelin Yıldızlı, İngiliz av etleri ve mantarlarını yücelten zarafet mabedi.',
    coordinates: { lat: 51.5168, lng: -0.2045 },
    address: '127 Ledbury Rd, Notting Hill, London W11 2AQ, Birleşik Krallık',
    phone: '+44 20 7792 9090',
    website: 'https://www.theledbury.com',
    dressCode: 'Smart Casual / Şık',
    reservationRequired: true,
    heroImage: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Londra’nın bohem Notting Hill semtinde yer alan The Ledbury, Şef Brett Graham’ın kendi çiftliklerinde yetiştirdiği geyik eti, yabani mantarlar ve İngiliz ürünlerini en rafine tekniklerle masaya getirir.',
    features: ['3 Michelin Yıldızı', 'Notting Hill Butik Atmosfer', 'Özel Av Eti Menüleri', 'Organik Kendi Üretimi'],
    operatingHours: [
      { dayName: 'Pazartesi', dayIndex: 1, isOpen: false, note: 'Pazartesi kapalı' },
      { dayName: 'Salı', dayIndex: 2, isOpen: true, openTime: '18:30', closeTime: '23:00', dinnerShift: '18:30 - 23:00' },
      { dayName: 'Çarşamba', dayIndex: 3, isOpen: true, openTime: '18:30', closeTime: '23:00', lunchShift: '12:00 - 14:00', dinnerShift: '18:30 - 23:00' },
      { dayName: 'Perşembe', dayIndex: 4, isOpen: true, openTime: '18:30', closeTime: '23:00', lunchShift: '12:00 - 14:00', dinnerShift: '18:30 - 23:00' },
      { dayName: 'Cuma', dayIndex: 5, isOpen: true, openTime: '18:30', closeTime: '23:30', lunchShift: '12:00 - 14:00', dinnerShift: '18:30 - 23:30' },
      { dayName: 'Cumartesi', dayIndex: 6, isOpen: true, openTime: '18:30', closeTime: '23:30', lunchShift: '12:00 - 14:00', dinnerShift: '18:30 - 23:30' },
      { dayName: 'Pazar', dayIndex: 0, isOpen: true, openTime: '12:00', closeTime: '15:30', lunchShift: '12:00 - 15:30', note: 'Öğle servisi' }
    ],
    signatureDishes: [
      {
        id: 'led-1',
        name: 'Fırınlanmış İlik & Toprak Mantarları',
        description: 'Taze kestane mantarları, tarragon esansı, çıtır ekşi mayalı krutonlar.',
        price: '£45',
        category: 'Başlangıç'
      },
      {
        id: 'led-2',
        name: 'Ayrshire Sika Geyiği & Pancar Glaze',
        description: 'Odun közünde pişmiş geyik sırtı, mayalanmış pancar püresi, ardıç sosu.',
        price: '£85',
        category: 'Ana Yemek'
      }
    ],
    reviews: [
      {
        id: 'rev-l1',
        author: 'Oliver Smith',
        rating: 5,
        date: '15 Ekim 2026',
        title: 'British fine dining at its absolute zenith',
        comment: 'Brett Graham reopened with even more clarity and focus. The deer dish is legendary.',
        visitType: 'Akşam Yemeği'
      }
    ],
    ratingsBreakdown: { food: 5.0, service: 4.9, ambiance: 4.9, value: 4.7 }
  },

  {
    id: 'rest-dishoom-london',
    name: 'Dishoom Covent Garden',
    city: 'Londra',
    country: 'İngiltere',
    continent: 'Avrupa',
    cuisine: 'Bombay İrani Kafe & Hint',
    priceLevel: '$$',
    averagePricePerPerson: '£30 - £55',
    rating: 4.82,
    reviewCount: 9800,
    coordinates: { lat: 51.5126, lng: -0.1264 },
    address: '12 Upper St Martin’s Ln, London WC2H 9FB, Birleşik Krallık',
    phone: '+44 20 7420 9320',
    website: 'https://www.dishoom.com',
    dressCode: 'Casual',
    reservationRequired: false,
    heroImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Eski Bombay’in nostaljik İrani kafelerine bir saygı duruşu niteliğinde olan Dishoom, Londra’nın en sevilen mekanlarındandır. Efsanevi 24 saat kısık ateşte pişen House Black Daal’ı ve taze tandır ekmekleri ile ünlüdür.',
    features: ['Nostaljik Bombay Dekoru', 'Rezervasyonsuz da Kabul', 'Kahvaltı ve Chai İkramı', 'İmza Kokteyller'],
    operatingHours: [
      { dayName: 'Pazartesi', dayIndex: 1, isOpen: true, openTime: '08:00', closeTime: '23:00' },
      { dayName: 'Salı', dayIndex: 2, isOpen: true, openTime: '08:00', closeTime: '23:00' },
      { dayName: 'Çarşamba', dayIndex: 3, isOpen: true, openTime: '08:00', closeTime: '23:00' },
      { dayName: 'Perşembe', dayIndex: 4, isOpen: true, openTime: '08:00', closeTime: '23:00' },
      { dayName: 'Cuma', dayIndex: 5, isOpen: true, openTime: '08:00', closeTime: '00:00' },
      { dayName: 'Cumartesi', dayIndex: 6, isOpen: true, openTime: '09:00', closeTime: '00:00' },
      { dayName: 'Pazar', dayIndex: 0, isOpen: true, openTime: '09:00', closeTime: '23:00' }
    ],
    signatureDishes: [
      {
        id: 'dish-1',
        name: 'House Black Daal',
        description: 'Tam 24 saat boyunca kısık ateşte ağır ağır pişen, kadife dokulu zengin siyah mercimek yahnisı.',
        price: '£8.90',
        category: 'Ana Yemek'
      },
      {
        id: 'dish-2',
        name: 'Bacon Naan Roll',
        description: 'Tandır fırınından sıcak çıkan taze naan ekmeği, füme domuz pastırması, krem peynir ve acı biber reçeli.',
        price: '£9.50',
        category: 'Başlangıç'
      }
    ],
    reviews: [
      {
        id: 'rev-di1',
        author: 'Can Berk',
        rating: 5,
        date: '2 Ekim 2026',
        title: 'Londra’ya her gelişte ilk durağım',
        comment: 'House Black Daal ve sıcak sarımsaklı naan muazzam bir lezzet patlaması. Kuyruk olsa bile çok hızlı ilerliyor.',
        recommendedDishes: ['House Black Daal', 'Chicken Ruby'],
        visitType: 'Akşam Yemeği'
      }
    ],
    ratingsBreakdown: { food: 4.9, service: 4.8, ambiance: 4.9, value: 5.0 }
  },

  // --- COPENHAGEN, DENMARK ---
  {
    id: 'rest-alchemist-copenhagen',
    name: 'Alchemist',
    city: 'Kopenhag',
    country: 'Danimarka',
    continent: 'Avrupa',
    cuisine: 'Holistik Gastronomi & İskandinav',
    priceLevel: '$$$$',
    averagePricePerPerson: '4.900 DKK (Yaklaşık ₺24.000)',
    rating: 4.99,
    reviewCount: 1650,
    michelinStars: 2,
    michelinGuideNote: 'Şef Rasmus Munk’un 50 aşamalı tabaklarını planetaryum kubbesi altında tiyatral gösteriye dönüştürdüğü dünya harikası.',
    coordinates: { lat: 55.6923, lng: 12.6133 },
    address: 'Refshalevej 173C, 1432 København, Danimarka',
    phone: '+45 31 71 61 61',
    website: 'https://alchemist.dk',
    dressCode: 'Smart Casual',
    reservationRequired: true,
    reservationDeposit: 'Tam Menü Ön Ödemesi',
    heroImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Eski bir endüstriyel tersanede konumlanan Alchemist, yemek deneyimini bilim, tiyatro, görsel sanatlar ve sosyal aktivizmle birleştiren "Holistik Gastronomi" konseptinin dünyadaki tek temsilcisidir. 6 saat süren yolculukta 50 farklı "izlenim" sunulur.',
    features: ['Dev Planetaryum Kubbesi', '50 Aşamalı Tiyatral Menü', '6 Saat Süren Deneyim', 'Özel Sanat Enstalasyonları'],
    operatingHours: [
      { dayName: 'Pazartesi', dayIndex: 1, isOpen: false, note: 'Kapalı' },
      { dayName: 'Salı', dayIndex: 2, isOpen: false, note: 'Kapalı' },
      { dayName: 'Çarşamba', dayIndex: 3, isOpen: true, openTime: '17:00', closeTime: '00:30', dinnerShift: '17:00 - 00:30' },
      { dayName: 'Perşembe', dayIndex: 4, isOpen: true, openTime: '17:00', closeTime: '00:30', dinnerShift: '17:00 - 00:30' },
      { dayName: 'Cuma', dayIndex: 5, isOpen: true, openTime: '17:00', closeTime: '00:30', dinnerShift: '17:00 - 00:30' },
      { dayName: 'Cumartesi', dayIndex: 6, isOpen: true, openTime: '17:00', closeTime: '00:30', dinnerShift: '17:00 - 00:30' },
      { dayName: 'Pazar', dayIndex: 0, isOpen: false, note: 'Kapalı' }
    ],
    signatureDishes: [
      {
        id: 'alc-1',
        name: 'Plastic Breath',
        description: 'Okyanus kirliliğine dikkat çeken, yenilebilir şeffaf selüloz tabakası içinde morina balığı çenesi ve deniz suyu köpüğü.',
        price: 'Holistik Menü Dahil',
        category: 'Ana Yemek'
      },
      {
        id: 'alc-2',
        name: 'The Eye',
        description: 'Havyar dolgulu, göz bebeği biçiminde şekerleme kabuğu, litchi suyu jölesi.',
        price: 'Holistik Menü Dahil',
        category: 'Başlangıç'
      }
    ],
    reviews: [
      {
        id: 'rev-al1',
        author: 'Frederik Lindqvist',
        rating: 5,
        date: '21 Ekim 2026',
        title: 'Beyond a restaurant, a sensory universe',
        comment: 'Dining beneath the northern lights and floating jellyfish inside a real dome while enjoying mind-bending flavors. Rasmus Munk is from the future.',
        visitType: 'Özel Kutlama'
      }
    ],
    ratingsBreakdown: { food: 5.0, service: 5.0, ambiance: 5.0, value: 4.9 }
  },

  // --- BARCELONA, SPAIN ---
  {
    id: 'rest-disfrutar-barcelona',
    name: 'Disfrutar',
    city: 'Barselona',
    country: 'İspanya',
    continent: 'Avrupa',
    cuisine: 'Modern Akdeniz & Avangart Moleküler',
    priceLevel: '$$$$',
    averagePricePerPerson: '€290 - €420',
    rating: 4.98,
    reviewCount: 3400,
    michelinStars: 3,
    michelinGuideNote: 'El Bulli ekolünden gelen üç şefin yönettiği Dünyanın En İyi Restoranı seçilen Katalan harikası.',
    coordinates: { lat: 41.3879, lng: 2.1531 },
    address: 'Carrer de Villarroel 163, 08036 Barcelona, İspanya',
    phone: '+34 933 48 68 96',
    website: 'https://www.disfrutarbarcelona.com',
    dressCode: 'Smart Casual',
    reservationRequired: true,
    heroImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Mateu Casañas, Oriol Castro ve Eduard Xatruch tarafından kurulan Disfrutar, el Bulli’nin efsanevi yaratıcılık mirasını Akdeniz’in sıcaklığı ve neşesiyle buluşturur. Dünya 50 Best sıralamasında 1. sıraya yükselmiştir.',
    features: ['World’s 50 Best 1 Numarası', 'Katalan Seramik Tasarımı', 'Yenilikçi Moleküler Teknikler', 'Açık Mutfak Görünümü'],
    operatingHours: [
      { dayName: 'Pazartesi', dayIndex: 1, isOpen: true, openTime: '13:00', closeTime: '23:30', lunchShift: '13:00 - 15:30', dinnerShift: '20:00 - 23:30' },
      { dayName: 'Salı', dayIndex: 2, isOpen: true, openTime: '13:00', closeTime: '23:30', lunchShift: '13:00 - 15:30', dinnerShift: '20:00 - 23:30' },
      { dayName: 'Çarşamba', dayIndex: 3, isOpen: true, openTime: '13:00', closeTime: '23:30', lunchShift: '13:00 - 15:30', dinnerShift: '20:00 - 23:30' },
      { dayName: 'Perşembe', dayIndex: 4, isOpen: true, openTime: '13:00', closeTime: '23:30', lunchShift: '13:00 - 15:30', dinnerShift: '20:00 - 23:30' },
      { dayName: 'Cuma', dayIndex: 5, isOpen: true, openTime: '13:00', closeTime: '23:30', lunchShift: '13:00 - 15:30', dinnerShift: '20:00 - 23:30' },
      { dayName: 'Cumartesi', dayIndex: 6, isOpen: false, note: 'Kapalı' },
      { dayName: 'Pazar', dayIndex: 0, isOpen: false, note: 'Kapalı' }
    ],
    signatureDishes: [
      {
        id: 'dis-1',
        name: 'Havyarlı ve Ekşi Kremalı Pan chino',
        description: 'İçi hava gibi kabarık çıtır Çin ekmeği, Beluga havyarı ve ev yapımı ekşi krema dolgusu.',
        price: 'Tadım Dahil',
        category: 'Başlangıç'
      },
      {
        id: 'dis-2',
        name: 'Pesto ve Trüflü Şeffaf Macaroni',
        description: 'Jöle kıvamında jelatin bazlı şeffaf makarna, fesleğen köpüğü, taze rendelenmiş siyah trüf.',
        price: 'Tadım Dahil',
        category: 'Ana Yemek'
      }
    ],
    reviews: [
      {
        id: 'rev-df1',
        author: 'Carlos Mendes',
        rating: 5,
        date: '9 Ekim 2026',
        title: 'El templo de la creatividad culinaria',
        comment: 'Pan chino con caviar fue uno de los bocados más emocionantes de mi vida. La atención de Eduard y Oriol en persona fue un lujo.',
        visitType: 'Özel Kutlama'
      }
    ],
    ratingsBreakdown: { food: 5.0, service: 4.9, ambiance: 4.9, value: 4.8 }
  },

  // --- BANGKOK, THAILAND ---
  {
    id: 'rest-gaggan-anand-bangkok',
    name: 'Gaggan Anand',
    city: 'Bangkok',
    country: 'Tayland',
    continent: 'Asya',
    cuisine: 'Progresif Hint & Moleküler Rock’n’Roll',
    priceLevel: '$$$$',
    averagePricePerPerson: '14.000 THB (Yaklaşık ₺13.000)',
    rating: 4.91,
    reviewCount: 2200,
    michelinStars: 2,
    michelinGuideNote: 'Şef Gaggan Anand’ın emoji sembolleriyle tasarlanan, rock müzik eşliğinde sınırları zorlayan interaktif şovu.',
    coordinates: { lat: 13.7367, lng: 100.5612 },
    address: '68 Sukhumvit 31, Khlong Tan Nuea, Watthana, Bangkok 10110, Tayland',
    phone: '+66 98 883 1022',
    website: 'https://gaggananand.com',
    dressCode: 'Casual & Rock',
    reservationRequired: true,
    heroImage: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Klasik fine dining kurallarını yıkan Gaggan Anand, rock’n’roll enerjisi, emoji menüsü ve parmakla yenen 25 deneysel Hint lezzetiyle misafirlerini gastronomi tiyatrosuna davet eder.',
    features: ['Emoji Tabanlı Gizemli Menü', 'Rock Müzik Eşliğinde Canlı Pişirme', 'U Şeklinde Açık Mutfak Barı'],
    operatingHours: [
      { dayName: 'Pazartesi', dayIndex: 1, isOpen: false, note: 'Kapalı' },
      { dayName: 'Salı', dayIndex: 2, isOpen: false, note: 'Kapalı' },
      { dayName: 'Çarşamba', dayIndex: 3, isOpen: true, openTime: '17:30', closeTime: '23:30', dinnerShift: '17:30 - 23:30' },
      { dayName: 'Perşembe', dayIndex: 4, isOpen: true, openTime: '17:30', closeTime: '23:30', dinnerShift: '17:30 - 23:30' },
      { dayName: 'Cuma', dayIndex: 5, isOpen: true, openTime: '17:30', closeTime: '23:30', dinnerShift: '17:30 - 23:30' },
      { dayName: 'Cumartesi', dayIndex: 6, isOpen: true, openTime: '17:30', closeTime: '23:30', lunchShift: '12:30 - 15:30', dinnerShift: '17:30 - 23:30' },
      { dayName: 'Pazar', dayIndex: 0, isOpen: true, openTime: '17:30', closeTime: '23:30', lunchShift: '12:30 - 15:30', dinnerShift: '17:30 - 23:30' }
    ],
    signatureDishes: [
      {
        id: 'gag-1',
        name: 'Lick It Up (Tabağı Yala)',
        description: 'Tabağın üzerine özel soslarla çizilmiş dil motifi, mantar sosu ve bezelye püresi.',
        price: 'Emoji Menü Dahil',
        category: 'Başlangıç'
      },
      {
        id: 'gag-2',
        name: 'Yogurt Explosion',
        description: 'Ağızda anında patlayan moleküler sferifiye kakuleli yoğurt küresi.',
        price: 'Emoji Menü Dahil',
        category: 'Başlangıç'
      }
    ],
    reviews: [
      {
        id: 'rev-gg1',
        author: 'Tolga Tekin',
        rating: 5,
        date: '23 Eylül 2026',
        title: 'Tam bir gastronomi çılgınlığı!',
        comment: 'Pink Floyd ve Queen çalarken önünüzde ateşe verilen tatlar, tabağı yalayarak temizleme ritüeli... Dünyada eşi benzeri yok.',
        visitType: 'Akşam Yemeği'
      }
    ],
    ratingsBreakdown: { food: 4.9, service: 4.8, ambiance: 5.0, value: 4.7 }
  },

  // --- MEXICO CITY & OAXACA, MEXICO ---
  {
    id: 'rest-pujol-mexico-city',
    name: 'Pujol',
    city: 'Mexico City',
    country: 'Meksika',
    continent: 'Kuzey Amerika',
    cuisine: 'Meksika Çağdaş & Mole',
    priceLevel: '$$$$',
    averagePricePerPerson: '$190 - $280',
    rating: 4.94,
    reviewCount: 3600,
    michelinStars: 2,
    michelinGuideNote: 'Şef Enrique Olvera’nın 2.800 günden uzun süredir beslenen "Mole Madre" sosuyla Meksika mirasını taçlandırdığı başyapıtı.',
    coordinates: { lat: 19.4326, lng: -99.2016 },
    address: 'Tennyson 133, Polanco, Miguel Hidalgo, 11570 Ciudad de México, Meksika',
    phone: '+52 55 5488 0050',
    website: 'https://pujol.com.mx',
    dressCode: 'Smart Casual',
    reservationRequired: true,
    heroImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Polanco semtinde huzurlu bir bahçe içinde yer alan Pujol, Şef Enrique Olvera’nın yerel mısır türleri ve binlerce günlük fermente Mole sosuyla Latin Amerika’nın en etkileyici gastronomi durağıdır.',
    features: ['Mole Madre Efsanesi', 'Taco Omakase Barı', 'Huzurlu Zen Bahçesi', 'Mısır Çeşitliliği Koruması'],
    operatingHours: [
      { dayName: 'Pazartesi', dayIndex: 1, isOpen: true, openTime: '13:30', closeTime: '23:00', lunchShift: '13:30 - 16:30', dinnerShift: '18:30 - 23:00' },
      { dayName: 'Salı', dayIndex: 2, isOpen: true, openTime: '13:30', closeTime: '23:00', lunchShift: '13:30 - 16:30', dinnerShift: '18:30 - 23:00' },
      { dayName: 'Çarşamba', dayIndex: 3, isOpen: true, openTime: '13:30', closeTime: '23:00', lunchShift: '13:30 - 16:30', dinnerShift: '18:30 - 23:00' },
      { dayName: 'Perşembe', dayIndex: 4, isOpen: true, openTime: '13:30', closeTime: '23:00', lunchShift: '13:30 - 16:30', dinnerShift: '18:30 - 23:00' },
      { dayName: 'Cuma', dayIndex: 5, isOpen: true, openTime: '13:30', closeTime: '23:00', lunchShift: '13:30 - 16:30', dinnerShift: '18:30 - 23:00' },
      { dayName: 'Cumartesi', dayIndex: 6, isOpen: true, openTime: '13:30', closeTime: '23:00', lunchShift: '13:30 - 16:30', dinnerShift: '18:30 - 23:00' },
      { dayName: 'Pazar', dayIndex: 0, isOpen: false, note: 'Pazar kapalı' }
    ],
    signatureDishes: [
      {
        id: 'puj-1',
        name: 'Mole Madre, Mole Nuevo (2.900+ Günlük)',
        description: 'Taze hazırlanan parlak kırmızı mole sosu ile 8 yılı aşkın süredir her gün beslenen koyu siyah kadim mole sosunun sıcak mısır tortillasıyla eşleşmesi.',
        price: 'Menü Dahil',
        category: 'Ana Yemek'
      },
      {
        id: 'puj-2',
        name: 'Baby Corn & Chicatana Ant Mayonnaise',
        description: 'Közlenmiş mini tatlı mısır, füme kabak mayonezi ve Oaxacan dağ karıncaları tozu.',
        price: 'Menü Dahil',
        category: 'Başlangıç'
      }
    ],
    reviews: [
      {
        id: 'rev-pj1',
        author: 'Mateo Morales',
        rating: 5,
        date: '17 Ekim 2026',
        title: 'Orgullo de la gastronomía mexicana',
        comment: 'El mole madre tiene una complejidad que parece un vino añejo de 50 años. El servicio en el patio es sublime.',
        visitType: 'Akşam Yemeği'
      }
    ],
    ratingsBreakdown: { food: 5.0, service: 4.9, ambiance: 4.9, value: 4.8 }
  },

  // --- SYDNEY, AUSTRALIA ---
  {
    id: 'rest-quay-sydney',
    name: 'Quay',
    city: 'Sidney',
    country: 'Avustralya',
    continent: 'Okyanusya',
    cuisine: 'Modern Avustralya & Deniz Ürünleri',
    priceLevel: '$$$$',
    averagePricePerPerson: 'A$310 - A$420',
    rating: 4.91,
    reviewCount: 2750,
    michelinStars: 3,
    michelinGuideNote: 'Şef Peter Gilmore’un Sidney Opera Binası ve Liman Köprüsü manzarası eşliğinde doğadan ilham alan menüsü.',
    coordinates: { lat: -33.8587, lng: 151.2100 },
    address: 'Upper Level Overseas Passenger Terminal, The Rocks, Sydney NSW 2000, Avustralya',
    phone: '+61 2 9251 5600',
    website: 'https://www.quay.com.au',
    dressCode: 'Smart Casual / Şık',
    reservationRequired: true,
    heroImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Sidney Limanı’nın suları üzerinde yüzer gibi hissettiren Quay, Şef Peter Gilmore’un doğadaki dokuları ve Avustralya’nın endemik deniz ürünlerini sergilediği eşsiz bir gastronomi anıtıdır.',
    features: ['Opera Binası & Liman Manzarası', '6 ve 8 Tabaklı Tadım', 'Avustralya Butik Şarap Seçkisi', 'Özel Salon'],
    operatingHours: [
      { dayName: 'Pazartesi', dayIndex: 1, isOpen: false, note: 'Kapalı' },
      { dayName: 'Salı', dayIndex: 2, isOpen: false, note: 'Kapalı' },
      { dayName: 'Çarşamba', dayIndex: 3, isOpen: true, openTime: '18:00', closeTime: '23:00', dinnerShift: '18:00 - 23:00' },
      { dayName: 'Perşembe', dayIndex: 4, isOpen: true, openTime: '18:00', closeTime: '23:00', dinnerShift: '18:00 - 23:00' },
      { dayName: 'Cuma', dayIndex: 5, isOpen: true, openTime: '18:00', closeTime: '23:30', lunchShift: '12:00 - 14:00', dinnerShift: '18:00 - 23:30' },
      { dayName: 'Cumartesi', dayIndex: 6, isOpen: true, openTime: '18:00', closeTime: '23:30', lunchShift: '12:00 - 14:00', dinnerShift: '18:00 - 23:30' },
      { dayName: 'Pazar', dayIndex: 0, isOpen: true, openTime: '12:00', closeTime: '16:00', lunchShift: '12:00 - 16:00', note: 'Sadece öğle servisi' }
    ],
    signatureDishes: [
      {
        id: 'quay-1',
        name: 'White Coral Tatlısı',
        description: 'Dondurulmuş beyaz çikolatalı köpük mercan, mango dondurması, Hindistan cevizi karı.',
        price: 'Menü Dahil',
        category: 'Tatlı'
      },
      {
        id: 'quay-2',
        name: 'Mud Crab & Hand Rolled Silken Noodles',
        description: 'Taze Queensland çamur yengeci, el açması ipeksi pirinç erişteleri, deniz sarımsağı yağı.',
        price: 'Menü Dahil',
        category: 'Ana Yemek'
      }
    ],
    reviews: [
      {
        id: 'rev-qy1',
        author: 'Liam Hemsworth',
        rating: 5,
        date: '11 Ekim 2026',
        title: 'Unrivalled view of the Sydney Opera House',
        comment: 'Dining while the sun sets over the harbour is unforgettable. White Coral dessert is sheer magic on the palate.',
        visitType: 'Özel Kutlama'
      }
    ],
    ratingsBreakdown: { food: 4.9, service: 5.0, ambiance: 5.0, value: 4.6 }
  },

  // --- DUBAI, UAE ---
  {
    id: 'rest-tresind-studio-dubai',
    name: 'Trèsind Studio',
    city: 'Dubai',
    country: 'BAE',
    continent: 'Asya',
    cuisine: 'Modern Hint & Miksoloji',
    priceLevel: '$$$$',
    averagePricePerPerson: '850 AED - 1.250 AED',
    rating: 4.93,
    reviewCount: 1920,
    michelinStars: 2,
    michelinGuideNote: 'Şef Himanshu Saini’nin Palm Jumeirah’da 20 misafire sunduğu 16 tabaklı büyüleyici Hint lezzet yolculuğu.',
    coordinates: { lat: 25.1124, lng: 55.1390 },
    address: 'St. Regis Gardens, Palm Jumeirah, Dubai, BAE',
    phone: '+971 58 895 1272',
    website: 'https://tresindstudio.com',
    dressCode: 'Elegant Casual',
    reservationRequired: true,
    heroImage: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Palm Jumeirah’ın çatısında yer alan Trèsind Studio, Şef Himanshu Saini’nin Hindistan’ın dört bir yanındaki 28 eyaletin baharat kültürünü modernize ettiği, Ortadoğu’nun en yüksek puanlı gastronomik deneyimidir.',
    features: ['Palm Jumeirah Manzarası', 'Sadece 20 Misafir', '16 Aşamalı Deneyim Menüsü', 'Botanika Terası'],
    operatingHours: [
      { dayName: 'Pazartesi', dayIndex: 1, isOpen: true, openTime: '18:00', closeTime: '23:30', dinnerShift: '18:00 ve 21:00 iki oturum' },
      { dayName: 'Salı', dayIndex: 2, isOpen: true, openTime: '18:00', closeTime: '23:30', dinnerShift: '18:00 ve 21:00 iki oturum' },
      { dayName: 'Çarşamba', dayIndex: 3, isOpen: true, openTime: '18:00', closeTime: '23:30', dinnerShift: '18:00 ve 21:00 iki oturum' },
      { dayName: 'Perşembe', dayIndex: 4, isOpen: true, openTime: '18:00', closeTime: '23:30', dinnerShift: '18:00 ve 21:00 iki oturum' },
      { dayName: 'Cuma', dayIndex: 5, isOpen: true, openTime: '18:00', closeTime: '23:30', dinnerShift: '18:00 ve 21:00 iki oturum' },
      { dayName: 'Cumartesi', dayIndex: 6, isOpen: true, openTime: '18:00', closeTime: '23:30', dinnerShift: '18:00 ve 21:00 iki oturum' },
      { dayName: 'Pazar', dayIndex: 0, isOpen: true, openTime: '18:00', closeTime: '23:30', dinnerShift: '18:00 ve 21:00 iki oturum' }
    ],
    signatureDishes: [
      {
        id: 'tres-1',
        name: 'Ghee Roast Crab & Karaca Kestaneleri',
        description: 'Tandır fırınında tereyağında kavrulmuş yengeç eti, baharatlı hindistan cevizi köpüğü.',
        price: 'Menü Dahil',
        category: 'Ana Yemek'
      }
    ],
    reviews: [
      {
        id: 'rev-tr1',
        author: 'Zeynep Aksoy',
        rating: 5,
        date: '8 Ekim 2026',
        title: 'Dubai’de gastronominin doruk noktası',
        comment: 'Baharat dengesi ve tabakların sanatsal sunumu inanılmazdı. Şef Himanshu’nun hikayeleri büyüleyici.',
        visitType: 'Akşam Yemeği'
      }
    ],
    ratingsBreakdown: { food: 5.0, service: 4.9, ambiance: 4.9, value: 4.7 }
  },

  // --- ISTANBUL BONUS: NICOLE & KARAKÖY LOKANTASI ---
  {
    id: 'rest-nicole-istanbul',
    name: 'Nicole Restaurant',
    city: 'İstanbul',
    country: 'Türkiye',
    continent: 'Avrupa',
    cuisine: 'Çağdaş Akdeniz & Fransız Esintili',
    priceLevel: '$$$$',
    averagePricePerPerson: '₺3.800 - ₺4.900',
    rating: 4.89,
    reviewCount: 1100,
    michelinStars: 1,
    michelinGuideNote: 'Şef Serkan Aksoy yönetiminde Tomtom Suites’in terasında tarihi yarımadaya bakan 1 Michelin Yıldızlı zarafet.',
    coordinates: { lat: 41.0302, lng: 28.9769 },
    address: 'Tomtom Suites Teras Kat, Boğazkesen Cad. Tomtom Kaptan Sok. No:18, Beyoğlu, İstanbul',
    phone: '+90 212 292 44 67',
    website: 'https://nicole.com.tr',
    dressCode: 'Smart Casual / Şık',
    reservationRequired: true,
    heroImage: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Adını tarihi binanın eski sakinlerinden rahibe Agnes Nicole’den alan restoran, geleneksel Türk malzemelerini klasik Fransız tekniğiyle bir araya getiren zarif bir teras deneyimidir.',
    features: ['Tarihi Tomtom Mahallesi', 'Panoramik Prens Adaları Manzarası', 'Özel Butik Şarap Eşleşmesi'],
    operatingHours: [
      { dayName: 'Pazartesi', dayIndex: 1, isOpen: false, note: 'Kapalı' },
      { dayName: 'Salı', dayIndex: 2, isOpen: true, openTime: '18:30', closeTime: '23:30', dinnerShift: '18:30 - 23:30' },
      { dayName: 'Çarşamba', dayIndex: 3, isOpen: true, openTime: '18:30', closeTime: '23:30', dinnerShift: '18:30 - 23:30' },
      { dayName: 'Perşembe', dayIndex: 4, isOpen: true, openTime: '18:30', closeTime: '23:30', dinnerShift: '18:30 - 23:30' },
      { dayName: 'Cuma', dayIndex: 5, isOpen: true, openTime: '18:30', closeTime: '23:30', dinnerShift: '18:30 - 23:30' },
      { dayName: 'Cumartesi', dayIndex: 6, isOpen: true, openTime: '18:30', closeTime: '23:30', dinnerShift: '18:30 - 23:30' },
      { dayName: 'Pazar', dayIndex: 0, isOpen: false, note: 'Kapalı' }
    ],
    signatureDishes: [
      {
        id: 'nic-1',
        name: 'Trüflü Bıldırcın Dolması',
        description: 'Taze dağ kekiği ve kuzu göbeği mantarlarıyla doldurulmuş fırın bıldırcın.',
        price: 'Tadım Dahil',
        category: 'Ana Yemek'
      }
    ],
    reviews: [
      {
        id: 'rev-nc1',
        author: 'Melis Vural',
        rating: 5,
        date: '27 Eylül 2026',
        title: 'İstanbul’un en romantik terası',
        comment: 'Tarihi yarımada ışıkları altında şarabınızı yudumlarken gelen her tabak bir sanat eseriydi.',
        visitType: 'Özel Kutlama'
      }
    ],
    ratingsBreakdown: { food: 4.9, service: 4.9, ambiance: 4.9, value: 4.7 }
  }
];

export const WORLD_CITIES = [
  { name: 'Tüm Şehirler', count: 12, coordinates: { lat: 30, lng: 15 }, zoom: 2 },
  { name: 'İstanbul', count: 3, coordinates: { lat: 41.0082, lng: 28.9784 }, zoom: 13 },
  { name: 'Tokyo', count: 2, coordinates: { lat: 35.6762, lng: 139.6503 }, zoom: 13 },
  { name: 'Paris', count: 2, coordinates: { lat: 48.8566, lng: 2.3522 }, zoom: 13 },
  { name: 'Roma', count: 2, coordinates: { lat: 41.9028, lng: 12.4964 }, zoom: 13 },
  { name: 'New York', count: 2, coordinates: { lat: 40.7128, lng: -74.0060 }, zoom: 13 },
  { name: 'Londra', count: 2, coordinates: { lat: 51.5074, lng: -0.1278 }, zoom: 13 },
  { name: 'Barselona', count: 1, coordinates: { lat: 41.3851, lng: 2.1734 }, zoom: 13 },
  { name: 'Kopenhag', count: 1, coordinates: { lat: 55.6761, lng: 12.5683 }, zoom: 13 },
  { name: 'Bangkok', count: 1, coordinates: { lat: 13.7563, lng: 100.5018 }, zoom: 13 },
  { name: 'Mexico City', count: 1, coordinates: { lat: 19.4326, lng: -99.1332 }, zoom: 13 },
  { name: 'Sidney', count: 1, coordinates: { lat: -33.8688, lng: 151.2093 }, zoom: 13 },
  { name: 'Dubai', count: 1, coordinates: { lat: 25.2048, lng: 55.2708 }, zoom: 13 }
];

export const CUISINE_TYPES = [
  'Tümü',
  'Yeni Anadolu Mutfağı',
  'Edomae Sushi & Omakase',
  'Modern Kaiseki',
  'Fransız Yüksek Gastronomisi (Haute Cuisine)',
  'Modern Fransız & Neo-Bistro',
  'Modern İtalyan & Avangart',
  'Geleneksel Roma & Şarküteri',
  'Çağdaş Deniz Ürünleri & Fransız',
  'Kore Çağdaş & Fermantasyon',
  'Modern İngiliz & Fransız',
  'Holistik Gastronomi & İskandinav',
  'Modern Akdeniz & Avangart Moleküler',
  'Progresif Hint & Moleküler Rock’n’Roll',
  'Meksika Çağdaş & Mole',
  'Modern Avustralya & Deniz Ürünleri',
  'Modern Hint & Miksoloji'
];
