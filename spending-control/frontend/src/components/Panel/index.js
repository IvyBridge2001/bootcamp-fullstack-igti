import Format from '../../helpers/format.js'

import './style.css'

function Panel({ data, distinctYearsMonths, yearMonth, handleChange }) {
  const format = new Format()

  const { balance, incomes, expenses, launches } = data || {
    balance: 0, incomes: 0, expenses: 0, launches: 0
  }

  const color = balance > 0 ? 'green' : 'red'

  return (
    <div className="panel">
      <select onChange={handleChange}>
        <option>{format.formatYearMonth(yearMonth)}</option>
        {distinctYearsMonths && distinctYearsMonths.map(distinctYearMonth => {
          return (
            distinctYearMonth !== yearMonth && 
            <option value={distinctYearMonth}>
              {format.formatYearMonth(distinctYearMonth)}
            </option>
          )
        })}
      </select>

      <div>
        <output className={color}>{format.formatCurrency(balance)}</output>
        <p>Saldo do mês</p>
      </div>

      <div>
        <p>
          <span>Receitas:</span>
          <output className="green">{format.formatCurrency(incomes)}</output>
        </p>
        <p>
          <span>Despesas:</span>
          <output className="red">{format.formatCurrency(expenses)}</output>
        </p>
        <p>
          <span>Lançamentos:</span>
          <output>{(launches)}</output>
        </p>
      </div>
    </div>
  )
}

export default Panel