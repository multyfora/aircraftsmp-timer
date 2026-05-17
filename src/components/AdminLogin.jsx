import { useState } from 'react'

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      await onLogin(email, password)
    } catch (err) {
      setError(err.message.replace('Firebase: ', ''))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0a0a0f] px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-5">
        <h1 className="text-2xl font-semibold text-center text-white">Admin Login</h1>

        {error && (
          <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-2">
            {error}
          </p>
        )}

        <div>
          <label className="block text-sm text-gray-400 mb-1">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 transition"
            placeholder="admin@example.com"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 transition"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={busy}
          className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 disabled:bg-amber-500/50 text-black font-medium rounded-lg transition cursor-pointer disabled:cursor-not-allowed"
        >
          {busy ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  )
}
