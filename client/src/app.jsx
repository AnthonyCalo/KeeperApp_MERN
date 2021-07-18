import React, {useState} from "react";
import Header from "./header";
import Footer from "./footer";
import Note from "./note";
import notes from "./notes.js";
import CreateArea from "./newNote";
import axios from "axios";
import GetNotesButt from "./getnotesbutton";

var notesList=null;






class App extends React.Component {
    constructor(){
        super();
        this.getNotes = this.getNotes.bind(this);
    }
    state = {
        title: '',
        body: '',
        notes: []
      };
    
    componentDidMount = () => {
        this.getNotes();
      };
    
    deleteNote(id){
        //this recieves the props._id from onChecked function in note.jsx
        //sends DELETE to node server which deletes note with this id from the mongoDB
        fetch("http://localhost:3001/" + id, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
            }
        })
        window.location.reload();//reload the page to re-render the notes without the one just deleted
    }

    getNotes(){
        //using axios to test the module. Fetch works as well
        axios.get('http://localhost:3001')
            .then((response) => {
            const data = response.data;
            this.setState({ notes: data });
            //console.log('Data has been received!!');
            })
            .catch(() => {
            alert('Error retrieving data!!!');
            });
        }
        
    displayNotes=(notes)=>{
        if(!notes.length) return null;

        return(notes.map((note, index)=>(
            //create a note item for each note in mongoDB
            <Note
                key={index}
                id={note._id} 
                title={note.title}
                body={note.body}
                onChecked={this.deleteNote}
            />   
        )));
    };

    addNote(newNote){
        //sends post request to node server
        //newnote is in the body of the request 
        fetch("http://localhost:3001/", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "title" : newNote.title,
                "body" : newNote.body
                })
            }).then(()=>{
                console.log("data was sent correctly");
            })
        .catch((err)=>{console.log("error: " + err);})
        window.location.reload();

    }


    //console.log(Header());
    render() {
        return(
            <div>
                <Header />
                <CreateArea 
                    onSubmit={this.addNote}
                />                
                <div className="notes">
                    {this.displayNotes(this.state.notes)}
                </div>
                <Footer />
            </div>
            );}
    } 
 

export default App;






