import { ReactNode } from "react";
import { cn } from "@/utilities";

export default function Button({
  children,
  onClick,
  variant,
  className,
  disabled,
}: {
  children?: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button className={cn("button", variant, className, disabled && "disabled")} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
