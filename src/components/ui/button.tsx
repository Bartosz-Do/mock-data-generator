import { ReactNode } from "react";
import { cn } from "@/utilities";

export default function Button({ children, onClick, variant }: {
  children?: ReactNode,
  onClick?: () => void,
  variant?: "secondary" | "disabled"
}) {
  return (
    <button className={cn("button", variant)} onClick={onClick} disabled={variant === "disabled"}>
      {children}
    </button>
  )
}
