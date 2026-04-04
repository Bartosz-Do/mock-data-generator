"use client";
import { UsersGeneratorContext } from "./template";
import { useContext, useMemo } from "react";
import SwitchSection from "@/components/switch-section";
import { useFetchPosts } from "@/hooks/useFetchPosts";
import { Button } from "@/components/ui";
import * as Prism from "prismjs";
import "prismjs/components/prism-json";
import "prismjs/components/prism-sql";
import buildQuery from "@/utilities/buildQuery";

export default function UsersGeneratorPage() {
  const {
    count,
    seed,
  } = useContext(UsersGeneratorContext);

  const { isLoading, refetch, data } = useFetchPosts();

  const highlightedJson = useMemo(() => {
    if (!data) return "[]";
    if (!data.ok) return Prism.highlight(data.error, Prism.languages.json, "json");
    const jsonString = JSON.stringify(data.value, null, 2);
    return Prism.highlight(jsonString, Prism.languages.json, "json");
  }, [data]);

  const highlightedSql = useMemo(() => {
    if (!data) return "";
    if (!data.ok) return Prism.highlight(data.error, Prism.languages.json, "json");
    const sqlString = buildQuery(data);
    return Prism.highlight(sqlString, Prism.languages.sql, "sql");
  }, [data]);

  const handleGenerate = () => {
    refetch({ count, seed });
  }

  return (
    <>
      <h1>Random posts generator</h1>

      <Button variant="primary" onClick={handleGenerate} disabled={isLoading}>Generate</Button>

      <SwitchSection className="mt-2">
        <div id="json">
          <pre>
            <code
              className="language-json"
              dangerouslySetInnerHTML={{ __html: highlightedJson }}
            />
          </pre>
        </div>

        <div id="sql">
          <pre>
            <code
              className="language-sql"
              dangerouslySetInnerHTML={{ __html: highlightedSql }}
            />
          </pre>
        </div>
      </SwitchSection>
    </>
  );
}
