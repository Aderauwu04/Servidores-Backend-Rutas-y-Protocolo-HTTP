var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.listen(8080, () => {
    console.log("Servidor activo")
  });

var routes = require("./routes/index")
app.use(routes)

module.exports = app;
