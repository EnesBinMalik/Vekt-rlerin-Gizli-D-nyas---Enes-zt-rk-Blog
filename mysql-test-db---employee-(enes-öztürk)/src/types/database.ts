export interface Employee {
  id: number;
  name: string;
  birthday: string; // YYYY-MM-DD
  email: string;
}

export interface SqlOperation {
  id: string;
  number: number;
  title: string;
  targetColumn: 'id' | 'name' | 'birthday' | 'email' | 'composite';
  targetColumnLabel: string;
  description: string;
  sql: string;
  expectedEffect: string;
}

export interface QueryResult {
  success: boolean;
  message: string;
  affectedRows?: number;
  data?: Employee[] | Record<string, unknown>[];
  headers?: string[];
  executionTimeMs: number;
  executedSql: string;
  timestamp: string;
}

export interface ExecutionLog {
  id: string;
  sql: string;
  timestamp: string;
  status: 'success' | 'error';
  affectedRows: number;
  executionTimeMs: number;
  message: string;
}
