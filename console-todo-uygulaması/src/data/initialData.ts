import { BoardState, BuyuklukEnum, TakimUyesi, Kart } from '../types/todo';

export const VARSAYILAN_TAKIM_UYELERI: Record<number, TakimUyesi> = {
  1: {
    id: 1,
    isim: 'Enes Öztürk',
    unvan: 'Takım Lideri / Kıdemli Yazılım Mimarı',
    avatarColor: 'from-emerald-500 to-teal-600',
  },
  2: {
    id: 2,
    isim: 'Zeynep Kaya',
    unvan: 'Frontend Geliştirici',
    avatarColor: 'from-blue-500 to-indigo-600',
  },
  3: {
    id: 3,
    isim: 'Burak Yılmaz',
    unvan: 'Backend Geliştirici',
    avatarColor: 'from-violet-500 to-purple-600',
  },
  4: {
    id: 4,
    isim: 'Elif Çelik',
    unvan: 'UI / UX Tasarımcı',
    avatarColor: 'from-pink-500 to-rose-600',
  },
  5: {
    id: 5,
    isim: 'Caner Demir',
    unvan: 'DevOps & Kalite Güvence',
    avatarColor: 'from-amber-500 to-orange-600',
  },
};

export const VARSAYILAN_KARTLAR: Kart[] = [
  {
    id: 'kart-1',
    baslik: 'C# Konsol Mimarisi',
    icerik: 'Sınıflar, Enum yapıları ve Dictionary koleksiyonlarının kurgulanması.',
    atananKisiId: 1, // Enes Öztürk
    buyukluk: BuyuklukEnum.L,
    line: 'TODO',
    olusturmaTarihi: '2026-10-21 09:30',
  },
  {
    id: 'kart-2',
    baslik: 'Kart Taşıma Algoritması',
    icerik: 'Kullanıcı girişine göre kartın kolonlar arası transfer mekanizması.',
    atananKisiId: 2, // Zeynep Kaya
    buyukluk: BuyuklukEnum.M,
    line: 'IN_PROGRESS',
    olusturmaTarihi: '2026-10-21 10:15',
  },
  {
    id: 'kart-3',
    baslik: 'Birim Testleri ve Doğrulama',
    icerik: 'Hatalı ID ve geçersiz büyüklük giriş kontrollerinin test edilmesi.',
    atananKisiId: 3, // Burak Yılmaz
    buyukluk: BuyuklukEnum.S,
    line: 'DONE',
    olusturmaTarihi: '2026-10-21 11:00',
  },
];

export const getInitialBoardState = (): BoardState => {
  const lines: BoardState['lines'] = {
    TODO: [],
    IN_PROGRESS: [],
    DONE: [],
  };

  VARSAYILAN_KARTLAR.forEach((kart) => {
    lines[kart.line].push({ ...kart });
  });

  return {
    lines,
    takimUyeleri: { ...VARSAYILAN_TAKIM_UYELERI },
  };
};
