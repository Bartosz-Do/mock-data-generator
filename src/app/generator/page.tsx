"use client";
import { UsersGeneratorContext } from "./template";
import { useContext, useMemo, useEffect } from "react";
import * as Prism from "prismjs";
import "prismjs/components/prism-sql";
import buildQuery from "@/utilities/buildQuery";
import { cn } from "@/utilities";
import { Column } from "@/types/generator";
import { useGenerateData } from "@/hooks/useGenerateData";
import { CodeGroup } from "@prose-ui/next";

export default function UsersGeneratorPage() {
  const { columns, count, seed, isSeedEnabled } = useContext(UsersGeneratorContext);

  const { isLoading, refetch, data } = useGenerateData();

  const fields = useMemo(() => {
    const validColumns = columns.filter((col) => col.colName.trim() !== "");
    return validColumns.map((col) => col.colValue);
  }, [columns]);

  useEffect(() => {
    refetch({
      count,
      fields,
      seed: isSeedEnabled ? seed : undefined,
    });
  }, [fields, count, seed, isSeedEnabled, refetch]);

  const dataWithUserColumns = useMemo<Record<string, string>[]>(() => {
    if (!data?.ok) {
      return [];
    }

    return data.value.map((row) => {
      const obj: Record<string, string> = {};
      columns.forEach((column: Column) => {
        const sourceKey = column.colValue;
        const targetKey = column.colName.trim();
        if (!targetKey) {
          return;
        }
        obj[targetKey] = row[sourceKey] ?? "";
      });
      return obj;
    });
  }, [data, columns]);

  const jsonText = useMemo<string>(() => {
    if (!data) {
      return "";
    }
    if (!data.ok) {
      return data.error;
    }
    return JSON.stringify(dataWithUserColumns, null, 2);
  }, [data, dataWithUserColumns]);

  const sqlText = useMemo<string>(() => {
    if (!data?.ok || dataWithUserColumns.length === 0) {
      return "";
    }
    return buildQuery({ ok: true, value: dataWithUserColumns });
  }, [data, dataWithUserColumns]);

  const highlightedJson = useMemo(() => {
    const test = Prism.highlight(jsonText, Prism.languages.javascript, "javascript");
    return `<pre><code>${test.split('\n').reduce((acc, line) => {
      return acc + `<span class="line">${line}</span>`;
    }, '')}</code></pre>`;
  }, [jsonText]);

  const highlightedSql = useMemo(() => {
    const test = Prism.highlight(sqlText, Prism.languages.sql, "sql");
    return `<pre><code>${test.split('\n').reduce((acc, line) => {
      return acc + `<span class="line">${line}</span>`;
    }, '')}</code></pre>`;
  }, [sqlText]);

  return (
    <>
      <h1>Random users generator</h1>
      <p>You can choose what gets generated in the settings.</p>
      <h3 className={cn("mt-4")}>{isLoading ? "Loading..." : "Up to date!"}</h3>
      <div className="prose-ui">
        <CodeGroup tabs={[{
          title: "Code",
          variants: {
            json: {
              code: jsonText,
              highlightedCode: highlightedJson,
            },
            sql: {
              code: sqlText,
              highlightedCode: highlightedSql,
            },
          },
        }]} languages={[{ value: "json", label: "JSON" }, { value: "sql", label: "SQL" }]} />
      </div>
    </>
  );
}
