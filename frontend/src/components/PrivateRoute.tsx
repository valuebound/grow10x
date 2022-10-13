import { useContext, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { logOutAsync } from "../pages/Login/loginSlice";
import { useAppDispatch } from "../redux/hooks";
import AuthContext from "../utils/AuthContext";
import { currentUser } from "../utils/constants";
import { ROUTES } from "../utils/routes.enum";

const PrivateRoute = ({ children }: { children: any }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const fullUrl = window.location.href;
  const { authenticated } = useContext(AuthContext);

  useEffect(() => {
    if (authenticated) {
      currentUser?.tokenExp < Date.now() / 1000 && dispatch(logOutAsync());
    }
  }, [authenticated, dispatch]);

  return authenticated ? (
    children
  ) : !fullUrl.includes("valuebound.grow10x.org") ? (
    <Navigate to={ROUTES.WELCOME} state={{ from: location }} replace />
  ) : (
    <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />
  );
};

export default PrivateRoute;
