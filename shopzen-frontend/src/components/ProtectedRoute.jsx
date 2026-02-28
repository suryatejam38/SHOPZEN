import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const location = useLocation();

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // Not logged in → go to login & remember page
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role check (admin protection)
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}