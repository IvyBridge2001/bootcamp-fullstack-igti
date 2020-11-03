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

export default date