import { useState } from "react";
import { UserArgs, GeneratorResponse } from "@/types/generator";

export function useFetchUsers() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<GeneratorResponse | null>(null);

  const validate = ({ count, fields, seed }: UserArgs): { ok: boolean; error?: string } => {
    if (
      typeof fields !== "number" ||
      typeof count !== "number" ||
      (seed !== undefined && typeof seed !== "number" && typeof seed !== "number")
    ) {
      return { ok: false, error: "Invalid arguments" };
    }

    if (fields < 1 || fields > 63) {
      return { ok: false, error: "No fields selected" };
    }

    if (count < 1 || count > 300) {
      return { ok: false, error: "Count must be between 1 and 300" };
    }

    return { ok: true };
  };

  const refetch = async ({ count, fields, seed }: UserArgs) => {
    const validation = validate({ count, fields });
    if (!validation.ok) {
      setData({ ok: false, error: validation.error! });
      return;
    }
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
