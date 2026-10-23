import { SqlScenario } from '../types/sql';

export const SQL_SCENARIOS: SqlScenario[] = [
  {
    id: 'scenario-1',
    title: 'Senaryo 1: Şehir ve Ülke İsimleri (LEFT JOIN)',
    joinType: 'LEFT JOIN',
    subtitle: 'city tablosu ile country tablosu eşleştirmesi',
    description:
      'city tablosunda bulunan tüm şehirleri ve eğer varsa country tablosundaki karşılık gelen ülke (country) isimlerini bir arada listeler.',
    leftTable: 'city',
    rightTable: 'country',
    onCondition: 'city.country_id = country.country_id',
    selectFields: 'city.city, country.country',
    sqlQuery: `-- ========================================================
-- Senaryo 1: LEFT JOIN
-- Amaç: city tablosundaki tüm şehirler ile country tablosundaki
--       karşılık gelen ülke isimlerini listelemek.
-- Hazırlayan: Enes Öztürk
-- ========================================================

SELECT 
    city.city, 
    country.country
FROM city
LEFT JOIN country 
    ON city.country_id = country.country_id;`,
    explanation: {
      summary:
        'LEFT JOIN (Sol Dış Bağlantı), sol taraftaki (FROM kısmındaki) tablonun (city) TÜM satırlarını korur. Sağdaki tabloda (country) eşleşen bir kayıt bulunursa o getirilir, bulunamazsa sağ tarafın alanları NULL değerini alır.',
      whyThisJoin:
        'Bir şehrin bağlı olduğu ülke bilgisi henüz girilmemiş veya eşleşmiyor olsa dahi, o şehrin listeden kaybolmamasını ve tüm şehirlerin eksiksiz listelenmesini sağlar.',
      conditionDetail:
        'ON city.country_id = country.country_id ifadesi; city tablosundaki yabancı anahtar (Foreign Key) ile country tablosundaki birincil anahtar (Primary Key) arasındaki bağlantıyı kurar.',
      nullBehavior:
        'Eğer city tablosunda country_id değeri NULL olan veya country tablosunda karşılığı bulunmayan bir şehir varsa (örneğin kayıtsız bölgeler), country sütununda NULL yazacaktır ancak şehir kaydı kaybolmaz.',
      practicalUse:
        'E-ticaret ve kiralama sistemlerinde coğrafi raporlamalarda tüm şehir listesini garanti altına almak için sıklıkla tercih edilir.',
    },
  },
  {
    id: 'scenario-2',
    title: 'Senaryo 2: Ödeme ve Müşteri Bilgileri (RIGHT JOIN)',
    joinType: 'RIGHT JOIN',
    subtitle: 'customer tablosu ile payment tablosu eşleştirmesi',
    description:
      'payment tablosundaki tüm ödemeleri (payment_id) garantiye alarak, bu ödemeleri yapan müşterilerin adını (first_name) ve soyadını (last_name) listeler.',
    leftTable: 'customer',
    rightTable: 'payment',
    onCondition: 'customer.customer_id = payment.customer_id',
    selectFields: 'payment.payment_id, customer.first_name, customer.last_name',
    sqlQuery: `-- ========================================================
-- Senaryo 2: RIGHT JOIN
-- Amaç: payment tablosundaki payment_id ile customer tablosundaki
--       first_name ve last_name isimlerini birlikte görüntülemek.
-- Hazırlayan: Enes Öztürk
-- ========================================================

SELECT 
    payment.payment_id,
    customer.first_name, 
    customer.last_name
FROM customer
RIGHT JOIN payment 
    ON customer.customer_id = payment.customer_id;`,
    explanation: {
      summary:
        'RIGHT JOIN (Sağ Dış Bağlantı), sağdaki tablonun (payment) TÜM satırlarını listeler. Soldaki tabloda (customer) eşleşen müşteri bilgisi varsa getirir; müşteri silinmişse veya anonimse sol tarafın sütunları (first_name, last_name) NULL olur.',
      whyThisJoin:
        'Muhasebe ve finans denetimlerinde hiçbir ödeme kaydının gözden kaçırılmaması esastır. Müşteri hesabı kapatılmış veya silinmiş olsa bile kasanıza giren her payment_id mutlaka raporlanmalıdır.',
      conditionDetail:
        'ON customer.customer_id = payment.customer_id koşulu; ödemenin hangi müşteriye ait olduğunu customer tablosundaki customer_id üzerinden doğrular.',
      nullBehavior:
        'payment tablosunda müşteri ID’si bulunmayan veya karşılığı olmayan bir ödeme varsa, payment_id ekrana basılır, first_name ve last_name kısımları NULL görünür.',
      practicalUse:
        'Finansal denetimlerde müşteri ilişkisi kopmuş veya sistem hatasıyla eşleşmemiş "öksüz" (orphan) tahsilatları tespit etmek ve tüm gelirleri raporlamak için kullanılır.',
    },
  },
  {
    id: 'scenario-3',
    title: 'Senaryo 3: Müşteri ve Kiralama Hareketleri (FULL JOIN)',
    joinType: 'FULL JOIN',
    subtitle: 'customer tablosu ile rental tablosu tam birleşimi',
    description:
      'rental tablosundaki rental_id ile customer tablosundaki first_name ve last_name isimlerini; hem hiç film kiralamamış müşterileri hem de müşterisiz kiralama kayıtlarını kapsayacak şekilde birleştirir.',
    leftTable: 'customer',
    rightTable: 'rental',
    onCondition: 'customer.customer_id = rental.customer_id',
    selectFields: 'rental.rental_id, customer.first_name, customer.last_name',
    sqlQuery: `-- ========================================================
-- Senaryo 3: FULL JOIN (FULL OUTER JOIN)
-- Amaç: rental_id ile customer first_name ve last_name isimlerini,
--       eşleşen ve eşleşmeyen tüm kayıtları kapsayacak şekilde listelemek.
-- Hazırlayan: Enes Öztürk
-- ========================================================

SELECT 
    rental.rental_id,
    customer.first_name, 
    customer.last_name
FROM customer
FULL JOIN rental 
    ON customer.customer_id = rental.customer_id;`,
    explanation: {
      summary:
        'FULL JOIN (Tam Dış Bağlantı / FULL OUTER JOIN), hem soldaki (customer) hem de sağdaki (rental) tablolardaki bütün satırları döndürür. Eşleşme sağlandığında ortak satır, sağlanamadığında eksik olan tarafın sütunları NULL olarak doldurulur.',
      whyThisJoin:
        'Hem "Kayıt olmuş ancak henüz hiç DVD kiralamamış pasif müşterileri" hem de "Kiralama yapılmış tüm hareketleri" tek bir sorguda hiçbir veri kaybı olmaksızın görmek için idealdir.',
      conditionDetail:
        'ON customer.customer_id = rental.customer_id şartıyla iki tablo müşteri numarası üzerinden eşleştirilir.',
      nullBehavior:
        'Hiç kiralama yapmamış müşteri için first_name ve last_name dolu gelirken rental_id değeri NULL olur. Müşterisi sistemde bulunmayan bir kiralama için ise rental_id dolu, isim alanları NULL olur.',
      practicalUse:
        'İki veri seti arasındaki veri bütünlüğünü denetleme, potansiyel tutarsızlıkları saptama ve pazarlama kampanyalarında hareketsiz müşterileri hedefleme analizlerinde kritik rol oynar.',
    },
  },
];

export const FULL_SQL_SCRIPT_CONTENT = `/*
 * =========================================================================
 *  POSTGRESQL DVDRENTAL ÖRNEK VERİTABANI - SQL JOIN SORGULARI
 * =========================================================================
 *  Hazırlayan : Enes Öztürk
 *  Veritabanı : dvdrental (PostgreSQL Sample Database)
 *  Konu       : LEFT JOIN, RIGHT JOIN ve FULL JOIN Senaryoları
 *  Tarih      : ${new Date().toISOString().split('T')[0]}
 * =========================================================================
 */

-- =========================================================================
-- SENARYO 1: LEFT JOIN
-- Soru: city tablosu ile country tablosunda bulunan şehir (city) ve ülke 
--       (country) isimlerini birlikte görebileceğimiz LEFT JOIN sorgusunu yazınız.
-- =========================================================================

SELECT 
    city.city, 
    country.country
FROM city
LEFT JOIN country 
    ON city.country_id = country.country_id;

-- Açıklama:
-- Sol tablodaki (city) tüm şehirler korunur. Ülkesi tanımlı olmayan 
-- veya eşleşmeyen şehirlerin 'country' değeri NULL olarak döner.


-- =========================================================================
-- SENARYO 2: RIGHT JOIN
-- Soru: customer tablosu ile payment tablosunda bulunan payment_id ile 
--       customer tablosundaki first_name ve last_name isimlerini birlikte 
--       görebileceğimiz RIGHT JOIN sorgusunu yazınız.
-- =========================================================================

SELECT 
    payment.payment_id,
    customer.first_name, 
    customer.last_name
FROM customer
RIGHT JOIN payment 
    ON customer.customer_id = payment.customer_id;

-- Açıklama:
-- Sağdaki (payment) tablodaki tüm ödeme kayıtları garanti altına alınır.
-- İlgili müşteri kaydı silinmiş veya bulunamıyorsa first_name ve last_name NULL döner.


-- =========================================================================
-- SENARYO 3: FULL JOIN (FULL OUTER JOIN)
-- Soru: customer tablosu ile rental tablosunda bulunan rental_id ile 
--       customer tablosundaki first_name ve last_name isimlerini birlikte 
--       görebileceğimiz FULL JOIN sorgusunu yazınız.
-- =========================================================================

SELECT 
    rental.rental_id,
    customer.first_name, 
    customer.last_name
FROM customer
FULL JOIN rental 
    ON customer.customer_id = rental.customer_id;

-- Açıklama:
-- Hem müşteriler hem de kiralama hareketleri eksiksiz listelenir.
-- Henüz kiralama yapmamış müşterilerde rental_id = NULL;
-- Eşleşen müşterisi olmayan kiralama kayıtlarında isimler = NULL döner.

/*
 * -------------------------------------------------------------------------
 *  Not: İsteğe bağlı olarak NULL kayıtları başta veya sonda görmek için 
 *       ORDER BY first_name NULLS LAST veya ORDER BY rental_id NULLS FIRST 
 *       kullanılabilir.
 *  İmza: Enes Öztürk
 * -------------------------------------------------------------------------
 */
`;
