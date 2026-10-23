import { ACTORS_DATA, CUSTOMERS_DATA } from '../data/dvdrentalData';
import { SCENARIOS } from '../data/scenarios';
import { ExecutionResult, QueryDialect } from '../types/database';

export interface SetStats {
  actorTotalRows: number;
  actorDistinctNames: number;
  customerTotalRows: number;
  customerDistinctNames: number;
  unionDistinctCount: number;
  unionAllCount: number;
  intersectDistinctCount: number;
  intersectAllCount: number;
  exceptDistinctCount: number;
  exceptAllCount: number;
  topOverlappingNames: { name: string; actorCount: number; customerCount: number }[];
}

export function computeSetStats(): SetStats {
  const actorCounts = new Map<string, number>();
  for (const a of ACTORS_DATA) {
    actorCounts.set(a.first_name, (actorCounts.get(a.first_name) || 0) + 1);
  }

  const customerCounts = new Map<string, number>();
  for (const c of CUSTOMERS_DATA) {
    customerCounts.set(c.first_name, (customerCounts.get(c.first_name) || 0) + 1);
  }

  const allDistinct = new Set<string>([...actorCounts.keys(), ...customerCounts.keys()]);
  const intersectDistinct: string[] = [];
  const exceptDistinct: string[] = [];
  let intersectAllCount = 0;
  let exceptAllCount = 0;

  for (const name of actorCounts.keys()) {
    const aCount = actorCounts.get(name) || 0;
    const cCount = customerCounts.get(name) || 0;
    if (cCount > 0) {
      intersectDistinct.push(name);
      intersectAllCount += Math.min(aCount, cCount);
    } else {
      exceptDistinct.push(name);
    }

    if (aCount > cCount) {
      exceptAllCount += (aCount - cCount);
    }
  }

  const topOverlapping = intersectDistinct
    .map(name => ({
      name,
      actorCount: actorCounts.get(name) || 0,
      customerCount: customerCounts.get(name) || 0,
    }))
    .sort((a, b) => (b.actorCount + b.customerCount) - (a.actorCount + a.customerCount))
    .slice(0, 10);

  return {
    actorTotalRows: ACTORS_DATA.length,
    actorDistinctNames: actorCounts.size,
    customerTotalRows: CUSTOMERS_DATA.length,
    customerDistinctNames: customerCounts.size,
    unionDistinctCount: allDistinct.size,
    unionAllCount: ACTORS_DATA.length + CUSTOMERS_DATA.length,
    intersectDistinctCount: intersectDistinct.length,
    intersectAllCount,
    exceptDistinctCount: exceptDistinct.length,
    exceptAllCount,
    topOverlappingNames: topOverlapping,
  };
}

export function executeScenario(scenarioId: number, dialect: QueryDialect = 'mysql_8_native'): ExecutionResult {
  const start = performance.now();
  const scenario = SCENARIOS.find(s => s.id === scenarioId);
  if (!scenario) {
    throw new Error(`Senaryo ID ${scenarioId} bulunamadı.`);
  }

  const queryCode = dialect === 'mysql_8_native' ? scenario.mysql8Sql : scenario.mysqlClassicSql;

  const actorCounts = new Map<string, number>();
  for (const a of ACTORS_DATA) {
    actorCounts.set(a.first_name, (actorCounts.get(a.first_name) || 0) + 1);
  }

  const customerCounts = new Map<string, number>();
  for (const c of CUSTOMERS_DATA) {
    customerCounts.set(c.first_name, (customerCounts.get(c.first_name) || 0) + 1);
  }

  let resultRows: { first_name: string; actor_count: number; customer_count: number; total_occurrences: number }[] = [];
  let summaryText = '';

  switch (scenarioId) {
    case 1: {
      // 1. UNION (Tekrarsız Tüm Veriler)
      const distinctNames = new Set<string>([...actorCounts.keys(), ...customerCounts.keys()]);
      const sorted = Array.from(distinctNames).sort((a, b) => a.localeCompare(b));
      resultRows = sorted.map(name => ({
        first_name: name,
        actor_count: actorCounts.get(name) || 0,
        customer_count: customerCounts.get(name) || 0,
        total_occurrences: (actorCounts.get(name) || 0) + (customerCounts.get(name) || 0),
      }));
      summaryText = `actor ve customer tablolarındaki tüm farklı isimler birleştirildi (DISTINCT UNION). Toplam ${resultRows.length} tekil satır sıralandı.`;
      break;
    }

    case 2: {
      // 2. INTERSECT (Tekrarsız Kesişen Veriler)
      const commonNames: string[] = [];
      for (const name of actorCounts.keys()) {
        if (customerCounts.has(name)) {
          commonNames.push(name);
        }
      }
      commonNames.sort((a, b) => a.localeCompare(b));
      resultRows = commonNames.map(name => ({
        first_name: name,
        actor_count: actorCounts.get(name) || 0,
        customer_count: customerCounts.get(name) || 0,
        total_occurrences: (actorCounts.get(name) || 0) + (customerCounts.get(name) || 0),
      }));
      summaryText = `Hem actor hem de customer tablosunda ortak geçen ${resultRows.length} farklı isim listelendi (INTERSECT DISTINCT).`;
      break;
    }

    case 3: {
      // 3. EXCEPT (İlk Tabloda Olup İkincide Olmayanlar - Tekrarsız)
      const actorOnlyNames: string[] = [];
      for (const name of actorCounts.keys()) {
        if (!customerCounts.has(name)) {
          actorOnlyNames.push(name);
        }
      }
      actorOnlyNames.sort((a, b) => a.localeCompare(b));
      resultRows = actorOnlyNames.map(name => ({
        first_name: name,
        actor_count: actorCounts.get(name) || 0,
        customer_count: 0,
        total_occurrences: actorCounts.get(name) || 0,
      }));
      summaryText = `Sadece actor tablosunda bulunup hiçbir customer kaydında geçmeyen ${resultRows.length} tekil isim sıralandı (EXCEPT DISTINCT).`;
      break;
    }

    case 4: {
      // 4. UNION ALL (Tekrarlar Dahil Tüm Veriler)
      const allRows: string[] = [];
      for (const a of ACTORS_DATA) allRows.push(a.first_name);
      for (const c of CUSTOMERS_DATA) allRows.push(c.first_name);
      allRows.sort((a, b) => a.localeCompare(b));

      resultRows = allRows.map(name => ({
        first_name: name,
        actor_count: actorCounts.get(name) || 0,
        customer_count: customerCounts.get(name) || 0,
        total_occurrences: (actorCounts.get(name) || 0) + (customerCounts.get(name) || 0),
      }));
      summaryText = `actor (200 satır) ve customer (599 satır) tablolarındaki tüm isimler tekilleştirme yapılmaksızın sıralandı. Toplam ${resultRows.length} satır (UNION ALL).`;
      break;
    }

    case 5: {
      // 5. INTERSECT ALL (Tekrarlar Dahil Kesişen Veriler)
      // SQL Standart Multiset Kesişim: min(count_A, count_B)
      const intersectedAll: string[] = [];
      const sortedCommon = Array.from(actorCounts.keys()).sort((a, b) => a.localeCompare(b));

      for (const name of sortedCommon) {
        if (customerCounts.has(name)) {
          const aCount = actorCounts.get(name) || 0;
          const cCount = customerCounts.get(name) || 0;
          const minFreq = Math.min(aCount, cCount);
          for (let i = 0; i < minFreq; i++) {
            intersectedAll.push(name);
          }
        }
      }

      resultRows = intersectedAll.map(name => ({
        first_name: name,
        actor_count: actorCounts.get(name) || 0,
        customer_count: customerCounts.get(name) || 0,
        total_occurrences: Math.min(actorCounts.get(name) || 0, customerCounts.get(name) || 0),
      }));
      summaryText = `Her iki tabloda da bulunan ortak isimler frekans korumalı olarak listelendi (min(actor_count, customer_count)). Toplam ${resultRows.length} satır (INTERSECT ALL).`;
      break;
    }

    case 6: {
      // 6. EXCEPT ALL (Tekrarlar Dahil İlk Tabloda Olup İkincide Olmayanlar)
      // SQL Standart Multiset Fark: max(0, count_A - count_B)
      const exceptAll: string[] = [];
      const sortedActors = Array.from(actorCounts.keys()).sort((a, b) => a.localeCompare(b));

      for (const name of sortedActors) {
        const aCount = actorCounts.get(name) || 0;
        const cCount = customerCounts.get(name) || 0;
        const diff = aCount - cCount;
        if (diff > 0) {
          for (let i = 0; i < diff; i++) {
            exceptAll.push(name);
          }
        }
      }

      resultRows = exceptAll.map(name => ({
        first_name: name,
        actor_count: actorCounts.get(name) || 0,
        customer_count: customerCounts.get(name) || 0,
        total_occurrences: Math.max(0, (actorCounts.get(name) || 0) - (customerCounts.get(name) || 0)),
      }));
      summaryText = `actor tablosundaki isim frekansından customer tablosundaki frekans çıkartılarak fazlalıklar korundu (max(0, count_A - count_B)). Toplam ${resultRows.length} satır (EXCEPT ALL).`;
      break;
    }

    default:
      break;
  }

  const duration = performance.now() - start;
  const distinctCount = new Set(resultRows.map(r => r.first_name)).size;

  return {
    scenarioId,
    queryExecuted: queryCode,
    dialectUsed: dialect,
    rows: resultRows,
    totalRows: resultRows.length,
    distinctCount,
    executionTimeMs: Math.round(duration * 100) / 100,
    summaryText,
  };
}

// User Custom SQL parser and runner for basic DVD rental queries
export function executeCustomSql(sql: string): ExecutionResult {
  const start = performance.now();
  const trimmed = sql.trim().replace(/;+$/, '');
  const upper = trimmed.toUpperCase();

  const actorCounts = new Map<string, number>();
  for (const a of ACTORS_DATA) {
    actorCounts.set(a.first_name, (actorCounts.get(a.first_name) || 0) + 1);
  }

  const customerCounts = new Map<string, number>();
  for (const c of CUSTOMERS_DATA) {
    customerCounts.set(c.first_name, (customerCounts.get(c.first_name) || 0) + 1);
  }

  // Detect which operation is intended
  if (upper.includes('UNION ALL')) {
    return executeScenario(4, 'mysql_8_native');
  } else if (upper.includes('INTERSECT ALL')) {
    return executeScenario(5, 'mysql_8_native');
  } else if (upper.includes('EXCEPT ALL')) {
    return executeScenario(6, 'mysql_8_native');
  } else if (upper.includes('UNION')) {
    return executeScenario(1, 'mysql_8_native');
  } else if (upper.includes('INTERSECT')) {
    return executeScenario(2, 'mysql_8_native');
  } else if (upper.includes('EXCEPT')) {
    return executeScenario(3, 'mysql_8_native');
  } else if (upper.includes('LEFT JOIN') && (upper.includes('IS NULL') || upper.includes('WHERE'))) {
    return executeScenario(3, 'mysql_classic');
  } else if (upper.includes('INNER JOIN') || (upper.includes('JOIN') && upper.includes('CUSTOMER'))) {
    return executeScenario(2, 'mysql_classic');
  }

  // Simple filter on actor or customer
  if (upper.includes('FROM ACTOR') && !upper.includes('FROM CUSTOMER')) {
    let rows = ACTORS_DATA.map(a => a.first_name);
    if (upper.includes('DISTINCT')) {
      rows = Array.from(new Set(rows));
    }
    rows.sort((a, b) => a.localeCompare(b));
    const resultRows = rows.map(name => ({
      first_name: name,
      actor_count: actorCounts.get(name) || 0,
      customer_count: customerCounts.get(name) || 0,
      total_occurrences: actorCounts.get(name) || 0,
    }));
    const duration = performance.now() - start;
    return {
      queryExecuted: sql,
      dialectUsed: 'mysql_8_native',
      rows: resultRows,
      totalRows: resultRows.length,
      distinctCount: new Set(resultRows.map(r => r.first_name)).size,
      executionTimeMs: Math.round(duration * 100) / 100,
      summaryText: `actor tablosundan ${resultRows.length} satır listelendi.`,
    };
  }

  if (upper.includes('FROM CUSTOMER') && !upper.includes('FROM ACTOR')) {
    let rows = CUSTOMERS_DATA.map(c => c.first_name);
    if (upper.includes('DISTINCT')) {
      rows = Array.from(new Set(rows));
    }
    rows.sort((a, b) => a.localeCompare(b));
    const resultRows = rows.map(name => ({
      first_name: name,
      actor_count: actorCounts.get(name) || 0,
      customer_count: customerCounts.get(name) || 0,
      total_occurrences: customerCounts.get(name) || 0,
    }));
    const duration = performance.now() - start;
    return {
      queryExecuted: sql,
      dialectUsed: 'mysql_8_native',
      rows: resultRows,
      totalRows: resultRows.length,
      distinctCount: new Set(resultRows.map(r => r.first_name)).size,
      executionTimeMs: Math.round(duration * 100) / 100,
      summaryText: `customer tablosundan ${resultRows.length} satır listelendi.`,
    };
  }

  // Fallback to Scenario 1
  return executeScenario(1, 'mysql_8_native');
}
