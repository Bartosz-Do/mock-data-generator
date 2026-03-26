"use client";
import { UsersGeneratorContext } from "./template";
import { useContext, useMemo } from "react";
import SwitchSection from "@/components/switch-section";
import { useFetch } from "@/hooks/useFetch";
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

  const { isLoading, refetch, data, error } = useFetch();

  const highlightedJson = useMemo(() => {
    const jsonString = JSON.stringify(data?.data ?? [], null, 2);
    return Prism.highlight(jsonString, Prism.languages.json, "json");
  }, [data]);

  const highlightedSql = useMemo(() => {
    const sqlString = buildQuery(data?.data ?? []);
    return Prism.highlight(sqlString, Prism.languages.sql, "sql");
  }, [data]);

  const handleGenerate = () => {
    refetch({
      count, fields: [
        isName ? "name" : "",
        isSurname ? "surname" : "",
        isUsername ? "username" : "",
        isAvatar ? "avatar" : "",
        isEmail ? "email" : "",
        isPassword ? "password" : "",
      ], seed
    })
  }

  return (
    <>
      <h1>Random users generator</h1>
      <p>Name: {isName ? "enabled" : "disabled"}</p>
      <p>Surname: {isSurname ? "enabled" : "disabled"}</p>
      <p>Username: {isUsername ? "enabled" : "disabled"}</p>
      <p>Avatar: {isAvatar ? "enabled" : "disabled"}</p>
      <p>Email: {isEmail ? "enabled" : "disabled"}</p>
      <p>Password: {isPassword ? "enabled" : "disabled"}</p>

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
