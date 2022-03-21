export function toCurrency (num) {
// https://dotblogs.com.tw/AlenWu_coding_blog/2017/08/11/js_number_to_currency_comma
  var parts = num.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}

export function date (time) {
  const localDate = new Date(time * 1000)
  return localDate.toLocaleDateString()
}
