export interface AssignmentItem {
  id: string;
  orderNumber: number;
  title: string;
  targetTable: 'country' | 'film';
  userQuestion: string;
  recommendedSql: string;
  alternatives: {
    title: string;
    sql: string;
    note: string;
  }[];
  explanation: string;
  wildcardRules: {
    symbol: string;
    meaning: string;
    usageInQuery: string;
  }[];
  sampleMatches: string[];
  counterExamples: string[];
}

export const SAKILA_ASSIGNMENTS: AssignmentItem[] = [
  {
    id: "task-1",
    orderNumber: 1,
    title: "'A' ile Başlayıp 'a' ile Biten Ülkeler",
    targetTable: "country",
    userQuestion: "country tablosunda bulunan country sütunundaki ülke isimlerinden 'A' karakteri ile başlayıp 'a' karakteri ile sonlananları sıralayınız.",
    recommendedSql: `SELECT country
FROM country
WHERE country LIKE 'A%a'
ORDER BY country;`,
    alternatives: [
      {
        title: "Büyük/Küçük Harf Hassasiyeti (BINARY Collation)",
        sql: `SELECT country
FROM country
WHERE country LIKE BINARY 'A%a'
ORDER BY country;`,
        note: "MySQL'de varsayılan collation (utf8mb4_general_ci) harf büyüklüğünü yok sayar. 'A'nın kesinlikle büyük, sondaki 'a'nın kesinlikle küçük olması istendiğinde BINARY anahtar sözcüğü kullanılır."
      },
      {
        title: "İki Ayrı LIKE Koşuluyla (AND)",
        sql: `SELECT country
FROM country
WHERE country LIKE 'A%' AND country LIKE '%a'
ORDER BY country;`,
        note: "Hem 'A%' (A ile başlayanlar) hem de '%a' (a ile bitenler) koşulunu mantıksal AND operatörü ile birleştirir."
      }
    ],
    explanation: `Bu sorguda SQL'in desen eşleme (pattern matching) operatörü olan LIKE ve '%' joker karakteri kullanılır.
• 'A%a' kalıbı: Başı 'A' harfi olan, sonu 'a' harfi olan ve aralarında sıfır veya daha fazla herhangi bir karakter barındıran tüm dizgileri eşleştirir.
• ORDER BY country: Çıkan sonuçları alfabetik olarak A'dan Z'ye sıralar.`,
    wildcardRules: [
      { symbol: "'A%'", meaning: "Dizgi 'A' ile başlamalıdır", usageInQuery: "A ile başlayan ülkeler" },
      { symbol: "'%'", meaning: "Sıfır, bir veya daha fazla karakter", usageInQuery: "A ve a arasındaki her şey" },
      { symbol: "'%a'", meaning: "Dizgi 'a' ile bitmelidir", usageInQuery: "Son harfi 'a' olanlar" }
    ],
    sampleMatches: [
      "Algeria",
      "American Samoa",
      "Angola",
      "Anguilla",
      "Argentina",
      "Armenia",
      "Australia",
      "Austria"
    ],
    counterExamples: [
      "Afghanistan (Sonu n ile biter)",
      "Azerbaijan (Sonu n ile biter)",
      "Brazil (A ile başlamaz)",
      "Canada (C ile başlar)"
    ]
  },

  {
    id: "task-2",
    orderNumber: 2,
    title: "En Az 6 Karakterli ve Sonu 'n' ile Biten Ülkeler",
    targetTable: "country",
    userQuestion: "country tablosunda bulunan country sütunundaki ülke isimlerinden en az 6 karakterden oluşan ve sonu 'n' karakteri ile sonlananları sıralayınız.",
    recommendedSql: `SELECT country
FROM country
WHERE country LIKE '_____%n'
ORDER BY country;`,
    alternatives: [
      {
        title: "LENGTH() Fonksiyonu ile Çözüm",
        sql: `SELECT country
FROM country
WHERE LENGTH(country) >= 6
  AND country LIKE '%n'
ORDER BY country;`,
        note: "Karakter uzunluğunu doğrudan LENGTH(country) >= 6 ile denetler, son harfinin 'n' olduğunu ise LIKE '%n' ile filtreler. Anlaşılırlığı en yüksek yaklaşımdır."
      },
      {
        title: "CHAR_LENGTH() ile Çok Baytlı Desteği",
        sql: `SELECT country
FROM country
WHERE CHAR_LENGTH(country) >= 6
  AND country LIKE '%n'
ORDER BY country;`,
        note: "CHAR_LENGTH, UTF-8 karakter sayısını bayt cinsinden değil harf cinsinden saydığı için uluslararası karakterlerde en güvenilir yöntemdir."
      }
    ],
    explanation: `SQL LIKE operatöründe '_' (alt çizgi) joker karakteri tam olarak TEK bir karakteri temsil eder.
• 5 adet alt çizgi (_____) en az 5 karakter olduğunu garanti eder.
• '%' karakteri 5 karakterden sonra sıfır veya daha fazla karakter gelebileceğini belirtir.
• Sonundaki 'n' ise son karakterin 'n' olduğunu şart koşar. 5 + 1 = Toplamda EN AZ 6 karakter ve sonu 'n' ile biten ülkeler yakalanır!`,
    wildcardRules: [
      { symbol: "_ (Alt Çizgi)", meaning: "Tam olarak tek bir karakteri temsil eder", usageInQuery: "5 adet '_' ilk 5 karakteri kesinleştirir" },
      { symbol: "% (Yüzde)", meaning: "0 veya daha fazla karakter", usageInQuery: "6. karakterden sonra gelebilecek ek harfler" },
      { symbol: "n (Harf)", meaning: "Son harfin 'n' olması", usageInQuery: "Dizgi 'n' ile kapanmalıdır" }
    ],
    sampleMatches: [
      "Afghanistan (11 karakter, sonu n)",
      "Azerbaijan (10 karakter, sonu n)",
      "Bahrain (7 karakter, sonu n)",
      "Cameroon (8 karakter, sonu n)",
      "Jordan (6 karakter, sonu n)",
      "Kazakhstan (10 karakter, sonu n)",
      "Liechtenstein (13 karakter, sonu n)",
      "Pakistan (8 karakter, sonu n)",
      "Russian Federation (18 karakter, sonu n)",
      "Sweden (6 karakter, sonu n)",
      "Taiwan (6 karakter, sonu n)",
      "Yemen (5 karakter DEĞİL, 5 harfli olduğu için elenir!)"
    ],
    counterExamples: [
      "Oman (4 karakter -> 6'dan küçük, elenir)",
      "Iran (4 karakter -> 6'dan küçük, elenir)",
      "Japan (5 karakter -> 6'dan küçük, elenir)",
      "Yemen (5 karakter -> 6'dan küçük, elenir)",
      "Spain (5 karakter -> 6'dan küçük, elenir)"
    ]
  },

  {
    id: "task-3",
    orderNumber: 3,
    title: "En Az 4 Adet 'T' / 't' Karakteri İçeren Filmler",
    targetTable: "film",
    userQuestion: "film tablosunda bulunan title sütunundaki film isimlerinden en az 4 adet büyük ya da küçük harf farketmesizin 'T' karakteri içeren film isimlerini sıralayınız.",
    recommendedSql: `SELECT title
FROM film
WHERE LOWER(title) LIKE '%t%t%t%t%'
ORDER BY title;`,
    alternatives: [
      {
        title: "Standard MySQL Collation (Doğal Case-Insensitive)",
        sql: `SELECT title
FROM film
WHERE title LIKE '%t%t%t%t%'
ORDER BY title;`,
        note: "MySQL'de varsayılan latin1_swedish_ci veya utf8mb4_general_ci harf büyüklüğüne duyarsız (case-insensitive) olduğundan doğrudan '%t%t%t%t%' yazmak hem 'T' hem 't' harflerini bulur."
      },
      {
        title: "LENGTH() & REPLACE() ile Harf Sayımı Yöntemi",
        sql: `SELECT title
FROM film
WHERE (LENGTH(title) - LENGTH(REPLACE(LOWER(title), 't', ''))) >= 4
ORDER BY title;`,
        note: "Orijinal metin uzunluğundan 't' harfleri çıkarılmış metin uzunluğu çıkartılarak 't' harfi sayısı tam olarak hesaplanır ve >= 4 şartı test edilir."
      },
      {
        title: "PostgreSQL / ILIKE veya REGEXP Yöntemi",
        sql: `SELECT title
FROM film
WHERE title REGEXP '([^t]*t){4,}'
ORDER BY title;`,
        note: "Düzenli ifadeler (Regular Expressions) ile en az 4 't' içeren kalıpları eşleştirir."
      }
    ],
    explanation: `Film isimlerinde 'T' harflerinin hangi sırada veya nerede olduğu bilinmediğinde, '%t%t%t%t%' deseni kullanılır.
• 1. 't' bulunur, aradaki karakterler fark etmeksizin (%) 2. 't' aranır, ardından 3. ve 4. 't' yakalanır.
• Başa ve sona konulan '%' işaretleri 't' harflerinden önce veya sonra başka sözcükler olabileceğini belirtir.
• LOWER(title) fonksiyonu tüm başlığı küçük harfe dönüştürerek büyük/küçük harf ayrımını tamamen ortadan kaldırır.`,
    wildcardRules: [
      { symbol: "LOWER(title)", meaning: "Tüm metni küçük harfe çevirir", usageInQuery: "Büyük 'T' ve küçük 't' farkını yok eder" },
      { symbol: "%t%t%t%t%", meaning: "Aralarında herhangi bir karakter olabilen en az 4 adet 't'", usageInQuery: "4 veya daha fazla 't' harfini yakalar" }
    ],
    sampleMatches: [
      "ATTRACTION INSTINCT (5 adet 't': a-T-T-r-a-c-T-i-o-n  i-n-s-T-i-n-c-T)",
      "ATTRACTION NEWTON (4 adet 't': a-T-T-r-a-c-t-i-o-n  n-e-w-T-o-n)",
      "ENTRAPMENT SATISFACTION (4 adet 't': e-n-T-r-a-p-m-e-n-T  s-a-T-i-s-f-a-c-T-i-o-n)",
      "POTTER CONNECTICUT (4 adet 't': p-o-T-T-e-r  c-o-n-n-e-c-T-i-c-u-T)",
      "TALENTED ATTRACTION (5 adet 't': T-a-l-e-n-T-e-d  a-T-T-r-a-c-T-i-o-n)",
      "TEMPEST TWISTED (4 adet 't': T-e-m-p-e-s-T  T-w-i-s-T-e-d)",
      "TITANIC TRANSLATION (4 adet 't': T-i-T-a-n-i-c  T-r-a-n-s-l-a-T-i-o-n)",
      "TRAFFIC CONSTITUTION (4 adet 't': T-r-a-f-f-i-c  c-o-n-s-T-i-T-u-T-i-o-n)",
      "TRANSACTION ATLANTIS (4 adet 't': T-r-a-n-s-a-c-T-i-o-n  a-T-l-a-n-T-i-s)"
    ],
    counterExamples: [
      "CONSTITUTION HANOVER (Tam olarak 3 't' harfi var -> 4'ten az olduğu için elenir)",
      "VERTIGO NORTHWEST (Tam olarak 3 't' harfi var -> elenir)",
      "PATRIOT ROMAN (Tam olarak 2 't' harfi var -> elenir)",
      "ACADEMY DINOSAUR (0 adet 't' -> elenir)"
    ]
  },

  {
    id: "task-4",
    orderNumber: 4,
    title: "Title 'C' ile Başlayan, Length > 90 ve Rental Rate = 2.99",
    targetTable: "film",
    userQuestion: "film tablosunda bulunan tüm sütunlardaki verilerden title 'C' karakteri ile başlayan ve uzunluğu (length) 90 dan büyük olan ve rental_rate 2.99 olan verileri sıralayınız.",
    recommendedSql: `SELECT *
FROM film
WHERE title LIKE 'C%'
  AND length > 90
  AND rental_rate = 2.99
ORDER BY title;`,
    alternatives: [
      {
        title: "LEFT() String Fonksiyonu Alternatifi",
        sql: `SELECT *
FROM film
WHERE LEFT(title, 1) = 'C'
  AND length > 90
  AND rental_rate = 2.99
ORDER BY title;`,
        note: "title LIKE 'C%' yerine LEFT(title, 1) = 'C' fonksiyonu da kullanılabilir (indeks optimizasyonu açısından LIKE 'C%' B-Tree indeksini daha etkin kullanır)."
      },
      {
        title: "Süreye Göre Azalan Sıralama (Alternatif Sıralama)",
        sql: `SELECT *
FROM film
WHERE title LIKE 'C%'
  AND length > 90
  AND rental_rate = 2.99
ORDER BY length DESC, title ASC;`,
        note: "Tüm koşulları sağlayan filmleri en uzun süreden en kısaya doğru sıralayarak listeler."
      }
    ],
    explanation: `Bu sorgu ilişkisel veritabanlarının en güçlü yeteneklerinden biri olan ÇOKLU FİLTRELEME (Compound Filtering) mekanizmasını sergiler:
1. SELECT *: film tablosundaki tüm sütunları (film_id, title, description, release_year, rental_rate, length vb.) seçer.
2. WHERE title LIKE 'C%': Başlığı 'C' harfiyle başlayan filmleri süzgeçten geçirir.
3. AND length > 90: Yalnızca süresi 90 dakikadan kesinlikle büyük olanları korur.
4. AND rental_rate = 2.99: Kiralama ücreti tam olarak 2.99 dolar olanları zorunlu kılar.
5. ORDER BY title: Sonuçları film başlığına göre alfabetik düzene koyar.`,
    wildcardRules: [
      { symbol: "title LIKE 'C%'", meaning: "İlk harfi C olan başlıklar", usageInQuery: "C ile başlayan filmler" },
      { symbol: "length > 90", meaning: "Süresi 90 dakikanın üzerinde", usageInQuery: "90 dakikadan uzun süren filmler" },
      { symbol: "rental_rate = 2.99", meaning: "Kiralama ücreti 2.99 olanlar", usageInQuery: "Sabit ücret filtresi" },
      { symbol: "AND", meaning: "Mantıksal VE bağlacı", usageInQuery: "3 koşulun hepsinin aynı anda sağlanması zorunludur" }
    ],
    sampleMatches: [
      "CABIN FLASH (length: 104 dk, rate: 2.99)",
      "CABLE GRACELAND (length: 98 dk, rate: 2.99)",
      "CALENDAR GUNFIGHT (length: 120 dk, rate: 2.99)",
      "CALIFORNIA BIRDS (length: 95 dk, rate: 2.99)",
      "CAMPUS PREJUDICE (length: 125 dk, rate: 2.99)",
      "CANDIDATE PERDITION (length: 170 dk, rate: 2.99)",
      "CASUALTIES SENIORITY (length: 179 dk, rate: 2.99)",
      "CHANCE RESURRECTION (length: 165 dk, rate: 2.99)",
      "CHAPLIN REALITY (length: 95 dk, rate: 2.99)",
      "CHARIOTS CONSPIRACY (length: 91 dk, rate: 2.99)",
      "CHINATOWN GLADIATOR (length: 135 dk, rate: 2.99)",
      "CHOCOLATE DUCK (length: 132 dk, rate: 2.99)",
      "CITIZEN SHREK (length: 165 dk, rate: 2.99)",
      "CLASH DURHAM (length: 145 dk, rate: 2.99)",
      "CLERGYMAN CLUB (length: 115 dk, rate: 2.99)",
      "CLUELESS BUCKET (length: 95 dk, rate: 2.99)",
      "CONNECTICUT BIEN (length: 172 dk, rate: 2.99)",
      "CRUSADE HONEY (length: 112 dk, rate: 2.99)"
    ],
    counterExamples: [
      "CASABLANCA SUPER (C ile başlar, rate 2.99, ANCAK length 85 dk <= 90 -> Süre şartından elenir)",
      "CENTER DINOSAUR (C ile başlar, length 152 dk > 90, ANCAK rate 4.99 != 2.99 -> Ücret şartından elenir)",
      "ALADDIN CALENDAR (length 120 dk, rate 2.99, ANCAK title A ile başlıyor -> Baş harf şartından elenir)"
    ]
  }
];
