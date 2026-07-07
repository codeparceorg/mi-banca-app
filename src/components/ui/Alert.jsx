export default function Alert({ children, variant = 'error', className = '' }) {
  const colors = {
    error: 'bg-[#DC2626]/10 text-[#DC2626] border-[#DC2626]/20',
    success: 'bg-[#16A34A]/10 text-[#16A34A] border-[#16A34A]/20',
  };

  return (
    <div className={`px-4 py-3 rounded-lg text-sm border ${colors[variant]} ${className}`}>
      {children}
    </div>
  );
}
