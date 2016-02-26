"use strict";

var express = require('express'),  
    app     = express(),
    port    = process.env.PORT || 8000,
    server  = app.listen(port),
    io      = require('socket.io').listen(server);

var Twit = require('twit');

var T = new Twit(  
{
	consumer_key:         '',
	consumer_secret:      '',
	access_token:         '',
	access_token_secret:  ''
});

app.use(express.static(__dirname + '/public'));

require('./socket.js')(io, T);

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

console.log('App listening on port ' + port);