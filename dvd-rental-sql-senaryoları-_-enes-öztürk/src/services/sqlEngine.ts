import alasql from 'alasql';
import { DVD_RENTAL_FILMS, Film } from '../data/dvdrentalData';

let isInitialized = false;

export interface QueryResult {
  success: boolean;
  data: Record<string, any>[];
  columns: string[];
  executionTimeMs: number;
  rowCount: number;
  error?: string;
}

export function initDatabase(): void {
  if (isInitialized) return;
  try {
    alasql('CREATE TABLE IF NOT EXISTS film');
    // Ensure clean state
    alasql.tables.film.data = DVD_RENTAL_FILMS;
    isInitialized = true;
  } catch (err) {
    console.error('Failed to initialize AlaSQL film table:', err);
  }
}

export function executeQuery(sql: string): QueryResult {
  initDatabase();
  const startTime = performance.now();

  try {
    // Sanitize query slightly: remove trailing semicolons
    const cleanSql = sql.trim().replace(/;+$/, '');
    
    // Execute query in alasql
    const result = alasql(cleanSql);
    const executionTimeMs = Math.round((performance.now() - startTime) * 100) / 100;

    let data: Record<string, any>[] = [];
    if (Array.isArray(result)) {
      data = result;
    } else if (result !== undefined && result !== null) {
      data = [{ result }];
    }

    const columns = data.length > 0 && typeof data[0] === 'object' && data[0] !== null 
      ? Object.keys(data[0]) 
      : [];

    return {
      success: true,
      data,
      columns,
      executionTimeMs,
      rowCount: data.length
    };
  } catch (error: any) {
    const executionTimeMs = Math.round((performance.now() - startTime) * 100) / 100;
    return {
      success: false,
      data: [],
      columns: [],
      executionTimeMs,
      rowCount: 0,
      error: error?.message || 'Bilinmeyen SQL sözdizimi hatası'
    };
  }
}

export function getFilms(filters?: {
  search?: string;
  rating?: string;
  rentalRate?: number;
  minLength?: number;
  maxLength?: number;
}): Film[] {
  let list = [...DVD_RENTAL_FILMS];

  if (filters?.search) {
    const q = filters.search.toLowerCase().trim();
    list = list.filter(f => f.title.toLowerCase().includes(q) || f.description.toLowerCase().includes(q));
  }

  if (filters?.rating && filters.rating !== 'ALL') {
    list = list.filter(f => f.rating === filters.rating);
  }

  if (filters?.rentalRate !== undefined && filters.rentalRate !== -1) {
    list = list.filter(f => Math.abs(f.rental_rate - filters.rentalRate!) < 0.001);
  }

  if (filters?.minLength !== undefined) {
    list = list.filter(f => f.length >= filters.minLength!);
  }

  if (filters?.maxLength !== undefined) {
    list = list.filter(f => f.length <= filters.maxLength!);
  }

  return list;
}
