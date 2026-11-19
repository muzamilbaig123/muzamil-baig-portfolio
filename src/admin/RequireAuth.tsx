import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { isLoggedIn } from "../api/auth";

export default function RequireAuth({ children }: { children: ReactNode }) {
  const location = useLocation();

  if (!isLoggedIn()) {
    return (
      <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
    );
  }

  return children;
}
