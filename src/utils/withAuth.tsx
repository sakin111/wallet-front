import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import type { TRole } from "@/Types";
import { Navigate } from "react-router";

export const withAuth = <T extends object>(Component: React.ComponentType, expectedRole: TRole) => {
  return (props: T) => {
    const { data, isLoading } = useUserInfoQuery(undefined);

    if (isLoading) return <p>Loading...</p>;

    const user = data?.data; 


    if (!user) {
      return <Navigate to="/login" />;
    }

    if (!user.role || user.role.toLowerCase() !== expectedRole.toLowerCase()) {
      return <Navigate to="/unauthorized" />;
    }

    return <Component {...props} />;
  };
};
