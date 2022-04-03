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

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
