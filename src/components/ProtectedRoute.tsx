import useAuth from "../context/AuthProvider";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const { loggedIn } = useAuth();

  return loggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
