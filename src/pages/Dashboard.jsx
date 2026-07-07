import Spinner from '../components/ui/Spinner';
import { useDashboard } from '../hooks/useDashboard';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import BalanceCard from '../components/dashboard/BalanceCard';
import QuickActions from '../components/dashboard/QuickActions';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import ExpenseChart from '../components/dashboard/ExpenseChart';

export default function Dashboard() {
  const { data, isLoading, error } = useDashboard();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-[#DC2626] font-medium">Error al cargar el dashboard</p>
      </div>
    );
  }

  const movimientos = data?.movimientos ?? [];

  const stats = [
    { label: 'Saldo disponible', value: `$${(data?.saldo ?? 0).toLocaleString()}`, color: 'text-[#1E3A8A]', icon: '💰' },
    { label: 'Ingresos del mes', value: `$${movimientos.filter((m) => m.monto > 0).reduce((a, b) => a + b.monto, 0).toLocaleString()}`, color: 'text-[#16A34A]', icon: '📈' },
    { label: 'Gastos del mes', value: `$${movimientos.filter((m) => m.monto < 0).reduce((a, b) => a + Math.abs(b.monto), 0).toLocaleString()}`, color: 'text-[#DC2626]', icon: '📉' },
    { label: 'Movimientos', value: `${movimientos.length}`, color: 'text-[#2563EB]', icon: '🔄' },
  ];

  const chartData = movimientos.slice(0, 7).map((m) => ({
    label: m.fecha ? m.fecha.slice(0, 5) : '',
    value: Math.abs(m.monto),
    color: m.monto >= 0 ? '#16A34A' : '#DC2626',
    monto: m.monto,
  }));

  const isEmpty = movimientos.length === 0;

  return (
    <div className="space-y-6">
      <DashboardHeader userName="Usuario" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <BalanceCard key={stat.label} {...stat} />
        ))}
      </div>

      <QuickActions />

      {isEmpty ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-4xl mb-4">📭</p>
          <p className="text-gray-500 font-medium">No hay movimientos recientes</p>
          <p className="text-sm text-gray-400 mt-1">Realiza una transferencia para ver tus movimientos aquí.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentTransactions transactions={movimientos} />
          <ExpenseChart data={chartData} />
        </div>
      )}
    </div>
  );
}
