import { useAuthContext } from "@hooks/useAuthContext";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouteForAdmin = () => {
  const { isLoggedIn, userType } = useAuthContext();

  return isLoggedIn === true && userType === "ADMIN" ? (
    <Outlet />
  ) : (
    <Navigate to="/admin/login" />
  );
};

export default PrivateRouteForAdmin;
