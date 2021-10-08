var express = require('express');
var path = require('path')
var cookieParser = require('cookie-parser');
var logger = require('morgan')

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


var routes = require("./routes/index")
app.use(routes)

app.listen(8080, () => {
    console.log("Servidor activo")
  });

module.exports = app;
