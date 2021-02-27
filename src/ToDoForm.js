import './ToDoForm.css'

const ToDoForm = (props) => {
  const {edit, handleChange, handleSave} = props;
  return (
    <div className="edit-item">
      <input name="edit" onChange={handleChange} value={edit}></input>
      <button className="save-btn" type="button" onClick={handleSave}>Save</button>
    </div>
  )
}

export default ToDoForm;
