import React, { useState, useEffect } from "react";
import inputBox from "../../components/notes/inputBox";
import { getDataFromStore,setDataInStore} from '../../service/localStorage';
const NotesList = () => {
  const [notesList, setNotesList] = useState([


  ]);
  const [notesText, setNotesText] = useState("");

  const handleInputChange = (e) => {
    setNotesText(e.target.value);
  };

  const handleAddToDo = (noteid)=>{

    const newTodo = {
            todoId:'todoID-'+Math.random(),
            todoItem:''
    }
    // fetch from noteid
    const exisitngList = [...notesList];
    const indexOfNote = exisitngList.findIndex((noteObj=>noteObj.noteId===noteid))
    const exisitngNoteObj = exisitngList[indexOfNote];
    // append the new todo
    exisitngNoteObj?.todos?.push(newTodo)
   setNotesList(exisitngList);
   setDataInStore(exisitngList);
    
  }

  const handleAddNote = ()=>{
    let newNote = {}
    console.log('handleAddNote')
    if(notesList.length > 0){
        // fetch exisitng data
        const existingData = [...notesList];
        newNote = {
            noteId:'noteID-'+Math.random(),
            todos:[
                {
                    todoId:'todoID-'+Math.random(),
                    todoItem:notesText
                }
            ]

        }
        existingData.push(newNote)
        setNotesList(existingData)
        setDataInStore('notesList',existingData)
        console.log('handleAddNote if ',notesList)
    }else{
        console.log('handleAddNote else ')
        // add new data
        newNote = {
            noteId:'noteID-'+Math.random(),
            todos:[
                {
                    todoId:'todoID-'+Math.random(),
                    todoItem:notesText
                }
            ]

        }
        const newNotes = []
        newNotes.push(newNote);
        setDataInStore('notesList',newNotes)
        setNotesList(newNotes);
    }

    // add new note to localstorage
//     setNotesList((prevState)=>{

//         return{
//             ...prevState,
//             noteId:'noteID-'+Math.random()
//         }
//     })
setNotesText('')
  }

  useEffect(() => {
    // grab data from local storage and setState
    const dataFromStore = getDataFromStore('notesList');
    if(dataFromStore && dataFromStore.length > 0){
        setNotesList(dataFromStore)
    }  
  },[]);

  console.log(notesList)
  return (
    <div className="container">
      {/* <inputBox
        value={notesText}
        name={"notesText"}
        onChangeInput={handleInputChange}
      /> */}
      <input
        value={notesText}
        name={"notesText"}
        onChange={handleInputChange}
      />
      <button onClick={handleAddNote}>Add note</button>

      <div
      style={{
        display:"flex",
        width:'100%',
        height:'100%',
      }}
      >
          {notesList.length>0 && notesList.map(singleNote=>{
              return(
                  <div key={singleNote.noteId} style={{
                    display:"flex",
                    width:'15rem',
                    height:'15rem',
                    background:'blue',
                    margin:'1rem',
                    flexDirection:'column'
                  }}>
                      {singleNote.todos.length>0 && singleNote.todos.map((singleTodo=>{
                          return(
                              <input style={{
                                  height:'10px'
                              }} key={singleTodo.todoId} value={singleTodo.todoItem}/>
                          )
                      }))}
                      <button style={{
                          height:'25px'
                      }}
                      onClick={()=>handleAddToDo(singleNote.noteId)}
                      >Add</button>
                  </div>
              )
          })}
      </div>
    </div>
  );
};

export default NotesList;
