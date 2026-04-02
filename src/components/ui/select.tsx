import { ReactNode } from "react";

export default function Select({ value, onChange, children, disabled }: {
  value: string,
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
  children: ReactNode,
  disabled?: boolean
}) {
  return (
    <select className="select" value={value} onChange={onChange} disabled={disabled}>
      {children}
    </select>
  )
}
