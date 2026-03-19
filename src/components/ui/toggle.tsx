export default function Toggle({ disabled = false }: { disabled?: boolean }) {
  return (
    <input type="checkbox" className="toggle" disabled={disabled} />
  )
}
