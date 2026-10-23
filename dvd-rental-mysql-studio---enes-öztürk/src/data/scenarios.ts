export interface Scenario {
  id: number;
  title: string;
  shortTitle: string;
  targetTable: string;
  question: string;
  sqlQuery: string;
  alternativeQuery?: string;
  explanation: string;
  syntaxBreakdown: {
    clause: string;
    description: string;
  }[];
  keyTakeaway: string;
  interviewTip: string;
  chartType: 'donut' | 'bar' | 'comparison' | 'badge';
  highlightMetricLabel: string;
  category: 'Gruplama' | 'Filtreleme' | 'Sıralama & Limit' | 'İlişkisel';
}

export const SCENARIOS: Scenario[] = [
  {
    id: 1,
    title: 'Senaryo 1: Filmleri Rating Değerlerine Göre Gruplama',
    shortTitle: '1. Film Rating Dağılımı',
    targetTable: 'film',
    category: 'Gruplama',
    question: 'film tablosunda bulunan filmleri rating değerlerine göre gruplayınız.',
    sqlQuery: `SELECT 
    rating, 
    COUNT(*) AS film_sayisi 
FROM film 
GROUP BY rating 
ORDER BY film_sayisi DESC;`,
    alternativeQuery: `SELECT 
    rating, 
    COUNT(*) AS film_sayisi,
    ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM film), 2) AS yuzde_orani
FROM film 
GROUP BY rating 
ORDER BY film_sayisi DESC;`,
    explanation:
      '`film` tablosundaki 1000 filmi `rating` (G, PG, PG-13, R, NC-17) sütununa göre ayrıştırıp her kategorideki toplam film adedini `COUNT(*)` agregasyon fonksiyonu ile hesaplıyoruz. `ORDER BY film_sayisi DESC` ile en çok filme sahip içerik derecesinden en aza doğru sıralanır.',
    syntaxBreakdown: [
      {
        clause: 'SELECT rating, COUNT(*) AS film_sayisi',
        description: 'Gruplanacak olan rating sütununu ve o gruptaki satır sayısını "film_sayisi" takma adıyla seçer.',
      },
      {
        clause: 'FROM film',
        description: 'Verilerin çekileceği ana film tablosunu belirtir.',
      },
      {
        clause: 'GROUP BY rating',
        description: 'Satırları aynı rating değerine (G, PG, PG-13, R, NC-17) sahip olanları tek bir grupta toplar.',
      },
      {
        clause: 'ORDER BY film_sayisi DESC',
        description: 'Sonuç kümesini film sayısına göre çoktan aza (büyükten küçüğe) listeler.',
      },
    ],
    keyTakeaway:
      'DVD Rental envanterinde en yaygın film kategorisi 223 filmle "PG-13", ardından 210 filmle "NC-17" gelmektedir. En az film ise 178 adet ile "G" derecesine aittir.',
    interviewTip:
      'GROUP BY kullanılan bir SELECT sorgusunda, SELECT listesinde yer alan sütunlar ya GROUP BY ifadesinde bulunmalı ya da bir toplama fonksiyonu (COUNT, SUM, AVG, MIN, MAX) içinde sarmalanmalıdır. Aksi halde MySQL ONLY_FULL_GROUP_BY modunda hata fırlatır.',
    chartType: 'donut',
    highlightMetricLabel: 'En Yüksek Kategori: PG-13 (223 Film)',
  },
  {
    id: 2,
    title: 'Senaryo 2: Replacement Cost Gruplama ve 50+ Filtresi',
    shortTitle: '2. Replacement Cost (>50)',
    targetTable: 'film',
    category: 'Filtreleme',
    question:
      'film tablosunda bulunan filmleri replacement_cost sütununa göre grupladığımızda film sayısı 50 den fazla olan replacement_cost değerini ve karşılık gelen film sayısını sıralayınız.',
    sqlQuery: `SELECT 
    replacement_cost, 
    COUNT(*) AS film_sayisi 
FROM film 
GROUP BY replacement_cost 
HAVING COUNT(*) > 50 
ORDER BY film_sayisi DESC, replacement_cost ASC;`,
    alternativeQuery: `SELECT 
    replacement_cost, 
    COUNT(*) AS film_sayisi 
FROM film 
GROUP BY replacement_cost 
HAVING film_sayisi > 50 
ORDER BY film_sayisi DESC;`,
    explanation:
      '`film` tablosundaki filmleri yenileme/ikame maliyetlerine (`replacement_cost`) göre grupluyoruz. Toplam film sayısı 50\'nin üzerinde olan maliyet gruplarını ayıklamak için `HAVING COUNT(*) > 50` koşulunu uyguluyoruz. Son olarak da film sayısına göre azalan sırada listeliyoruz.',
    syntaxBreakdown: [
      {
        clause: 'GROUP BY replacement_cost',
        description: 'Her benzersiz film değiştirme maliyetini (örn. 20.99, 21.99, ...) ayrı bir grup yapar.',
      },
      {
        clause: 'HAVING COUNT(*) > 50',
        description: 'Grup oluştuktan sonra sadece içerisinde 50 adetten fazla film barındıran grupları filtreler (WHERE yerine HAVING zorunludur!).',
      },
      {
        clause: 'ORDER BY film_sayisi DESC, replacement_cost ASC',
        description: 'Önce en çok filme sahip maliyeti gösterir; eşitlik durumunda maliyete göre sıralar.',
      },
    ],
    keyTakeaway:
      '21 farklı yedekleme maliyeti arasından sadece 8 tanesinde 50\'den fazla film bulunmaktadır. Zirvede $20.99 (57 film), $21.99 (55 film) ve $22.99 (55 film) yer almaktadır.',
    interviewTip:
      'WHERE vs HAVING Farkı: WHERE satır düzeyinde filtreleme yapar ve gruplama öncesinde çalışır. Toplama (agregasyon) fonksiyonları (COUNT, SUM vb.) WHERE ile kullanılamaz. HAVING ise GROUP BY sonrasında oluşan özet grupları filtreler.',
    chartType: 'bar',
    highlightMetricLabel: 'Kriteri Sağlayan Grup: 8 Farklı Maliyet',
  },
  {
    id: 3,
    title: 'Senaryo 3: Mağaza Bazlı Müşteri Sayıları',
    shortTitle: '3. Mağaza Müşteri Sayıları',
    targetTable: 'customer',
    category: 'Gruplama',
    question:
      'customer tablosunda bulunan store_id değerlerine karşılık gelen müşteri sayılarını nelerdir?',
    sqlQuery: `SELECT 
    store_id, 
    COUNT(*) AS musteri_sayisi 
FROM customer 
GROUP BY store_id 
ORDER BY store_id ASC;`,
    alternativeQuery: `SELECT 
    c.store_id, 
    COUNT(*) AS musteri_sayisi,
    SUM(CASE WHEN c.active = 1 THEN 1 ELSE 0 END) AS aktif_musteriler,
    SUM(CASE WHEN c.active = 0 THEN 1 ELSE 0 END) AS pasif_musteriler
FROM customer c
GROUP BY c.store_id 
ORDER BY c.store_id ASC;`,
    explanation:
      '`customer` tablosundaki müşterilerin hangi mağazaya kayıtlı olduğunu belirten `store_id` (Mağaza 1 ve Mağaza 2) değerlerine göre gruplama yapılarak her şubenin müşteri portföy büyüklüğü hesaplanmaktadır.',
    syntaxBreakdown: [
      {
        clause: 'SELECT store_id, COUNT(*) AS musteri_sayisi',
        description: 'Mağaza numarasını ve o mağazaya kayıtlı toplam müşteri sayısını getirir.',
      },
      {
        clause: 'FROM customer',
        description: 'Kayıtlı 599 müşterinin bulunduğu ana tablo.',
      },
      {
        clause: 'GROUP BY store_id',
        description: 'Müşterileri store_id (1 ve 2) özelinde iki ayrı gruba toplar.',
      },
      {
        clause: 'ORDER BY store_id ASC',
        description: 'Şubeleri 1. şubeden başlayarak artan sırada listeler.',
      },
    ],
    keyTakeaway:
      'Toplam 599 müşterinin 326 tanesi (%54.4) 1 Nolu Mağazaya (Store 1), 273 tanesi (%45.6) ise 2 Nolu Mağazaya (Store 2) kayıtlıdır.',
    interviewTip:
      'İlişkisel Veri Tabanı Tasarımı: store_id sütunu customer tablosunda bir Foreign Key (Yabancı Anahtar) görevi görür ve store tablosundaki Primary Key store_id ile ilişkilendirilir.',
    chartType: 'comparison',
    highlightMetricLabel: 'Store 1: 326 Müşteri | Store 2: 273 Müşteri',
  },
  {
    id: 4,
    title: 'Senaryo 4: En Çok Şehir Barındıran Ülke ve Şehir Sayısı',
    shortTitle: '4. En Çok Şehirli Ülke',
    targetTable: 'city',
    category: 'Sıralama & Limit',
    question:
      'city tablosunda bulunan şehir verilerini country_id sütununa göre gruplandırdıktan sonra en fazla şehir sayısı barındıran country_id bilgisini ve şehir sayısını paylaşınız.',
    sqlQuery: `SELECT 
    country_id, 
    COUNT(*) AS sehir_sayisi 
FROM city 
GROUP BY country_id 
ORDER BY sehir_sayisi DESC 
LIMIT 1;`,
    alternativeQuery: `SELECT 
    city.country_id, 
    country.country AS ulke_adi, 
    COUNT(*) AS sehir_sayisi 
FROM city 
JOIN country ON city.country_id = country.country_id 
GROUP BY city.country_id, country.country 
ORDER BY sehir_sayisi DESC 
LIMIT 1;`,
    explanation:
      '`city` tablosundaki 600 şehri bağlı oldukları `country_id` sütununa göre grupluyoruz. Her ülkenin şehir sayısını `COUNT(*)` ile bulup `ORDER BY sehir_sayisi DESC` ile en çoktan en aza sıralıyoruz. Sadece en zirvedeki ülkeyi elde etmek için `LIMIT 1` kuralını uyguluyoruz.',
    syntaxBreakdown: [
      {
        clause: 'GROUP BY country_id',
        description: 'Tüm şehirleri ait oldukları ülke kimliğine (country_id) göre gruplar.',
      },
      {
        clause: 'ORDER BY sehir_sayisi DESC',
        description: 'Şehir sayısına göre en yüksekten en düşüğe doğru azalan sıralama yapar.',
      },
      {
        clause: 'LIMIT 1',
        description: 'MySQL\'de sadece ilk 1 satırı (en yüksek skora sahip ülkeyi) döndürür.',
      },
      {
        clause: 'JOIN country (Alternatif)',
        description: 'country tablosuna bağlanarak country_id: 44\'ün "India" (Hindistan) olduğunu kullanıcıya net biçimde gösterir.',
      },
    ],
    keyTakeaway:
      'En çok şehre sahip ülke country_id: 44 (Hindistan / India) olup tam 60 şehir barındırmaktadır. 2. sırada 42 şehirle Çin (country_id: 24), 3. sırada ise 35 şehirle ABD (country_id: 104) yer alır.',
    interviewTip:
      'LIMIT 1 vs MAX(): Eğer sadece maksimum sayıyı bulmak isteseydik alt sorguda MAX() kullanabilirdik, ancak ilişkili sütunu (country_id) ile birlikte tek sorguda en yüksek kaydı çekmek için GROUP BY + ORDER BY DESC + LIMIT 1 en temiz ve optimize MySQL yöntemidir.',
    chartType: 'badge',
    highlightMetricLabel: 'Zirve Ülke: ID 44 (Hindistan) - 60 Şehir',
  },
];
