import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ user, loading, children }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#070b14]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/admin" replace />
  }

  return children
}
