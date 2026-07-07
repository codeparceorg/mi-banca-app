export default function Button({ children, variant = 'primary', loading, disabled, className = '', ...props }) {
  const base = 'px-4 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-[#1E3A8A] text-white hover:bg-[#1E3A8A]/90',
    secondary: 'bg-[#2563EB] text-white hover:bg-[#2563EB]/90',
    danger: 'bg-[#DC2626] text-white hover:bg-[#DC2626]/90',
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? 'Cargando...' : children}
    </button>
  );
}
