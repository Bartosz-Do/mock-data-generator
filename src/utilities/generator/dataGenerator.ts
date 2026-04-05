import { UserArgs, GeneratorResponse } from "../../types/generator";
import { generators } from "./generators";

export function generateData({ count, fields, seed }: UserArgs): GeneratorResponse {
  if (!/^\d+$/.test(count.toString()) || count > 300 || count < 1) {
    // console.error("Count is invalid: ", count); // dev
    return {
      ok: false,
      error: "Invalid count, must be a number between 1 and 300.",
    };
  } // .Y. //

  if (seed !== undefined && (!/^\d+$/.test(seed.toString()) || seed < 1)) {
    // console.error("Seed is invalid: ", seed); // dev
    return {
      ok: false,
      error: "Invalid seed, must be a number bigger than 1 or undefined.",
    };
  } // .Y. //

  if (!Array.isArray(fields) || fields.length === 0) {
    return {
      ok: false,
      error: "Invalid fields, must be an array with at least one field.",
    };
  } // .Y. //

  const data: Record<string, string>[] = [];

  for (let i = 0; i < count; i++) {
    const record: Record<string, string> = {};
    fields.forEach((field) => {
      const generator = generators.find((g) => g.key === field);
      if (generator) {
        record[field] = generator.generator();
      }
    });
    data.push(record);
  }

  return {
    ok: true,
    value: data,
  };
}
