import { useAuth } from '../hooks/useAuth'
import { useCountdown } from '../hooks/useCountdown'
import AdminLogin from '../components/AdminLogin'
import AdminDashboard from '../components/AdminDashboard'
import ProtectedRoute from '../components/ProtectedRoute'

export default function AdminPage() {
  const { user, loading, login, logout } = useAuth()
  const { timer, remaining } = useCountdown()

  if (!user) {
    return <AdminLogin onLogin={login} />
  }

  return (
    <ProtectedRoute user={user} loading={loading}>
      <AdminDashboard
        timer={timer}
        remaining={remaining}
        user={user}
        onLogout={logout}
      />
    </ProtectedRoute>
  )
}
