import { useEffect } from "react";
import { useNotificationStore } from "../stores/useNotificationStore";
import { useAuthStore } from "../stores/useAuthStore";

export function useNotifications() {
  const { addNotification } = useNotificationStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) return;

    // In a real app, this would be a WebSocket or SSE connection
    // For now, we'll simulate some notifications or just set up the infrastructure
    
    console.log("Setting up notification listener for user:", user.walletAddress);

    // Mock notification after 5 seconds
    const timer = setTimeout(() => {
      addNotification({
        title: "Welcome to SettleOne",
        message: "Your profile is active and ready for business.",
        type: "info",
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, [user, addNotification]);

  return {
    // You could return methods to trigger notifications manually here
  };
}
