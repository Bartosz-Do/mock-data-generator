"use client";
import { UsersGeneratorContext } from "./template";
import { useContext, useMemo } from "react";
import SwitchSection from "@/components/switch-section";
import { useFetchUsers } from "@/hooks/useFetchUsers";
import { Button } from "@/components/ui";
import * as Prism from "prismjs";
import "prismjs/components/prism-json";
import "prismjs/components/prism-sql";
import buildQuery from "@/utilities/buildQuery";

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
  } = useContext(UsersGeneratorContext);

  const { isLoading, refetch, data } = useFetchUsers();

  const fields = useMemo(() => {
    let fields = 0;
    if (isName) fields |= 1;
    if (isSurname) fields |= 2;
    if (isUsername) fields |= 4;
    if (isAvatar) fields |= 8;
    if (isEmail) fields |= 16;
    if (isPassword) fields |= 32;
    return fields;
  }, [isName, isSurname, isUsername, isAvatar, isEmail, isPassword]);

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
    if (fields) refetch({ count, fields, seed });
  };

  return (
    <>
      <h1>Random users generator</h1>
      <p>Name: {isName ? "enabled" : "disabled"}</p>
      <p>Surname: {isSurname ? "enabled" : "disabled"}</p>
      <p>Username: {isUsername ? "enabled" : "disabled"}</p>
      <p>Avatar: {isAvatar ? "enabled" : "disabled"}</p>
      <p>Email: {isEmail ? "enabled" : "disabled"}</p>
      <p>Password: {isPassword ? "enabled" : "disabled"}</p>

      <Button variant="primary" onClick={handleGenerate} disabled={isLoading}>
        Generate
      </Button>

      <SwitchSection className="mt-2">
        <div id="json">
          <pre>
            <code className="language-json" dangerouslySetInnerHTML={{ __html: highlightedJson }} />
          </pre>
        </div>

        <div id="sql">
          <pre>
            <code className="language-sql" dangerouslySetInnerHTML={{ __html: highlightedSql }} />
          </pre>
        </div>
      </SwitchSection>
    </>
  );
}
