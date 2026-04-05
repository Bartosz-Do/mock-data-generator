"use client";
import { UsersGeneratorContext, columnsTable } from "./template";
import { useContext, useMemo, useState, useEffect } from "react";
import SwitchSection from "@/components/switch-section";
import { useFetchUsers } from "@/hooks/useFetchUsers";
import { Button } from "@/components/ui";
import * as Prism from "prismjs";
import "prismjs/components/prism-json";
import "prismjs/components/prism-sql";
import buildQuery from "@/utilities/buildQuery";
import Icon from "@/components/ui/icon";
import { cn } from "@/utilities";
import { Column } from "@/types/generator";

export default function UsersGeneratorPage() {
  const {
    columns,
    count,
    seed,
    isSeedEnabled,
  } = useContext(UsersGeneratorContext);

  const { isLoading, refetch, data } = useFetchUsers();

  const fields = useMemo(() => {
    return columns.reduce((acc, column) => {
      if (!column.colName.trim()) {
        return acc;
      }
      return acc | (1 << column.colValue);
    }, 0);
  }, [columns]);

  useEffect(() => {
    console.log("change");
    refetch({
      count, fields, seed: isSeedEnabled ? seed : undefined,
    });
  }, [fields, count, seed, isSeedEnabled]);

  const dataWithUserColumns = useMemo<Record<string, string>[]>(() => {
    if (!data?.ok) {
      return [];
    }

    return data.value.map((row) => {
      const obj: Record<string, string> = {};
      columns.forEach((column: Column) => {
        const sourceKey = columnsTable[column.colValue];
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
  const [isCopied, setIsCopied] = useState<boolean>(false);


  const highlightedJson = useMemo(() => {
    return Prism.highlight(jsonText, Prism.languages.json, "json");
  }, [jsonText]);

  const highlightedSql = useMemo(() => {
    return Prism.highlight(sqlText, Prism.languages.sql, "sql");
  }, [sqlText]);

  const copyJson = async () => {
    try {
      await navigator.clipboard.writeText(jsonText);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch { }
  };

  const copySql = async () => {
    try {
      await navigator.clipboard.writeText(sqlText);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch { }
  };

  return (
    <>
      <h1>Random users generator</h1>
      <p>You can choose what gets generated in the settings.</p>

      <SwitchSection className="mt-2">
        <div id="json">
          <div className="code">
            <Button onClick={copyJson} className={cn("copy", { "display-none": highlightedJson === "" })}>
              <Icon name="copy" className="size-xs" />
              Copy
              <div className={cn("feedback", { "display-none": !isCopied })}>Copied to clipboard</div>
            </Button>
            <pre>
              <code className="language-json" dangerouslySetInnerHTML={{ __html: highlightedJson }} />
            </pre>
          </div>
        </div>

        <div id="sql">
          <div className="code">
            <Button onClick={copySql} className={cn("copy", { "display-none": highlightedSql === "" })}>
              <Icon name="copy" className="size-xs" />
              Copy
              <div className={cn("feedback", { "display-none": !isCopied })}>Copied to clipboard</div>
            </Button>
            <pre>
              <code className="language-sql" dangerouslySetInnerHTML={{ __html: highlightedSql }} />
            </pre>
          </div>
        </div>
      </SwitchSection>
    </>
  );
}
