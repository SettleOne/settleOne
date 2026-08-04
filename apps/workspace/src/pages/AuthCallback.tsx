import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { persistAuthToken } from "@settleone/api";

const MARKETING_URL =
  (import.meta.env.VITE_MARKETING_URL as string | undefined) ??
  "http://localhost:5173";

export function AuthCallback() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get("token");
    if (token) {
      persistAuthToken(token);
      navigate("/marketplace", { replace: true });
    } else {
      window.location.href = `${MARKETING_URL}/login`;
    }
  }, []);

  return (
    <div className="h-screen w-full flex items-center justify-center bg-[var(--bg-base)]">
      <div className="w-10 h-10 border-4 border-[var(--accent-blue)] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
