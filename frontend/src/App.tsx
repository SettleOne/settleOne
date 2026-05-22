import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { LandingPage } from './modules/LandingPage'
import { DashboardPage } from './modules/dashboard/DashboardPage'
import { DealsPage } from './modules/deals/DealsPage'
import { CreateDealPage } from './modules/deals/CreateDealPage'
import { DealDetailsPage } from './modules/deals/DealDetailsPage'
import { PaymentsPage } from './modules/payments/PaymentsPage'
import { DisputesPage } from './modules/disputes/DisputesPage'
import { ProfilePage } from './modules/profile/ProfilePage'
import { ProtectedRoute } from './components/ProtectedRoute'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/deals" 
          element={
            <ProtectedRoute>
              <DealsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/deals/create" 
          element={
            <ProtectedRoute>
              <CreateDealPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/deals/:id" 
          element={
            <ProtectedRoute>
              <DealDetailsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/payments" 
          element={
            <ProtectedRoute>
              <PaymentsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/disputes" 
          element={
            <ProtectedRoute>
              <DisputesPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<div className="container mx-auto px-4 py-20 text-center text-brand-gold">404 - Not Found</div>} />
      </Routes>
    </Layout>
  )
}

export default App
