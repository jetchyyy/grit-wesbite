import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A1F] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-[#BF9B30] border-t-transparent rounded-full animate-spin mb-4"></div>
          <div className="text-[#BF9B30] text-xl font-bold">Loading...</div>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}
