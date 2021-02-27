import './ToDoForm.css'

const ToDoForm = (props) => {
  const {edit, handleChange} = props;
  return (
    <div className="edit-item">
      <input name="edit" onChange={handleChange}>{edit}</input>
      <button className="save-btn" type="button">Save</button>
    </div>
  )
}

export default ToDoForm;
