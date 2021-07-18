import React from "react";


function GetNotesButt(){
    var notess={};
    function getNotes(){
        fetch("http://localhost:3001/")
            .then(response=>response.json())
            .then(data=>{
                data.forEach(note=>{
                    console.log(note);
                })
            }
            )
            .catch(e=>{console.log("There was an error recieving data")})

            
    }
    return(
        <div>
            <button className="getNotes" onClick={getNotes}>get notes</button>
        </div>)
}

export default GetNotesButt;