const express = require("express");
const app = express();

app.get(["/","/index","/index.html"], function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.use(function(req, res, next) {
    res.status(404).send("<h1>ERROR 404</h1><h2>Page Not Found</h2>");
});

app.listen(8000, function () {
  console.log("Listening on port 8000!");
});