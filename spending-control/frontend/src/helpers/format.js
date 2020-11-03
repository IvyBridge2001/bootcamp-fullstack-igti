class Format {
  constructor() {
    this.date = new Date()
  }

  formatZero(value) {
    return value < 10 ? `0${value}` : value
  }

  formatYearMonth(yearMonth) {
    const array = yearMonth.split('-')

    const year = array[0]
    const month = array[1] - 1

    const date = new Date(year, month)

    return date.toLocaleDateString('pt-br', { year: 'numeric', month: 'long' })
  }

  formatMonthDay(month, day) {
    const date = new Date(null, month - 1, day)

    return date.toLocaleDateString('pt-br', { month: 'long', day: 'numeric' })
  }

  formatCurrency(value) {
    return Intl.NumberFormat('pt-br', {
      style: 'currency', currency: 'BRL'
    }).format(value)
  }

  yearMonth() {
    const year = this.date.getFullYear()
    const month = this.formatZero(this.date.getMonth() + 1)

    return `${year}-${month}`
  }

  yearMonthDay() {
    const year = this.date.getFullYear()
    const month = this.formatZero(this.date.getMonth() + 1)
    const day = this.formatZero(this.date.getDate())
    
    return `${year}-${month}-${day}`
  }

  day() {
    return this.date.getDate()
  }
}

export default Format
