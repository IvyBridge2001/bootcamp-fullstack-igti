import Format from '../../helpers/format'

import './style.css'

function Launches(props) {
  const { 
    transactions, distinctDays,
    handleCreate, handleEdit, handleDelete, handleFilterDescription
  } = props

  const format = new Format()

  const { month } = transactions && transactions.length > 0 ? transactions[0] : { }

  return (
    <div className="launches"> 
      <article>
        <h2>Lançamentos</h2>

        <div>
          <i className="material-icons" onClick={handleCreate}>add_circle</i>
          <input type="text" placeholder="filtro" onChange={handleFilterDescription} autoFocus></input>
        </div>
      </article>

      {transactions && transactions.length > 0 && distinctDays && distinctDays.map(distinctDay => {
        return (
          <article>
            <h3>{format.formatMonthDay(month, distinctDay)}</h3>
      
            <ul>
              {transactions && transactions.map(({ _id, description, value, category, day, type }) => {
                if(distinctDay === day) 
                  return (
                    <li className={type === '-' ? 'expense' : 'income'}>
                      <div>
                        <h4>{category}</h4>
                        <p>{description}</p>
                      </div>

                      <div>
                        <output>{format.formatCurrency(value)}</output>
                        <span>
                          <i className="material-icons" id={_id} onClick={handleEdit}>edit</i>
                          <i className="material-icons" id={_id} onClick={handleDelete}>delete</i>
                        </span>
                      </div>
                    </li>
                  )
              })}
            </ul>
          </article>
        )
      }) || <p>Nenhuma transação encontrada</p>}
    </div>

  )
}

export default Launches
