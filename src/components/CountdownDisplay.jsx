export default function CountdownDisplay({ remaining, label }) {
  const days = Math.floor(remaining / 86400)
  const hours = Math.floor((remaining % 86400) / 3600)
  const minutes = Math.floor((remaining % 3600) / 60)
  const seconds = remaining % 60

  const pad = (n) => String(n).padStart(2, '0')

  if (remaining <= 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="text-8xl sm:text-9xl font-mono font-bold tracking-widest text-amber-400 animate-pulse">
          DONE
        </div>
        {label && <p className="text-xl text-gray-400">{label}</p>}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="flex items-baseline gap-2 sm:gap-4 select-none">
        {days > 0 && (
          <>
            <div className="flex flex-col items-center">
              <span className="text-6xl sm:text-8xl lg:text-9xl font-mono font-bold tracking-widest text-white">
                {days}
              </span>
              <span className="text-sm sm:text-base uppercase tracking-widest text-gray-500 mt-1">
                Days
              </span>
            </div>
            <span className="text-4xl sm:text-6xl lg:text-7xl font-mono text-gray-600 mb-6">:</span>
          </>
        )}
        <div className="flex flex-col items-center">
          <span className="text-6xl sm:text-8xl lg:text-9xl font-mono font-bold tracking-widest text-white">
            {pad(hours)}
          </span>
          <span className="text-sm sm:text-base uppercase tracking-widest text-gray-500 mt-1">
            Hours
          </span>
        </div>
        <span className="text-4xl sm:text-6xl lg:text-7xl font-mono text-gray-600 mb-6">:</span>
        <div className="flex flex-col items-center">
          <span className="text-6xl sm:text-8xl lg:text-9xl font-mono font-bold tracking-widest text-white">
            {pad(minutes)}
          </span>
          <span className="text-sm sm:text-base uppercase tracking-widest text-gray-500 mt-1">
            Mins
          </span>
        </div>
        <span className="text-4xl sm:text-6xl lg:text-7xl font-mono text-gray-600 mb-6">:</span>
        <div className="flex flex-col items-center">
          <span className="text-6xl sm:text-8xl lg:text-9xl font-mono font-bold tracking-widest text-amber-400">
            {pad(seconds)}
          </span>
          <span className="text-sm sm:text-base uppercase tracking-widest text-gray-500 mt-1">
            Secs
          </span>
        </div>
      </div>
      {label && (
        <p className="text-lg sm:text-2xl text-gray-400 tracking-wide">{label}</p>
      )}
    </div>
  )
}
