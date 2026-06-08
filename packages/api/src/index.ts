// Client
export { apiClient, ApiError, setAuthToken, clearAuthToken } from './client';

// Hooks
export { useDeals, useMyDeals } from './hooks/useDeals';
export { useDeal, useCreateDealMutation, useUpdateDealStatus } from './hooks/useDeal';
export { useDeliveries, useSubmitDelivery } from './hooks/useDeliveries';
export { useEvidence, useSubmitEvidence } from './hooks/useEvidence';
export { useChatMessages, useSendMessage, useMarkMessagesRead } from './hooks/useChat';
export { useUser, useUserByAddress, useUpdateProfile } from './hooks/useUser';
export {
  useNotifications,
  useUnreadCount,
  useMarkNotificationRead,
  useMarkAllNotificationsRead,
} from './hooks/useNotifications';
export { usePortfolio, usePortfolioActivity } from './hooks/usePortfolio';
export { useLogin, useRegister, useLogout, useNonce } from './hooks/useAuth';
