export default function Toggle({
  disabled = false,
  checked = false,
  onChange,
}: {
  disabled?: boolean;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return <input type="checkbox" className="toggle" disabled={disabled} checked={checked} onChange={onChange} />;
}
