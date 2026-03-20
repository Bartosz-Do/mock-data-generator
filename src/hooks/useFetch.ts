import { useState } from "react";
import { GeneratorArgs, GeneratorResponse } from "@/types/generator";

export function useFetch() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<GeneratorResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const refetch = async ({ count, fields, seed }: GeneratorArgs) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ count, fields, seed }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, refetch, data, error };
}
