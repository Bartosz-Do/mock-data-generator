import { Ok } from "@/types/generator";

export default function buildUserQuery(data: Ok): string {
  const tableName = data.value[0].hasOwnProperty("authorId") ? "posts" : "users";

  const columns = Object.keys(data.value[0]).join(", ");
  const values = data.value
    .map((row) => `(${Object.values(row).map((value) => `"${value}"`).join(", ")})`)
    .join(",\n");
  return `INSERT INTO ${tableName} (${columns}) VALUES\n${values};`;
}
