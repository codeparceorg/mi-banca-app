import Avatar from '../ui/Avatar';
import { useAuth } from '../../context/AuthContext';

export default function DashboardHeader({ userName: propUserName }) {
  const { auth } = useAuth();
  const user = auth?.user;
  const userName = user?.name || user?.full_name || propUserName || '';

  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl font-bold text-[#1E3A8A]">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Bienvenido{userName ? `, ${userName}` : ''}
        </p>
      </div>
      {userName && <Avatar name={userName} size="lg" />}
    </div>
  );
}
