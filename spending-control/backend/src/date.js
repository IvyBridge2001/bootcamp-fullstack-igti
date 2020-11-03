function date(yearMonthDay) {
  const array = yearMonthDay.split('-')

  const date = { 
    year: Number(array[0]),
    month: Number(array[1]),
    day: Number(array[2]),
    yearMonth: `${array[0]}-${array[1]}`
  }

  return date
}

function get() {
  const date = new Date()

  const format = month => month < 10 ? `0${month}` : month

  const today = date.getDate()
  const thisYearMonth = `${date.getFullYear()}-${format(date.getMonth() + 1)}`

  return { today, thisYearMonth }
}

export { date, get }