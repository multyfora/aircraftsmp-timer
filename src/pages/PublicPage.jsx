import { useCountdown } from '../hooks/useCountdown'
import CountdownDisplay from '../components/CountdownDisplay'

export default function PublicPage() {
  const { timer, remaining, loading } = useCountdown()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0f] px-4">
      <div className="flex-1 flex items-center justify-center">
        {loading ? (
          <p className="text-gray-500 text-lg">Loading timer...</p>
        ) : timer ? (
          <CountdownDisplay remaining={remaining} label={timer.label} />
        ) : (
          <div className="text-center">
            <p className="text-4xl sm:text-5xl font-mono font-bold text-gray-600">
              No Timer Set
            </p>
          </div>
        )}
      </div>

      <footer className="pb-6">
        <p className="text-xs text-gray-700">
          AircraftSMP Timer &middot; <a href="#/admin" className="hover:text-gray-500 transition">Admin</a>
        </p>
      </footer>
    </div>
  )
}
