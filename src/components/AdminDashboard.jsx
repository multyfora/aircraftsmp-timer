import { useState, useEffect } from 'react'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase/config'
import CountdownDisplay from './CountdownDisplay'

export default function AdminDashboard({ timer, remaining, user, onLogout }) {
  const [endDate, setEndDate] = useState('')
  const [label, setLabel] = useState(timer?.label || '')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (timer?.endTime) {
      const d = new Date(timer.endTime * 1000)
      const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
      setEndDate(local.toISOString().slice(0, 16))
    }
    if (timer?.label !== undefined) setLabel(timer.label)
  }, [timer])

  const saveTimer = async (updates) => {
    setSaving(true)
    try {
      await setDoc(doc(db, 'timer', 'config'), {
        ...updates,
        updatedAt: serverTimestamp(),
      }, { merge: true })
    } catch (err) {
      alert('Failed to save: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleSetTimer = () => {
    if (!endDate) return
    const ts = Math.floor(new Date(endDate).getTime() / 1000)
    saveTimer({ endTime: ts, isActive: true, label })
  }

  const toggleActive = () => {
    saveTimer({ isActive: !timer?.isActive })
  }

  return (
    <div className="min-h-screen bg-[#070b14] flex flex-col">
      <div className="absolute inset-0 bg-grid pointer-events-none" />
      <div className="absolute inset-0 bg-glow pointer-events-none" />

      <header className="relative flex items-center justify-between px-6 py-4 border-b border-border bg-surface/40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <img src="/aircraftsmp-timer/logo.png" alt="logo" className="h-8 w-auto" />
          <span className="text-sm font-medium text-gray-300">Admin</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 hidden sm:block">{user.email}</span>
          <button
            onClick={onLogout}
            className="text-sm text-gray-500 hover:text-primary transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="relative flex-1 flex flex-col items-center gap-10 px-4 py-10 max-w-4xl mx-auto w-full">
        <div className="w-full">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <h2 className="text-xs uppercase tracking-widest text-gray-500 font-medium">Live Preview</h2>
          </div>
          <div className="bg-surface/50 backdrop-blur-sm rounded-2xl border border-border p-8 flex items-center justify-center min-h-[220px] animate-pulse-glow">
            {timer ? (
              <CountdownDisplay remaining={remaining} label={timer.label} />
            ) : (
              <p className="text-gray-500">No timer set yet</p>
            )}
          </div>
        </div>

        <div className="w-full max-w-md space-y-6 bg-surface/60 backdrop-blur-xl rounded-2xl border border-border p-6">
          <h3 className="text-sm font-medium text-gray-300">Timer Controls</h3>

          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Countdown Target</label>
            <input
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-2.5 bg-surface-lighter border border-border rounded-xl text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Label (optional)</label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="e.g. Until Launch"
              className="w-full px-4 py-2.5 bg-surface-lighter border border-border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition"
            />
          </div>

          <button
            onClick={handleSetTimer}
            disabled={saving || !endDate}
            className="w-full py-2.5 bg-primary hover:bg-primary-dark disabled:bg-primary/50 text-white font-medium rounded-xl transition cursor-pointer disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : 'Set Countdown'}
          </button>

          {timer && (
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <span className="text-sm text-gray-400">
                Status:{' '}
                {timer.isActive ? (
                  <span className="text-primary font-medium">Active</span>
                ) : (
                  <span className="text-red-400 font-medium">Paused</span>
                )}
              </span>
              <button
                onClick={toggleActive}
                disabled={saving}
                className={`px-4 py-1.5 text-sm font-medium rounded-xl transition cursor-pointer disabled:cursor-not-allowed ${
                  timer.isActive
                    ? 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20'
                    : 'bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20'
                }`}
              >
                {timer.isActive ? 'Pause' : 'Resume'}
              </button>
            </div>
          )}
        </div>

        <div className="w-full max-w-md">
          <a
            href="#/"
            className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-primary transition"
          >
            <span>&larr;</span>
            <span>View public countdown</span>
          </a>
        </div>
      </main>
    </div>
  )
}
