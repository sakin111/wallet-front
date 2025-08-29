import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import type { TRole } from "@/Types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {

  return function AuthWrapper() {
    const { data, isLoading } = useUserInfoQuery(undefined);

    if (isLoading) {
      return <div>Loading...</div>
    }

    if (!data?.data?.email) {
      return <Navigate to="/login" replace />;
    }

    // Logged in but role doesn’t match → redirect
    if (requiredRole && requiredRole !== data?.data?.role) {
      return <Navigate to="/unAuthorized" replace />;
    }

    return <Component />;
  };
};
