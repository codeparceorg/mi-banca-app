import { useNavigate } from 'react-router-dom';
import Card from '../ui/Card';
import Button from '../ui/Button';

const actions = [
  { label: 'Nueva transferencia', route: '/transfer', icon: '💸', variant: 'primary' },
  { label: 'Ver perfil', route: '/profile', icon: '👤', variant: 'secondary' },
];

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <Card>
      <Card.Header>Acciones rápidas</Card.Header>
      <Card.Body>
        <div className="flex flex-wrap gap-3">
          {actions.map((action) => (
            <Button
              key={action.route}
              variant={action.variant}
              onClick={() => navigate(action.route)}
              className="flex items-center gap-2"
            >
              <span>{action.icon}</span>
              <span>{action.label}</span>
            </Button>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
}
