export interface UserArgs {
  count: number;
  fields: string[];
  seed?: number;
}
export type Column = {
  colName: string;
  colValue: string;
};

export interface GeneratorSettings {
  columns: Column[];
  count: number;
  seed: number;
  isSeedEnabled: boolean;
}

export interface PostArgs {
  count: number;
  seed?: number;
}

export interface Ok {
  ok: true;
  value: Record<string, string>[];
}

export interface Err {
  ok: false;
  error: string;
}

export type GeneratorResponse = Ok | Err;
