export interface Product {
  id: number;
  title: string;
  imgURL: string;
  price: string;
  inStock: boolean;
  category?: string;
  rating?: number;
  description?: string;
}

export const PRODUCTS_DATA: Product[] = [
  {
    id: 0,
    title: 'Xiaomi Mi True Wireless Earbuds',
    imgURL: 'https://m.media-amazon.com/images/I/51uguxa9nYL._AC._SR360,460.jpg',
    price: '₺134,77',
    inStock: true,
    category: 'Kulaklık',
    rating: 4.4,
    description: 'Kablosuz stereo ses deneyimi, Bluetooth 5.0 teknolojisi ve şarj kutusu ile 12 saate kadar pil ömrü.',
  },
  {
    id: 1,
    title: 'General Mobile GM 20',
    imgURL: 'https://m.media-amazon.com/images/I/51lK00mvFaL._AC._SR180,230.jpg',
    price: '₺1.810,21',
    inStock: true,
    category: 'Telefon',
    rating: 4.2,
    description: '6.09 inç damla çentikli HD+ ekran, 4000 mAh batarya ve yapay zeka destekli üçlü arka kamera.',
  },
  {
    id: 2,
    title: 'Philips 58PUS8505/62 The One',
    imgURL: 'https://m.media-amazon.com/images/I/71zLCzJcXaL._AC._SR360,460.jpg',
    price: '₺6.992,25',
    inStock: false,
    category: 'Televizyon',
    rating: 4.8,
    description: '58 inç 4K UHD LED Android TV, 3 taraflı Ambilight teknolojisi ve Dolby Vision & Atmos desteği.',
  },
  {
    id: 3,
    title: 'LG 49UM7100PLB Ultra HD 4K',
    imgURL: 'https://m.media-amazon.com/images/I/71gAldY8eGL._AC._SR360,460.jpg',
    price: '₺4.614,38',
    inStock: true,
    category: 'Televizyon',
    rating: 4.6,
    description: 'Dört çekirdekli 4K işlemci, webOS akıllı televizyon işletim sistemi ve zengin renk spektrumu.',
  },
  {
    id: 4,
    title: 'Samsung Galaxy M31 SM-M315F',
    imgURL: 'https://m.media-amazon.com/images/I/71mUIp9oCXL._AC._SR360,460.jpg',
    price: '₺2.995,80',
    inStock: true,
    category: 'Telefon',
    rating: 4.7,
    description: '6000 mAh devasa batarya, 64 MP dörtlü kamera ve 6.4 inç Super AMOLED Infinity-U ekran.',
  },
  {
    id: 5,
    title: 'Apple AirPods Series 2',
    imgURL: 'https://m.media-amazon.com/images/I/51XanmiXw0L._AC._SR360,460.jpg',
    price: '₺1.299,00',
    inStock: true,
    category: 'Kulaklık',
    rating: 4.9,
    description: 'Apple H1 kulaklık çipi, Hey Siri sesli komut ve 24 saatin üzerinde toplam dinleme süresi sağlayan kutu.',
  },
  {
    id: 6,
    title: 'Lenovo Tab M10 Plus',
    imgURL: 'https://m.media-amazon.com/images/I/81JR-A35D0L._AC._SR360,460.jpg',
    price: '₺2.496,50',
    inStock: false,
    category: 'Tablet',
    rating: 4.3,
    description: '10.3 inç Full HD ekran, şık metal gövde ve çift Dolby Atmos hoparlör sistemi.',
  },
  {
    id: 7,
    title: 'Xiaomi Redmi 20000 Mah',
    imgURL: 'https://images-na.ssl-images-amazon.com/images/I/41vVdTukkgL._AC_SX522_.jpg',
    price: '₺134,70',
    inStock: false,
    category: 'Aksesuar',
    rating: 4.5,
    description: '18W hızlı şarj desteği, çift giriş ve çift çıkış portları, yüksek kapasiteli lityum iyon polimer pil.',
  },
  {
    id: 8,
    title: 'Xiaomi Mijia Smart Home 360',
    imgURL: 'https://images-na.ssl-images-amazon.com/images/I/31G-rIrW9zL._AC_UL320_SR226,320_.jpg',
    price: '₺269,73',
    inStock: true,
    category: 'Akıllı Ev',
    rating: 4.6,
    description: '1080p FHD çözünürlük, 360 derece panoramik görüş açısı, gece görüşü ve yapay zeka hareket algılama.',
  },
  {
    id: 9,
    title: 'Xiaomi Mi Box S 4K Ultra HD',
    imgURL: 'https://images-na.ssl-images-amazon.com/images/I/31sNKUGwNUL._AC_.jpg',
    price: '₺478,53',
    inStock: true,
    category: 'Medya Oynatıcı',
    rating: 4.7,
    description: 'Android 8.1 TV Box, Google Asistan sesli kumanda, 4K HDR oynatma ve Chromecast dahili.',
  },
  {
    id: 10,
    title: 'Haylou Solar LS-5 Smartwatch',
    imgURL: 'https://images-na.ssl-images-amazon.com/images/I/51kfZ4W9YSL._AC_SX522_.jpg',
    price: '₺296,00',
    inStock: true,
    category: 'Giyilebilir',
    rating: 4.3,
    description: '12 spor modu, 30 günlük bekleme süresi, kalp atış hızı takibi ve IP68 suya dayanıklılık sertifikası.',
  },
];
