import { ReactNode } from "react";
import { cn } from "@/utilities";

export default function Section({ children, variant }: {
  children: ReactNode,
  variant?: "secondary" | "disabled"
}) {
  return (
    <div className={cn("section", variant)}>
      {children}
    </div>
  )
}
