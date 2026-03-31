export default function Input({ type, value, onChange, disabled, placeholder }: {
  type: "text" | "number",
  value: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  disabled?: boolean,
  placeholder?: string
}) {
  return (
    <>
      <input className="input" type={type} value={value} onChange={onChange} disabled={disabled} placeholder={placeholder} />
    </>
  )
}
