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

// https://blog.csdn.net/tengdazhang770960436/article/details/39339069。
export function toFormalDate (timeStamp) {
  const localDate = new Date(timeStamp / 1000)
  const year = localDate.getFullYear()
  const month = localDate.getMonth() + 1
  const date = localDate.getDate()
  const finalTime = `${year}-${appendZero(month)}-${appendZero(date)}`
  return finalTime
}

function appendZero (obj) {
  if (obj < 10) {
    return '0' + '' + obj
  } else {
    return obj
  }
}
