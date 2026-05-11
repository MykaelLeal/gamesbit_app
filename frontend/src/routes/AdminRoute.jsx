import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

export const AdminRoute = () => {
  const { signed, user } =
    useContext(AuthContext);

  if (!signed) {
    return <Navigate to="/login" />;
  }

  if (!user) {
    return null;
  }

  return user?.role === "admin"
    ? <Outlet />
    : <Navigate to="/" />;
};