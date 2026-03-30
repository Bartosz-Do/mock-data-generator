import { useState } from "react";
import { PostArgs, GeneratorResponse } from "@/types/generator";

export function useFetchPosts() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<GeneratorResponse | null>(null);

  const refetch = async ({ count, seed }: PostArgs) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/generator/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ count, seed }),
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