const express = require('express');
const bodyParser = require('body-parser');
const http = require("http");
var path = require('path');
const app = express();
var config =  require('./config.json')

let cookieParser = require('cookie-parser');
app.use(cookieParser());
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

require('./route/route.js')(app);

var server = http.createServer(app);
server.listen(config.server.port, config.server.fqdn);
// server.on('error', onError);
// server.on('listening', onListening);
