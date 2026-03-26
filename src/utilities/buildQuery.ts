export default function buildQuery(data: Record<string, string>[]): string {
  if (data.length === 0) {
    return "";
  }

  const columns = Object.keys(data[0]).join(", ");
  const values = data
    .map((row) => `(${Object.values(row).map((value) => `"${value}"`).join(", ")})`)
    .join(",\n");
  return `INSERT INTO users (${columns}) VALUES\n${values};`;
}
