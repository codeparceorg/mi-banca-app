import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function PublicRoute() {
  const { auth } = useAuth();
  if (auth) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
}
