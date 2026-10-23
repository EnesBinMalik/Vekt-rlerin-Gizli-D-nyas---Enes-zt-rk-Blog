export type Priority = 'low' | 'medium' | 'high';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
  priority?: Priority;
  category?: string;
}

export type FilterType = 'all' | 'active' | 'completed';

export interface TodoStats {
  total: number;
  active: number;
  completed: number;
  completionRate: number;
}
