import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ isAuthenticated }) {
  if (!isAuthenticated) Navigate({ to: "/login" });

  return <Outlet />;
}

export default ProtectedRoute;
