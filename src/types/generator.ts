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
