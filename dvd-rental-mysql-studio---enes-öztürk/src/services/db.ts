import alasql from 'alasql';
import {
  generateFilms,
  generateCustomers,
  generateCities,
  countriesData,
  storesData,
  Film,
  Customer,
  City,
  Country,
  Store,
} from '../data/dvdRentalData';

export interface QueryResult {
  columns: string[];
  rows: Record<string, any>[];
  rowCount: number;
  executionTimeMs: number;
  sql: string;
  error?: string;
}

export interface TableSummary {
  name: string;
  rowCount: number;
  columns: { name: string; type: string }[];
  description: string;
}

class DvdRentalDatabase {
  private initialized = false;
  public films: Film[] = [];
  public customers: Customer[] = [];
  public cities: City[] = [];
  public countries: Country[] = [];
  public stores: Store[] = [];

  constructor() {
    this.init();
  }

  public init() {
    if (this.initialized) return;

    try {
      // AlaSQL MySQL ayarları
      alasql.options.mysql = true;

      this.films = generateFilms();
      this.customers = generateCustomers();
      this.cities = generateCities();
      this.countries = countriesData;
      this.stores = storesData;

      // Tabloları oluştur ve verileri bağla
      alasql('CREATE TABLE IF NOT EXISTS film');
      alasql.tables.film.data = this.films;

      alasql('CREATE TABLE IF NOT EXISTS customer');
      alasql.tables.customer.data = this.customers;

      alasql('CREATE TABLE IF NOT EXISTS city');
      alasql.tables.city.data = this.cities;

      alasql('CREATE TABLE IF NOT EXISTS country');
      alasql.tables.country.data = this.countries;

      alasql('CREATE TABLE IF NOT EXISTS [store]');
      alasql.tables.store.data = this.stores;

      this.initialized = true;
    } catch (err) {
      console.error('DVD Rental Database initialization error:', err);
    }
  }

  public runQuery(rawSql: string): QueryResult {
    this.init();
    const startTime = performance.now();

    // Temizleme ve yorum satırlarını kaldırma
    let sql = rawSql.trim();
    // Sondaki noktalı virgülleri temizle (AlaSQL bazen tekli komutlarda son noktalı virgüle duyarlı olabilir)
    if (sql.endsWith(';')) {
      sql = sql.slice(0, -1).trim();
    }

    try {
      const res = alasql(sql);
      const executionTimeMs = parseFloat((performance.now() - startTime).toFixed(2));

      if (Array.isArray(res)) {
        const rows = res as Record<string, any>[];
        const columns = rows.length > 0 ? Object.keys(rows[0]) : [];
        return {
          columns,
          rows,
          rowCount: rows.length,
          executionTimeMs,
          sql: rawSql,
        };
      } else {
        return {
          columns: ['Result'],
          rows: [{ Result: JSON.stringify(res) }],
          rowCount: 1,
          executionTimeMs,
          sql: rawSql,
        };
      }
    } catch (error: any) {
      const executionTimeMs = parseFloat((performance.now() - startTime).toFixed(2));
      return {
        columns: [],
        rows: [],
        rowCount: 0,
        executionTimeMs,
        sql: rawSql,
        error: error?.message || 'SQL Sorgu Çalıştırma Hatası',
      };
    }
  }

  public getTableSummaries(): TableSummary[] {
    return [
      {
        name: 'film',
        rowCount: this.films.length,
        description: 'Tüm film envanteri, rating, süre ve replacement_cost bilgileri',
        columns: [
          { name: 'film_id', type: 'INT' },
          { name: 'title', type: 'VARCHAR(255)' },
          { name: 'rating', type: "ENUM('G','PG','PG-13','R','NC-17')" },
          { name: 'replacement_cost', type: 'DECIMAL(5,2)' },
          { name: 'rental_rate', type: 'DECIMAL(4,2)' },
          { name: 'length', type: 'SMALLINT' },
          { name: 'release_year', type: 'YEAR' },
        ],
      },
      {
        name: 'customer',
        rowCount: this.customers.length,
        description: 'Kayıtlı müşteriler, bağlı oldukları store_id ve iletişim bilgileri',
        columns: [
          { name: 'customer_id', type: 'INT' },
          { name: 'store_id', type: 'TINYINT' },
          { name: 'first_name', type: 'VARCHAR(45)' },
          { name: 'last_name', type: 'VARCHAR(45)' },
          { name: 'email', type: 'VARCHAR(50)' },
          { name: 'active', type: 'TINYINT(1)' },
        ],
      },
      {
        name: 'city',
        rowCount: this.cities.length,
        description: 'Dünya genelindeki şehirler ve bağlı oldukları country_id',
        columns: [
          { name: 'city_id', type: 'INT' },
          { name: 'city', type: 'VARCHAR(50)' },
          { name: 'country_id', type: 'SMALLINT' },
        ],
      },
      {
        name: 'country',
        rowCount: this.countries.length,
        description: 'Ülke tanımları ve ülke isimleri',
        columns: [
          { name: 'country_id', type: 'SMALLINT' },
          { name: 'country', type: 'VARCHAR(50)' },
        ],
      },
      {
        name: 'store',
        rowCount: this.stores.length,
        description: 'Mağaza bilgileri ve lokasyonları',
        columns: [
          { name: 'store_id', type: 'TINYINT' },
          { name: 'manager_staff_id', type: 'TINYINT' },
          { name: 'address', type: 'VARCHAR(100)' },
        ],
      },
    ];
  }
}

export const dvdRentalDb = new DvdRentalDatabase();
