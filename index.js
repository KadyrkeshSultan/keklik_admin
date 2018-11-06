"use strict";

const PORT = 3000;

let express = require("express");
let app = express();

app.use(express.static(__dirname + "/static"));

app.get('/', function(req, res) {
    res.sendfile("static/index.html");
});

let port = PORT;
app.listen(port);

console.log("Server works on port: " + port);
