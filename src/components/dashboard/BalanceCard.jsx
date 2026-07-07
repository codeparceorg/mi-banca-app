import Card from '../ui/Card';

export default function BalanceCard({ label, value, color = 'text-[#1E3A8A]', icon }) {
  return (
    <Card>
      <Card.Body>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm text-gray-500 font-medium">{label}</p>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
          </div>
          {icon && <span className="text-2xl">{icon}</span>}
        </div>
      </Card.Body>
    </Card>
  );
}
