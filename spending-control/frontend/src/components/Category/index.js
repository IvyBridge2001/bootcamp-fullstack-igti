import './style.css'

function Category(props) {
  const { icon, name, category, visible, handleSelected } = props

  return (
    <label className={`category ${name === category ? 'selected' : ''} ${visible}`}>
      <input type="radio" value={name} name={name} onChange={handleSelected}></input>
      <i className="material-icons">{icon}</i>
      <span>{name}</span>
    </label>
  )
}

export default Category