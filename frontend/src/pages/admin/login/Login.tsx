import LayoutNoSearchbar from "@layouts/layout/LayoutNoSearchbar";
import LoginForm from "./login-form/LoginForm";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "@hooks/useAuthContext";
import { useEffect } from "react";

const Login = () => {
  const { isLoggedIn, userType } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn && userType === "ADMIN") {
      navigate("/admin/dashboard");
    }
  }, [isLoggedIn, userType, navigate]);

  return (
    <LayoutNoSearchbar>
      <LoginForm />
      <Link to="/login">Login as User</Link>
    </LayoutNoSearchbar>
  );
};

export default Login;
