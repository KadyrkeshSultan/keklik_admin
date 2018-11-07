"use strict";

let express = require("express");
let app = express();

app.use(express.static(__dirname + "/static"));

app.get('/admin', function(req, res) {
    res.sendfile("static/index.html");
});

app.get('/', function(req, res) {
    res.sendfile("static/index.html");
});

const APPLICATION_PORT = 3000;
const port = process.env.PORT || APPLICATION_PORT;
app.listen(port);

console.log("Server works on port: " + port);
