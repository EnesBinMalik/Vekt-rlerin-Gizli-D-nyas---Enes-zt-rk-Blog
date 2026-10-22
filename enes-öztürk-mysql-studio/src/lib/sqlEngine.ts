import { SAKILA_COUNTRIES, SAKILA_FILMS, SAKILA_CITIES, SAKILA_CATEGORIES } from '../data/sakilaData';

export interface SqlQueryResult {
  columns: string[];
  rows: Record<string, unknown>[];
  executionTimeMs: number;
  totalRows: number;
  error?: string;
  plan?: ExecutionPlanStep[];
}

export interface ExecutionPlanStep {
  operation: string;
  details: string;
  rowsIn?: number;
  rowsOut?: number;
}

// Convert SQL LIKE pattern (with % and _) into a RegExp
export function sqlLikeToRegex(pattern: string, caseSensitive: boolean = false): RegExp {
  let escaped = '';
  for (let i = 0; i < pattern.length; i++) {
    const char = pattern[i];
    if (char === '%') {
      escaped += '.*';
    } else if (char === '_') {
      escaped += '.';
    } else if (['\\', '^', '$', '.', '*', '+', '?', '(', ')', '[', ']', '{', '}', '|'].includes(char)) {
      escaped += '\\' + char;
    } else {
      escaped += char;
    }
  }
  return new RegExp(`^${escaped}$`, caseSensitive ? '' : 'i');
}

// Test string against SQL LIKE pattern
export function matchesSqlLike(text: string, pattern: string, caseSensitive: boolean = false): boolean {
  if (text === null || text === undefined) return false;
  return sqlLikeToRegex(pattern, caseSensitive).test(String(text));
}

// Main In-Browser SQL Execution Engine
export function executeSqlQuery(rawQuery: string): SqlQueryResult {
  const startTime = performance.now();
  const trimmed = rawQuery.trim().replace(/;+$/, '');
  const plan: ExecutionPlanStep[] = [];

  if (!trimmed) {
    return {
      columns: [],
      rows: [],
      executionTimeMs: 0,
      totalRows: 0,
      error: 'Boş sorgu. Lütfen çalıştırmak için geçerli bir SQL sorgusu giriniz.'
    };
  }

  try {
    // 1. Identify query type
    const queryUpper = trimmed.toUpperCase();
    if (!queryUpper.startsWith('SELECT') && !queryUpper.startsWith('SHOW') && !queryUpper.startsWith('DESCRIBE') && !queryUpper.startsWith('EXPLAIN')) {
      return {
        columns: [],
        rows: [],
        executionTimeMs: 0,
        totalRows: 0,
        error: 'Bu stüdyoda güvenlik gereği yalnızca SELECT, SHOW ve EXPLAIN veri sorgulama komutları desteklenmektedir.'
      };
    }

    if (queryUpper.startsWith('SHOW TABLES')) {
      return {
        columns: ['Tables_in_sakila'],
        rows: [
          { Tables_in_sakila: 'country' },
          { Tables_in_sakila: 'film' },
          { Tables_in_sakila: 'city' },
          { Tables_in_sakila: 'category' }
        ],
        executionTimeMs: Number((performance.now() - startTime).toFixed(2)),
        totalRows: 4,
        plan: [{ operation: 'SHOW TABLES', details: 'Sakila veritabanı şema tabloları listelendi', rowsOut: 4 }]
      };
    }

    // 2. Parse FROM clause
    const fromMatch = trimmed.match(/\bFROM\s+([a-zA-Z0-9_]+)/i);
    if (!fromMatch) {
      return {
        columns: [],
        rows: [],
        executionTimeMs: 0,
        totalRows: 0,
        error: 'Sorguda geçerli bir FROM tablosu bulunamadı. Desteklenen tablolar: country, film, city, category.'
      };
    }

    const tableName = fromMatch[1].toLowerCase();
    let sourceData: Record<string, unknown>[] = [];

    if (tableName === 'country') {
      sourceData = [...SAKILA_COUNTRIES];
    } else if (tableName === 'film') {
      sourceData = [...SAKILA_FILMS];
    } else if (tableName === 'city') {
      sourceData = [...SAKILA_CITIES];
    } else if (tableName === 'category') {
      sourceData = [...SAKILA_CATEGORIES];
    } else {
      return {
        columns: [],
        rows: [],
        executionTimeMs: 0,
        totalRows: 0,
        error: `Bilinmeyen tablo: '${tableName}'. Sakila veritabanında 'country', 'film', 'city', 'category' tabloları mevcuttur.`
      };
    }

    plan.push({
      operation: 'TABLE SCAN (InnoDB)',
      details: `'${tableName}' tablosu tarandı (PK Clustered Index scan)`,
      rowsIn: sourceData.length,
      rowsOut: sourceData.length
    });

    // 3. Parse WHERE clause
    let filteredData = [...sourceData];
    const whereMatch = trimmed.match(/\bWHERE\s+([\s\S]*?)(?=\s+\bORDER\s+BY\b|\s+\bGROUP\s+BY\b|\s+\bLIMIT\b|$)/i);

    if (whereMatch) {
      const whereClause = whereMatch[1].trim();
      const rowsBefore = filteredData.length;

      filteredData = filteredData.filter((row) => evaluateWhereClause(row, whereClause));

      plan.push({
        operation: 'FILTER (WHERE predicate)',
        details: `WHERE koşulu uygulandı: [${whereClause}]`,
        rowsIn: rowsBefore,
        rowsOut: filteredData.length
      });
    }

    // 4. Parse ORDER BY clause
    const orderMatch = trimmed.match(/\bORDER\s+BY\s+([\s\S]*?)(?=\s+\bLIMIT\b|$)/i);
    if (orderMatch) {
      const orderDef = orderMatch[1].trim();
      const parts = orderDef.split(',').map((p) => p.trim());

      filteredData.sort((a, b) => {
        for (const part of parts) {
          const isDesc = /\bDESC$/i.test(part);
          const colName = part.replace(/\s+(ASC|DESC)$/i, '').trim();

          const valA = a[colName];
          const valB = b[colName];

          if (valA === undefined || valB === undefined) continue;

          let comp = 0;
          if (typeof valA === 'number' && typeof valB === 'number') {
            comp = valA - valB;
          } else {
            comp = String(valA).localeCompare(String(valB), 'tr', { sensitivity: 'base' });
          }

          if (comp !== 0) {
            return isDesc ? -comp : comp;
          }
        }
        return 0;
      });

      plan.push({
        operation: 'SORT (Filesort / Index sort)',
        details: `Sıralama uygulandı: ORDER BY ${orderDef}`,
        rowsIn: filteredData.length,
        rowsOut: filteredData.length
      });
    }

    // 5. Parse SELECT columns
    const selectMatch = trimmed.match(/^SELECT\s+(DISTINCT\s+)?([\s\S]*?)\s+\bFROM\b/i);
    if (!selectMatch) {
      return {
        columns: [],
        rows: [],
        executionTimeMs: 0,
        totalRows: 0,
        error: 'Sorguda SELECT sütun listesi çözümlenemedi.'
      };
    }

    const isDistinct = Boolean(selectMatch[1]);
    const selectExpr = selectMatch[2].trim();
    let finalColumns: string[] = [];
    let projectedRows: Record<string, unknown>[] = [];

    if (selectExpr === '*') {
      if (filteredData.length > 0) {
        finalColumns = Object.keys(filteredData[0]);
      } else if (sourceData.length > 0) {
        finalColumns = Object.keys(sourceData[0]);
      } else {
        finalColumns = [];
      }
      projectedRows = filteredData;
    } else if (/^COUNT\(\*\)/i.test(selectExpr)) {
      finalColumns = ['COUNT(*)'];
      projectedRows = [{ 'COUNT(*)': filteredData.length }];
    } else {
      // Split selected columns
      const requestedCols = selectExpr.split(',').map((c) => c.trim().replace(/^`|`$/g, ''));
      finalColumns = requestedCols;

      projectedRows = filteredData.map((row) => {
        const projected: Record<string, unknown> = {};
        for (const col of requestedCols) {
          // Check for alias: col AS alias
          const aliasMatch = col.match(/^([\w_]+)\s+AS\s+([\w_]+)$/i);
          if (aliasMatch) {
            const rawCol = aliasMatch[1];
            const alias = aliasMatch[2];
            projected[alias] = row[rawCol] ?? null;
          } else {
            projected[col] = row[col] ?? null;
          }
        }
        return projected;
      });
    }

    // Handle DISTINCT if specified
    if (isDistinct) {
      const seen = new Set<string>();
      projectedRows = projectedRows.filter((r) => {
        const key = JSON.stringify(r);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    }

    // 6. Parse LIMIT and OFFSET
    const limitMatch = trimmed.match(/\bLIMIT\s+(\d+)(?:\s+OFFSET\s+(\d+)|\s*,\s*(\d+))?/i);
    if (limitMatch) {
      let limit = parseInt(limitMatch[1], 10);
      let offset = 0;
      if (limitMatch[2]) {
        offset = parseInt(limitMatch[2], 10);
      } else if (limitMatch[3]) {
        // MySQL syntax: LIMIT offset, count
        offset = parseInt(limitMatch[1], 10);
        limit = parseInt(limitMatch[3], 10);
      }
      projectedRows = projectedRows.slice(offset, offset + limit);
    }

    const duration = Number((performance.now() - startTime).toFixed(2));

    return {
      columns: finalColumns,
      rows: projectedRows,
      executionTimeMs: duration,
      totalRows: projectedRows.length,
      plan
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return {
      columns: [],
      rows: [],
      executionTimeMs: Number((performance.now() - startTime).toFixed(2)),
      totalRows: 0,
      error: `Sorgu yürütme hatası: ${errorMsg}`
    };
  }
}

// Evaluate a row against a WHERE expression clause
function evaluateWhereClause(row: Record<string, unknown>, clause: string): boolean {
  // Support AND combinations
  // Also handle parenthesized logic or multiple conditions
  const conditions = splitTopLevelAnd(clause);

  for (const cond of conditions) {
    if (!evaluateSingleCondition(row, cond.trim())) {
      return false;
    }
  }

  return true;
}

// Splits WHERE clause by 'AND' while respecting parentheses
function splitTopLevelAnd(clause: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let current = '';

  const words = clause.split(/(\s+)/);

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    for (const char of word) {
      if (char === '(') depth++;
      else if (char === ')') depth--;
    }

    if (depth === 0 && word.toUpperCase() === 'AND') {
      parts.push(current.trim());
      current = '';
    } else {
      current += word;
    }
  }

  if (current.trim()) {
    parts.push(current.trim());
  }

  return parts;
}

// Evaluates a single atomic condition (e.g., country LIKE 'A%a', length > 90, rental_rate = 2.99)
function evaluateSingleCondition(row: Record<string, unknown>, cond: string): boolean {
  // Trim outer parentheses if wrapped
  let expr = cond.trim();
  while (expr.startsWith('(') && expr.endsWith(')') && isBalanced(expr.slice(1, -1))) {
    expr = expr.slice(1, -1).trim();
  }

  // 1. Check for LIKE or NOT LIKE or ILIKE
  const likeMatch = expr.match(/^([\s\S]+?)\s+(NOT\s+)?(LIKE|ILIKE)\s+(BINARY\s+)?'([\s\S]*?)'$/i);
  if (likeMatch) {
    const colExpr = likeMatch[1].trim();
    const isNot = Boolean(likeMatch[2]);
    const isIlike = likeMatch[3].toUpperCase() === 'ILIKE';
    const isBinary = Boolean(likeMatch[4]);
    const pattern = likeMatch[5];

    const val = getRowExprValue(row, colExpr);
    if (val === null || val === undefined) return false;

    // Case sensitive if BINARY or explicit
    const caseSensitive = isBinary && !isIlike;
    const matches = matchesSqlLike(String(val), pattern, caseSensitive);

    return isNot ? !matches : matches;
  }

  // 2. Check for 4+ 'T' letters calculation:
  // e.g. (LENGTH(title) - LENGTH(REPLACE(LOWER(title), 't', ''))) >= 4
  const tCountMatch = expr.match(/\(LENGTH\(title\)\s*-\s*LENGTH\(REPLACE\(LOWER\(title\),\s*'t',\s*''\)\)\)\s*(>=|>)\s*(\d+)/i);
  if (tCountMatch) {
    const titleVal = String(row['title'] || '').toLowerCase();
    const tCount = (titleVal.match(/t/g) || []).length;
    const target = parseInt(tCountMatch[2], 10);
    return tCountMatch[1] === '>=' ? tCount >= target : tCount > target;
  }

  // 3. Check for LENGTH(country) >= 6 or CHAR_LENGTH(...)
  const lengthMatch = expr.match(/^(LENGTH|CHAR_LENGTH)\(([\w_]+)\)\s*(>=|<=|>|<|=|!=)\s*(\d+)$/i);
  if (lengthMatch) {
    const colName = lengthMatch[2];
    const op = lengthMatch[3];
    const target = parseInt(lengthMatch[4], 10);
    const val = String(row[colName] || '');
    const len = val.length;

    switch (op) {
      case '>=': return len >= target;
      case '<=': return len <= target;
      case '>': return len > target;
      case '<': return len < target;
      case '=': return len === target;
      case '!=': return len !== target;
      default: return false;
    }
  }

  // 4. Standard comparison operators (=, !=, <>, >, <, >=, <=)
  const compMatch = expr.match(/^([\w_]+)\s*(=|!=|<>|>=|<=|>|<)\s*(.+)$/i);
  if (compMatch) {
    const colName = compMatch[1].trim();
    const op = compMatch[2];
    let rightVal = compMatch[3].trim();

    // Strip quotes if string literal
    let isStr = false;
    if ((rightVal.startsWith("'") && rightVal.endsWith("'")) || (rightVal.startsWith('"') && rightVal.endsWith('"'))) {
      rightVal = rightVal.slice(1, -1);
      isStr = true;
    }

    const leftVal = row[colName];
    if (leftVal === undefined) return false;

    if (isStr) {
      const leftStr = String(leftVal);
      switch (op) {
        case '=': return leftStr === rightVal;
        case '!=':
        case '<>': return leftStr !== rightVal;
        default: return false;
      }
    } else {
      const numRight = parseFloat(rightVal);
      const numLeft = typeof leftVal === 'number' ? leftVal : parseFloat(String(leftVal));

      if (isNaN(numRight) || isNaN(numLeft)) {
        // Fallback to string comparison
        const sLeft = String(leftVal);
        switch (op) {
          case '=': return sLeft === rightVal;
          case '!=':
          case '<>': return sLeft !== rightVal;
          default: return false;
        }
      }

      switch (op) {
        case '=': return Math.abs(numLeft - numRight) < 0.0001;
        case '!=':
        case '<>': return Math.abs(numLeft - numRight) >= 0.0001;
        case '>=': return numLeft >= numRight;
        case '<=': return numLeft <= numRight;
        case '>': return numLeft > numRight;
        case '<': return numLeft < numRight;
        default: return false;
      }
    }
  }

  return true;
}

// Extracts evaluated value from expressions like LOWER(title), UPPER(country), or plain column
function getRowExprValue(row: Record<string, unknown>, colExpr: string): unknown {
  const lowerMatch = colExpr.match(/^LOWER\(([\w_]+)\)$/i);
  if (lowerMatch) {
    const col = lowerMatch[1];
    return row[col] ? String(row[col]).toLowerCase() : '';
  }

  const upperMatch = colExpr.match(/^UPPER\(([\w_]+)\)$/i);
  if (upperMatch) {
    const col = upperMatch[1];
    return row[col] ? String(row[col]).toUpperCase() : '';
  }

  return row[colExpr] ?? null;
}

function isBalanced(str: string): boolean {
  let count = 0;
  for (const c of str) {
    if (c === '(') count++;
    else if (c === ')') count--;
    if (count < 0) return false;
  }
  return count === 0;
}
