import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { LoadingScreen } from '../layout/LoadingScreen.js';
import { useAuth } from '../../hooks/useAuth.js';

interface RouteLocationState {
  from?: {
    pathname?: string;
  };
}

export function PublicRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const state = location.state as RouteLocationState | null;
  const redirectPath = state?.from?.pathname ?? '/dashboard';

  if (isLoading) {
    return <LoadingScreen message="Checking your AAINA session..." />;
  }

  if (isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}
