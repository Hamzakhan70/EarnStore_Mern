import { Navigate, useLocation } from "react-router-dom";
interface CheckAuthProps {
  isAuthenticated: boolean;
  user?: { role?: string }; // User is optional, and role is also optional
  children?: React.ReactNode; // Children is optional
}

const CheckAuth: React.FC<CheckAuthProps> = ({ isAuthenticated, user, children }) => {
  const location = useLocation();
    if (location.pathname === "/") {
      if (!isAuthenticated) {
        return <Navigate to="/auth/login" />;
      } else {
        if (user?.role === "admin") {
          return <Navigate to="/admin/dashboard" />;
        } else {
          return <Navigate to="/shop/home" />;
        }
      }
    }

  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("/admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
};

export default CheckAuth;
