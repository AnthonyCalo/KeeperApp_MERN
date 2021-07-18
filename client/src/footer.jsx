import React from "react";
import ReactDOM from "react-dom";

function Footer(){
    let Day = new Date();
    let year= Day.getFullYear();

    return(
            <footer>Copyright© { year }</footer>
        );
}

export default Footer