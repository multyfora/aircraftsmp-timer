export default function CountdownDisplay({ remaining, label }) {
  const days = Math.floor(remaining / 86400)
  const hours = Math.floor((remaining % 86400) / 3600)
  const minutes = Math.floor((remaining % 3600) / 60)
  const seconds = remaining % 60

  const pad = (n) => String(n).padStart(2, '0')

  if (remaining <= 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 animate-fade-in">
        <div className="text-8xl sm:text-9xl font-mono font-bold tracking-widest text-primary animate-pulse">
          DONE
        </div>
        {label && <p className="text-xl text-gray-400">{label}</p>}
      </div>
    )
  }

  const segment = (value, labelText, isSeconds) => (
    <div className="flex flex-col items-center">
      <div className="relative">
        <span className={`text-6xl sm:text-8xl lg:text-9xl font-mono font-bold tracking-widest transition-colors ${isSeconds ? 'text-primary' : 'text-white'}`}>
          {isSeconds ? pad(value) : value}
        </span>
        {isSeconds && (
          <span className="absolute -inset-4 bg-primary/5 blur-2xl rounded-full" />
        )}
      </div>
      <span className="text-xs sm:text-sm uppercase tracking-widest text-gray-500 mt-2">
        {labelText}
      </span>
    </div>
  )

  return (
    <div className="flex flex-col items-center justify-center gap-8 animate-fade-in">
      <div className="flex items-baseline gap-2 sm:gap-4 select-none">
        {days > 0 && (
          <>
            {segment(days, 'Days')}
            <span className="text-4xl sm:text-6xl lg:text-7xl font-mono font-light text-gray-700 mb-6">:</span>
          </>
        )}
        {segment(hours, 'Hours')}
        <span className="text-4xl sm:text-6xl lg:text-7xl font-mono font-light text-gray-700 mb-6">:</span>
        {segment(minutes, 'Mins')}
        <span className="text-4xl sm:text-6xl lg:text-7xl font-mono font-light text-gray-700 mb-6">:</span>
        {segment(seconds, 'Secs', true)}
      </div>
      {label && (
        <p className="text-lg sm:text-2xl text-gray-400 tracking-wide font-light">{label}</p>
      )}
    </div>
  )
}
