// components/common/CheckAuth.jsx
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ children }) {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated && !location.pathname.startsWith("/auth")) {
    return <Navigate to="/auth/login" replace />;
  }

  if (isAuthenticated && location.pathname.startsWith("/auth")) {
    // If logged in user accesses login/register, redirect based on role
    return user?.role === "admin"
      ? <Navigate to="/admin/dashboard" replace />
      : <Navigate to="/shoping/home" replace />;
  }

  if (isAuthenticated && user?.role === "admin" && location.pathname.startsWith("/shoping")) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (isAuthenticated && user?.role === "user" && location.pathname.startsWith("/admin")) {
    return <Navigate to="/shoping/home" replace />;
  }

  return children;
}

export default CheckAuth;
