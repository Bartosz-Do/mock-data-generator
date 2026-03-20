export async function useFetch(
  count: number,
  fields: number | string[],
  seed?: number,
): Promise<{ result: number; data: Record<string, string>[] }> {
	const response = await fetch("/api/generate", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ count, fields, seed }),
	});

	return response.json();
}
