"use client";
import { ReactNode, createContext, useState, Fragment } from "react";
import Sidebar from "@/components/sidebar";
import { Toggle, Input, Button, Select } from "@/components/ui";
import { cn } from "@/utilities";
import { GeneratorSettings, Column } from "@/types/generator";

export const UsersGeneratorContext = createContext<GeneratorSettings>({
  columns: [],
  count: 10,
  seed: 1,
  isSeedEnabled: false,
});

export const columnsTable = [
  "name", "surname", "username", "avatar", "email", "password"
];

export default function UsersGeneratorTemplate({ children }: { children: ReactNode }) {
  //const [name, setName] = useState(false);
  //const [surname, setSurname] = useState(false);
  //const [username, setUsername] = useState(false);
  //const [avatar, setAvatar] = useState(false);
  //const [email, setEmail] = useState(false);
  //const [password, setPassword] = useState(false);
  const [count, setCount] = useState<string>("10");
  const [seed, setSeed] = useState<string>("1");
  const [isSeedEnabled, setIsSeedEnabled] = useState<boolean>(false);
  const [columns, setColumns] = useState<Column[]>([]);

  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (/^\d+$/.test(e.target.value) || e.target.value === "") {
      setCount(e.target.value);
    }
  };

  const handleCountBlur = () => {
    const value = count.trim();
    if (value === "" || !/^\d+$/.test(value)) {
      return setCount("1");
    }
    setCount(String(Number(value)));
  };

  const handleSeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (/^\d+$/.test(e.target.value) || e.target.value === "") {
      setSeed(e.target.value);
    }
  };

  const handleSeedBlur = () => {
    const value = seed.trim();
    if (value === "" || !/^\d+$/.test(value)) {
      return setSeed("1");
    }
    setSeed(String(Number(value)));
  };

  const handleColumnNameChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    setColumns(prev => prev.map((el, index) => index === i ? { ...el, colName: e.target.value } : el));
  };

  const handleAddColumn = () => {
    setColumns([...columns, { colName: "", colValue: 0 }]);
  };

  const changeColumnValue = (e: React.ChangeEvent<HTMLSelectElement>, i: number) => {
    setColumns(prev => prev.map((el, index) => index === i ? { ...el, colValue: Number(e.target.value) } : el));
  };
  return (
    <>
      <UsersGeneratorContext.Provider value={{ columns, count: Number(count), seed: Number(seed), isSeedEnabled }}>
        <Sidebar>
          <h2 className="mb-4">Settings</h2>
          <div className={cn("grid-2-columns", "width-100", "gap-2")}>
            <div>Count</div>
            <div className={cn("justify-self-end", "flex-align-center")}>
              <Input value={count} onBlur={handleCountBlur} onChange={handleCountChange} />
            </div>

            <div>Seed</div>
            <div className={cn("justify-self-end")}>
              <Toggle checked={isSeedEnabled} onChange={(e) => setIsSeedEnabled(e.target.checked)} />
            </div>
            <div className={cn("grid-col-span-2", "justify-self-end", "flex-align-center")}>
              <Input value={seed} onChange={handleSeedChange} onBlur={handleSeedBlur} disabled={!isSeedEnabled} />
            </div>

            <div className={cn("grid-col-span-2")}><h3>Columns</h3></div>
            <div className={cn("justify-self-start")}>Column value</div>
            <div className={cn("justify-self-start")}>Column name</div>

            {/*<div>Name</div>
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
            </div>*/}

            {columns.map((el, i) => {
              return (
                <Fragment key={i}>
                  <div>
                    <Select value={el.colValue.toString()} onChange={(e) => changeColumnValue(e, i)} disabled={!el.colName}>
                      {columnsTable.map((element, i) => {
                        return (
                          <option key={i} value={i}>{element}</option>
                        )
                      })}
                    </Select>
                  </div>
                  <div>
                    <Input value={el.colName} onChange={(e) => handleColumnNameChange(e, i)} />
                  </div>
                </Fragment>
              );
            })}
            <div className={cn("grid-col-span-2", "mt-3")}>
              <Button onClick={handleAddColumn}>Add column</Button>
            </div>
          </div>
        </Sidebar>
        <div className="main-with-sidebar">
          {children}
        </div>
      </UsersGeneratorContext.Provider >
    </>
  );
}
