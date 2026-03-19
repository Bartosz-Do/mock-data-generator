"use client";
import { ReactNode } from "react";
import Sidebar from "@/components/sidebar";
import Toggle from "@/components/ui/toggle";
import Button from "@/components/ui/button";
import { cn } from "@/utilities";

export default function UsersGeneratorTemplate({ children }: { children: ReactNode }) {
  return (
    <>
      <Sidebar>
        <h2 className="mb-4">Settings</h2>
        <div className={cn("grid-2-columns", "width-100", "gap-2")}>

          <div>Username</div>
          <div className={cn("justify-self-end", "flex-align-center")}><Toggle /></div>

          <div>Avatar</div>
          <div className={cn("justify-self-end", "flex-align-center")}><Toggle /></div>

          <div>Email</div>
          <div className={cn("justify-self-end", "flex-align-center")}><Toggle /></div>

          <div>Password</div>
          <div className={cn("justify-self-end", "flex-align-center")}><Toggle /></div>

          <div className={cn("grid-col-span-2", "justify-self-center")}>
            <Button variant="primary">Generate</Button>
          </div>
        </div>
      </Sidebar>
      <div className={cn("ml-10", "px-6")}>
        {children}
      </div>
    </>
  )
}
