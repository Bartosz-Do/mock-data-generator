import { cn } from "@/utilities";

const icons = {
  settings: (<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <rect fill="currentColor" transform="rotate(45 9.987276 8.823157)" width="2" height="8" x="7" y="8" />
    <path fill="currentColor" transform="rotate(45 9.987276 8.823157)" d="M8 9C6.3431 9 5 7.6569 5 6 5 4.8065 5.6969 3.7758 6.706 3.2926L6.706 6 8 6.8896 9.294 6l0-2.7074C10.3031 3.7758 11 4.8065 11 6c0 1.6569-1.3431 3-3 3z" />
  </svg>),
  hamburgerMenu: (
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <rect fill="currentColor" width="12" height="2" x="2" y="11" />
      <rect fill="currentColor" width="12" height="2" x="2" y="7" />
      <rect fill="currentColor" width="12" height="2" x="2" y="3" />
    </svg>
  ),
  copy: (
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path stroke="currentColor" strokeLinejoin="round" fill="none" d="M5.75 3.75h6v10h-6z" />
      <path stroke="currentColor" strokeLinejoin="round" fill="none" d="M5.75 12.25h-1.5v-10h6v1.5" />
    </svg>
  ),
  trash: (
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <rect x="3.2941" y="3.7353" width="9.4118" height="11.7647" rx="1.2" stroke="currentColor" fill="none" />
      <rect x="6.5294" y="0.5" width="2.9412" height="1.7647" rx="0.6" stroke="currentColor" fill="none" />
      <rect x="2.7059" y="1.6765" width="10.5882" height="1.1764" rx="0.5" fill="currentColor" />
      <rect x="5.9412" y="6.6765" width="1.1764" height="5.8823" rx="0.5" fill="currentColor" />
      <rect x="8.8824" y="6.6765" width="1.1764" height="5.8823" rx="0.5" fill="currentColor" />
    </svg>
  )
}

export default function Icon({ name, className, onClick }: {
  name: keyof typeof icons,
  className?: string,
  onClick?: () => void
}) {
  return (
    <div className={cn("icon", className)} onClick={onClick}>
      {icons[name]}
    </div>
  );
}
