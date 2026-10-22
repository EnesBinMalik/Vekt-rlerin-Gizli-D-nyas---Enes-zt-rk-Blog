/**
 * In-browser MySQL 8.0 Emulation Engine for Sakila Database
 * Hazırlayan: Enes Öztürk
 *
 * Desteklenen Özellikler:
 * - SELECT, FROM, WHERE, ORDER BY, LIMIT
 * - BETWEEN ... AND ... (ve NOT BETWEEN)
 * - IN (...) (ve NOT IN)
 * - AND / OR mantıksal operatörleri
 * - Karşılaştırma operatörleri (=, !=, <>, <, >, <=, >=, LIKE)
 * - MySQL Collation: Harf büyüklüğü duyarsız (Case-insensitive) karşılaştırma
 * - SHOW TABLES, DESCRIBE / SHOW COLUMNS FROM, EXPLAIN
 */

import { SAKILA_SCHEMA, TableSchema } from '../data/sakilaData';

export interface QueryResult {
  success: boolean;
  columns: string[];
  rows: Record<string, any>[];
  rowCount: number;
  executionTimeMs: number;
  message: string;
  query: string;
  error?: string;
  explainPlan?: {
    id: number;
    select_type: string;
    table: string;
    type: string;
    possible_keys: string | null;
    key: string | null;
    key_len: string | null;
    ref: string | null;
    rows: number;
    filtered: number;
    Extra: string;
  }[];
}

export interface HomeworkTask {
  id: number;
  title: string;
  badge: string;
  category: string;
  question: string;
  sql: string;
  explanation: string;
  targetTable: string;
  keyConcepts: string[];
}

export const HOMEWORK_TASKS: HomeworkTask[] = [
  {
    id: 1,
    title: "Görev 1: film Tablosunda BETWEEN - AND Filtrelemesi",
    badge: "BETWEEN ... AND",
    category: "Aralık Filtreleme & Sıralama",
    question: "film tablosunda bulunan tüm sütunlardaki verileri replacement_cost değeri 12.99 dan büyük eşit ve 16.99 küçük olma koşuluyla sıralayınız ( BETWEEN - AND yapısını kullanınız.)",
    sql: `SELECT * FROM film
WHERE replacement_cost BETWEEN 12.99 AND 16.99
ORDER BY replacement_cost ASC;`,
    explanation: "BETWEEN operatörü SQL standardında belirtilen iki değer arasındaki kayıtları seçer ve her iki sınırı da (12.99 ve 16.99) kapsar (inclusive). Sıralama için ORDER BY replacement_cost ASC kullanılır. Eğer 16.99 hariç tutulmak istenirse 'replacement_cost >= 12.99 AND replacement_cost < 16.99' da kullanılabilir.",
    targetTable: "film",
    keyConcepts: ["BETWEEN ... AND", "ORDER BY ASC", "SELECT *", "DECIMAL Değer Karşılaştırması"]
  },
  {
    id: 2,
    title: "Görev 2: actor Tablosunda IN Operatörü ile İsim Sorgusu",
    badge: "IN ('Penelope', 'Nick', 'Ed')",
    category: "Küme Eşleme & Sıralama",
    question: "actor tablosunda bulunan first_name ve last_name sütunlardaki verileri first_name 'Penelope' veya 'Nick' veya 'Ed' değerleri olması koşuluyla sıralayınız. ( IN operatörünü kullanınız.)",
    sql: `SELECT first_name, last_name FROM actor
WHERE first_name IN ('Penelope', 'Nick', 'Ed')
ORDER BY first_name ASC, last_name ASC;`,
    explanation: "IN operatörü, bir sütunun verilen küme/liste içindeki herhangi bir değere eşit olup olmadığını test eder. 'first_name = 'Penelope' OR first_name = 'Nick' OR first_name = 'Ed'' yazımının en temiz ve optimize halidir. MySQL utf8mb4 collation sayesinde büyük/küçük harf duyarsız eşleşir.",
    targetTable: "actor",
    keyConcepts: ["IN (...) Operatörü", "Belirli Sütun Seçimi", "Çoklu ORDER BY", "OR Yerine IN Kullanımı"]
  },
  {
    id: 3,
    title: "Görev 3: film Tablosunda Çoklu IN ve AND Koşulu",
    badge: "rental_rate IN & replacement_cost IN",
    category: "Bileşik Koşullar (AND & IN)",
    question: "film tablosunda bulunan tüm sütunlardaki verileri rental_rate 0.99, 2.99, 4.99 VE replacement_cost 12.99, 15.99, 28.99 olma koşullarıyla sıralayınız. ( IN operatörünü kullanınız.)",
    sql: `SELECT * FROM film
WHERE rental_rate IN (0.99, 2.99, 4.99)
  AND replacement_cost IN (12.99, 15.99, 28.99)
ORDER BY rental_rate ASC, replacement_cost ASC;`,
    explanation: "Hem rental_rate hem de replacement_cost sütunlarına ayrı ayrı IN operatörü uygulanmış ve bu iki koşul mantıksal AND operatörüyle bağlanmıştır. Yalnızca her iki kümede de eşleşen kayıtlar sonuç kümesine dahil edilir ve ardından rental_rate ve replacement_cost'a göre sıralanır.",
    targetTable: "film",
    keyConcepts: ["Çoklu IN Operatörü", "Mantıksal AND", "Bileşik Sıralama (ORDER BY)", "Sayısal Kümeler"]
  }
];

export class SqlEngine {
  private schema: Record<string, TableSchema>;

  constructor(customSchema?: Record<string, TableSchema>) {
    this.schema = customSchema || SAKILA_SCHEMA;
  }

  public getTables(): string[] {
    return Object.keys(this.schema);
  }

  public getTableSchema(tableName: string): TableSchema | undefined {
    return this.schema[tableName.toLowerCase()];
  }

  public execute(queryText: string): QueryResult {
    const startTime = performance.now();
    const rawTrimmed = queryText.trim().replace(/;+$/, '').trim();

    if (!rawTrimmed) {
      return {
        success: false,
        columns: [],
        rows: [],
        rowCount: 0,
        executionTimeMs: 0,
        message: "Sorgu boş olamaz.",
        query: queryText,
        error: "ERROR 1065 (42000): Query was empty"
      };
    }

    try {
      // Check for SHOW TABLES
      if (/^SHOW\s+TABLES/i.test(rawTrimmed)) {
        const rows = Object.keys(this.schema).map(t => ({ Tables_in_sakila: t }));
        const execTime = performance.now() - startTime;
        return {
          success: true,
          columns: ["Tables_in_sakila"],
          rows,
          rowCount: rows.length,
          executionTimeMs: parseFloat(execTime.toFixed(3)),
          message: `${rows.length} row(s) in set (${(execTime / 1000).toFixed(3)} sec)`,
          query: rawTrimmed
        };
      }

      // Check for DESCRIBE or SHOW COLUMNS FROM
      const descMatch = rawTrimmed.match(/^(?:DESCRIBE|DESC|SHOW\s+COLUMNS\s+FROM)\s+[`"']?([a-zA-Z0-9_]+)[`"']?/i);
      if (descMatch) {
        const tableName = descMatch[1].toLowerCase();
        const table = this.schema[tableName];
        if (!table) {
          throw new Error(`ERROR 1146 (42S02): Table 'sakila.${tableName}' doesn't exist`);
        }
        const rows = table.columns.map(col => ({
          Field: col.name,
          Type: col.type,
          Null: col.nullable ? "YES" : "NO",
          Key: col.isPrimaryKey ? "PRI" : "",
          Default: col.defaultValue || "NULL",
          Extra: col.comment || ""
        }));
        const execTime = performance.now() - startTime;
        return {
          success: true,
          columns: ["Field", "Type", "Null", "Key", "Default", "Extra"],
          rows,
          rowCount: rows.length,
          executionTimeMs: parseFloat(execTime.toFixed(3)),
          message: `${rows.length} row(s) in set (${(execTime / 1000).toFixed(3)} sec)`,
          query: rawTrimmed
        };
      }

      // EXPLAIN query handling
      let isExplain = false;
      let effectiveQuery = rawTrimmed;
      if (/^EXPLAIN\s+/i.test(rawTrimmed)) {
        isExplain = true;
        effectiveQuery = rawTrimmed.replace(/^EXPLAIN\s+/i, '').trim();
      }

      // SELECT Query Parser
      const selectResult = this.executeSelect(effectiveQuery);

      if (isExplain) {
        const tableName = this.extractTableName(effectiveQuery) || "table";
        const rowsCount = selectResult.rows.length;
        const explainRows = [
          {
            id: 1,
            select_type: "SIMPLE",
            table: tableName,
            type: /WHERE/i.test(effectiveQuery) ? "range" : "ALL",
            possible_keys: "PRIMARY, idx_" + tableName,
            key: "idx_" + tableName,
            key_len: "4",
            ref: "const",
            rows: rowsCount > 0 ? rowsCount : 100,
            filtered: 100.00,
            Extra: "Using where; Using index for sort"
          }
        ];
        const execTime = performance.now() - startTime;
        return {
          success: true,
          columns: ["id", "select_type", "table", "type", "possible_keys", "key", "key_len", "ref", "rows", "filtered", "Extra"],
          rows: explainRows,
          rowCount: explainRows.length,
          executionTimeMs: parseFloat(execTime.toFixed(3)),
          message: `1 row in set (${(execTime / 1000).toFixed(3)} sec)`,
          query: rawTrimmed,
          explainPlan: explainRows
        };
      }

      const execTime = performance.now() - startTime;
      return {
        ...selectResult,
        executionTimeMs: parseFloat(execTime.toFixed(3)),
        message: `${selectResult.rowCount} row(s) in set (${(execTime / 1000).toFixed(3)} sec)`,
        query: rawTrimmed
      };

    } catch (err: any) {
      const execTime = performance.now() - startTime;
      return {
        success: false,
        columns: [],
        rows: [],
        rowCount: 0,
        executionTimeMs: parseFloat(execTime.toFixed(3)),
        message: err.message || "Query execution failed",
        query: queryText,
        error: err.message || "MySQL Syntax Error"
      };
    }
  }

  private extractTableName(sql: string): string | null {
    const match = sql.match(/FROM\s+[`"']?([a-zA-Z0-9_]+)[`"']?/i);
    return match ? match[1].toLowerCase() : null;
  }

  private executeSelect(sql: string): { success: boolean; columns: string[]; rows: Record<string, any>[]; rowCount: number } {
    // Basic structure matching:
    // SELECT <columns> FROM <table> [WHERE <where>] [ORDER BY <order>] [LIMIT <limit>]
    const fromMatch = sql.match(/SELECT\s+([\s\S]+?)\s+FROM\s+[`"']?([a-zA-Z0-9_]+)[`"']?([\s\S]*)/i);
    if (!fromMatch) {
      throw new Error("ERROR 1064 (42000): You have an error in your SQL syntax; check manual for correct SELECT statement");
    }

    const rawColumns = fromMatch[1].trim();
    const tableName = fromMatch[2].trim().toLowerCase();
    const remaining = fromMatch[3].trim();

    const table = this.schema[tableName];
    if (!table) {
      throw new Error(`ERROR 1146 (42S02): Table 'sakila.${tableName}' doesn't exist`);
    }

    let rows = [...table.data];

    // Parse clauses in remaining string
    let whereClause = "";
    let orderClause = "";
    let limitClause = "";

    const orderIndex = remaining.search(/\bORDER\s+BY\b/i);
    const limitIndex = remaining.search(/\bLIMIT\b/i);

    let whereEnd = remaining.length;
    if (orderIndex !== -1) whereEnd = Math.min(whereEnd, orderIndex);
    if (limitIndex !== -1) whereEnd = Math.min(whereEnd, limitIndex);

    const wherePart = remaining.slice(0, whereEnd).trim();
    if (/^WHERE\b/i.test(wherePart)) {
      whereClause = wherePart.replace(/^WHERE\s+/i, '').trim();
    }

    if (orderIndex !== -1) {
      const afterOrder = remaining.slice(orderIndex).replace(/^ORDER\s+BY\s+/i, '');
      const limInOrder = afterOrder.search(/\bLIMIT\b/i);
      if (limInOrder !== -1) {
        orderClause = afterOrder.slice(0, limInOrder).trim();
      } else {
        orderClause = afterOrder.trim();
      }
    }

    if (limitIndex !== -1) {
      limitClause = remaining.slice(limitIndex).replace(/^LIMIT\s+/i, '').trim();
    }

    // 1. Apply WHERE filter
    if (whereClause) {
      rows = rows.filter(row => this.evaluateWhere(row, whereClause, table));
    }

    // 2. Apply ORDER BY
    if (orderClause) {
      rows = this.applyOrderBy(rows, orderClause);
    }

    // 3. Project Columns
    const { projectedRows, columnNames } = this.projectColumns(rows, rawColumns, table);

    // 4. Apply LIMIT
    let finalRows = projectedRows;
    if (limitClause) {
      const parts = limitClause.split(/,|\s+OFFSET\s+/i).map(s => parseInt(s.trim(), 10));
      if (parts.length === 1 && !isNaN(parts[0])) {
        finalRows = finalRows.slice(0, parts[0]);
      } else if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
        // LIMIT offset, count OR LIMIT count OFFSET offset
        if (/OFFSET/i.test(limitClause)) {
          finalRows = finalRows.slice(parts[1], parts[1] + parts[0]);
        } else {
          finalRows = finalRows.slice(parts[0], parts[0] + parts[1]);
        }
      }
    }

    return {
      success: true,
      columns: columnNames,
      rows: finalRows,
      rowCount: finalRows.length
    };
  }

  private evaluateWhere(row: Record<string, any>, whereExpr: string, table: TableSchema): boolean {
    // Clean outer parenthesis if fully wrapped
    let expr = whereExpr.trim();

    // Check for OR operator at top level
    // In our homework tasks and standard queries, AND is the main connector
    // Let's split on top-level ANDs and ORs
    // To be robust with "rental_rate IN (...) AND replacement_cost IN (...)"
    const andTokens = this.splitTopLevel(expr, /\bAND\b/i);
    if (andTokens.length > 1) {
      return andTokens.every(subExpr => this.evaluateWhere(row, subExpr, table));
    }

    const orTokens = this.splitTopLevel(expr, /\bOR\b/i);
    if (orTokens.length > 1) {
      return orTokens.some(subExpr => this.evaluateWhere(row, subExpr, table));
    }

    // Single predicate evaluation:
    // PREDICATE 1: col BETWEEN val1 AND val2
    const betweenMatch = expr.match(/^[`"']?([a-zA-Z0-9_]+)[`"']?\s+(?:(NOT)\s+)?BETWEEN\s+([\d.-]+|'[^']*')\s+AND\s+([\d.-]+|'[^']*')/i);
    if (betweenMatch) {
      const colName = betweenMatch[1];
      const isNot = Boolean(betweenMatch[2]);
      const rawVal1 = this.cleanValue(betweenMatch[3]);
      const rawVal2 = this.cleanValue(betweenMatch[4]);
      const rowVal = this.getRowValue(row, colName);

      if (rowVal === undefined || rowVal === null) return false;

      let passes = false;
      if (typeof rowVal === 'number' || !isNaN(Number(rowVal))) {
        const numVal = Number(rowVal);
        const min = Number(rawVal1);
        const max = Number(rawVal2);
        passes = numVal >= min && numVal <= max;
      } else {
        const strVal = String(rowVal).toLowerCase();
        passes = strVal >= String(rawVal1).toLowerCase() && strVal <= String(rawVal2).toLowerCase();
      }

      return isNot ? !passes : passes;
    }

    // PREDICATE 2: col IN (val1, val2, ...)
    const inMatch = expr.match(/^[`"']?([a-zA-Z0-9_]+)[`"']?\s+(?:(NOT)\s+)?IN\s*\(([\s\S]+?)\)/i);
    if (inMatch) {
      const colName = inMatch[1];
      const isNot = Boolean(inMatch[2]);
      const rawList = inMatch[3];
      const parsedValues = this.parseCommaList(rawList).map(v => this.cleanValue(v));
      const rowVal = this.getRowValue(row, colName);

      if (rowVal === undefined || rowVal === null) return false;

      let passes = false;
      if (typeof rowVal === 'number' || !isNaN(Number(rowVal))) {
        const numRow = Number(rowVal);
        passes = parsedValues.some(item => Number(item) === numRow);
      } else {
        // String comparison (MySQL collation utf8mb4_general_ci is case-insensitive)
        const rowStr = String(rowVal).trim().toLowerCase();
        passes = parsedValues.some(item => String(item).trim().toLowerCase() === rowStr);
      }

      return isNot ? !passes : passes;
    }

    // PREDICATE 3: col LIKE '%pattern%'
    const likeMatch = expr.match(/^[`"']?([a-zA-Z0-9_]+)[`"']?\s+(?:(NOT)\s+)?LIKE\s+['"]([\s\S]*?)['"]/i);
    if (likeMatch) {
      const colName = likeMatch[1];
      const isNot = Boolean(likeMatch[2]);
      const pattern = likeMatch[3];
      const rowVal = String(this.getRowValue(row, colName) || '').toLowerCase();
      
      const regexPattern = '^' + pattern
        .replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
        .replace(/%/g, '.*')
        .replace(/_/g, '.') + '$';
      const regex = new RegExp(regexPattern, 'i');
      const passes = regex.test(rowVal);
      return isNot ? !passes : passes;
    }

    // PREDICATE 4: col [= | != | <> | <= | >= | < | >] val
    const compMatch = expr.match(/^[`"']?([a-zA-Z0-9_]+)[`"']?\s*(=|!=|<>|<=|>=|<|>)\s*([\s\S]+)$/);
    if (compMatch) {
      const colName = compMatch[1];
      const op = compMatch[2];
      const targetVal = this.cleanValue(compMatch[3]);
      const rowVal = this.getRowValue(row, colName);

      if (rowVal === undefined || rowVal === null) return false;

      if (typeof rowVal === 'number' || (!isNaN(Number(rowVal)) && !isNaN(Number(targetVal)))) {
        const n1 = Number(rowVal);
        const n2 = Number(targetVal);
        switch (op) {
          case '=': return n1 === n2;
          case '!=':
          case '<>': return n1 !== n2;
          case '<': return n1 < n2;
          case '<=': return n1 <= n2;
          case '>': return n1 > n2;
          case '>=': return n1 >= n2;
        }
      } else {
        const s1 = String(rowVal).toLowerCase();
        const s2 = String(targetVal).toLowerCase();
        switch (op) {
          case '=': return s1 === s2;
          case '!=':
          case '<>': return s1 !== s2;
          case '<': return s1 < s2;
          case '<=': return s1 <= s2;
          case '>': return s1 > s2;
          case '>=': return s1 >= s2;
        }
      }
    }

    // Default fallback
    return true;
  }

  private splitTopLevel(text: string, regex: RegExp): string[] {
    const parts: string[] = [];
    let parenDepth = 0;
    let inQuotes = false;
    let quoteChar = '';
    let lastIndex = 0;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if ((char === "'" || char === '"') && text[i - 1] !== '\\') {
        if (!inQuotes) {
          inQuotes = true;
          quoteChar = char;
        } else if (char === quoteChar) {
          inQuotes = false;
        }
      } else if (!inQuotes) {
        if (char === '(') parenDepth++;
        else if (char === ')') parenDepth--;
        else if (parenDepth === 0) {
          const sub = text.slice(i);
          const match = sub.match(regex);
          if (match && match.index === 0) {
            parts.push(text.slice(lastIndex, i).trim());
            i += match[0].length - 1;
            lastIndex = i + 1;
          }
        }
      }
    }

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex).trim());
    }

    return parts.filter(p => p.length > 0);
  }

  private parseCommaList(raw: string): string[] {
    const items: string[] = [];
    let inQuote = false;
    let quoteChar = '';
    let curr = '';

    for (let i = 0; i < raw.length; i++) {
      const char = raw[i];
      if ((char === "'" || char === '"') && raw[i - 1] !== '\\') {
        if (!inQuote) {
          inQuote = true;
          quoteChar = char;
        } else if (char === quoteChar) {
          inQuote = false;
        }
        curr += char;
      } else if (char === ',' && !inQuote) {
        items.push(curr.trim());
        curr = '';
      } else {
        curr += char;
      }
    }
    if (curr.trim()) {
      items.push(curr.trim());
    }
    return items;
  }

  private cleanValue(val: string): any {
    const trimmed = val.trim();
    if (/^'(.*)'$/.test(trimmed)) {
      return trimmed.replace(/^'([\s\S]*)'$/, '$1');
    }
    if (/^"(.*)"$/.test(trimmed)) {
      return trimmed.replace(/^"([\s\S]*)"$/, '$1');
    }
    if (!isNaN(Number(trimmed))) {
      return Number(trimmed);
    }
    return trimmed;
  }

  private getRowValue(row: Record<string, any>, colName: string): any {
    const direct = row[colName];
    if (direct !== undefined) return direct;
    const lowerKey = Object.keys(row).find(k => k.toLowerCase() === colName.toLowerCase());
    return lowerKey ? row[lowerKey] : undefined;
  }

  private applyOrderBy(rows: Record<string, any>[], orderClause: string): Record<string, any>[] {
    const sortDirectives = orderClause.split(',').map(s => {
      const match = s.trim().match(/^[`"']?([a-zA-Z0-9_]+)[`"']?(?:\s+(ASC|DESC))?/i);
      if (!match) return null;
      return {
        col: match[1],
        dir: (match[2] || 'ASC').toUpperCase()
      };
    }).filter(Boolean) as { col: string; dir: string }[];

    if (!sortDirectives.length) return rows;

    return [...rows].sort((a, b) => {
      for (const directive of sortDirectives) {
        const valA = this.getRowValue(a, directive.col);
        const valB = this.getRowValue(b, directive.col);

        if (valA === valB) continue;
        if (valA === null || valA === undefined) return 1;
        if (valB === null || valB === undefined) return -1;

        let comp = 0;
        if (typeof valA === 'number' && typeof valB === 'number') {
          comp = valA - valB;
        } else {
          comp = String(valA).localeCompare(String(valB));
        }

        if (comp !== 0) {
          return directive.dir === 'DESC' ? -comp : comp;
        }
      }
      return 0;
    });
  }

  private projectColumns(
    rows: Record<string, any>[],
    rawColumns: string,
    table: TableSchema
  ): { projectedRows: Record<string, any>[]; columnNames: string[] } {
    const trimmedCols = rawColumns.trim();

    // Check for COUNT(*)
    if (/^COUNT\s*\(\s*\*\s*\)/i.test(trimmedCols)) {
      return {
        columnNames: ["COUNT(*)"],
        projectedRows: [{ "COUNT(*)": rows.length }]
      };
    }

    if (trimmedCols === '*') {
      const columnNames = table.columns.map(c => c.name);
      return {
        columnNames,
        projectedRows: rows
      };
    }

    // Specific columns: e.g. "first_name, last_name"
    const parsedCols = trimmedCols.split(',').map(col => {
      const clean = col.trim().replace(/^[`"']+|[`"']+$/g, '');
      return clean;
    });

    const validColNames: string[] = [];
    for (const c of parsedCols) {
      const matchedCol = table.columns.find(col => col.name.toLowerCase() === c.toLowerCase());
      if (matchedCol) {
        validColNames.push(matchedCol.name);
      } else {
        validColNames.push(c);
      }
    }

    const projectedRows = rows.map(row => {
      const newRow: Record<string, any> = {};
      for (const colName of validColNames) {
        newRow[colName] = this.getRowValue(row, colName);
      }
      return newRow;
    });

    return {
      columnNames: validColNames,
      projectedRows
    };
  }
}

export const defaultEngine = new SqlEngine();
