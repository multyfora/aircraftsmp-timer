export default function CountdownDisplay({ remaining, label }) {
  const days = Math.floor(remaining / 86400)
  const hours = Math.floor((remaining % 86400) / 3600)
  const minutes = Math.floor((remaining % 3600) / 60)
  const seconds = remaining % 60

  const pad = (n) => String(n).padStart(2, '0')

  if (remaining <= 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 animate-fade-in max-w-full px-4">
        <div className="text-6xl sm:text-8xl lg:text-9xl font-mono font-bold tracking-widest text-primary animate-pulse">
          DONE
        </div>
        {label && <p className="text-xl text-gray-400">{label}</p>}
      </div>
    )
  }

  const numSize = 'text-[clamp(2rem,10vw,5rem)] sm:text-[clamp(2.5rem,7vw,7rem)] lg:text-[clamp(4rem,6vw,9rem)]'
  const colonSize = 'text-[clamp(1.25rem,5vw,3rem)] sm:text-[clamp(1.5rem,4vw,5rem)] lg:text-[clamp(2.5rem,3.5vw,7rem)]'
  const labelSize = 'text-[clamp(0.5rem,1.5vw,0.75rem)] sm:text-xs lg:text-sm'

  const segment = (value, text, isSeconds) => (
    <div className="flex flex-col items-center min-w-0">
      <div className="relative">
        <span className={`${numSize} font-mono font-bold tracking-widest transition-colors leading-none ${isSeconds ? 'text-primary' : 'text-white'}`}>
          {value}
        </span>
        {isSeconds && (
          <span className="absolute -inset-4 bg-primary/5 blur-2xl rounded-full" />
        )}
      </div>
      <span className={`${labelSize} uppercase tracking-widest text-gray-500 mt-2`}>
        {text}
      </span>
    </div>
  )

  return (
    <div className="flex flex-col items-center justify-center gap-6 animate-fade-in w-full max-w-full px-4 sm:px-8 lg:px-16 mx-auto">
      <div className="flex items-baseline gap-1 sm:gap-2 lg:gap-4 select-none max-w-full">
        {days > 0 && (
          <>
            {segment(String(days), 'Days')}
            <span className={`${colonSize} font-mono font-light text-gray-700 leading-none`}>:</span>
          </>
        )}
        {segment(pad(hours), 'Hours')}
        <span className={`${colonSize} font-mono font-light text-gray-700 leading-none`}>:</span>
        {segment(pad(minutes), 'Mins')}
        <span className={`${colonSize} font-mono font-light text-gray-700 leading-none`}>:</span>
        {segment(pad(seconds), 'Secs', true)}
      </div>
      {label && (
        <p className="text-sm sm:text-lg lg:text-2xl text-gray-400 tracking-wide font-light text-center px-4">
          {label}
        </p>
      )}
    </div>
  )
}
