var express = require('express');
var path = require('path');

var app = express();

app.use('/', indexRouter);
app.use('/users', usersRouter);

var assets = require(/routes/assets)
app.uses("/assets, assets")

var routes = require(/routes/index)
app.uses("/index, index")

module.exports = app;
