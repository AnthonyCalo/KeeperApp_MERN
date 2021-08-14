const express = require('express');
// const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const path = require('path');
const cors = require('cors');
const { title } = require('process');

const app = express();
app.use(express.urlencoded({
    extended: true
  }));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build', 'index.html')));

// without this the react-client wouldn't be able to connect to the server. Get cross origin errors
app.use(cors());

mongoose.connect('mongodb://localhost:27017/keeper_db',  { useUnifiedTopology: true, useNewUrlParser: true });

const noteSchema = {
    title: String,
    body: String
}

const Notes = mongoose.model("Notes", noteSchema);


//sends all notes back 
app.get('/', function(req, res){
    Notes.find({},function(err, notes){
        if(!err){
            res.send(notes)
        }else{
            console.log(err);
        }
    })
})

//recieves a new note from the client and adds it to the mongo DB
app.post('/', function(req, res){
    console.log("server is connect to react");
    console.log("Title: " + req.body.title);
    console.log("Body: " + req.body.body);
    const note = new Notes({
        title: req.body.title,
        body: req.body.body
    })
    note.save();
})

app.delete('/:id', function(req, res){
    const note_id = req.params.id
    Notes.deleteOne( {_id : note_id }, function(err){
        if(!err){
            console.log("deleted succesfully");
        }else{
            console.log(err);
        }
    })
})

app.listen(3001, function(){
    console.log("Server listening on port 3001");
})

