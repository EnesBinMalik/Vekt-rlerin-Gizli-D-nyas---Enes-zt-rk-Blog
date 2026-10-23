export interface Actor {
  actor_id: number;
  first_name: string;
  last_name: string;
  last_update: string;
}

export interface Customer {
  customer_id: number;
  store_id: number;
  first_name: string;
  last_name: string;
  email: string;
  active: number;
  create_date: string;
}

export type QueryDialect = 'mysql_8_native' | 'mysql_classic';

export interface ScenarioDefinition {
  id: number;
  title: string;
  category: 'distinct' | 'all';
  operationName: string;
  shortDescription: string;
  mathematicalNotation: string;
  vennType: 'union' | 'intersect' | 'except' | 'union_all' | 'intersect_all' | 'except_all';
  mysql8Sql: string;
  mysqlClassicSql: string;
  explanation: string;
  theoryNotes: string[];
}

export interface ExecutionResult {
  scenarioId?: number;
  queryExecuted: string;
  dialectUsed: QueryDialect;
  rows: { first_name: string; actor_count?: number; customer_count?: number; total_occurrences?: number }[];
  totalRows: number;
  distinctCount: number;
  executionTimeMs: number;
  summaryText: string;
}
