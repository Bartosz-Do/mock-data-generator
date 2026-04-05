export interface UserArgs {
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
