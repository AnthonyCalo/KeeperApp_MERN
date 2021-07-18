import { PromiseProvider } from "mongoose";
import React from "react";
import ReactDOM from "react-dom";

function Note(props){
    return(
        <div className="note" >
            <h1>{props.title}</h1>
            <p>{props.body}</p>
            <button onClick={() => {
            props.onChecked(props.id)}}>Delete</button>
        </div>
    )
}

export default Note;


