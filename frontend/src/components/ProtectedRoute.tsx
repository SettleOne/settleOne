import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../stores/useAuthStore'
import { useAccount } from 'wagmi'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore()
  const { isConnected } = useAccount()
  const location = useLocation()

  if (!isConnected || !user) {
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return <>{children}</>
}
