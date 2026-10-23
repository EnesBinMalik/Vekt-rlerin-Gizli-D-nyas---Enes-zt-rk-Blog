export type JoinType = 'LEFT JOIN' | 'RIGHT JOIN' | 'FULL JOIN' | 'INNER JOIN';

export interface SqlScenario {
  id: 'scenario-1' | 'scenario-2' | 'scenario-3';
  title: string;
  joinType: JoinType;
  subtitle: string;
  description: string;
  leftTable: string;
  rightTable: string;
  onCondition: string;
  selectFields: string;
  sqlQuery: string;
  explanation: {
    summary: string;
    whyThisJoin: string;
    conditionDetail: string;
    nullBehavior: string;
    practicalUse: string;
  };
}

export interface TableColumn {
  name: string;
  type: string;
  isPk?: boolean;
  isFk?: boolean;
  fkTarget?: string;
  description: string;
}

export interface TableSchema {
  name: string;
  description: string;
  columns: TableColumn[];
  rowCount: number;
}
