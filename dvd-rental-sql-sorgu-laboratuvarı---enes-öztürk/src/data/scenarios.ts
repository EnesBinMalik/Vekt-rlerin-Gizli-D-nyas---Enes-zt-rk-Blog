import { ScenarioDefinition } from '../types/database';

export const SCENARIOS: ScenarioDefinition[] = [
  {
    id: 1,
    title: "1. Tüm Verileri Sıralama (Tekrarsız - UNION)",
    category: "distinct",
    operationName: "UNION",
    shortDescription: "actor ve customer tablolarında bulunan first_name sütunları için tüm verileri benzersiz (tekrarsız) olarak birleştirip sıralar.",
    mathematicalNotation: "A ∪ B = { x | x ∈ Actor ∨ x ∈ Customer }",
    vennType: "union",
    mysql8Sql: `-- 1. Senaryo: actor ve customer tablolarındaki tüm first_name verileri (Tekrarsız)
-- Hazırlayan: Enes Öztürk
(SELECT first_name FROM actor)
UNION
(SELECT first_name FROM customer)
ORDER BY first_name ASC;`,
    mysqlClassicSql: `-- MySQL Klasik (Tüm Sürümler)
-- UNION varsayılan olarak DISTINCT davranışı gösterir ve duplicate kayıtları eler.
(SELECT first_name FROM actor)
UNION
(SELECT first_name FROM customer)
ORDER BY first_name ASC;`,
    explanation: "UNION işleci, iki veya daha fazla SELECT sorgusunun sonucunu tek bir sonuç kümesinde birleştirir. UNION anahtar kelimesi varsayılan olarak 'DISTINCT' mantığıyla çalışır; hem aktörler tablosundaki hem de müşteriler tablosundaki tüm benzersiz isimleri tekil hale getirerek getirir ve ORDER BY ile alfabetik olarak sıralar.",
    theoryNotes: [
      "Her iki SELECT ifadesindeki sütun sayısı ve veri tipleri uyumlu olmalıdır.",
      "Tekrar eden (duplicate) satırlar otomatik elenir.",
      "ORDER BY ifadesi tüm UNION bloklarının sonuna parantezler dışına veya son blok sonrasına eklenir.",
      "MySQL motoru satırları geçici bir belleğe (temporary table) alıp hash/sort tabanlı tekilleştirme uygular."
    ]
  },
  {
    id: 2,
    title: "2. Kesişen Verileri Sıralama (Tekrarsız - INTERSECT)",
    category: "distinct",
    operationName: "INTERSECT",
    shortDescription: "Hem actor hem de customer tablosunda ortak olarak yer alan first_name verilerini benzersiz (tekrarsız) olarak sıralar.",
    mathematicalNotation: "A ∩ B = { x | x ∈ Actor ∧ x ∈ Customer }",
    vennType: "intersect",
    mysql8Sql: `-- 2. Senaryo: Ortak (Kesişen) first_name verileri (Tekrarsız)
-- MySQL 8.0.31+ Sürümünde Yerel INTERSECT Desteği
-- Hazırlayan: Enes Öztürk
(SELECT first_name FROM actor)
INTERSECT
(SELECT first_name FROM customer)
ORDER BY first_name ASC;`,
    mysqlClassicSql: `-- MySQL Klasik (5.7 ve 8.0.31 öncesi) Çözümü: INNER JOIN veya IN
-- Hazırlayan: Enes Öztürk
SELECT DISTINCT a.first_name
FROM actor a
INNER JOIN customer c ON a.first_name = c.first_name
ORDER BY a.first_name ASC;

-- Alternatif Alt Sorgu (Subquery) ile Çözüm:
-- SELECT DISTINCT first_name FROM actor 
-- WHERE first_name IN (SELECT first_name FROM customer)
-- ORDER BY first_name ASC;`,
    explanation: "INTERSECT (Kesişim) işleci, her iki veri kümesinde de bulunan ortak kayıtları döndürür. MySQL 8.0.31 sürümünden itibaren yerel 'INTERSECT' işleci doğrudan desteklenmektedir. Daha önceki MySQL sürümlerinde aynı mantık INNER JOIN veya IN alt sorgusuyla DISTINCT kullanılarak elde edilir.",
    theoryNotes: [
      "Yalnızca hem A kümesinde (Actor) hem de B kümesinde (Customer) var olan isimler döner.",
      "INTERSECT varsayılan olarak DISTINCT çalışır; kesişen isimler tekil olarak listelenir.",
      "Performans açısından INNER JOIN ve IN indekslerden yararlanarak büyük tablolarda son derece hızlıdır.",
      "Kesişim kümesinde yer alan isimler her iki rolde de (hem aktör hem müşteri) bulunan isimlerdir."
    ]
  },
  {
    id: 3,
    title: "3. İlk Tabloda Olup İkincide Olmayanlar (Tekrarsız - EXCEPT)",
    category: "distinct",
    operationName: "EXCEPT",
    shortDescription: "actor tablosunda bulunan ancak customer tablosunda bulunmayan first_name verilerini benzersiz (tekrarsız) sıralar.",
    mathematicalNotation: "A \\ B = { x | x ∈ Actor ∧ x ∉ Customer }",
    vennType: "except",
    mysql8Sql: `-- 3. Senaryo: Sadece ilk tabloda (actor) bulunan, customer'da olmayan veriler (Tekrarsız)
-- MySQL 8.0.31+ Sürümünde Yerel EXCEPT Desteği
-- Hazırlayan: Enes Öztürk
(SELECT first_name FROM actor)
EXCEPT
(SELECT first_name FROM customer)
ORDER BY first_name ASC;`,
    mysqlClassicSql: `-- MySQL Klasik (5.7 ve 8.0.31 öncesi) Çözümü: LEFT JOIN ... WHERE IS NULL
-- Hazırlayan: Enes Öztürk
SELECT DISTINCT a.first_name
FROM actor a
LEFT JOIN customer c ON a.first_name = c.first_name
WHERE c.first_name IS NULL
ORDER BY a.first_name ASC;

-- Alternatif NOT IN ile Çözüm:
-- SELECT DISTINCT first_name FROM actor
-- WHERE first_name NOT IN (SELECT first_name FROM customer WHERE first_name IS NOT NULL)
-- ORDER BY first_name ASC;`,
    explanation: "EXCEPT (veya Oracle/bazı RDBMS'lerde MINUS), solundaki kümede bulunan fakat sağındaki kümede kesinlikle yer almayan elemanları seçer. MySQL 8.0.31 ile yerel EXCEPT desteği gelmiştir. Klasik MySQL sistemlerinde bu işlem LEFT JOIN ve WHERE sağ_tablo.alan IS NULL şartı veya NOT IN / NOT EXISTS ile yapılır.",
    theoryNotes: [
      "Küme farkı işlemidir (A - B). Sıralama önemlidir: A EXCEPT B ile B EXCEPT A farklı sonuçlar üretir.",
      "Klasik MySQL'de LEFT JOIN ile eşleşmeyen satırlara (NULL) filtre uygulanması en performanslı yöntemdir.",
      "NOT IN kullanımında ikinci tabloda NULL değer bulunması durumunda tüm sonucun boş dönme riskine dikkat edilmelidir.",
      "Sonuç kümesi aktörler arasında olup hiçbir müşteride adı geçmeyen isimleri verir."
    ]
  },
  {
    id: 4,
    title: "4. Tüm Verileri Sıralama (Tekrarlayan - UNION ALL)",
    category: "all",
    operationName: "UNION ALL",
    shortDescription: "İlk 3 sorgunun tekrar eden verilerle yapılışı (1/3): actor ve customer tablolarındaki tüm isimleri tekrarlarıyla birlikte sıralar.",
    mathematicalNotation: "A ⊎ B (count(x) = count_A(x) + count_B(x))",
    vennType: "union_all",
    mysql8Sql: `-- 4. Senaryo: actor ve customer tablolarındaki tüm veriler (Tekrarlı - UNION ALL)
-- Hazırlayan: Enes Öztürk
(SELECT first_name FROM actor)
UNION ALL
(SELECT first_name FROM customer)
ORDER BY first_name ASC;`,
    mysqlClassicSql: `-- MySQL Klasik (Tüm Sürümler)
-- UNION ALL tekilleştirme yapmaz, actor (200) + customer (599) = 799 satır döner.
(SELECT first_name FROM actor)
UNION ALL
(SELECT first_name FROM customer)
ORDER BY first_name ASC;`,
    explanation: "UNION ALL, her iki tablodaki kayıtları duplicate (tekrar) kontrolü yapmadan olduğu gibi alt alta ekler. Aktör tablosundaki 200 satır ile müşteri tablosundaki 599 satır toplanır ve tam 799 kayıt elde edilir. Herhangi bir tekilleştirme (hash/sort distinct) yapılmadığı için UNION ALL her zaman düz UNION'dan çok daha hızlı çalışır.",
    theoryNotes: [
      "Toplam satır sayısı tam olarak her iki tablonun satır sayılarının toplamıdır (200 + 599 = 799).",
      "Tekrarları silmek için fazladan bellek veya disk tabanlı DISTINCT maliyeti oluşmaz.",
      "Bir isim aktörlerde 3 kere, müşterilerde 2 kere geçiyorsa sonuçta toplam 5 kez listelenir.",
      "Gerçek veri analitiğinde ve veri ambarlarında (ETL) gereksiz yere UNION yerine UNION ALL tercih edilmesi performans kuralıdır."
    ]
  },
  {
    id: 5,
    title: "5. Kesişen Verileri Sıralama (Tekrarlayan - INTERSECT ALL)",
    category: "all",
    operationName: "INTERSECT ALL",
    shortDescription: "İlk 3 sorgunun tekrar eden verilerle yapılışı (2/3): Her iki tabloda da bulunan ortak isimleri tekrarlarıyla birlikte sıralar.",
    mathematicalNotation: "count_{A ∩_all B}(x) = min(count_A(x), count_B(x))",
    vennType: "intersect_all",
    mysql8Sql: `-- 5. Senaryo: Kesişen veriler (Tekrarlar Dahil - INTERSECT ALL)
-- MySQL 8.0.31+ Sürümünde Yerel INTERSECT ALL Desteği
-- Hazırlayan: Enes Öztürk
(SELECT first_name FROM actor)
INTERSECT ALL
(SELECT first_name FROM customer)
ORDER BY first_name ASC;`,
    mysqlClassicSql: `-- MySQL Klasik (8.0+ CTE & Pencere Fonksiyonları ile Frekans Korumalı Kesişim):
-- Standart SQL INTERSECT ALL mantığı: Bir isim A'da n kez, B'de m kez varsa min(n, m) kez listelenir.
-- Hazırlayan: Enes Öztürk
WITH actor_ranked AS (
  SELECT first_name, ROW_NUMBER() OVER (PARTITION BY first_name ORDER BY actor_id) AS rn
  FROM actor
),
customer_ranked AS (
  SELECT first_name, ROW_NUMBER() OVER (PARTITION BY first_name ORDER BY customer_id) AS rn
  FROM customer
)
SELECT a.first_name
FROM actor_ranked a
INNER JOIN customer_ranked c 
  ON a.first_name = c.first_name AND a.rn = c.rn
ORDER BY a.first_name ASC;

-- Not: Eğer "Her bir aktörün müşteri tablosundaki tüm eşleşmeleri" (Kartezyen çarpım) kastediliyorsa:
-- SELECT a.first_name FROM actor a INNER JOIN customer c ON a.first_name = c.first_name ORDER BY a.first_name;`,
    explanation: "SQL standardında ve küme teorisinde (Multiset/Bag Semantics) 'INTERSECT ALL', bir elemanın sonuç kümesindeki frekansını iki kümedeki frekansların minimumu olarak hesaplar (min(count_A, count_B)). Örneğin 'Julia' aktörlerde 4, müşterilerde 1 adet varsa min(4,1) = 1 adet döner. 'Nick' aktörlerde 3, müşterilerde 0 varsa min(3,0) = 0 (dönmez). MySQL 8.0.31+ yerel 'INTERSECT ALL' işleci ile bunu tek komutla çözerken, klasik MySQL'de ROW_NUMBER() pencere fonksiyonuyla frekans eşleşmesi kurulur.",
    theoryNotes: [
      "Multiset Semantics kuralı: min(n, m) kadar tekrar oluşur.",
      "MySQL 8.0.31 sürümü öncesi INTERSECT ALL anahtar kelimesi sözdizimi hatası verirdi.",
      "Pencere fonksiyonlu (ROW_NUMBER) CTE çözümü tüm ANSI SQL motorlarında INTERSECT ALL ile birebir aynı matematiksel sonucu üretir.",
      "Uygulamamızda hem SQL Standart Frekans Korumalı sonuç hem de tüm Kartezyen eşleşme analizleri görüntülenebilir."
    ]
  },
  {
    id: 6,
    title: "6. İlk Tabloda Olup İkincide Olmayanlar (Tekrarlayan - EXCEPT ALL)",
    category: "all",
    operationName: "EXCEPT ALL",
    shortDescription: "İlk 3 sorgunun tekrar eden verilerle yapılışı (3/3): actor tablosundaki isim frekansından customer tablosundaki frekans düşülerek listelenir.",
    mathematicalNotation: "count_{A \\_all B}(x) = max(0, count_A(x) - count_B(x))",
    vennType: "except_all",
    mysql8Sql: `-- 6. Senaryo: Sadece ilk tabloda bulunanlar (Tekrarlar Dahil - EXCEPT ALL)
-- MySQL 8.0.31+ Sürümünde Yerel EXCEPT ALL Desteği
-- Hazırlayan: Enes Öztürk
(SELECT first_name FROM actor)
EXCEPT ALL
(SELECT first_name FROM customer)
ORDER BY first_name ASC;`,
    mysqlClassicSql: `-- MySQL Klasik (8.0+ CTE & Pencere Fonksiyonları ile Frekans Korumalı Fark):
-- Standart SQL EXCEPT ALL mantığı: max(0, count_A(x) - count_B(x))
-- Hazırlayan: Enes Öztürk
WITH actor_ranked AS (
  SELECT first_name, ROW_NUMBER() OVER (PARTITION BY first_name ORDER BY actor_id) AS rn
  FROM actor
),
customer_ranked AS (
  SELECT first_name, ROW_NUMBER() OVER (PARTITION BY first_name ORDER BY customer_id) AS rn
  FROM customer
)
SELECT a.first_name
FROM actor_ranked a
LEFT JOIN customer_ranked c 
  ON a.first_name = c.first_name AND a.rn = c.rn
WHERE c.first_name IS NULL
ORDER BY a.first_name ASC;`,
    explanation: "SQL küme teorisinde 'EXCEPT ALL', A kümesindeki her elemanın tekrar sayısından B kümesindeki tekrar sayısını çıkartır: max(0, count_A - count_B). Örneğin 'Alec' aktörlerde 3 adet vardır, müşterilerde 0 adet vardır; 3 - 0 = 3 adet döner. 'Julia' aktörlerde 4 adet, müşterilerde 1 adet vardır; 4 - 1 = 3 adet döner. Böylece aktörler tablosundaki mükerrer isimlerin fazlalıkları korunarak listelenir.",
    theoryNotes: [
      "Multiset fark formülü: max(0, count_A(x) - count_B(x)).",
      "Eğer B kümesindeki sayı A kümesindeki sayıdan büyük veya eşitse eleman tamamen elenir.",
      "MySQL 8.0.31+ yerel 'EXCEPT ALL' operatörünü doğrudan destekler.",
      "Klasik MySQL'de ROW_NUMBER() ile numaralandırılan satırların LEFT JOIN ile eşleşmeyenleri seçilerek tam denklik sağlanır."
    ]
  }
];
