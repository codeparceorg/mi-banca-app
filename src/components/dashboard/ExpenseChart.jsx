import Card from '../ui/Card';

export default function ExpenseChart({ data = [] }) {
  if (data.length === 0) {
    return (
      <Card>
        <Card.Header>Gráfico de gastos</Card.Header>
        <Card.Body>
          <div className="flex items-center justify-center h-48 text-gray-400">
            Sin datos para mostrar
          </div>
        </Card.Body>
      </Card>
    );
  }

  const max = Math.max(...data.map((d) => d.value));

  return (
    <Card>
      <Card.Header>Gráfico de gastos</Card.Header>
      <Card.Body>
        <div className="flex items-end gap-2 h-48" role="img" aria-label="Gráfico de gastos">
          {data.map((item, i) => {
            const height = max > 0 ? (item.value / max) * 100 : 0;
            const barColor = item.monto >= 0 ? 'bg-[#16A34A]' : 'bg-[#DC2626]';
            return (
              <div key={i} className="flex flex-col items-center flex-1 h-full justify-end">
                <span className="text-xs text-gray-500 mb-1 font-medium">{item.value}</span>
                <div
                  className={`w-full rounded-t-md ${barColor}`}
                  aria-hidden="true"
                  style={{ height: `${height}%` }}
                />
                <span className="text-xs text-gray-400 mt-1 truncate w-full text-center">{item.label}</span>
              </div>
            );
          })}
        </div>
      </Card.Body>
    </Card>
  );
}
