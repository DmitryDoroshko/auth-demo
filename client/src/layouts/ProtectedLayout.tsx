import { Navigate, Outlet } from "react-router-dom";
import { AppRoutes } from "../constants/routing.ts";
import { useAuth } from "../context/auth/auth-hooks.tsx";

export const ProtectedLayout = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={AppRoutes.LOGIN} replace />;
  }

  return <Outlet />;
};