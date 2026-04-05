import { useState, useCallback } from "react";
import { UserArgs, GeneratorResponse } from "@/types/generator";
import { generateData } from "@/utilities/generator/dataGenerator";

export function useGenerateData() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<GeneratorResponse | null>(null);

  const refetch = useCallback(({ count, fields, seed }: UserArgs) => {
    if (Array.isArray(fields) && fields.length === 0) {
      setData({ ok: true, value: [] });
      return;
    }
    setIsLoading(true);
    const result: GeneratorResponse = generateData({ count, fields, seed });
    setData(result);
    setIsLoading(false);
  }, []);

  return { isLoading, refetch, data };
}
