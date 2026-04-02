"use client";
import { UsersGeneratorContext } from "./template";
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

export default function UsersGeneratorPage() {
  const {
    name: isName,
    surname: isSurname,
    username: isUsername,
    avatar: isAvatar,
    email: isEmail,
    password: isPassword,
    count,
    seed,
    isSeedEnabled,
  } = useContext(UsersGeneratorContext);

  const { isLoading, refetch, data, error } = useFetch();

  const jsonText = useMemo<string>(() => {
    const jsonString = JSON.stringify(data?.data ?? [], null, 2);
    return jsonString;
  }, [data]);

  const sqlText = useMemo<string>(() => {
    const sqlString = buildQuery(data?.data ?? []);
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
      count, fields: [
        isName ? "name" : "",
        isSurname ? "surname" : "",
        isUsername ? "username" : "",
        isAvatar ? "avatar" : "",
        isEmail ? "email" : "",
        isPassword ? "password" : "",
      ], seed: isSeedEnabled ? seed : undefined
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
