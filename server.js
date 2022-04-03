// Dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");
const database = require("./develop/db/db.json")

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.static('public'));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});


app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
})


app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
