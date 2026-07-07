export default function Checkbox({ label, name, checked, onChange, error }) {
  return (
    <div>
      <label className="flex items-start gap-2 cursor-pointer">
        <input
          id={name}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="mt-1 h-4 w-4 rounded border-gray-300 text-[#1E3A8A] focus:ring-[#2563EB]"
          aria-label={label}
        />
        <span className="text-sm text-gray-600">{label}</span>
      </label>
      {error && (
        <p className="text-xs text-[#DC2626] mt-1">{error}</p>
      )}
    </div>
  );
}
