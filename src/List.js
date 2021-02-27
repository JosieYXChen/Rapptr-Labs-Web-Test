import './List.css';
import { useState, useEffect } from 'react';
import ToDoForm from './ToDoForm';

const List = () => {
  const [editMode, setEditMode] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const [todos, setTodos] = useState([]);
  const [listLen, setListLen] = useState(0);
  const [edit, setEdit] = useState("");
  const [editIdx, setEditIdx] = useState(-1);
  const [searchWord, setSearchWord] = useState("");

  useEffect(()=> {
    const storedData = window.localStorage.getItem("todos");
    if(storedData) {
      setTodos(JSON.parse(storedData));
      setListLen(todos.length);
    }
  },[listLen, editMode, searchWord])

  const handleAdd = () => {
    setAddMode(true);
  }

  const handleEdit = () => {
    setEditMode(true);
  }

  const handleSave = () => {
    const formatted = edit[0].toUpperCase() + edit.slice(1);
    if(addMode) todos.unshift(formatted);
    if(editMode) todos.splice(editIdx, 1, formatted);
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

  const handleChange = (event) => {
    if(event.target.name === "edit") setEdit(event.target.value);
    if(event.target.name === "search") setSearchWord(event.target.value.toLowerCase())
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
                <input name="search" placeholder="search" maxLength="25" minLength="1" value={searchWord} onChange={handleChange}></input>
              </div>
              <button type="button" className="button" id="add-btn" onClick={handleAdd}>New</button>
            </div>
            <div className="list-items">
              {addMode && <ToDoForm edit={edit} handleChange={handleChange} handleSave={handleSave}/>}
              {todos.length > 0 && todos.map((todo, idx) => {
                if (searchWord && !todo.toLowerCase().includes(searchWord)) return null;
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
