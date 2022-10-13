import { useLocation, Navigate, Outlet } from "react-router-dom";
//todo: This component should be shifted to PrivateRoute
import { ROUTES } from "../utils/routes.enum";
import { currentUser, ROLES } from "./constants";

type AuthRoleProps = {
  allowedRoles: any;
};

const AuthRole: React.FC<AuthRoleProps> = ({ allowedRoles }) => {
  const location = useLocation();

  const isSuperAdmin = currentUser?.role === ROLES.SUPER_ADMIN;

  return currentUser?.role && allowedRoles?.includes(currentUser?.role) ? (
    <Outlet />
  ) : (
    <Navigate
      to={isSuperAdmin ? ROUTES.ORGANIZATION : ROUTES.UNAUTHORIZED}
      state={{ from: location }}
      replace
    />
  );
};

export default AuthRole;
