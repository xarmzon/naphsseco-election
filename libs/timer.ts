//const countdown = new Date('Feb 17, 2022, 23:20:00').getTime()
export const timeElapsed = () => {
  const now = new Date().getTime()
  const distance = 1645114200000 - now
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
  done = true
  return [hours, minutes, seconds, done, distance]
}
