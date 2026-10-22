export type ProgrammingLanguage = 'csharp' | 'java' | 'typescript' | 'cpp';

export interface ConstructorOverload {
  id: string;
  signature: string;
  name: string;
  description: string;
  params: {
    name: string;
    type: string;
    defaultVal: string;
    description: string;
  }[];
  codeExample: Record<ProgrammingLanguage, string>;
  resultState: {
    ad: string | null;
    yas: number;
    kayitliMi: boolean;
    bakiye: number;
  };
}

export interface SimulationStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  codeLine: string;
  explanation: string;
  stackState: {
    variableName: string;
    pointerAddress: string | null;
    status: 'unallocated' | 'allocated' | 'assigned';
  };
  heapState: {
    address: string;
    allocated: boolean;
    fields: {
      key: string;
      label: string;
      type: string;
      value: string;
      isDefault: boolean;
      isHighlighted: boolean;
    }[];
  };
  phase: 'idle' | 'stack' | 'heap_alloc' | 'defaults' | 'constructor_body' | 'pointer_bind';
}

export interface QuizQuestion {
  id: number;
  question: string;
  codeSnippet?: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}

export interface PitfallItem {
  id: string;
  title: string;
  description: string;
  badCode: string;
  badReason: string;
  goodCode: string;
  goodReason: string;
}
