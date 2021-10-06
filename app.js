var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

var assets = require(routes/assets)
app.uses("assets, assets")

var routes = require(routes/index)
app.uses("index, index")

module.exports = app;
