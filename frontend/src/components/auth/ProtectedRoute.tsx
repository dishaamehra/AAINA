import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { LoadingScreen } from '../layout/LoadingScreen.js';
import { useAuth } from '../../hooks/useAuth.js';

export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingScreen message="Restoring your secure session..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
