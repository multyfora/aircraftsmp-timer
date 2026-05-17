import { useState, useEffect } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase/config'

export function useCountdown() {
  const [timer, setTimer] = useState(null)
  const [remaining, setRemaining] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'timer', 'config'), (snap) => {
      if (snap.exists()) {
        setTimer(snap.data())
      } else {
        setTimer(null)
      }
      setLoading(false)
    })
    return unsub
  }, [])

  useEffect(() => {
    if (!timer || !timer.isActive) {
      setRemaining(0)
      return
    }

    const tick = () => {
      const now = Math.floor(Date.now() / 1000)
      const diff = Math.max(0, timer.endTime - now)
      setRemaining(diff)
    }

    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [timer])

  return { timer, remaining, loading }
}
