export type PresetType = 'person' | 'ogrenci' | 'bank' | 'game' | 'custom';

export interface PresetModel {
  id: PresetType;
  title: string;
  subtitle: string;
  csharpCode: string;
  fieldName: string;
  fieldType: string;
  initialFieldValue: any;
  propertyName: string;
  hasValidation: boolean;
  validationDescription: string;
  testOptions: {
    validExamples: { label: string; value: any; explanation: string }[];
    invalidExamples: { label: string; value: any; explanation: string }[];
  };
  validate: (val: any) => { success: boolean; errorReason?: string; transformedVal?: any };
}

export interface SimulationStep {
  id: number;
  stage: 'idle' | 'calling' | 'guard_eval' | 'memory_write' | 'rejected' | 'memory_read';
  title: string;
  description: string;
  codeHighlightLine?: number;
  isError?: boolean;
}

export interface QuizQuestion {
  id: number;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
