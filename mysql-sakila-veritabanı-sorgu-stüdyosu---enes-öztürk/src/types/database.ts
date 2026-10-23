export interface Film {
  film_id: number;
  title: string;
  description: string;
  release_year: number;
  language_id: number;
  rental_duration: number;
  rental_rate: number;
  length: number; // in minutes
  replacement_cost: number;
  rating: 'G' | 'PG' | 'PG-13' | 'R' | 'NC-17';
  special_features: string;
}

export interface Customer {
  customer_id: number;
  store_id: number;
  first_name: string;
  last_name: string;
  email: string;
  address_id: number;
  active: number;
  create_date: string;
}

export interface ColumnDefinition {
  name: string;
  type: string;
  isPrimary?: boolean;
  isNullable?: boolean;
  defaultValue?: string;
  comment?: string;
}

export interface TableDefinition {
  name: string;
  rowCount: number;
  description: string;
  columns: ColumnDefinition[];
  sampleData: Record<string, any>[];
}

export interface QueryPreset {
  id: string;
  assignmentNumber: number;
  title: string;
  userPrompt: string;
  sqlQuery: string;
  mysqlAlternative?: string;
  explanation: {
    overview: string;
    targetTable: string;
    filterCondition: string;
    sortingLogic: string;
    paginationLogic: string;
    mysqlTip: string;
  };
  keyTakeaway: string;
}

export interface QueryExecutionResult {
  columns: string[];
  rows: Record<string, any>[];
  totalMatched: number;
  executionTimeMs: number;
  query: string;
  error?: string;
}
