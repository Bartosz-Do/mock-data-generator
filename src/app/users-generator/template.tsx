"use client";
import { ReactNode, createContext, useState } from "react";
import Sidebar from "@/components/sidebar";
import Toggle from "@/components/ui/toggle";
import Button from "@/components/ui/button";
import { cn } from "@/utilities";

export const UsersGeneratorContext = createContext({
  username: false,
  avatar: false,
  email: false,
  password: false,
});

export default function UsersGeneratorTemplate({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState(false);
  const [avatar, setAvatar] = useState(false);
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);

  return (
    <UsersGeneratorContext.Provider value={{ username, avatar, email, password }}>
      <Sidebar>
        <h2 className="mb-4">Settings</h2>
        <div className={cn("grid-2-columns", "width-100", "gap-2")}>

          <div>Username</div>
          <div className={cn("justify-self-end", "flex-align-center")}>
            <Toggle onChange={(e) => setUsername(e.target.checked)} />
          </div>

          <div>Avatar</div>
          <div className={cn("justify-self-end", "flex-align-center")}>
            <Toggle onChange={(e) => setAvatar(e.target.checked)} />
          </div>

          <div>Email</div>
          <div className={cn("justify-self-end", "flex-align-center")}>
            <Toggle onChange={(e) => setEmail(e.target.checked)} />
          </div>

          <div>Password</div>
          <div className={cn("justify-self-end", "flex-align-center")}>
            <Toggle onChange={(e) => setPassword(e.target.checked)} />
          </div>

          <div className={cn("grid-col-span-2", "justify-self-center")}>
            <Button variant="primary">Generate</Button>
          </div>
        </div>
      </Sidebar>
      <div className={cn("ml-10", "px-6")}>
        {children}
      </div>
    </UsersGeneratorContext.Provider>
  )
}
