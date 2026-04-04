export interface UserArgs {
  count: number;
  fields: number | string[];
  seed?: number;
}

export interface PostArgs {
  count: number;
  seed?: number;
}

export interface UserSettings {
  name: boolean;
  surname: boolean;
  username: boolean;
  avatar: boolean;
  email: boolean;
  password: boolean;
  count: number;
  seed: number | undefined;
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
