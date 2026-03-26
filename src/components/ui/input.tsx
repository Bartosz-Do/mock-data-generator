export default function Input({ type, value, onChange }: {
  type: "text" | "number",
  value: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <>
      <input className="input" type={type} value={value} onChange={onChange} />
    </>
  )
}
