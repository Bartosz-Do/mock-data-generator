import { cn } from "@/utilities";

const icons = {
  settings: (<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <rect fill="currentColor" transform="rotate(45 9.987276 8.823157)" width="2" height="8" x="7" y="8" />
    <path fill="currentColor" transform="rotate(45 9.987276 8.823157)" d="M8 9C6.3431 9 5 7.6569 5 6 5 4.8065 5.6969 3.7758 6.706 3.2926L6.706 6 8 6.8896 9.294 6l0-2.7074C10.3031 3.7758 11 4.8065 11 6c0 1.6569-1.3431 3-3 3z" />
  </svg>)
}

export default function Icon({ name, className }: { name: keyof typeof icons, className?: string }) {
  return (
    <div className={cn("icon", className)}>
      {icons[name]}
    </div>
  );
}
