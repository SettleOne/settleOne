import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { storeAuthResult, redirectAfterAuth } from "../lib/api";

/**
 * GoogleCallbackPage
 *
 * The marketing app's `/auth/callback` route. After the user completes Google
 * OAuth the backend redirects here with:
 *   ?token=<accessToken>&role=<userRole>     (success)
 *   ?auth=error&reason=<reason>              (failure)
 *
 * This page reads the query params, stores the token, and redirects the user
 * to the correct app (Workspace or Operations) based on their role.
 */
export function GoogleCallbackPage() {
  const [params] = useSearchParams();

  useEffect(() => {
    const token = params.get("token");
    const role = params.get("role");
    const authParam = params.get("auth");
    const reason = params.get("reason");

    if (authParam === "error") {
      // OAuth failed — redirect back to home with error info
      window.location.href = `/?auth=error&reason=${reason ?? "unknown"}`;
      return;
    }

    if (token && role) {
      storeAuthResult(token, role);
      // Small delay so state is persisted before navigation
      setTimeout(() => redirectAfterAuth(token, role), 300);
    } else {
      // Missing params — go home
      window.location.href = "/";
    }
  }, [params]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "rgb(5,8,18)",
        gap: "16px",
      }}
    >
      {/* Spinner */}
      <div
        style={{
          width: "48px",
          height: "48px",
          border: "3px solid rgba(59,130,246,0.15)",
          borderTop: "3px solid #3B82F6",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <p
        style={{
          color: "rgba(255,255,255,0.6)",
          fontSize: "14px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        Signing you in…
      </p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
