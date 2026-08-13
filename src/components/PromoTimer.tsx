import { useEffect, useState } from 'react'

const PROMO_DURATION_SECONDS = 2 * 60 * 60 + 14 * 60 + 37
const promoEndsAt = Date.now() + PROMO_DURATION_SECONDS * 1000

function getRemainingSeconds() {
  return Math.max(0, Math.ceil((promoEndsAt - Date.now()) / 1000))
}

function formatTime(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return [hours, minutes, seconds].map((value) => String(value).padStart(2, '0')).join(' : ')
}

export default function PromoTimer() {
  const [remainingSeconds, setRemainingSeconds] = useState(getRemainingSeconds)

  useEffect(() => {
    const timer = window.setInterval(() => setRemainingSeconds(getRemainingSeconds()), 250)
    return () => window.clearInterval(timer)
  }, [])

  return <time dateTime={new Date(promoEndsAt).toISOString()} aria-label={`До конца акции ${formatTime(remainingSeconds)}`}>{formatTime(remainingSeconds)}</time>
}
