import './List.css';
import { useState, useEffect } from 'react';

const List = () => {
  const [editMode, setEditMode] = useState(false);
  const [todos, setTodos] = useState([]);
  const [listLen, setListLen] = useState(0);

  useEffect(()=> {
    if(window.localStorage.todos) setTodos(JSON.parse(window.localStorage.getItem('todos')));
    setListLen(todos.length);
  },[listLen])

  return (
    <div className="max-width">
      <button type="button">Logout</button>
      <div className="center">
        <div className="List">
          <h1 className="title">My To-Do List</h1>
          <div className="container">
            <div className="search-add">
              <input placeholder="search"></input>
              <button type="button">New</button>
            </div>
            <div className="list-items">
                {todos.length && todos.map((todo, idx) => {
                  return (<div id={`todo${idx}`}><div>{todo.name}</div><i className="fas fa-pencil-alt"></i><i className="fas fa-trash-alt"></i></div>)
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default List;
