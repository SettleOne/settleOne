import React from "react";
import { createRoot } from "react-dom/client";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { wagmiConfig } from "@settleone/sdk/src/config";
import { ErrorBoundary } from "./components/ErrorBoundary";
import App from "./App";
import "./index.css";
import "@rainbow-me/rainbowkit/styles.css";
import { hydrateAuthToken } from "@settleone/api";

hydrateAuthToken();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      retryOnMount: false,
      staleTime: 30_000,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          <RainbowKitProvider
            theme={darkTheme({
              accentColor: "#0ea5e9",
              accentColorForeground: "white",
              borderRadius: "large",
              fontStack: "system",
              overlayBlur: "small",
            })}
          >
            <App />
          </RainbowKitProvider>
        </WagmiProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
