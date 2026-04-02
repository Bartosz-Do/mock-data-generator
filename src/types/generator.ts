export interface GeneratorResponse {
  meta: {
    count: number;
    generatedAt: string;
    message: string;
  };
  data: Record<string, string>[];
}

export interface GeneratorArgs {
  count: number;
  fields: number | string[];
  seed?: number;
}
export type Column = {
  colName: string;
  colValue: number;
};

export interface GeneratorSettings {
  columns: Column[];
  count: number;
  seed: number;
  isSeedEnabled: boolean;
}
