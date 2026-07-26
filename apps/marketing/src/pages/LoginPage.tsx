import React from "react";
// LoginPage is now a modal overlay rendered by LandingPage.
// This file exists for backward compatibility and direct /login URL access.
// It simply renders the full LandingPage which includes the modal system.
import { LandingPage } from "./LandingPage";

export function LoginPage() {
  return <LandingPage />;
}

export default LoginPage;
