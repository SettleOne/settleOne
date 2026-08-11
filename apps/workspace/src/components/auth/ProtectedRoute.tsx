import React from "react";
import { useUser } from "@settleone/api";
import { Spinner } from "@settleone/design-system";

export function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles?: string[];
}) {
  const { data: user, isLoading, isPending, isError } = useUser();

  // Check isPending || isLoading
  if (isPending || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-base)]">
        <Spinner size={32} />
      </div>
    );
  }

  // If session is invalid, bounce them to Marketing!
  // if (isError || !user) {
  //   const MARKETING_URL =
  //     (import.meta as any).env?.VITE_MARKETING_URL ?? "http://localhost:5173";
  //   window.location.href = `${MARKETING_URL}/login`;
  //   return null;
  // }

  if (
    allowedRoles &&
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user.role)
  ) {
    return <div>Unauthorized Access</div>;
  }

  return <>{children}</>;
}
