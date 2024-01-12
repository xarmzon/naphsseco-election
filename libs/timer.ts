export const timeElapsed = () => {
  const now = new Date().getTime()
  const endDate = new Date(process.env.NEXT_PUBLIC_END_DATE!)
  const distance = endDate.getTime() - now

  const days = Math.floor(distance / (1000 * 60 * 60 * 24))
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  )
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((distance % (1000 * 60)) / 1000)

  let done = false

  if (distance < 0) {
    done = true
  } else {
    done = false
  }

  // done = true
  return [hours, minutes, seconds, done, distance, days]
}
