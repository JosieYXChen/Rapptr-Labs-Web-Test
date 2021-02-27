import './ToDoForm.css'

const ToDoForm = (props) => {
  const {edit, handleChange, handleSave, errMessage} = props;
  return (
    <div className="todo-form">
      <div className="edit-item">
        <input className={errMessage && "invalid"} name="edit" onChange={handleChange} value={edit} maxLength="25" minLength="1"></input>
        <button className="save-btn" type="button" onClick={handleSave}>Save</button>
      </div>
      {errMessage && <div className="errMsg">{errMessage}</div>}
    </div>
  )
}

export default ToDoForm;
