import { UserArgs, GeneratorResponse } from "../../types/generator";
import { FieldCategory } from "./generatorFields";
import { faker } from "@faker-js/faker";
import { z } from "zod";

const schema = z.object({
  count: z.number().int().min(1).max(300),
  seed: z.number().int().min(1).optional()
});

export function generateData({ count, fields, seed }: UserArgs): GeneratorResponse {
  const result = schema.safeParse({ count, seed });
  if (!result.success) {
    return {
      ok: false,
      error: result.error.message,
    };
  }

  faker.seed(seed);

  const data: Record<string, string>[] = [];

  fields.forEach(field => {
    const category = FieldCategory[field];
    if (!category) {
      return;
    }

    for (let i = 0; i < count; i++) {
      if (!data[i]) {
        data[i] = {};
      }
      data[i][field] = (faker as unknown as Record<string, Record<string, () => string>>)[category][field]();
    }
  });

  return {
    ok: true,
    value: data,
  };
}
