/**
 * DVD Rental / MySQL Query Scenarios Definition
 * Author / Hazırlayan: Enes Öztürk
 */

export interface ScenarioItem {
  id: number;
  slug: string;
  badge: string;
  title: string;
  question: string;
  sqlQuery: string;
  alternativeQuery?: string;
  explanationSteps: {
    step: string;
    description: string;
    codeSnippet?: string;
  }[];
  mysqlNotes: string[];
  performanceTips: string;
  relevantTables: string[];
  keyFunctions: string[];
  authorSignature: string;
}

export const SCENARIOS: ScenarioItem[] = [
  {
    id: 1,
    slug: 'ortalama-uzunluktan-fazla-filmler',
    badge: '1. Senaryo · Alt Sorgu (Subquery)',
    title: 'Ortalama Film Uzunluğundan Uzun Filmlerin Sayısı',
    question: 'film tablosunda film uzunluğu length sütununda gösterilmektedir. Uzunluğu ortalama film uzunluğundan fazla kaç tane film vardır?',
    sqlQuery: `-- =========================================================================
-- Senaryo 1: Ortalama film uzunluğundan daha uzun olan filmlerin sayısı
-- Hazırlayan: Enes Öztürk | Veri Tabanı: dvdrental (MySQL)
-- =========================================================================

SELECT 
    COUNT(*) AS ortalamadan_uzun_film_sayisi
FROM 
    film
WHERE 
    length > (
        SELECT AVG(length) 
        FROM film
    );`,
    alternativeQuery: `-- Alternatif 1: Ortalama değeri de sonuçta gösteren MySQL CTE (Common Table Expression)
WITH OrtalamaSure AS (
    SELECT AVG(length) AS avg_len 
    FROM film
)
SELECT 
    COUNT(*) AS ortalamadan_uzun_film_sayisi,
    ROUND((SELECT avg_len FROM OrtalamaSure), 2) AS ortalama_sure_dakika
FROM 
    film, OrtalamaSure
WHERE 
    film.length > OrtalamaSure.avg_len;`,
    explanationSteps: [
      {
        step: '1. Alt Sorgu (İç Sorgu) Çalışır',
        description: 'Parantez içerisindeki `(SELECT AVG(length) FROM film)` alt sorgusu çalışarak tüm filmlerin sürelerinin aritmetik ortalamasını (DVD Rental standardında ~115.27 dakika) tek bir skaler değer olarak hesaplar.',
        codeSnippet: 'SELECT AVG(length) FROM film; -- Sonuç: 115.27'
      },
      {
        step: '2. Dış Sorgu Karşılaştırmayı Yapar',
        description: 'Dış sorgudaki `WHERE length > ...` koşulu, film tablosundaki her bir kaydın `length` değerini hesaplanan ortalama ile karşılaştırır ve yalnızca ortalamayı aşan kayıtları filtreler.',
        codeSnippet: 'WHERE length > 115.27'
      },
      {
        step: '3. COUNT(*) ile Sayım Gerçekleşir',
        description: 'Filtrelenen satırlar `COUNT(*)` kümeleme fonksiyonuyla sayılarak nihai sayı tek satır olarak döndürülür.',
        codeSnippet: 'SELECT COUNT(*) AS ortalamadan_uzun_film_sayisi'
      }
    ],
    mysqlNotes: [
      'MySQL WHERE bloğunda doğrudan `length > AVG(length)` yazılamaz; çünkü `AVG()` kümeleme (aggregate) fonksiyonudur ve gruplama/filtreleme sırasında skaler alt sorgu gerektirir.',
      'Sorgu tek bir skaler değer (Single Value Subquery) döndürdüğü için `>` karşılaştırma operatörü güvenle kullanılır.',
      'Tüm Sakila/DVD Rental veritabanında ortalama film süresi ~115.27 dk olup, 1000 film arasından 489 adedi bu ortalamanın üzerindedir.'
    ],
    performanceTips: '`film.length` sütununa B-Tree indeksi eklendiğinde (`CREATE INDEX idx_film_length ON film(length);`) MySQL optimizer aralık taramasını çok daha hızlı gerçekleştirir.',
    relevantTables: ['film'],
    keyFunctions: ['COUNT()', 'AVG()', 'Subquery'],
    authorSignature: 'Enes Öztürk'
  },
  {
    id: 2,
    slug: 'en-yuksek-rental-rate-filmler',
    badge: '2. Senaryo · MAX() & Subquery',
    title: 'En Yüksek Kiralama Ücretine Sahip Filmlerin Sayısı',
    question: 'film tablosunda en yüksek rental_rate değerine sahip kaç tane film vardır?',
    sqlQuery: `-- =========================================================================
-- Senaryo 2: En yüksek rental_rate değerine sahip filmlerin sayısı
-- Hazırlayan: Enes Öztürk | Veri Tabanı: dvdrental (MySQL)
-- =========================================================================

SELECT 
    COUNT(*) AS en_yuksek_ucretli_film_sayisi
FROM 
    film
WHERE 
    rental_rate = (
        SELECT MAX(rental_rate) 
        FROM film
    );`,
    alternativeQuery: `-- Alternatif 2: Hem maksimum ücreti hem de sayıyı birlikte görüntüleme
SELECT 
    rental_rate AS en_yuksek_kiralama_ucreti,
    COUNT(*) AS film_sayisi
FROM 
    film
WHERE 
    rental_rate = (SELECT MAX(rental_rate) FROM film)
GROUP BY 
    rental_rate;`,
    explanationSteps: [
      {
        step: '1. Maksimum Değeri Bulma',
        description: 'İçteki `(SELECT MAX(rental_rate) FROM film)` alt sorgusu çalışır ve film tablosundaki en yüksek kiralama ücretini (DVD Rental veri tabanında 4.99) belirler.',
        codeSnippet: 'SELECT MAX(rental_rate) FROM film; -- Sonuç: 4.99'
      },
      {
        step: '2. Eşitlik Koşulu ile Filtreleme',
        description: 'Dış sorgu, `rental_rate = 4.99` şartını sağlayan tüm filmleri belirler.',
        codeSnippet: 'WHERE rental_rate = 4.99'
      },
      {
        step: '3. Adet Hesaplama',
        description: '`COUNT(*)` fonksiyonu bu kritere uyan film adedini döndürür (Tam Sakila veri tabanında 336 film).',
        codeSnippet: 'COUNT(*) AS en_yuksek_ucretli_film_sayisi'
      }
    ],
    mysqlNotes: [
      '`rental_rate` veri tipi MySQL dvdrental şemasında `DECIMAL(4,2)` olarak tanımlanmıştır.',
      'Sorguda `MAX()` skaler alt sorgu olarak kullanıldığında dinamiktir; yani yeni filmler eklense veya fiyat politikası değişse bile her zaman güncel tavan fiyatı yakalar.',
      'Hardcoded `WHERE rental_rate = 4.99` yazmak yerine alt sorgu kullanmak veritabanı esnekliği ve temiz kod prensibi sağlar.'
    ],
    performanceTips: '`rental_rate` sütununda indeks varsa `MAX(rental_rate)` işlemi tabloyu bütünüyle taramadan (full table scan yerine) anında indeksin son düğümünden O(1) maliyetle okunur.',
    relevantTables: ['film'],
    keyFunctions: ['COUNT()', 'MAX()', 'DECIMAL'],
    authorSignature: 'Enes Öztürk'
  },
  {
    id: 3,
    slug: 'en-dusuk-ucret-ve-maliyetli-filmler',
    badge: '3. Senaryo · Çoklu Kriter & Sıralama',
    title: 'En Düşük rental_rate ve replacement_cost Değerine Sahip Filmler',
    question: 'film tablosunda en düşük rental_rate ve en düşün replacement_cost değerlerine sahip filmleri sıralayınız.',
    sqlQuery: `-- =========================================================================
-- Senaryo 3: En düşük rental_rate VE en düşük replacement_cost filmleri
-- Hazırlayan: Enes Öztürk | Veri Tabanı: dvdrental (MySQL)
-- =========================================================================

SELECT 
    film_id,
    title,
    rental_rate,
    replacement_cost,
    length,
    rating
FROM 
    film
WHERE 
    rental_rate = (SELECT MIN(rental_rate) FROM film)
    AND replacement_cost = (SELECT MIN(replacement_cost) FROM film)
ORDER BY 
    title ASC;`,
    alternativeQuery: `-- Alternatif 3: MySQL Çoklu Değer Eşleştirme (Tuple Comparison)
SELECT 
    film_id,
    title,
    rental_rate,
    replacement_cost,
    length,
    rating
FROM 
    film
WHERE 
    (rental_rate, replacement_cost) = (
        SELECT MIN(rental_rate), MIN(replacement_cost) 
        FROM film
    )
ORDER BY 
    title ASC;`,
    explanationSteps: [
      {
        step: '1. Minimum Değerlerin Tespiti',
        description: 'İki bağımsız alt sorgu veya tuple sorgusu çalıştırılarak: En düşük kiralama ücreti (`MIN(rental_rate) = 0.99`) ve en düşük yenileme maliyeti (`MIN(replacement_cost) = 9.99`) bulunur.',
        codeSnippet: 'SELECT MIN(rental_rate), MIN(replacement_cost) FROM film; -- (0.99, 9.99)'
      },
      {
        step: '2. Mantıksal AND Birleşimi',
        description: 'Filmin hem kiralama ücretinin en düşük (0.99) hem de yenileme maliyetinin en düşük (9.99) olduğu kesişim kümesi `AND` operatörüyle filtrelenir.',
        codeSnippet: 'WHERE rental_rate = 0.99 AND replacement_cost = 9.99'
      },
      {
        step: '3. Alfabetik Sıralama (ORDER BY)',
        description: 'Kriterleri sağlayan filmler kullanıcı dostu bir görünüm için `ORDER BY title ASC` ile film adına göre A-Z sıralanır.',
        codeSnippet: 'ORDER BY title ASC;'
      }
    ],
    mysqlNotes: [
      'MySQL, `(rental_rate, replacement_cost) = (SELECT MIN(rental_rate), MIN(replacement_cost) FROM film)` şeklindeki tuple (çoklu sütun) karşılaştırmasını doğal olarak destekler.',
      'Soru hem filtrelemeyi hem de "sıralayınız" direktifini içerdiğinden `ORDER BY title ASC` eklenmesi kritik önem taşır.',
      'dvdrental veri tabanında bu iki minimum değeri aynı anda sağlayan filmler mevcuttur (Örn: ALAMO VIDEOTAPE, ANACONDA CONFESSIONS, BREAKER CLUB vb.).'
    ],
    performanceTips: 'Bileşik indeks (Composite Index): `CREATE INDEX idx_rate_cost ON film(rental_rate, replacement_cost);` oluşturulduğunda bu sorgu tek adımda indeks üzerinden çözülür.',
    relevantTables: ['film'],
    keyFunctions: ['MIN()', 'AND', 'ORDER BY', 'Tuple Subquery'],
    authorSignature: 'Enes Öztürk'
  },
  {
    id: 4,
    slug: 'en-cok-alisveris-yapan-musteriler',
    badge: '4. Senaryo · GROUP BY & COUNT() & JOIN',
    title: 'En Fazla Sayıda Alışveriş Yapan Müşterilerin Sıralanması',
    question: 'payment tablosunda en fazla sayıda alışveriş yapan müşterileri(customer) sıralayınız.',
    sqlQuery: `-- =========================================================================
-- Senaryo 4: En fazla sayıda alışveriş yapan müşterilerin sıralaması
-- Hazırlayan: Enes Öztürk | Veri Tabanı: dvdrental (MySQL)
-- =========================================================================

SELECT 
    c.customer_id,
    c.first_name,
    c.last_name,
    c.email,
    COUNT(p.payment_id) AS toplam_alisveris_sayisi,
    SUM(p.amount) AS toplam_harcama_tutari
FROM 
    customer c
INNER JOIN 
    payment p ON c.customer_id = p.customer_id
GROUP BY 
    c.customer_id,
    c.first_name,
    c.last_name,
    c.email
ORDER BY 
    toplam_alisveris_sayisi DESC;`,
    alternativeQuery: `-- Alternatif 4: Sadece payment tablosu kullanılarak yapılan saf sorgu
SELECT 
    customer_id,
    COUNT(*) AS alisveris_sayisi,
    SUM(amount) AS toplam_odenen_tutar
FROM 
    payment
GROUP BY 
    customer_id
ORDER BY 
    alisveris_sayisi DESC;`,
    explanationSteps: [
      {
        step: '1. Tabloların Birleştirilmesi (INNER JOIN)',
        description: 'Müşteri isim ve e-posta bilgilerini görebilmek için `customer` tablosu `payment` tablosuyla ortak anahtar olan `customer_id` üzerinden birleştirilir.',
        codeSnippet: 'FROM customer c INNER JOIN payment p ON c.customer_id = p.customer_id'
      },
      {
        step: '2. Müşteri Bazında Gruplama (GROUP BY)',
        description: 'Tüm ödeme hareketleri `GROUP BY c.customer_id, c.first_name, c.last_name, c.email` ile müşteri bazında gruplanır.',
        codeSnippet: 'GROUP BY c.customer_id, c.first_name, c.last_name, c.email'
      },
      {
        step: '3. Alışveriş Sayımı ve Azalan Sıralama (ORDER BY DESC)',
        description: 'Her müşterinin toplam ödeme adedi `COUNT(p.payment_id)` ile hesaplanır ve en çok alışveriş yapandan en aza doğru `ORDER BY toplam_alisveris_sayisi DESC` ile sıralanır.',
        codeSnippet: 'ORDER BY toplam_alisveris_sayisi DESC;'
      }
    ],
    mysqlNotes: [
      'MySQL `ONLY_FULL_GROUP_BY` SQL modunda, `SELECT` kısmında yer alan ve kümeleme fonksiyonunda olmayan (`first_name`, `last_name`, `email`) tüm sütunların `GROUP BY` ifadesinde yer alması standartlara uygundur.',
      'Soru hem doğrudan sadece `payment` tablosundan hem de `customer` tablosuyla `JOIN` yapılarak çözülebilir; profesyonel raporlamada müşteri adı gerektiği için JOIN versiyonu önerilir.',
      'dvdrental veri tabanında zirvedeki müşteriler arasında Eleanor Hunt (ID: 148, 46 alışveriş), Karl Seal (ID: 526, 45 alışveriş) ve Clara Shaw (ID: 144, 42 alışveriş) yer alır.'
    ],
    performanceTips: '`payment.customer_id` sütununda foreign key indeksi bulunduğunda JOIN ve GROUP BY operasyonu hash veya index look-up yöntemiyle milisaniyeler içinde tamamlanır.',
    relevantTables: ['payment', 'customer'],
    keyFunctions: ['COUNT()', 'SUM()', 'INNER JOIN', 'GROUP BY', 'ORDER BY DESC'],
    authorSignature: 'Enes Öztürk'
  }
];

export const FULL_SQL_SCRIPT = `/*
 * =========================================================================
 * DVD RENTAL (SAKILA) VERİ TABANI - MYSQL SORGULARI
 * =========================================================================
 * Hazırlayan : Enes Öztürk
 * Veritabanı : dvdrental / sakila (MySQL 8.x / MariaDB Uyumlu)
 * Oluşturulma: 2026
 * Açıklama   : dvdrental örnek veri tabanı üzerinde gerçekleştirilen
 *              4 temel sorgu senaryosunun detaylı çözümleri.
 * =========================================================================
 */

-- -------------------------------------------------------------------------
-- 1. SENARYO:
-- film tablosunda film uzunluğu length sütununda gösterilmektedir. 
-- Uzunluğu ortalama film uzunluğundan fazla kaç tane film vardır?
-- -------------------------------------------------------------------------
SELECT 
    COUNT(*) AS ortalamadan_uzun_film_sayisi
FROM 
    film
WHERE 
    length > (
        SELECT AVG(length) 
        FROM film
    );

-- -------------------------------------------------------------------------
-- 2. SENARYO:
-- film tablosunda en yüksek rental_rate değerine sahip kaç tane film vardır?
-- -------------------------------------------------------------------------
SELECT 
    COUNT(*) AS en_yuksek_ucretli_film_sayisi
FROM 
    film
WHERE 
    rental_rate = (
        SELECT MAX(rental_rate) 
        FROM film
    );

-- -------------------------------------------------------------------------
-- 3. SENARYO:
-- film tablosunda en düşük rental_rate ve en düşük replacement_cost 
-- değerlerine sahip filmleri sıralayınız.
-- -------------------------------------------------------------------------
SELECT 
    film_id,
    title,
    rental_rate,
    replacement_cost,
    length,
    rating
FROM 
    film
WHERE 
    rental_rate = (SELECT MIN(rental_rate) FROM film)
    AND replacement_cost = (SELECT MIN(replacement_cost) FROM film)
ORDER BY 
    title ASC;

-- -------------------------------------------------------------------------
-- 4. SENARYO:
-- payment tablosunda en fazla sayıda alışveriş yapan müşterileri(customer) 
-- sıralayınız.
-- -------------------------------------------------------------------------
SELECT 
    c.customer_id,
    c.first_name,
    c.last_name,
    c.email,
    COUNT(p.payment_id) AS toplam_alisveris_sayisi,
    SUM(p.amount) AS toplam_harcama_tutari
FROM 
    customer c
INNER JOIN 
    payment p ON c.customer_id = p.customer_id
GROUP BY 
    c.customer_id,
    c.first_name,
    c.last_name,
    c.email
ORDER BY 
    toplam_alisveris_sayisi DESC;

/* ========================== SON / ENES ÖZTÜRK ========================== */
`;
