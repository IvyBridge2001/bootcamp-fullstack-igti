import './style.css'

function Modal(props) {
  const { 
    modal, type, description, value, date,
    market, cheers, transport, home, trip, recreation, education, 
    salary, investiments, gift, others,
    handleClose, handleType, handleDescription, handleValue, handleDate,
    handleSave
  } = props

  return (
    <div className={`modal ${modal}`}>
      <form>
        <div>
          <h3>Inclusão de Lançamento</h3>
          <i className="material-icons" onClick={handleClose}>clear</i>
        </div>

        <fieldset>
          <legend>Tipo de lançamento</legend>
          <label>
            <span className="red">Despesa</span>
            <input type="radio" checked={type === '-'} value="-" onChange={handleType}></input>
          </label>
          <label>
            <span className="green">Receita</span>
            <input type="radio" checked={type === '+'} value="+" onChange={handleType}></input>
          </label>
        </fieldset>

        <fieldset>
          <legend>Categoria</legend>
          <div className="categories">
            {market} {cheers} {transport} 
            {home} {trip} {recreation} 
            {education}
            {salary} {investiments} {gift} 
            {others}
          </div>
        </fieldset>

        <div>
          <label>
            <span>Descrição</span>
            <input type="text" value={description} onChange={handleDescription} autoFocus></input>
          </label>
          <label>
            <span>Valor</span>
            <input type="number" value={value} onChange={handleValue}></input>
          </label>
          <label>
            <span>Data</span>
            <input type="date" value={date} defaultValue={date} onChange={handleDate}></input>
          </label>
        </div>

        <button onClick={handleSave}>Salvar</button>
      </form>
    </div>
  )
}

export default Modal
