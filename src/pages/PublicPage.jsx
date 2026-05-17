import { useCountdown } from '../hooks/useCountdown'
import CountdownDisplay from '../components/CountdownDisplay'

export default function PublicPage() {
  const { timer, remaining, loading } = useCountdown()

  return (
    <div className="relative flex flex-col min-h-screen bg-[#070b14] overflow-hidden">
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute inset-0 bg-glow" />

      <header className="relative flex justify-center pt-8 sm:pt-10">
        <img
          src="/aircraftsmp-timer/logo.png"
          alt="AircraftSMP"
          className="h-12 sm:h-16 w-auto animate-float"
        />
      </header>

      <main className="relative flex-1 flex flex-col items-center justify-center px-4 -mt-12">
        {loading ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            <p className="text-gray-600 text-sm">Loading timer...</p>
          </div>
        ) : timer ? (
          <CountdownDisplay remaining={remaining} label={timer.label} />
        ) : (
          <div className="text-center animate-fade-in">
            <p className="text-4xl sm:text-5xl font-mono font-bold text-gray-700">
              No Timer Set
            </p>
          </div>
        )}
      </main>

      <footer className="relative pb-6 text-center">
        <p className="text-xs text-gray-700">
          <a href="#/admin" className="hover:text-primary transition">
            Admin
          </a>
        </p>
      </footer>
    </div>
  )
}
