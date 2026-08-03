import { useEffect, useRef, useState } from "react";
import { io, type Socket } from "socket.io-client";

const WS_URL =
  (import.meta as any)?.env?.VITE_WS_URL || "http://localhost:3001";

let globalSocket: Socket | null = null;

export function useSocket(token: string | null) {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!token) return;
    if (globalSocket?.connected) {
      setConnected(true);
      return;
    }

    globalSocket = io(WS_URL, {
      auth: { token },
      transports: ["websocket"],
    });

    globalSocket.on("connect", () => setConnected(true));
    globalSocket.on("disconnect", () => setConnected(false));

    return () => {
      // Don't disconnect on component unmount — keep alive globally
    };
  }, [token]);

  return { socket: globalSocket, connected };
}

// Deal room subscription:
export function useDealRoomSocket(
  dealId: string | undefined,
  token: string | null,
) {
  const { socket } = useSocket(token);
  const [dealState, setDealState] = useState<any>(null);
  const [vaultBalance, setVaultBalance] = useState<any>(null);

  useEffect(() => {
    if (!socket || !dealId) return;

    socket.emit("subscribe:deal", { dealId });

    socket.on("deal:state-updated", (data) => {
      if (data.dealId === dealId) setDealState(data);
    });
    socket.on("vault:balance-update", (data) => {
      if (data.dealId === dealId) setVaultBalance(data);
    });

    return () => {
      socket.emit("unsubscribe:deal", { dealId });
      socket.off("deal:state-updated");
      socket.off("vault:balance-update");
    };
  }, [socket, dealId]);

  return { dealState, vaultBalance };
}

// Chat socket:
export function useChatSocket(
  dealId: string | undefined,
  token: string | null,
) {
  const chatSocketRef = useRef<Socket | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);

  useEffect(() => {
    if (!dealId || !token) return;

    const chatSocket = io(`${WS_URL}/chat`, {
      auth: { token },
      transports: ["websocket"],
    });
    chatSocketRef.current = chatSocket;

    chatSocket.on("connect", () => {
      chatSocket.emit("join:deal-chat", { dealId });
    });

    chatSocket.on("chat:joined", ({ messages: history }) => {
      setMessages(history);
    });

    chatSocket.on("message:new", ({ message }) => {
      setMessages((prev) => [...prev, message]);
    });

    chatSocket.on("user:typing", ({ userId }) => {
      setTypingUsers((prev) => [...new Set([...prev, userId])]);
      setTimeout(() => {
        setTypingUsers((prev) => prev.filter((id) => id !== userId));
      }, 3000);
    });

    return () => {
      chatSocket.disconnect();
    };
  }, [dealId, token]);

  const sendMessage = (content: string) => {
    chatSocketRef.current?.emit("message:send", {
      dealId,
      content,
    });
  };

  const sendTyping = () => {
    chatSocketRef.current?.emit("message:typing", {
      dealId,
    });
  };

  const markRead = (messageIds: string[]) => {
    chatSocketRef.current?.emit("message:read", {
      dealId,
      messageIds,
    });
  };

  return { messages, typingUsers, sendMessage, sendTyping, markRead };
}

// Notifications socket:
export function useNotificationSocket(
  token: string | null,
  onNotification: (n: any) => void,
) {
  const { socket } = useSocket(token);

  useEffect(() => {
    if (!socket) return;
    socket.on("notification:new", ({ notification }) => {
      onNotification(notification);
    });
    return () => {
      socket.off("notification:new");
    };
  }, [socket]);
}
