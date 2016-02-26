"use strict";

var express = require('express'),  
    app     = express(),
    port    = process.env.PORT || 8068,
    server  = app.listen(port),
    io      = require('socket.io').listen(server);

var Twit = require('twit');

var T = new Twit(  
{
	consumer_key:         'PIWIBShEWqWN2fcnoVaVQqNEE',
	consumer_secret:      'i5d8caSKBNGW03AYyr4AhqXT4LA6NjrFBigG1mIbcyXXWgkuhq',
	access_token:         '1421818958-Z9FXZcbfx2diP0fILC2AWXupUknn287W3g2MMfs',
	access_token_secret:  'eXZqnKqXGGOlsZLdqul62snVIh5gKEHn0KwIvmqk1V5Gc'
});

app.use(express.static(__dirname + '/public'));

require('./socket.js')(io, T);

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

console.log('App listening on port ' + port);