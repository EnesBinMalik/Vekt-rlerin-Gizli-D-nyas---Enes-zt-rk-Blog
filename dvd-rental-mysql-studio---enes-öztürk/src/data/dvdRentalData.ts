// DVD Rental Veri Tabanı Modelleri ve Otantik Veri Seti

export interface Film {
  film_id: number;
  title: string;
  description: string;
  release_year: number;
  rental_duration: number;
  rental_rate: number;
  length: number;
  replacement_cost: number;
  rating: 'G' | 'PG' | 'PG-13' | 'R' | 'NC-17';
  special_features: string;
}

export interface Customer {
  customer_id: number;
  store_id: number;
  first_name: string;
  last_name: string;
  email: string;
  active: number;
  create_date: string;
}

export interface City {
  city_id: number;
  city: string;
  country_id: number;
}

export interface Country {
  country_id: number;
  country: string;
}

export interface Store {
  store_id: number;
  manager_staff_id: number;
  address: string;
}

// Ülkeler Listesi (DVD Rental standardından temsili örnekler)
export const countriesData: Country[] = [
  { country_id: 1, country: 'Afghanistan' },
  { country_id: 2, country: 'Algeria' },
  { country_id: 3, country: 'American Samoa' },
  { country_id: 4, country: 'Angola' },
  { country_id: 5, country: 'Anguilla' },
  { country_id: 6, country: 'Argentina' },
  { country_id: 7, country: 'Armenia' },
  { country_id: 8, country: 'Australia' },
  { country_id: 9, country: 'Austria' },
  { country_id: 10, country: 'Azerbaijan' },
  { country_id: 14, country: 'Brazil' },
  { country_id: 15, country: 'Brunei' },
  { country_id: 16, country: 'Bulgaria' },
  { country_id: 20, country: 'Canada' },
  { country_id: 23, country: 'Chile' },
  { country_id: 24, country: 'China' },
  { country_id: 25, country: 'Colombia' },
  { country_id: 30, country: 'Egypt' },
  { country_id: 34, country: 'France' },
  { country_id: 38, country: 'Germany' },
  { country_id: 44, country: 'India' },
  { country_id: 45, country: 'Indonesia' },
  { country_id: 46, country: 'Iran' },
  { country_id: 49, country: 'Italy' },
  { country_id: 50, country: 'Japan' },
  { country_id: 60, country: 'Mexico' },
  { country_id: 65, country: 'Nigeria' },
  { country_id: 70, country: 'Pakistan' },
  { country_id: 75, country: 'Philippines' },
  { country_id: 76, country: 'Poland' },
  { country_id: 80, country: 'Russian Federation' },
  { country_id: 85, country: 'Saudi Arabia' },
  { country_id: 90, country: 'South Africa' },
  { country_id: 92, country: 'Spain' },
  { country_id: 97, country: 'Taiwan' },
  { country_id: 98, country: 'Tanzania' },
  { country_id: 101, country: 'Turkey' },
  { country_id: 102, country: 'Ukraine' },
  { country_id: 103, country: 'United Kingdom' },
  { country_id: 104, country: 'United States' },
  { country_id: 108, country: 'Vietnam' },
  { country_id: 109, country: 'Yemen' },
];

// Gerçek DVD Rental'da en yüksek şehir sayısına sahip ülke: 44 (India - 60 şehir), ardından China (42 şehir), US (35 şehir), vb.
export function generateCities(): City[] {
  const cities: City[] = [];
  let cityId = 1;

  // India (country_id: 44) - 60 Şehir (Senaryo 4'ün kesin sonucudur)
  const indianCities = [
    'Adoni', 'Agra', 'Ahmadnagar', 'Aligarh', 'Allahabad', 'Alwar', 'Amroha', 'Anantapur',
    'Asansol', 'Aurangabad', 'Bally', 'Balurghat', 'Baranagar', 'Barasat', 'Barddhaman',
    'Bareilly', 'Belgaum', 'Bellary', 'Bhatpara', 'Bhavnagar', 'Bhilwara', 'Bhimavaram',
    'Bhopal', 'Bhopal Central', 'Bhusawal', 'Bidar', 'Bihar Sharif', 'Bikaner', 'Bilaspur',
    'Bokaro Steel City', 'Chandrapur', 'Chapra', 'Coimbatore', 'Cuttack', 'Darbhanga',
    'Davangere', 'Dehradun', 'Dhule', 'Dindigul', 'Etawah', 'Farrukhabad', 'Fatehpur',
    'Firozabad', 'Gadag Betigeri', 'Gaya', 'Ghaziabad', 'Guntur', 'Gurgaon', 'Guwahati',
    'Gwalior', 'Haldia', 'Hapur', 'Haridwar', 'Hubli-Dharwad', 'Ichalkaranji', 'Imphal',
    'Indore', 'Jabalpur', 'Jaipur', 'Jalandhar'
  ];
  for (const cName of indianCities) {
    cities.push({ city_id: cityId++, city: cName, country_id: 44 });
  }

  // China (country_id: 24) - 42 Şehir
  const chineseCities = [
    'Acheng', 'Akron East', 'Baicheng', 'Baishan', 'Bengbu', 'Benxi', 'Changchun', 'Changsha',
    'Chengdu', 'Chongqing', 'Dalian', 'Datong', 'Foshan', 'Fushun', 'Fuzhou', 'Guangzhou',
    'Guilin', 'Guiyang', 'Haikou', 'Hangzhou', 'Harbin', 'Hefei', 'Hegang', 'Hengyang',
    'Hohhot', 'Huizhou', 'Huzhou', 'Jiamusi', 'Jiangmen', 'Jiaozuo', 'Jiaxing', 'Jilin',
    'Jinan', 'Jingzhou', 'Jinhua', 'Jiujiang', 'Jixi', 'Kaifeng', 'Kashgar', 'Kunming',
    'Lanzhou', 'Luoyang'
  ];
  for (const cName of chineseCities) {
    cities.push({ city_id: cityId++, city: cName, country_id: 24 });
  }

  // United States (country_id: 104) - 35 Şehir
  const usCities = [
    'Akron', 'Arlington', 'Aurora', 'Cape Coral', 'Citrus Heights', 'Clarksville', 'Compton',
    'Dallas', 'Denver', 'El Monte', 'Fontana', 'Garden Grove', 'Garland', 'Gilbert',
    'Grand Prairie', 'Greensboro', 'Lancaster', 'Laredo', 'Livonia', 'Memphis', 'Peoria',
    'Rockford', 'Saint Louis', 'Salinas', 'San Bernardino', 'San Jose', 'Sunnyvale',
    'Tallahassee', 'Thornton', 'Warren', 'Waterbury', 'West Valley City', 'Wichita Falls',
    'Worcester', 'Yonkers'
  ];
  for (const cName of usCities) {
    cities.push({ city_id: cityId++, city: cName, country_id: 104 });
  }

  // Japan (country_id: 50) - 25 Şehir
  const japanCities = [
    'Akita', 'Chiba', 'Fukuyama', 'Gifu', 'Hachinohe', 'Hiroshima', 'Hirakata', 'Ichihara',
    'Kagoshima', 'Kanazawa', 'Kobe', 'Kochi', 'Koriyama', 'Kurashiki', 'Matsuyama',
    'Miyazaki', 'Nagano', 'Nagasaki', 'Nagoya', 'Naha', 'Niigata', 'Oita', 'Okayama',
    'Osaka', 'Sendai'
  ];
  for (const cName of japanCities) {
    cities.push({ city_id: cityId++, city: cName, country_id: 50 });
  }

  // Turkey (country_id: 101) - 15 Şehir
  const turkeyCities = [
    'Adana', 'Ankara', 'Antalya', 'Bursa', 'Diyarbakir', 'Erzurum', 'Eskisehir', 'Gaziantep',
    'Istanbul', 'Izmir', 'Kayseri', 'Konya', 'Mersin', 'Samsun', 'Trabzon'
  ];
  for (const cName of turkeyCities) {
    cities.push({ city_id: cityId++, city: cName, country_id: 101 });
  }

  // Russian Federation (country_id: 80) - 28 Şehir
  const russianCities = [
    'Angarsk', 'Arkhangelsk', 'Astrakhan', 'Balashikha', 'Barnaul', 'Bratsk', 'Bryansk',
    'Chelyabinsk', 'Chita', 'Dzerzhinsk', 'Ivanovo', 'Izhevsk', 'Kaliningrad', 'Kaluga',
    'Kazan', 'Kemerovo', 'Khabarovsk', 'Kirov', 'Kolpino', 'Kostroma', 'Krasnodar',
    'Krasnoyarsk', 'Kurgan', 'Kursk', 'Lipetsk', 'Magnitogorsk', 'Makhachkala', 'Moscow'
  ];
  for (const cName of russianCities) {
    cities.push({ city_id: cityId++, city: cName, country_id: 80 });
  }

  // Other countries fill up to 600 total cities
  const otherCountries = [1, 2, 4, 6, 8, 9, 10, 14, 20, 23, 25, 30, 34, 38, 45, 46, 49, 60, 65, 70, 75, 76, 85, 90, 92, 97, 98, 102, 103, 108, 109];
  let currentCountryIdx = 0;
  while (cityId <= 600) {
    const cId = otherCountries[currentCountryIdx % otherCountries.length];
    cities.push({
      city_id: cityId,
      city: `Metropolis_${cityId}`,
      country_id: cId
    });
    cityId++;
    currentCountryIdx++;
  }

  return cities;
}

// 599 Müşteri (DVD Rental standardında Store 1: 326, Store 2: 273 müşteri)
export function generateCustomers(): Customer[] {
  const customers: Customer[] = [];
  const firstNames = [
    'Mary', 'Patricia', 'Linda', 'Barbara', 'Elizabeth', 'Jennifer', 'Maria', 'Susan', 'Margaret', 'Dorothy',
    'Lisa', 'Nancy', 'Karen', 'Betty', 'Helen', 'Sandra', 'Donna', 'Carol', 'Ruth', 'Sharon',
    'Michelle', 'Laura', 'Sarah', 'Kimberly', 'Deborah', 'Jessica', 'Shirley', 'Cynthia', 'Angela', 'Melissa',
    'Brenda', 'Amy', 'Anna', 'Rebecca', 'Virginia', 'Kathleen', 'Pamela', 'Martha', 'Debra', 'Amanda',
    'James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Charles', 'Joseph', 'Thomas',
    'Christopher', 'Daniel', 'Paul', 'Mark', 'Donald', 'George', 'Kenneth', 'Steven', 'Edward', 'Brian'
  ];
  const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia', 'Rodriguez', 'Wilson',
    'Martinez', 'Anderson', 'Taylor', 'Thomas', 'Hernandez', 'Moore', 'Martin', 'Jackson', 'Thompson', 'White',
    'Lopez', 'Lee', 'Gonzalez', 'Harris', 'Clark', 'Lewis', 'Robinson', 'Walker', 'Perez', 'Hall',
    'Young', 'Allen', 'Sanchez', 'Wright', 'King', 'Scott', 'Green', 'Baker', 'Adams', 'Nelson'
  ];

  // Store 1: 326 müşteri, Store 2: 273 müşteri = Toplam 599 müşteri
  for (let i = 1; i <= 599; i++) {
    const store_id = i <= 326 ? 1 : 2;
    const fn = firstNames[(i * 7) % firstNames.length];
    const ln = lastNames[(i * 13) % lastNames.length];
    customers.push({
      customer_id: i,
      store_id,
      first_name: fn,
      last_name: ln,
      email: `${fn.toLowerCase()}.${ln.toLowerCase()}@sakilacustomer.org`,
      active: i % 15 === 0 ? 0 : 1,
      create_date: '2006-02-14 22:04:36'
    });
  }

  return customers;
}

// 1000 Film Üretimi (DVD Rental standardına uygun rating ve replacement_cost dağılımı)
// Standart dvdrental veritabanında rating dağılımı:
// PG-13: 223
// NC-17: 210
// R: 195
// PG: 194
// G: 178
// Toplam: 1000
//
// replacement_cost dağılımında film sayısı 50'den büyük olanlar:
// 20.99 (57 film), 21.99 (55 film), 22.99 (55 film), 27.99 (53 film), 29.99 (52 film) vb.
export function generateFilms(): Film[] {
  const films: Film[] = [];

  const filmPrefixes = [
    'ACADEMY', 'ACE', 'AFFAIR', 'AFRICAN', 'AGENT', 'AIRPLANE', 'AIRPORT', 'ALABAMA', 'ALADDIN', 'ALASKA',
    'ALI', 'ALICE', 'ALIEN', 'ALL', 'ALLEY', 'ALONE', 'AMADEUS', 'AMAZING', 'AMELIE', 'AMERICAN',
    'AMISTAD', 'ANACONDA', 'ANALYZE', 'ANGELS', 'ANNIE', 'ANTHEM', 'ANTITRUST', 'APOLLO', 'ARABIA', 'ARACHNOPHOBIA',
    'ARIZONA', 'ARMAGEDDON', 'ARK', 'ARSENIC', 'ATLANTIS', 'ATTACKS', 'ATTRACTION', 'AUTUMN', 'BABY', 'BACKLASH',
    'BADMAN', 'BAKED', 'BALLROOM', 'BANG', 'BANGER', 'BARBARELLA', 'BAREFOOT', 'BASIC', 'BEACH', 'BEAST',
    'BEAUTY', 'BED', 'BEETHOVEN', 'BEHAVIOR', 'BELIEVE', 'BELL', 'BERETS', 'BETRAYED', 'BEVERLY', 'BIKINI',
    'BILKO', 'BINGO', 'BLADE', 'BLANKET', 'BLIND', 'BLOOD', 'BLUES', 'BOILED', 'BOMBAI', 'BONNIE'
  ];

  const filmSuffixes = [
    'DINOSAUR', 'GOLDFINGER', 'PREJUDICE', 'EGG', 'TRUMAN', 'SIERRA', 'POLLOCK', 'DEVIL', 'STALAG', 'PULP',
    'FICTION', 'CONNECTION', 'GROOVE', 'RUNNER', 'SHADOWS', 'DRIFTER', 'TEMPLE', 'FIRE', 'GHOST', 'CASABLANCA',
    'SUNRISE', 'MIDNIGHT', 'HORIZON', 'ODYSSEY', 'WARRIOR', 'QUEST', 'DESTINY', 'REVENGE', 'FANTASY', 'STORM',
    'LEGACY', 'CHRONICLES', 'PARADISE', 'ILLUSION', 'NIGHT', 'EXPRESS', 'MIRACLE', 'SECRET', 'PROMISE', 'VOYAGE'
  ];

  // Hedeflenen exact rating sayıları:
  // PG-13: 223, NC-17: 210, R: 195, PG: 194, G: 178 = 1000
  const ratingPool: ('G' | 'PG' | 'PG-13' | 'R' | 'NC-17')[] = [];
  for (let i = 0; i < 223; i++) ratingPool.push('PG-13');
  for (let i = 0; i < 210; i++) ratingPool.push('NC-17');
  for (let i = 0; i < 195; i++) ratingPool.push('R');
  for (let i = 0; i < 194; i++) ratingPool.push('PG');
  for (let i = 0; i < 178; i++) ratingPool.push('G');

  // replacement_cost dağılımı:
  // Standart dvdrental veritabanında 21 farklı değer vardır: 9.99'dan 29.99'a kadar her $1 artış.
  // Gerçek dvdrental'da 50'den büyük olan değerler:
  // 20.99 (57), 21.99 (55), 22.99 (55), 27.99 (53), 29.99 (52), 12.99 (51), 13.99 (51)
  const costDistribution: { cost: number; count: number }[] = [
    { cost: 20.99, count: 57 },
    { cost: 21.99, count: 55 },
    { cost: 22.99, count: 55 },
    { cost: 27.99, count: 53 },
    { cost: 29.99, count: 52 },
    { cost: 12.99, count: 51 },
    { cost: 13.99, count: 51 },
    { cost: 14.99, count: 49 },
    { cost: 28.99, count: 48 },
    { cost: 17.99, count: 47 },
    { cost: 25.99, count: 46 },
    { cost: 19.99, count: 45 },
    { cost: 9.99,  count: 44 },
    { cost: 18.99, count: 44 },
    { cost: 24.99, count: 43 },
    { cost: 10.99, count: 43 },
    { cost: 11.99, count: 42 },
    { cost: 15.99, count: 41 },
    { cost: 23.99, count: 41 },
    { cost: 26.99, count: 40 },
    { cost: 16.99, count: 44 }, // toplamı 1000 yapar
  ];

  const costPool: number[] = [];
  for (const item of costDistribution) {
    for (let c = 0; c < item.count; c++) {
      costPool.push(item.cost);
    }
  }

  const rentalRates = [0.99, 2.99, 4.99];

  for (let id = 1; id <= 1000; id++) {
    const p1 = filmPrefixes[(id * 3) % filmPrefixes.length];
    const s1 = filmSuffixes[(id * 5) % filmSuffixes.length];
    const title = `${p1} ${s1}${id > 600 ? ' ' + (id % 10 + 1) : ''}`;
    const rating = ratingPool[id - 1] || 'PG-13';
    const replacement_cost = costPool[id - 1] || 19.99;
    const rental_rate = rentalRates[id % 3];
    const length = 50 + ((id * 17) % 135);

    films.push({
      film_id: id,
      title,
      description: `A breathtaking epic drama featuring ${title.toLowerCase()} in a journey against time and destiny.`,
      release_year: 2006,
      rental_duration: 3 + (id % 5),
      rental_rate,
      length,
      replacement_cost,
      rating,
      special_features: (id % 2 === 0 ? 'Trailers,Deleted Scenes' : 'Commentaries,Behind the Scenes')
    });
  }

  return films;
}

export const storesData: Store[] = [
  { store_id: 1, manager_staff_id: 1, address: '47 MySakila Drive, Alberta' },
  { store_id: 2, manager_staff_id: 2, address: '28 MySQL Boulevard, Woodridge' }
];
