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

  useEffect(()=> {
    // seedDummyData();
    // window.localStorage.clear();
    const storedData = window.localStorage.getItem("todos");
    if(storedData) {
      setTodos(JSON.parse(storedData));
      setListLen(todos.length);
    }
    console.log(todos, "useEffect");
  },[listLen])

  const handleAdd = () => {
    setAddMode(true);

  }

  const handleSave = () => {

  }

  const handleEdit = () => {
    setEditMode(true);
  }

  const handleClick = (event) => {
    const btnId = event.target.id;
    const [btnType, idx] = btnId.split('-');
    if(btnType === "delete"){
      const update = todos.filter((todo, index)=> index !== Number(idx));
      window.localStorage.setItem('todos', JSON.stringify(update))
      setListLen(listLen - 1);
      console.log(todos, update, "handleClick");
    } else {
      todos.forEach((todo, index) => console.log(index, idx));
      console.log(todos);
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
              {addMode && <ToDoForm />}
              {todos.length > 0 && todos.map((todo, idx) => {
                return (
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
