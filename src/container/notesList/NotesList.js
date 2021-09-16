import React, { useState, useEffect } from "react";
import inputBox from "../../components/notes/inputBox";
import { getDataFromStore, setDataInStore } from "../../service/localStorage";
import "./notesList.css";
const NotesList = () => {
  const [notesList, setNotesList] = useState([]);
  const [notesText, setNotesText] = useState("");
  // this will store the current noteid,todoId getting edited
  const [editingObj, setEditingObj] = useState({
    noteId: null,
    todoId: null,
  });
  const [editingText,setEditingText] = useState('');

  useEffect(() => {
    // grab data from local storage and setState
    const dataFromStore = getDataFromStore("notesList");
    if (dataFromStore && dataFromStore.length > 0) {
      setNotesList(dataFromStore);
    }
  }, []);

  useEffect(()=>{
    setDataInStore("notesList",notesList)
  },[notesList])

  const handleInputChange = (e) => {
    setNotesText(e.target.value);
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const newNoteObj = {
      noteId: "noteID-" + Math.random(),
      todos: [
        {
          todoId: "todoID-" + Math.random(),
          todoItem: notesText,
          checked: false,
        },
      ],
    };

    setNotesList((prevState) => {
      return [...prevState].concat(newNoteObj);
    });
    setNotesText("");
  };

  const handleDeleteNote = (noteIdToDel) => {
    const updatedNoteList = notesList.filter(
      (singleNote) => singleNote.noteId !== noteIdToDel
    );
    setNotesList(updatedNoteList);
  };

  const toggleComplete = (noteIdToggle, todoIdToggle) => {
    const oldNotesList = [...notesList];
    let noteObjIndex, oldNoteObj, todoObjIndex, oldtodoListObj;
    noteObjIndex = oldNotesList.findIndex(
      (singleNote) => singleNote.noteId === noteIdToggle
    );
    console.log("note index", noteObjIndex);
    if (noteObjIndex || noteObjIndex === 0) {
      // grab old note obj
      oldNoteObj = oldNotesList[noteObjIndex];
      console.log("notes obj", oldNoteObj);
    }
    todoObjIndex = oldNoteObj.todos.findIndex(
      (singleTodo) => singleTodo.todoId === todoIdToggle
    );
    console.log("todo index", todoObjIndex);
    if (todoObjIndex || todoObjIndex === 0) {
      // grab old todo
      oldtodoListObj = oldNoteObj.todos[todoObjIndex];
      console.log("todo obj", oldtodoListObj);
    }

    // change the todo checked:true
    oldtodoListObj.checked = !oldtodoListObj.checked;

    // change todo object inside noteobj
    oldNoteObj[todoObjIndex] = { ...oldtodoListObj };

    // change note object inside notelist
    oldNotesList[noteObjIndex] = { ...oldNoteObj };

    setNotesList([...oldNotesList]);
  };

  const handleEditButton = (noteidEdit, todoIdEdit) => {
    setEditingObj({
      noteId: noteidEdit,
      todoId: todoIdEdit,
    });
  };

  const handleEditingText = (e)=>{
      setEditingText(e.target.value)
  }

  const  handleSubmitEdit = (noteIdSubmit,todoIdSubmit)=>{
    const oldNotesList = [...notesList];
    let noteObjIndex, oldNoteObj, todoObjIndex, oldtodoListObj;
    noteObjIndex = oldNotesList.findIndex(
      (singleNote) => singleNote.noteId === noteIdSubmit
    );
    console.log("note index", noteObjIndex);
    if (noteObjIndex || noteObjIndex === 0) {
      // grab old note obj
      oldNoteObj = oldNotesList[noteObjIndex];
      console.log("notes obj", oldNoteObj);
    }
    todoObjIndex = oldNoteObj.todos.findIndex(
      (singleTodo) => singleTodo.todoId === todoIdSubmit
    );
    console.log("todo index", todoObjIndex);
    if (todoObjIndex || todoObjIndex === 0) {
      // grab old todo
      oldtodoListObj = oldNoteObj.todos[todoObjIndex];
      console.log("todo obj", oldtodoListObj);
    }

    // change the todo item to edited value
    oldtodoListObj.todoItem = editingText;

    // change todo object inside noteobj
    oldNoteObj[todoObjIndex] = { ...oldtodoListObj };

    // change note object inside notelist
    oldNotesList[noteObjIndex] = { ...oldNoteObj };

    setNotesList([...oldNotesList]);
    setEditingObj({
    noteId: null,
    todoId: null,
    })
    setEditingText('')
  }


  const handleAddToDo = (noteIdAddTodo)=>{
    const oldNotesList = [...notesList];
    let noteObjIndex, oldNoteObj;
    noteObjIndex = oldNotesList.findIndex(
      (singleNote) => singleNote.noteId === noteIdAddTodo
    );
    console.log("note index", noteObjIndex);
    if (noteObjIndex || noteObjIndex === 0) {
      // grab old note obj
      oldNoteObj = oldNotesList[noteObjIndex];
      console.log("notes obj", oldNoteObj);
    }
    const newTodoObj = {
            todoId: "todoID-" + Math.random(),
            todoItem: '',
            checked: false,
      };
    const newTodoList = [...oldNoteObj.todos].concat(newTodoObj);
    oldNoteObj.todos = newTodoList;
    oldNotesList[noteObjIndex] = {...oldNoteObj};
    setNotesList([...oldNotesList]);
  }

  console.log(notesList);
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleInputChange} value={notesText} />
        <button type="submit">Add Todo</button>
      </form>
      <div
        className="notesListContainer"
      >
        {notesList.length > 0 &&
          notesList.map((singleNote) => {
            return (
              <div
                className="singleNoteBlock"
                key={singleNote.noteId}
              >
                  <div className="button_container">
                  <button
                  className="delete_button"
                  onClick={() => handleDeleteNote(singleNote.noteId)}
                >
                  x
                </button>
                  </div>
                {singleNote.todos.map((singleTodo) => {
                  return (
                    <div className="todo" key={singleTodo.todoId}>
                      {editingObj.noteId === singleNote.noteId &&
                      editingObj.todoId === singleTodo.todoId ? (
                        <input value={editingText} onChange={handleEditingText} />
                      ) : (
                        singleTodo.todoItem
                      )}
                      <input
                        type="checkbox"
                        onChange={() =>
                          toggleComplete(singleNote.noteId, singleTodo.todoId)
                        }
                        checked={singleTodo.checked}
                      />
                      {editingObj.noteId === singleNote.noteId &&
                      editingObj.todoId === singleTodo.todoId ? (
                        <button
                        onClick={() =>
                          handleSubmitEdit(singleNote.noteId, singleTodo.todoId)
                        }
                      >
                        Submit
                      </button>
                      ) :(
                        <button
                        onClick={() =>
                          handleEditButton(singleNote.noteId, singleTodo.todoId)
                        }
                      >
                        Edit
                      </button>
                      )
                    
                    }

                    </div>
                  );
                })}
                <button onClick={()=>handleAddToDo(singleNote.noteId)}>Add TODO</button>

              </div>
            );
          })}
      </div>
    </div>
  );
};

export default NotesList;
