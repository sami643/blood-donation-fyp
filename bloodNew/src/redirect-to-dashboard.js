import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  if (localStorage.getItem("access_token")) {
    return <Navigate to="/user" replace />;
  }

  return children;
};