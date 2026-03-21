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

export interface GeneratorSettings {
  name: boolean;
  surname: boolean;
  username: boolean;
  avatar: boolean;
  email: boolean;
  password: boolean;
}
