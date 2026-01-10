import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@store/hooks";
import { PageSuspenseFallback } from "@components/feedback";
import { ROUTES } from "@utils";

const ProtectedRoute = () => {
  const { accessToken, loading } = useAppSelector((state) => state.auth);

  if (loading === "pending") {
    return <PageSuspenseFallback> </PageSuspenseFallback>;
  }

  if (!accessToken) {
    return <Navigate to={`${ROUTES.LOGIN}?msg=login_required`} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
