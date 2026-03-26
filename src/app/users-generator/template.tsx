"use client";
import { ReactNode, createContext, useState } from "react";
import Sidebar from "@/components/sidebar";
import { Toggle, Input } from "@/components/ui";
import { cn } from "@/utilities";
import { GeneratorSettings } from "@/types/generator";

export const UsersGeneratorContext = createContext<GeneratorSettings>({
  name: false,
  surname: false,
  username: false,
  avatar: false,
  email: false,
  password: false,
  count: 10,
  seed: undefined,
});

export default function UsersGeneratorTemplate({ children }: { children: ReactNode }) {
  const [name, setName] = useState(false);
  const [surname, setSurname] = useState(false);
  const [username, setUsername] = useState(false);
  const [avatar, setAvatar] = useState(false);
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);
  const [count, setCount] = useState<number>(10);
  const [seed, setSeed] = useState<number | undefined>(undefined);

  return (
    <>
      <UsersGeneratorContext.Provider value={{ name, surname, username, avatar, email, password, count, seed }}>
        <Sidebar>
          <h2 className="mb-4">Settings</h2>
          <div className={cn("grid-2-columns", "width-100", "gap-2")}>
            <div>Count</div>
            <div className={cn("justify-self-end", "flex-align-center")}>
              <Input type="number" value={count.toString() || ""} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCount(Number(e.target.value) ? Number(e.target.value) : 0)} />
            </div>

            <div>Seed</div>
            <div className={cn("justify-self-end", "flex-align-center")}>
              <Input type="number" value={seed?.toString() || ""} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSeed(Number(e.target.value) ? Number(e.target.value) : undefined)} />
            </div>

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
          </div>
        </Sidebar>
        <div className="main-with-sidebar">
          {children}
        </div>
      </UsersGeneratorContext.Provider>
    </>
  );
}
