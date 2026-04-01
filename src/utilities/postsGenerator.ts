import { faker } from "@faker-js/faker";
import { GeneratorResponse, PostArgs } from "@/types/generator";

export default async function generatePosts({ count, seed }: PostArgs): Promise<GeneratorResponse> {
  if (typeof count !== "number" || count > 300 || count < 1) {
    return {
      ok: false,
      error: "Invalid count, must be a number between 1 and 300.",
    };
  }

  if (seed !== undefined) {
    faker.seed(seed);
  }

  const data: Record<string, string>[] = [];

  for (let i = 0; i < count; i++) {
    const record: Record<string, string> = {};
    record["title"] = faker.hacker.phrase();
    record["content"] = faker.lorem.paragraphs();
    record["authorId"] = (i + 1).toString();
    data.push(record);
  }

  return {
    ok: true,
    value: data,
  };
}
