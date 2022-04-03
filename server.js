// Dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");
const db = require("./db/db.json")

var app = express();
var PORT = process.env.PORT || 3001;

// app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});


app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
})

app.route("/api/notes")
    .get(function (req, res) {
        res.json(db);
    })


    .post(function (req, res) {
        let jsonFilePath = path.join(__dirname, "/db/db.json");
        let newNote = req.body;

        let highestId = 99;
        for (let i = 0; i < db.length; i++) {
            let individualNote = db[i];

            if (individualNote.id > highestId) {
              
                highestId = individualNote.id;
            }
        }
       
        newNote.id = highestId + 1;
      
        db.push(newNote)


        fs.writeFile(jsonFilePath, JSON.stringify(db), function (err) {

            if (err) {
                return console.log(err);
            }
        });
        
        res.json(newNote);
    });


app.delete("/api/notes/:id", function (req, res) {
    let jsonFilePath = path.join(__dirname, "/db/db.json");
    
    for (let i = 0; i < db.length; i++) {

        if (db[i].id == req.params.id) {
           
            db.splice(i, 1);
            break;
        }
    }
    
    fs.writeFileSync(jsonFilePath, JSON.stringify(db), function (err) {

        if (err) {
            return console.log(err);
        } else {
            console.log("Note deleted");
        }
    });
    res.json(db);
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
