import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "@settleone/api";
import { Spinner } from "@settleone/design-system";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  // Bypassed for development so you can access the Workspace directly!
  return <>{children}</>;

  const location = useLocation();
  const { data: user, isLoading, isError } = useUser();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (isError || !user) {
    // Redirect to marketing login if not authenticated
    // Note: In a monorepo, marketing might be on a different domain/port in dev
    const loginUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/login"
        : "/login";

    window.location.href = `${loginUrl}?redirect=${encodeURIComponent(window.location.href)}`;
    return null;
  }

  const roles = allowedRoles || [];
  const userRole = user?.role || "";
  if (roles.length > 0 && userRole && !roles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}
