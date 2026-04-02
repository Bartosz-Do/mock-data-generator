"use client";
import { UsersGeneratorContext, columnsTable } from "./template";
import { useContext, useMemo, useState } from "react";
import SwitchSection from "@/components/switch-section";
import { useFetch } from "@/hooks/useFetch";
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

  /*
  [
    {
      "colName": "value",
      "colValue": 0
    }
  ]

  [
    {
      "name": "value",
      "surname": "value",
      "username": "value",
      "avatar": "value",
      "email": "value",
      "password": "value"
    }
  ]
  */

  const { isLoading, refetch, data, error } = useFetch();

  const columnsValues = useMemo<string[]>(() => {
    return columns.map((column) => column.colName ? columnsTable[column.colValue] : "");
  }, [columns, columnsTable]);


  const jsonText = useMemo<string>(() => {
    if (!data?.data) {
      return "";
    }
    let dataWithUserColumns: Record<string, string>[] = data.data.map((el) => {
      let obj: Record<string, string> = {};
      columns.forEach((column: Column) => {
        obj[column.colName] = el[columnsTable[column.colValue]];
      });
      return obj;
    });
    const jsonString = JSON.stringify(dataWithUserColumns, null, 2);
    return jsonString;
  }, [data]);

  const sqlText = useMemo<string>(() => {
    if (!data?.data) {
      return "";
    }
    let dataWithUserColumns: Record<string, string>[] = data.data.map((el) => {
      let obj: Record<string, string> = {};
      columns.forEach((column: Column) => {
        obj[column.colName] = el[columnsTable[column.colValue]];
      });
      return obj;
    });
    const sqlString = buildQuery(dataWithUserColumns);
    return sqlString;
  }, [data]);
  const [isCopied, setIsCopied] = useState<boolean>(false);


  const highlightedJson = useMemo(() => {
    return Prism.highlight(jsonText, Prism.languages.json, "json");
  }, [jsonText]);

  const highlightedSql = useMemo(() => {
    return Prism.highlight(sqlText, Prism.languages.sql, "sql");
  }, [sqlText]);

  const handleGenerate = () => {
    refetch({
      count, fields: columnsValues, seed: isSeedEnabled ? seed : undefined
    })
  };
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

      <Button variant="primary" onClick={handleGenerate} disabled={isLoading} className="mt-4">Generate</Button>

      <SwitchSection className="mt-2">
        <div id="json">
          <div className="code">
            <Button onClick={copyJson} className={cn("copy", { "display-none": highlightedJson === "" })}>
              <Icon name="copy" className="size-xs" />
              Copy
              <div className={cn("feedback", { "display-none": !isCopied })}>Copied to clipboard</div>
            </Button>
            <pre>
              <code
                className="language-json"
                dangerouslySetInnerHTML={{ __html: highlightedJson }}
              />
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
              <code
                className="language-sql"
                dangerouslySetInnerHTML={{ __html: highlightedSql }}
              />
            </pre>
          </div>
        </div >
      </SwitchSection >
    </>
  );
}
