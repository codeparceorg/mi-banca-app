import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Avatar from '../ui/Avatar';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: '📊' },
  { to: '/transfer', label: 'Transferencias', icon: '💸' },
  { to: '/profile', label: 'Perfil', icon: '👤' },
];

export default function Sidebar() {
  const { auth } = useAuth();
  const user = auth?.user;
  const userName = user?.name || user?.full_name || '';

  return (
    <aside className="w-64 bg-white border-r border-gray-100 min-h-screen flex-shrink-0">
      {userName && (
        <div className="flex items-center gap-3 px-6 py-6 border-b border-gray-100">
          <Avatar name={userName} size="md" />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-800 truncate">{userName}</p>
            {user?.email && (
              <p className="text-xs text-gray-400 truncate">{user.email}</p>
            )}
          </div>
        </div>
      )}
      <nav className="p-4 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-[#1E3A8A] text-white'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-[#1E3A8A]'
              }`
            }
          >
            <span>{link.icon}</span>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
