import './List.css';
import { useState, useEffect } from 'react';


const seedDummyData = () => {
  window.localStorage.setItem('todos', JSON.stringify([ "Workout", "Pay bills", "Get lunch"]));
}

const List = () => {
  const [editMode, setEditMode] = useState(false);
  const [todos, setTodos] = useState([]);
  const [listLen, setListLen] = useState(0);

  useEffect(()=> {
    // seedDummyData();
    // window.localStorage.clear();
    if(window.localStorage.todos) setTodos(JSON.parse(window.localStorage.getItem('todos')));
    setListLen(todos.length);
  },[listLen])



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
              <button type="button" className="button" id="add-btn">New</button>
            </div>
            <div className="list-items">
                {todos.length > 0 && todos.map((todo, idx) => {
                  return (<div id={`todo${idx}`} className="item">
                    <span className="todo-name">{todo}</span>
                    <span className="icons"><i className="fas fa-pencil-alt edit-btn"></i><i className="fas fa-trash-alt delete-btn"></i></span>
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
