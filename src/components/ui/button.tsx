import { ReactNode } from "react";
import { cn } from "@/utilities";

export default function Button({ children, onClick, variant, className }: {
  children?: ReactNode,
  onClick?: () => void,
  variant?: "primary" | "secondary" | "disabled",
  className?: string
}) {
  return (
    <button className={cn("button", variant, className)} onClick={onClick} disabled={variant === "disabled"}>
      {children}
    </button>
  )
}
