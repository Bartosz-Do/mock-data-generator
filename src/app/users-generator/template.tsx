"use client";
import { ReactNode, createContext, useState, useEffect } from "react";
import Sidebar from "@/components/sidebar";
import Toggle from "@/components/ui/toggle";
import Button from "@/components/ui/button";
import { cn } from "@/utilities";
import { useFetch } from "@/hooks/useFetch";
import { GeneratorSettings } from "@/types/generator";

export const UsersGeneratorContext = createContext<GeneratorSettings>({
  name: false,
  surname: false,
  username: false,
  avatar: false,
  email: false,
  password: false,
});

export default function UsersGeneratorTemplate({ children }: { children: ReactNode }) {
  const buildQuery = (data: Record<string, string>[]): string => {
    const columns = Object.keys(data[0]).join(", ");
    const values = data
      .map((row) => `(${Object.values(row).map((value) => `'${value}'`).join(", ")})`)
      .join(", ");
    return `INSERT INTO users (${columns}) VALUES ${values};`;
  }

  const [name, setName] = useState(false);
  const [surname, setSurname] = useState(false);
  const [username, setUsername] = useState(false);
  const [avatar, setAvatar] = useState(false);
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);
  const [count, setCount] = useState(10); // needs UI change
  const [seed, setSeed] = useState<number | undefined>(2137); // needs UI change

  const { isLoading, refetch, data, error } = useFetch();

  useEffect(() => {
    if (data) {
      // Data updated, can be used for further processing
      console.log("Data received: ", data);
      const jsonString = JSON.stringify(data.data, null, 2);
      const sqlQuery = buildQuery(data.data);
      console.log("SQL Query: ", sqlQuery);
      console.log("JSON String: ", jsonString);
    }
  }, [data]);

  const getFields = () => {
    return [name, surname, username, avatar, email, password].reduce((acc, field, index) => {
      if (field) {
        return acc | (1 << index);
      }
      return acc;
    }, 0);
  };

  const handleGenerate = () => {
    const fields = getFields();
    if (fields) {
      refetch({ count, fields, seed });
    }
  };

  return (
    <>
      <UsersGeneratorContext.Provider value={{ name, surname, username, avatar, email, password }}>
        <Sidebar>
          <h2 className="mb-4">Settings</h2>
          <div className={cn("grid-2-columns", "width-100", "gap-2")}>
            <div>Name</div>
            <div className={cn("justify-self-end", "flex-align-center")}>
              <Toggle checked={name} onChange={(e) => setName(e.target.checked)} />
            </div>

            <div>Surname</div>
            <div className={cn("justify-self-end", "flex-align-center")}>
              <Toggle checked={surname} onChange={(e) => setSurname(e.target.checked)} />
            </div>

            <div>Username</div>
            <div className={cn("justify-self-end", "flex-align-center")}>
              <Toggle checked={username} onChange={(e) => setUsername(e.target.checked)} />
            </div>

            <div>Avatar</div>
            <div className={cn("justify-self-end", "flex-align-center")}>
              <Toggle checked={avatar} onChange={(e) => setAvatar(e.target.checked)} />
            </div>

            <div>Email</div>
            <div className={cn("justify-self-end", "flex-align-center")}>
              <Toggle checked={email} onChange={(e) => setEmail(e.target.checked)} />
            </div>

            <div>Password</div>
            <div className={cn("justify-self-end", "flex-align-center")}>
              <Toggle checked={password} onChange={(e) => setPassword(e.target.checked)} />
            </div>

            <div className={cn("grid-col-span-2", "justify-self-center")}>
              <Button variant="primary" onClick={handleGenerate} disabled={isLoading}>
                Generate
              </Button>
              {error && <p className="error">{error}</p>}
            </div>
          </div>
        </Sidebar>
        <div className="main-with-sidebar">
          {children}
        </div>
      </UsersGeneratorContext.Provider>
    </>
  );
}
