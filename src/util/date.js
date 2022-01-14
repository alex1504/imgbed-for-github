export function getCurrentDate() {
  const today = new Date()
  const year = today.getFullYear()
  const month = (today.getMonth() + 1).toString().padStart(2, '0')
  const date = today
    .getDate()
    .toString()
    .padStart(2, '0')

  return year + month + date
}
