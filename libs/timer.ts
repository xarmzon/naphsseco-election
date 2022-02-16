export const timeElapsed = (countD = 'Feb 18, 2022, 16:00:00') => {
  const countdown = new Date(2022, 2, 19, 20, 0, 0).getTime()
  const now = new Date().getTime()
  const distance = countdown - now

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

  return [hours, minutes, seconds, done, distance]
}
