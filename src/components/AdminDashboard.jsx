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
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col">
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
        <h1 className="text-lg font-semibold text-white">Timer Admin</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">{user.email}</span>
          <button
            onClick={onLogout}
            className="text-sm text-gray-400 hover:text-white transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center gap-10 px-4 py-10">
        <div className="w-full max-w-2xl">
          <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-2">Live Preview</h2>
          <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-8 flex items-center justify-center min-h-[200px]">
            {timer ? (
              <CountdownDisplay remaining={remaining} label={timer.label} />
            ) : (
              <p className="text-gray-500">No timer set yet</p>
            )}
          </div>
        </div>

        <div className="w-full max-w-md space-y-6 bg-gray-900/50 rounded-2xl border border-gray-800 p-6">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Countdown Target</label>
            <input
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-950 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-amber-500/50 transition"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Label (optional)</label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="e.g. Until Launch"
              className="w-full px-4 py-2.5 bg-gray-950 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 transition"
            />
          </div>

          <button
            onClick={handleSetTimer}
            disabled={saving || !endDate}
            className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 disabled:bg-amber-500/50 text-black font-medium rounded-lg transition cursor-pointer disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : 'Set Countdown'}
          </button>

          {timer && (
            <div className="flex items-center justify-between pt-2 border-t border-gray-800">
              <span className="text-sm text-gray-400">
                Status: {timer.isActive ? (
                  <span className="text-green-400 font-medium">Active</span>
                ) : (
                  <span className="text-red-400 font-medium">Paused</span>
                )}
              </span>
              <button
                onClick={toggleActive}
                disabled={saving}
                className={`px-4 py-1.5 text-sm font-medium rounded-lg transition cursor-pointer disabled:cursor-not-allowed ${
                  timer.isActive
                    ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                    : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                }`}
              >
                {timer.isActive ? 'Pause' : 'Resume'}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
