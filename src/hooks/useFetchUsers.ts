import { useState } from "react";
import { UserArgs, GeneratorResponse } from "@/types/generator";

export function useFetchUsers() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<GeneratorResponse | null>(null);

  const refetch = async ({ count, fields, seed }: UserArgs) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/generator/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ count, fields, seed }),
      });

      const json = await response.json();
      setData(json);
    } catch {
      setData({ ok: false, error: "Internal server error" });
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, refetch, data };
}
