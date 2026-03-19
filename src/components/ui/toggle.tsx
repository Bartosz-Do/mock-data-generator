export default function Toggle({ disabled = false, onChange }: { disabled?: boolean, onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <input type="checkbox" className="toggle" disabled={disabled} onChange={onChange} />
  )
}
