import React, {useState} from "react";
// defining the functions handchange and note state hooks within 
// newNote.jsx file rather than passing into app.jsx to clean the code

function CreateArea(props) {
    const [noteState, setNoteState] = useState({
        title: "",
        body: ""
    });
    const [expandNote, setExpand] = useState(false);

    function handleChange(event) {
        // name value are input value/ name 
        const { name, value } = event.target;
    
        setNoteState(prevNote => {
          return {
            ...prevNote,
            [name]: value
          };
        });
        //setExpand(true);

      }
    function Focus() {
      setExpand(true);
    }
    //props.onSUbmit will pass noteState as a parameter to whatever function
    //it is mapped to in app.js. In this case i will call a function
    //addNote to add note to notes list
    function handleSubmit(event){
        props.onSubmit(noteState);
        setNoteState({
            title: "",
            body: ""
        })
        setExpand(false);
        event.preventDefault();
    }
    

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <input 
                name="title"
                placeholder="Title"
                onChange={handleChange}
                value={noteState.title}
                onFocus={Focus}
                />
          <textarea 
                name="body"
                placeholder="Take a note..."
                onChange={handleChange} rows="3" 
                value={noteState.body}
                style={{display: expandNote ? "block" : "none"}} 
                />

        {/* enter creates a new line in textarea instead of submitting the form */}
          <button type="submit" style={{display: expandNote ? "block" : "none"}}>+</button>
        </form>
      </div>
    );
  }
  
  export default CreateArea;
  



