import { Employee, QueryResult } from '../types/database';

export function executeSql(
  query: string,
  employees: Employee[],
  setEmployees: (updater: (prev: Employee[]) => Employee[]) => void
): QueryResult {
  const startTime = performance.now();
  const cleanQuery = query.trim().replace(/;$/, '');
  const timestamp = new Date().toLocaleTimeString();

  if (!cleanQuery) {
    return {
      success: false,
      message: 'Hata: Boş bir sorgu çalıştırılamaz.',
      executionTimeMs: 0,
      executedSql: query,
      timestamp
    };
  }

  // Handle comments
  const lines = cleanQuery.split('\n');
  const activeSql = lines
    .map(line => line.trim())
    .filter(line => !line.startsWith('--') && !line.startsWith('#'))
    .join(' ')
    .trim();

  if (!activeSql) {
    return {
      success: true,
      message: 'Sorgu yorum satırından oluşuyor. İşlem yapılmadı.',
      executionTimeMs: Number((performance.now() - startTime).toFixed(2)),
      executedSql: query,
      timestamp
    };
  }

  const upper = activeSql.toUpperCase();

  // SHOW DATABASES
  if (upper.startsWith('SHOW DATABASES')) {
    return {
      success: true,
      message: '5 rows in set',
      headers: ['Database'],
      data: [
        { Database: 'information_schema' },
        { Database: 'mysql' },
        { Database: 'performance_schema' },
        { Database: 'sys' },
        { Database: 'test' }
      ],
      executionTimeMs: Number((performance.now() - startTime).toFixed(2)),
      executedSql: cleanQuery,
      timestamp
    };
  }

  // SHOW TABLES
  if (upper.startsWith('SHOW TABLES')) {
    return {
      success: true,
      message: '1 row in set',
      headers: ['Tables_in_test'],
      data: [{ Tables_in_test: 'employee' }],
      executionTimeMs: Number((performance.now() - startTime).toFixed(2)),
      executedSql: cleanQuery,
      timestamp
    };
  }

  // DESCRIBE or DESC employee
  if (upper.startsWith('DESC') || upper.startsWith('DESCRIBE')) {
    return {
      success: true,
      message: '4 rows in set',
      headers: ['Field', 'Type', 'Null', 'Key', 'Default', 'Extra'],
      data: [
        { Field: 'id', Type: 'int', Null: 'NO', Key: 'PRI', Default: 'NULL', Extra: 'auto_increment' },
        { Field: 'name', Type: 'varchar(50)', Null: 'NO', Key: '', Default: 'NULL', Extra: '' },
        { Field: 'birthday', Type: 'date', Null: 'NO', Key: '', Default: 'NULL', Extra: '' },
        { Field: 'email', Type: 'varchar(100)', Null: 'NO', Key: 'UNI', Default: 'NULL', Extra: '' }
      ],
      executionTimeMs: Number((performance.now() - startTime).toFixed(2)),
      executedSql: cleanQuery,
      timestamp
    };
  }

  // USE test
  if (upper.startsWith('USE ')) {
    return {
      success: true,
      message: 'Database changed to "test".',
      executionTimeMs: Number((performance.now() - startTime).toFixed(2)),
      executedSql: cleanQuery,
      timestamp
    };
  }

  // CREATE TABLE / DATABASE
  if (upper.startsWith('CREATE ')) {
    return {
      success: true,
      message: 'Query OK, 0 rows affected (0.01 sec)',
      affectedRows: 0,
      executionTimeMs: Number((performance.now() - startTime).toFixed(2)),
      executedSql: cleanQuery,
      timestamp
    };
  }

  // SELECT queries
  if (upper.startsWith('SELECT')) {
    // SELECT COUNT(*)
    if (upper.includes('COUNT(')) {
      const count = employees.length;
      return {
        success: true,
        message: '1 row in set',
        headers: ['toplam_calisan_sayisi'],
        data: [{ toplam_calisan_sayisi: count }],
        executionTimeMs: Number((performance.now() - startTime).toFixed(2)),
        executedSql: cleanQuery,
        timestamp
      };
    }

    let filtered = [...employees];

    // Filter by WHERE
    const whereMatch = activeSql.match(/WHERE\s+(.+?)(?:\s+ORDER\s+BY|\s+LIMIT|$)/i);
    if (whereMatch) {
      const whereClause = whereMatch[1].trim();
      filtered = evaluateWhere(filtered, whereClause);
    }

    // ORDER BY
    const orderMatch = activeSql.match(/ORDER\s+BY\s+(\w+)(?:\s+(ASC|DESC))?/i);
    if (orderMatch) {
      const col = orderMatch[1].toLowerCase() as keyof Employee;
      const isDesc = (orderMatch[2] || 'ASC').toUpperCase() === 'DESC';
      filtered.sort((a, b) => {
        if (a[col] < b[col]) return isDesc ? 1 : -1;
        if (a[col] > b[col]) return isDesc ? -1 : 1;
        return 0;
      });
    }

    // LIMIT
    const limitMatch = activeSql.match(/LIMIT\s+(\d+)/i);
    if (limitMatch) {
      const limit = parseInt(limitMatch[1], 10);
      filtered = filtered.slice(0, limit);
    }

    return {
      success: true,
      message: `${filtered.length} row(s) in set`,
      headers: ['id', 'name', 'birthday', 'email'],
      data: filtered,
      executionTimeMs: Number((performance.now() - startTime).toFixed(2)),
      executedSql: cleanQuery,
      timestamp
    };
  }

  // UPDATE queries
  if (upper.startsWith('UPDATE')) {
    const tableMatch = activeSql.match(/UPDATE\s+(\w+)\s+SET\s+(.+?)(?:\s+WHERE\s+(.+))?$/i);
    if (!tableMatch) {
      return {
        success: false,
        message: 'MySQL Sözdizimi Hatası: UPDATE deyimi hatalı biçimlendirilmiş.',
        executionTimeMs: Number((performance.now() - startTime).toFixed(2)),
        executedSql: cleanQuery,
        timestamp
      };
    }

    const setClause = tableMatch[2];
    const whereClause = tableMatch[3];

    let affected = 0;

    setEmployees(prev => {
      const updated = prev.map(emp => {
        if (!whereClause || testRow(emp, whereClause)) {
          affected++;
          const newEmp = { ...emp };
          applySet(newEmp, setClause);
          return newEmp;
        }
        return emp;
      });
      return updated;
    });

    return {
      success: true,
      message: `Query OK, ${affected} row(s) affected. Changed: ${affected} Warnings: 0`,
      affectedRows: affected,
      executionTimeMs: Number((performance.now() - startTime).toFixed(2)),
      executedSql: cleanQuery,
      timestamp
    };
  }

  // DELETE queries
  if (upper.startsWith('DELETE')) {
    const whereMatch = activeSql.match(/WHERE\s+(.+)$/i);
    const whereClause = whereMatch ? whereMatch[1] : null;

    let affected = 0;

    setEmployees(prev => {
      const filtered = prev.filter(emp => {
        if (!whereClause || testRow(emp, whereClause)) {
          affected++;
          return false; // delete this row
        }
        return true;
      });
      return filtered;
    });

    return {
      success: true,
      message: `Query OK, ${affected} row(s) affected`,
      affectedRows: affected,
      executionTimeMs: Number((performance.now() - startTime).toFixed(2)),
      executedSql: cleanQuery,
      timestamp
    };
  }

  // INSERT INTO queries
  if (upper.startsWith('INSERT')) {
    const valuesMatch = activeSql.match(/VALUES\s*\((.+?)\)/i);
    if (valuesMatch) {
      const parts = valuesMatch[1].split(',').map(s => s.trim().replace(/^['"]|['"]$/g, ''));
      if (parts.length >= 4) {
        const newEmp: Employee = {
          id: parseInt(parts[0], 10) || employees.length + 1,
          name: parts[1],
          birthday: parts[2],
          email: parts[3]
        };
        setEmployees(prev => [...prev, newEmp]);
        return {
          success: true,
          message: 'Query OK, 1 row affected (0.01 sec)',
          affectedRows: 1,
          executionTimeMs: Number((performance.now() - startTime).toFixed(2)),
          executedSql: cleanQuery,
          timestamp
        };
      }
    }
  }

  return {
    success: false,
    message: `MySQL Sözdizimi Hatası: Tanınmayan veya desteklenmeyen komut: "${cleanQuery.slice(0, 30)}..."`,
    executionTimeMs: Number((performance.now() - startTime).toFixed(2)),
    executedSql: cleanQuery,
    timestamp
  };
}

function evaluateWhere(employees: Employee[], whereClause: string): Employee[] {
  return employees.filter(emp => testRow(emp, whereClause));
}

function testRow(emp: Employee, whereClause: string): boolean {
  const clause = whereClause.trim();

  // OR conditions
  if (clause.includes(' OR ') || clause.includes(' or ')) {
    const parts = clause.split(/\s+OR\s+/i);
    return parts.some(part => testSingleCondition(emp, part.trim()));
  }

  // AND conditions
  if (clause.includes(' AND ') || clause.includes(' and ')) {
    const parts = clause.split(/\s+AND\s+/i);
    return parts.every(part => testSingleCondition(emp, part.trim()));
  }

  return testSingleCondition(emp, clause);
}

function testSingleCondition(emp: Employee, condition: string): boolean {
  // BETWEEN ... AND ... (e.g., id BETWEEN 8 AND 10)
  const betweenMatch = condition.match(/(\w+)\s+BETWEEN\s+(\d+)\s+AND\s+(\d+)/i);
  if (betweenMatch) {
    const col = betweenMatch[1].toLowerCase();
    const min = parseInt(betweenMatch[2], 10);
    const max = parseInt(betweenMatch[3], 10);
    if (col === 'id') {
      return emp.id >= min && emp.id <= max;
    }
  }

  // IN (...) (e.g., id IN (1, 3, 5))
  const inMatch = condition.match(/(\w+)\s+IN\s*\((.+?)\)/i);
  if (inMatch) {
    const col = inMatch[1].toLowerCase();
    const vals = inMatch[2].split(',').map(v => v.trim().replace(/['"]/g, ''));
    if (col === 'id') {
      return vals.map(Number).includes(emp.id);
    }
    if (col === 'name') {
      return vals.includes(emp.name);
    }
  }

  // LIKE operator (e.g. email LIKE '%@tempmail.com')
  const likeMatch = condition.match(/(\w+)\s+LIKE\s+['"](.+?)['"]/i);
  if (likeMatch) {
    const col = likeMatch[1].toLowerCase() as keyof Employee;
    const pattern = likeMatch[2];
    const val = String(emp[col] || '');
    if (pattern.startsWith('%') && pattern.endsWith('%')) {
      const sub = pattern.slice(1, -1);
      return val.toLowerCase().includes(sub.toLowerCase());
    }
    if (pattern.startsWith('%')) {
      const suffix = pattern.slice(1);
      return val.toLowerCase().endsWith(suffix.toLowerCase());
    }
    if (pattern.endsWith('%')) {
      const prefix = pattern.slice(0, -1);
      return val.toLowerCase().startsWith(prefix.toLowerCase());
    }
    return val.toLowerCase() === pattern.toLowerCase();
  }

  // Equality: col = 'val' or col = num
  const eqMatch = condition.match(/(\w+)\s*=\s*['"]?([^'"]+?)['"]?$/);
  if (eqMatch) {
    const col = eqMatch[1].toLowerCase() as keyof Employee;
    const expected = eqMatch[2].trim();
    if (col === 'id') {
      return emp.id === parseInt(expected, 10);
    }
    return String(emp[col]).trim() === expected;
  }

  // Inequality: birthday < '1975-01-01' or id < 10
  const ltMatch = condition.match(/(\w+)\s*<\s*['"]?([^'"]+?)['"]?$/);
  if (ltMatch) {
    const col = ltMatch[1].toLowerCase() as keyof Employee;
    const val = ltMatch[2].trim();
    if (col === 'id') return emp.id < parseInt(val, 10);
    return String(emp[col]) < val;
  }

  const gtMatch = condition.match(/(\w+)\s*>\s*['"]?([^'"]+?)['"]?$/);
  if (gtMatch) {
    const col = gtMatch[1].toLowerCase() as keyof Employee;
    const val = gtMatch[2].trim();
    if (col === 'id') return emp.id > parseInt(val, 10);
    return String(emp[col]) > val;
  }

  return true;
}

function applySet(emp: Employee, setClause: string): void {
  // SET col1 = 'val1', col2 = 'val2'
  const assignments = setClause.split(/,(?=(?:[^']*'[^']*')*[^']*$)/);
  for (const assign of assignments) {
    const eqIdx = assign.indexOf('=');
    if (eqIdx !== -1) {
      const col = assign.substring(0, eqIdx).trim().toLowerCase() as keyof Employee;
      let rawVal = assign.substring(eqIdx + 1).trim();

      // Handle raw string quote stripping
      if (rawVal.startsWith("'") && rawVal.endsWith("'")) {
        rawVal = rawVal.slice(1, -1).replace(/''/g, "'");
      }

      if (col === 'id') {
        emp.id = parseInt(rawVal, 10) || emp.id;
      } else if (col === 'name') {
        emp.name = rawVal;
      } else if (col === 'birthday') {
        emp.birthday = rawVal;
      } else if (col === 'email') {
        emp.email = rawVal;
      }
    }
  }
}
