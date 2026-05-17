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
    <div className="relative flex items-center justify-center min-h-screen bg-[#070b14] px-4 overflow-hidden">
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute inset-0 bg-glow" />

      <div className="relative w-full max-w-sm animate-fade-in">
        <div className="flex justify-center mb-8">
          <img src="/aircraftsmp-timer/logo.png" alt="logo" className="h-14 w-auto" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 bg-surface/60 backdrop-blur-xl border border-border rounded-2xl p-8">
          <h1 className="text-xl font-semibold text-center text-white">Admin Login</h1>

          {error && (
            <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-2.5">
              {error}
            </p>
          )}

          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-surface-lighter border border-border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-surface-lighter border border-border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={busy}
            className="w-full py-2.5 bg-primary hover:bg-primary-dark disabled:bg-primary/50 text-white font-medium rounded-xl transition cursor-pointer disabled:cursor-not-allowed"
          >
            {busy ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center mt-6">
          <a href="#/" className="text-sm text-gray-600 hover:text-primary transition">
            &larr; Back to countdown
          </a>
        </p>
      </div>
    </div>
  )
}
