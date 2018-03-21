var express = require("express");
var mongoose = require("mongoose");

const DB_NAME = "NOSQLPROJECT";

mongoose.connect("mongodb://localhost/"+DB_NAME);
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));


var app = express();

app.use("/dist", express.static(__dirname + "/node_modules/bootstrap/dist/css"));
app.use("/css", express.static(__dirname + "/css"));

app.use("/", require("./router"));

console.log("App lancée sur le port 3000");
app.listen(3000);