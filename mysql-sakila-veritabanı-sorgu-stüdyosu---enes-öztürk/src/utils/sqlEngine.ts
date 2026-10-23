import { SAKILA_FILMS, SAKILA_CUSTOMERS } from '../data/sakilaDatabase';
import { QueryExecutionResult } from '../types/database';

export function executeSqlQuery(rawQuery: string): QueryExecutionResult {
  const startTime = performance.now();
  const cleanQuery = rawQuery.trim().replace(/;+$/, '');

  if (!cleanQuery) {
    return {
      columns: [],
      rows: [],
      totalMatched: 0,
      executionTimeMs: 0,
      query: rawQuery,
      error: 'Lütfen çalıştırılacak bir SQL sorgusu giriniz.'
    };
  }

  try {
    // 1. Check Table: film or customer
    const fromMatch = cleanQuery.match(/\bFROM\s+([a-zA-Z0-9_]+)/i);
    if (!fromMatch) {
      return {
        columns: [],
        rows: [],
        totalMatched: 0,
        executionTimeMs: 0,
        query: rawQuery,
        error: "MySQL Sözdizimi Hatası: 'FROM <tablo_adi>' belirtilmedi. (Desteklenen tablolar: 'film', 'customer')"
      };
    }

    const tableName = fromMatch[1].toLowerCase();
    let dataset: Record<string, any>[] = [];

    if (tableName === 'film') {
      dataset = SAKILA_FILMS.map(f => ({ ...f }));
    } else if (tableName === 'customer') {
      dataset = SAKILA_CUSTOMERS.map(c => ({ ...c }));
    } else {
      return {
        columns: [],
        rows: [],
        totalMatched: 0,
        executionTimeMs: 0,
        query: rawQuery,
        error: `MySQL Hata 1146 (42S02): '${tableName}' tablosu 'sakila' veritabanında bulunamadı. Lütfen 'film' veya 'customer' tablosunu kullanınız.`
      };
    }

    // 2. WHERE Clause
    const whereMatch = cleanQuery.match(/\bWHERE\s+([\s\S]+?)(?=\bORDER\s+BY|\bLIMIT|\bGROUP\s+BY|$)/i);
    let filteredData = [...dataset];

    if (whereMatch) {
      const whereClause = whereMatch[1].trim();

      // Check for title LIKE '%n'
      const likeNMatch = whereClause.match(/title\s+LIKE\s+['"]%n['"]/i);
      // Check for title LIKE 'n%'
      const likeStartNMatch = whereClause.match(/title\s+LIKE\s+['"]n%['"]/i);
      // Check for title LIKE '%n%'
      const likeContainsNMatch = whereClause.match(/title\s+LIKE\s+['"]%n%['"]/i);
      // Check for store_id = 1
      const storeIdMatch = whereClause.match(/store_id\s*=\s*(\d+)/i);
      // Check for length comparisons
      const lengthGtMatch = whereClause.match(/length\s*>\s*(\d+)/i);
      const lengthLtMatch = whereClause.match(/length\s*<\s*(\d+)/i);
      // Check for rating = '...'
      const ratingMatch = whereClause.match(/rating\s*=\s*['"]([A-Za-z0-9-]+)['"]/i);

      filteredData = filteredData.filter(row => {
        let matches = true;

        if (likeNMatch) {
          const title = String(row.title || '').trim().toLowerCase();
          matches = matches && title.endsWith('n');
        } else if (likeStartNMatch) {
          const title = String(row.title || '').trim().toLowerCase();
          matches = matches && title.startsWith('n');
        } else if (likeContainsNMatch) {
          const title = String(row.title || '').trim().toLowerCase();
          matches = matches && title.includes('n');
        }

        if (storeIdMatch) {
          const targetStore = parseInt(storeIdMatch[1], 10);
          matches = matches && row.store_id === targetStore;
        }

        if (lengthGtMatch) {
          const minLen = parseInt(lengthGtMatch[1], 10);
          matches = matches && (row.length || 0) > minLen;
        }

        if (lengthLtMatch) {
          const maxLen = parseInt(lengthLtMatch[1], 10);
          matches = matches && (row.length || 0) < maxLen;
        }

        if (ratingMatch) {
          matches = matches && row.rating === ratingMatch[1];
        }

        return matches;
      });
    }

    const totalMatched = filteredData.length;

    // 3. ORDER BY Clause
    const orderByMatch = cleanQuery.match(/\bORDER\s+BY\s+([\s\S]+?)(?=\bLIMIT|$)/i);
    if (orderByMatch) {
      const orderExpr = orderByMatch[1].trim();
      const orderParts = orderExpr.split(',').map(p => p.trim());

      filteredData.sort((a, b) => {
        for (const part of orderParts) {
          const isDesc = /\bDESC\b/i.test(part);
          const colName = part.replace(/\b(ASC|DESC)\b/gi, '').trim().toLowerCase();

          const valA = a[colName];
          const valB = b[colName];

          if (valA === undefined || valB === undefined) continue;

          let comparison = 0;
          if (typeof valA === 'number' && typeof valB === 'number') {
            comparison = valA - valB;
          } else {
            comparison = String(valA).localeCompare(String(valB), 'tr', { sensitivity: 'base' });
          }

          if (comparison !== 0) {
            return isDesc ? -comparison : comparison;
          }
        }
        return 0;
      });
    }

    // 4. LIMIT and OFFSET Clause
    // Supports:
    // a) LIMIT 5 OFFSET 5
    // b) LIMIT 5, 5 (MySQL syntax: LIMIT offset, count)
    // c) LIMIT 5
    let limit = filteredData.length;
    let offset = 0;

    const limitOffsetCommaMatch = cleanQuery.match(/\bLIMIT\s+(\d+)\s*,\s*(\d+)/i);
    const limitOffsetMatch = cleanQuery.match(/\bLIMIT\s+(\d+)\s+OFFSET\s+(\d+)/i);
    const limitOnlyMatch = cleanQuery.match(/\bLIMIT\s+(\d+)(?!\s*,\s*\d+)(?!\s+OFFSET\s+\d+)/i);
    const offsetOnlyMatch = cleanQuery.match(/\bOFFSET\s+(\d+)/i);

    if (limitOffsetCommaMatch) {
      // MySQL LIMIT offset, count
      offset = parseInt(limitOffsetCommaMatch[1], 10);
      limit = parseInt(limitOffsetCommaMatch[2], 10);
    } else if (limitOffsetMatch) {
      // Standard SQL: LIMIT count OFFSET offset
      limit = parseInt(limitOffsetMatch[1], 10);
      offset = parseInt(limitOffsetMatch[2], 10);
    } else if (limitOnlyMatch) {
      limit = parseInt(limitOnlyMatch[1], 10);
      if (offsetOnlyMatch) {
        offset = parseInt(offsetOnlyMatch[1], 10);
      }
    }

    const pagedData = filteredData.slice(offset, offset + limit);

    // 5. SELECT Columns
    const selectMatch = cleanQuery.match(/\bSELECT\s+([\s\S]+?)\s+\bFROM\b/i);
    let selectColumns: string[] = [];

    if (selectMatch) {
      const selectExpr = selectMatch[1].trim();
      if (selectExpr === '*') {
        if (pagedData.length > 0) {
          selectColumns = Object.keys(pagedData[0]);
        } else if (dataset.length > 0) {
          selectColumns = Object.keys(dataset[0]);
        }
      } else {
        selectColumns = selectExpr
          .split(',')
          .map(c => c.trim().replace(/^[`'"]|[`'"]$/g, ''))
          .filter(c => c.length > 0);
      }
    } else {
      selectColumns = pagedData.length > 0 ? Object.keys(pagedData[0]) : [];
    }

    // Project columns for rows
    const finalRows = pagedData.map(row => {
      const projected: Record<string, any> = {};
      for (const col of selectColumns) {
        projected[col] = row[col] !== undefined ? row[col] : null;
      }
      return projected;
    });

    const endTime = performance.now();
    const executionTimeMs = Math.max(0.4, Number((endTime - startTime).toFixed(2)));

    return {
      columns: selectColumns,
      rows: finalRows,
      totalMatched,
      executionTimeMs,
      query: rawQuery
    };
  } catch (err: any) {
    return {
      columns: [],
      rows: [],
      totalMatched: 0,
      executionTimeMs: 0,
      query: rawQuery,
      error: `Sorgu Hatası: ${err.message || 'Bilinmeyen bir hata oluştu.'}`
    };
  }
}

export function formatSqlScript(title: string, sql: string, author: string): string {
  return `-- =========================================================
-- MySQL Sakila Veritabanı Sorgu Çözümü
-- Konu: ${title}
-- ${author}
-- Tarih: ${new Date().toLocaleDateString('tr-TR')}
-- RDBMS: MySQL 8.x / Sakila Sample Database
-- =========================================================

USE sakila;

${sql}
`;
}
