"use server";
import { faker } from "@faker-js/faker";
import { GeneratorArgs } from "../types/generator";
// config start
const errorSuccess = 0; // "Data generated successfully.";
const errorInvalidFields = 1; // "Invalid fields selected.";
const errorInvalidCount = 2; // "Invalid count, must be between 1 and 300.";

const availableFields = 6; // 6 fields: name, surname, username, email, password, avatar

const generators = [
  {
    flag: 1 << 0,
    key: "name",
    generator: () => faker.person.firstName(),
  },
  {
    flag: 1 << 1,
    key: "surname",
    generator: () => faker.person.lastName(),
  },
  {
    flag: 1 << 2,
    key: "username",
    generator: () => faker.internet.username(),
  },
  {
    flag: 1 << 3,
    key: "avatar",
    generator: () => faker.image.avatar(),
  },
  {
    flag: 1 << 4,
    key: "email",
    generator: () => faker.internet.email(),
  },
  {
    flag: 1 << 5,
    key: "password",
    generator: () => faker.internet.password(),
  },
];
// config end

export async function generateData({ count, fields, seed }: GeneratorArgs): Promise<{
  result: number;
  data: Record<string, string>[];
}> {
  let returnCode = errorSuccess;

  if (count > 300 || count < 1) {
    console.error("Count is invalid: ", count);
    returnCode = errorInvalidCount;
  }

  if (seed !== undefined) {
    faker.seed(seed);
  }

  const data: Record<string, string>[] = [];

  if (typeof fields === "number") {
    if (fields >= 2 ** availableFields || fields < 1) {
      console.error("Invalid fields number: ", fields);
      returnCode = errorInvalidFields;
    }

    for (let i = 0; i < count; i++) {
      const record: Record<string, string> = {};
      generators.forEach(({ flag, key, generator }) => {
        if (Math.floor(fields) & flag) {
          record[key] = generator();
        }
      });
      data.push(record);
    }
  } else if (Array.isArray(fields)) {
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
  } else {
    console.error("Invalid fields type: ", fields);
    returnCode = errorInvalidFields;
  }

  return {
    result: returnCode,
    data: data,
  };
}
