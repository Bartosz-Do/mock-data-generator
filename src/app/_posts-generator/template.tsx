"use client";
import { ReactNode, createContext, useState } from "react";
import Sidebar from "@/components/sidebar";
import { Input } from "@/components/ui";
import { cn } from "@/utilities";
import { PostArgs } from "@/types/generator";

export const UsersGeneratorContext = createContext<PostArgs>({
  count: 10,
  seed: undefined,
});

export default function UsersGeneratorTemplate({ children }: { children: ReactNode }) {
  const [count, setCount] = useState<number>(10);
  const [seed, setSeed] = useState<number | undefined>(undefined);

  return (
    <>
      <UsersGeneratorContext.Provider value={{ count, seed }}>
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
          </div>
        </Sidebar>
        <div className="main-with-sidebar">
          {children}
        </div>
      </UsersGeneratorContext.Provider>
    </>
  );
}
