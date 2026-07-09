import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const navigate = useNavigate();
  const { auth, logout } = useAuth();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  const userName = auth?.user?.name || auth?.user?.full_name || '';

  return (
    <header className="bg-white border-b border-gray-100 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-xl font-bold text-[#1E3A8A]">Mi Banco</h1>
        <div className="flex items-center gap-4">
          {userName && (
            <span className="text-sm text-gray-600">{userName}</span>
          )}
          <button
            onClick={handleLogout}
            className="text-sm font-semibold text-gray-500 hover:text-[#DC2626] transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </header>
  );
}
