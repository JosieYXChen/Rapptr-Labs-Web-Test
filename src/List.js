import './List.css';
import { useState, useEffect } from 'react';
import ToDoForm from './ToDoForm';


const seedDummyData = () => {
  window.localStorage.setItem('todos', JSON.stringify([ "Workout", "Pay bills", "Get lunch"]));
}

const List = () => {
  const [editMode, setEditMode] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const [todos, setTodos] = useState([]);
  const [listLen, setListLen] = useState(0);
  const [edit, setEdit] = useState("");
  const [editIdx, setEditIdx] = useState(-1)

  useEffect(()=> {
    // seedDummyData();
    // window.localStorage.clear();
    const storedData = window.localStorage.getItem("todos");
    if(storedData) {
      setTodos(JSON.parse(storedData));
      setListLen(todos.length);
    }
    console.log(todos, "useEffect");
  },[listLen, editMode])

  const handleAdd = () => {
    setAddMode(true);
  }

  const handleSave = () => {
    const formatted = edit[0].toUpperCase() + edit.slice(1);
    if(addMode) todos.unshift(formatted);
    if(editMode) todos.splice(editIdx, 1, edit);
    console.log(todos);
    window.localStorage.setItem('todos', JSON.stringify(todos));

    setEdit("");
    if(addMode) {
      setListLen(listLen + 1);
      setAddMode(false);
    }
    if(editMode){
      setEditIdx(-1);
      setEditMode(false);
    }
  }

  const handleEdit = () => {
    setEditMode(true);
  }

  const handleChange = (event) => {
    setEdit(event.target.value);
  }

  const handleClick = (event) => {
    const btnId = event.target.id;
    const [btnType, idx] = btnId.split('-');
    if(btnType === "delete"){
      const update = todos.filter((todo, index)=> index !== Number(idx));
      window.localStorage.setItem('todos', JSON.stringify(update))
      setListLen(listLen - 1);
    } else {
      handleEdit();
      setEdit(todos[idx]);
      setEditMode(true);
      setEditIdx(Number(idx));
    }
  }

  return (
    <div className="max-width">
      <button type="button" className="logout-btn button">Logout</button>
      <div className="center">
        <div className="list">
          <h1 className="title">My To-Do List</h1>
          <div className="container">
            <div className="search-add">
              <div className="wrapper">
                <i className="fas fa-search icon"></i>
                <input placeholder="search" maxLength="25" minLength="1"></input>
              </div>
              <button type="button" className="button" id="add-btn" onClick={handleAdd}>New</button>
            </div>
            <div className="list-items">
              {addMode && <ToDoForm edit={edit} handleChange={handleChange} handleSave={handleSave}/>}
              {todos.length > 0 && todos.map((todo, idx) => {
                if (editMode && idx === editIdx) {
                  return <ToDoForm key={`todo${idx}`} edit={edit} handleChange={handleChange} handleSave={handleSave}/>}
                else return (
                <div key={`todo${idx}`} className="item">
                  <span className="todo-name">{todo}</span>
                  <span className="icons"><i id={`edit-${idx}`} className="fas fa-pencil-alt edit-btn" onClick={handleClick}></i><i className="fas fa-trash-alt delete-btn" id={`delete-${idx}`} onClick={handleClick}></i></span>
                </div>)
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default List;
