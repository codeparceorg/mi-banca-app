export default function Input({ label, name, error, className = '', ...props }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={name}
        name={name}
        className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-colors ${
          error ? 'border-[#DC2626]' : 'border-gray-200'
        } ${className}`}
        {...props}
      />
      {error && (
        <p className="text-xs text-[#DC2626] mt-1">{error}</p>
      )}
    </div>
  );
}
