import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ user, loading, children }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a0a0f]">
        <p className="text-gray-400">Loading...</p>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/admin" replace />
  }

  return children
}
