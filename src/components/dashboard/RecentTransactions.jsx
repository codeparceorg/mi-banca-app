import Card from '../ui/Card';
import Table from '../ui/Table';
import Badge from '../ui/Badge';

const columns = [
  { key: 'fecha', label: 'Fecha' },
  { key: 'descripcion', label: 'Descripción' },
  {
    key: 'monto',
    label: 'Monto',
    render: (value) => {
      const isPositive = value >= 0;
      return (
        <span className={isPositive ? 'text-[#16A34A] font-medium' : 'text-[#DC2626] font-medium'}>
          {isPositive ? '+' : ''}${Math.abs(value).toLocaleString()}
        </span>
      );
    },
  },
  {
    key: 'tipo',
    label: 'Tipo',
    render: (value) => {
      if (!value) return null;
      const isIngreso = value === 'ingreso';
      return (
        <Badge variant={isIngreso ? 'success' : 'error'}>
          {isIngreso ? 'Ingreso' : 'Gasto'}
        </Badge>
      );
    },
  },
];

export default function RecentTransactions({ transactions = [] }) {
  return (
    <Card>
      <Card.Header>Movimientos recientes</Card.Header>
      <Card.Body className="p-0">
        <Table columns={columns} data={transactions} />
      </Card.Body>
    </Card>
  );
}
