import alasql from 'alasql';
import { SAMPLE_FILMS, SAMPLE_CUSTOMERS, SAMPLE_CATEGORIES, Film, Customer, Category } from '../data/dvdrentalData';

export interface QueryScenario {
  id: number;
  badge: string;
  title: string;
  scenarioText: string;
  sqlQuery: string;
  alternativeSql?: string[];
  explanation: string[];
  importantNotes?: string;
  expectedResultDesc: string;
  targetTable: 'film' | 'customer';
  highlightResult?: {
    key: string;
    value: string;
    description: string;
  };
}

export const OFFICIAL_SCENARIOS: QueryScenario[] = [
  {
    id: 1,
    badge: "Senaryo 1",
    title: "Film Başlık ve Açıklamalarını Sıralama",
    scenarioText: "film tablosunda bulunan title ve description sütunlarındaki verileri sıralayınız.",
    sqlQuery: `SELECT title, description \nFROM film \nORDER BY title ASC;`,
    alternativeSql: [
      `SELECT title, description FROM film ORDER BY title;`,
      `SELECT title, description FROM film ORDER BY description;`
    ],
    explanation: [
      "SELECT anahtar kelimesi ile sadece istenen iki sütun ('title' ve 'description') seçilir.",
      "FROM film ifadesiyle sorgunun hedef tablosu belirtilir.",
      "ORDER BY title (veya varsayılan olarak ASC) ifadesiyle veriler film başlığına göre A'dan Z'ye alfabetik olarak sıralanır.",
      "Eğer açıklamaya göre sıralamak istenseydi 'ORDER BY description' kullanılabilirdi."
    ],
    importantNotes: "ORDER BY ifadesinde yön belirtilmezse varsayılan sıralama yönü 'ASC' (artan - A'dan Z'ye, küçükten büyüğe) kabul edilir.",
    expectedResultDesc: "Tüm filmlerin başlık ve açıklamaları alfabetik sıralı olarak listelenir.",
    targetTable: 'film'
  },
  {
    id: 2,
    badge: "Senaryo 2",
    title: "Film Uzunluğu Filtresi (60 < length < 75)",
    scenarioText: "film tablosunda bulunan tüm sütunlardaki verileri film uzunluğu (length) 60 dan büyük VE 75 ten küçük olma koşullarıyla sıralayınız.",
    sqlQuery: `SELECT * \nFROM film \nWHERE length > 60 AND length < 75 \nORDER BY length ASC;`,
    alternativeSql: [
      `SELECT * FROM film WHERE length > 60 AND length < 75;`,
      `SELECT * FROM film WHERE length BETWEEN 61 AND 74 ORDER BY length;`
    ],
    explanation: [
      "SELECT * ifadesi tablodaki tüm sütunları getirir.",
      "WHERE length > 60 AND length < 75 koşulu, film süresinin 60 dakikadan kesinlikle büyük ve 75 dakikadan kesinlikle küçük (61 ile 74 arası) olmasını şart koşar.",
      "İki koşulun da aynı anda sağlanması gerektiği için mantıksal 'AND' bağlacı kullanılır.",
      "ORDER BY length ASC ile sonuçlar en kısa süreliden uzuna doğru sıralanır."
    ],
    importantNotes: "BETWEEN operatörü sınır değerleri dahil eder (inclusive). Bu soruda 'büyük ve küçük' denildiği için doğrudan '>' ve '<' operatörleri kullanmak en doğrusudur.",
    expectedResultDesc: "Süresi 61 ile 74 dakika arasındaki tüm filmler süre sırasına göre listelenir.",
    targetTable: 'film'
  },
  {
    id: 3,
    badge: "Senaryo 3",
    title: "Kira Oranı ve Değiştirme Maliyeti Filtresi (Parantez Önceliği)",
    scenarioText: "film tablosunda bulunan tüm sütunlardaki verileri rental_rate 0.99 VE replacement_cost 12.99 VEYA 28.99 olma koşullarıyla sıralayınız.",
    sqlQuery: `SELECT * \nFROM film \nWHERE rental_rate = 0.99 \n  AND (replacement_cost = 12.99 OR replacement_cost = 28.99) \nORDER BY replacement_cost, rental_rate;`,
    alternativeSql: [
      `SELECT * FROM film WHERE rental_rate = 0.99 AND replacement_cost IN (12.99, 28.99);`
    ],
    explanation: [
      "rental_rate değerinin 0.99 olması ZORUNLUDUR.",
      "replacement_cost değeri ise 12.99 veya 28.99 olabilir.",
      "SQL operatör önceliğinde AND, OR'dan önce işletilir! Bu sebeple (replacement_cost = 12.99 OR replacement_cost = 28.99) kısmının parantez içine alınması hayati önem taşır.",
      "Alternatif ve çok daha temiz bir PostgreSQL yazımı ise 'replacement_cost IN (12.99, 28.99)' kullanımıdır."
    ],
    importantNotes: "⚠️ Parantez koyulmazsa: (rental_rate = 0.99 AND replacement_cost = 12.99) OR replacement_cost = 28.99 şeklinde algılanır ve kiralanma bedeli ne olursa olsun değiştirme maliyeti 28.99 olan filmler de listelenerek hatalı sonuç üretilir!",
    expectedResultDesc: "rental_rate değeri 0.99 olan ve yenileme maliyeti tam olarak 12.99 veya 28.99 olan kayıtlar.",
    targetTable: 'film'
  },
  {
    id: 4,
    badge: "Senaryo 4",
    title: "Müşteri 'Mary'nin Soyadı Sorgusu",
    scenarioText: "customer tablosunda bulunan first_name sütunundaki değeri 'Mary' olan müşterinin last_name sütunundaki değeri nedir?",
    sqlQuery: `SELECT first_name, last_name \nFROM customer \nWHERE first_name = 'Mary';`,
    alternativeSql: [
      `SELECT last_name FROM customer WHERE first_name = 'Mary';`,
      `SELECT * FROM customer WHERE first_name = 'Mary';`
    ],
    explanation: [
      "customer tablosunda 'Mary' isimli müşteriyi bulmak için WHERE first_name = 'Mary' filtresi uygulanır.",
      "Sorunun doğrudan cevabı olan soyadı (last_name) sütununu elde etmek için SELECT last_name veya SELECT first_name, last_name yazılır.",
      "PostgreSQL dvdrental / Sakila veritabanında ilk müşteri olan Mary'nin soyadı 'SMITH'tir."
    ],
    importantNotes: "Metinsel (String/Varchar) değerler SQL'de tek tırnak ('...') içinde yazılır. PostgreSQL'de büyük/küçük harf duyarlılığı için exact match kullanılır.",
    expectedResultDesc: "Mary isimli müşterinin soyadı: SMITH",
    targetTable: 'customer',
    highlightResult: {
      key: "last_name",
      value: "SMITH",
      description: "Mary müşterisinin soyadı 'SMITH' olarak tespit edilmiştir."
    }
  },
  {
    id: 5,
    badge: "Senaryo 5",
    title: "Film Uzunluğu ve Kira Bedeli Negatif (De Morgan) Filtresi",
    scenarioText: "film tablosundaki uzunluğu(length) 50 ten büyük OLMAYIP aynı zamanda rental_rate değeri 2.99 veya 4.99 OLMAYAN verileri sıralayınız.",
    sqlQuery: `SELECT * \nFROM film \nWHERE NOT (length > 50) \n  AND NOT (rental_rate = 2.99 OR rental_rate = 4.99) \nORDER BY length ASC, rental_rate ASC;`,
    alternativeSql: [
      `SELECT * FROM film WHERE length <= 50 AND rental_rate NOT IN (2.99, 4.99) ORDER BY length, rental_rate;`,
      `SELECT * FROM film WHERE length <= 50 AND (rental_rate != 2.99 AND rental_rate != 4.99);`
    ],
    explanation: [
      "'uzunluğu 50'den büyük OLMAYIP': NOT (length > 50) mantığıdır. Matematiksel ve mantıksal dengi length <= 50 ifadesidir.",
      "'aynı zamanda': İki temel koşulun kesişimi istendiğinden AND bağlacı konur.",
      "'rental_rate değeri 2.99 veya 4.99 OLMAYAN': NOT (rental_rate = 2.99 OR rental_rate = 4.99) ifadesidir.",
      "De Morgan kuralı uyarınca: NOT (A OR B) eşittir (NOT A AND NOT B) veya SQL'de 'rental_rate NOT IN (2.99, 4.99)'.",
      "Bu koşulları sağlayan filmler (örneğin uzunluğu 46, 47, 48, 49, 50 ve rental_rate değeri 0.99 olan filmler) ORDER BY ile sıralanır."
    ],
    importantNotes: "Mantıksal 'NOT' operatörü parantezli blokların önüne konularak koşulun değili alınır. Alternatif olarak '<=' ve 'NOT IN' kullanımı sorguyu hem daha okunabilir hem de optimize kılar.",
    expectedResultDesc: "Uzunluğu 50 ve daha kısa olan, kira oranı 2.99 veya 4.99 olmayan (örn. 0.99 olan) filmler.",
    targetTable: 'film'
  }
];

export interface ExecutionResult {
  success: boolean;
  columns: string[];
  rows: any[];
  rowCount: number;
  executionTimeMs: number;
  error?: string;
  query: string;
}

let isDbInitialized = false;

export function initDatabase() {
  if (isDbInitialized) return;

  try {
    alasql('CREATE TABLE IF NOT EXISTS film');
    alasql('CREATE TABLE IF NOT EXISTS customer');
    alasql('CREATE TABLE IF NOT EXISTS category');

    alasql.tables.film.data = [...SAMPLE_FILMS];
    alasql.tables.customer.data = [...SAMPLE_CUSTOMERS];
    alasql.tables.category.data = [...SAMPLE_CATEGORIES];

    isDbInitialized = true;
  } catch (err) {
    console.error('Error initializing database:', err);
  }
}

export function executeQuery(sqlText: string): ExecutionResult {
  initDatabase();

  const startTime = performance.now();
  const trimmed = sqlText.trim().replace(/;+$/, '');

  try {
    const rawResult = alasql(trimmed);
    const endTime = performance.now();
    const duration = Math.round((endTime - startTime) * 100) / 100;

    if (Array.isArray(rawResult)) {
      const rows = rawResult;
      const columns = rows.length > 0 ? Object.keys(rows[0]) : [];
      return {
        success: true,
        columns,
        rows,
        rowCount: rows.length,
        executionTimeMs: duration,
        query: sqlText
      };
    } else {
      return {
        success: true,
        columns: ['Sonuç'],
        rows: [{ Sonuç: String(rawResult) }],
        rowCount: 1,
        executionTimeMs: duration,
        query: sqlText
      };
    }
  } catch (err: any) {
    const endTime = performance.now();
    return {
      success: false,
      columns: [],
      rows: [],
      rowCount: 0,
      executionTimeMs: Math.round((endTime - startTime) * 100) / 100,
      error: err?.message || 'SQL sözdizimi hatası veya geçersiz sorgu.',
      query: sqlText
    };
  }
}

export function getTablePreview(tableName: 'film' | 'customer' | 'category', limit = 10): { columns: string[]; rows: any[]; total: number } {
  initDatabase();
  try {
    const rawRows = alasql(`SELECT * FROM ${tableName} LIMIT ${limit}`);
    const rows: any[] = Array.isArray(rawRows) ? rawRows : [];
    const columns: string[] = rows.length > 0 ? Object.keys(rows[0] as object) : [];
    const total = ((alasql as any).tables?.[tableName]?.data || []).length;
    return { columns, rows, total };
  } catch (err) {
    return { columns: [], rows: [], total: 0 };
  }
}
