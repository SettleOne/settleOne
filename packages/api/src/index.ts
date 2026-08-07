// Client
export {
  apiClient,
  ApiError,
  setAuthToken,
  clearAuthToken,
  persistAuthToken,
  hydrateAuthToken,
} from "./client";

// Hooks
export {
  useDealFiles,
  useUploadFile,
  useFileDownloadUrl,
} from "./hooks/useFiles";
export {
  useSocket,
  useDealRoomSocket,
  useChatSocket,
  useNotificationSocket,
} from "./hooks/useSocket";
export {
  useDeals,
  useMyDeals,
  useMyCreatedDeals,
  useMyAcceptedDeals,
  useActiveDeals,
} from "./hooks/useDeals";
export {
  useDeal,
  useCreateDealMutation,
  useDealActivity,
  useDealPayout,
} from "./hooks/useDeal";
export { useDeliveries, useSubmitDelivery } from "./hooks/useDeliveries";
export { useEvidence, useSubmitEvidence } from "./hooks/useEvidence";
export {
  useChatMessages,
  useSendMessage,
  useMarkMessagesRead,
} from "./hooks/useChat";
export { useUser, useUserByAddress, useUpdateProfile, useUploadAvatar, useUploadBanner } from "./hooks/useUser";
export {
  useNotifications,
  useUnreadCount,
  useMarkNotificationRead,
  useMarkAllNotificationsRead,
} from "./hooks/useNotifications";
export { usePortfolio, usePortfolioActivity } from "./hooks/usePortfolio";
export { useLogin, useRegister, useLogout, useNonce, useRequestEmailChange, useVerifyEmailChange, useChangePassword, useSessions,useRevokeSession } from "./hooks/useAuth";
