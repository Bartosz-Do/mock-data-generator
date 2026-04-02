export default function Input({ value, onChange, disabled, placeholder, onBlur }: {
  value: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  disabled?: boolean,
  placeholder?: string,
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
}) {
  return (
    <>
      <input className="input" type="text" value={value} onChange={onChange} disabled={disabled} placeholder={placeholder} onBlur={onBlur} />
    </>
  )
}
