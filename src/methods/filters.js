export function toPercent (num) {
  num = num * 100
  return `${num}%`
}

export function date (time) {
  const localDate = new Date(time * 1000)
  return localDate.toLocaleDateString()
}

export function toDate (timeStamp) {
  const localDate = new Date(timeStamp / 1000)
  return localDate.toLocaleDateString()
}
