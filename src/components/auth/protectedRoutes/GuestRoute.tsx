import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@store/hooks";
import { ROUTES } from "@utils";

const GuestRoute = () => {
  const { accessToken } = useAppSelector((state) => state.auth);

  if (accessToken) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <Outlet />;
};

export default GuestRoute;
