var express = require('express');
var app = express();
var server = require('http').createServer(app);
var path = require('path');


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req,res){
	
	res.sendFile(__dirname + '/index.html');

});

app.use(express.static(path.join(__dirname, 'public')));
server.listen(process.env.PORT || 4001);
console.log('server running....');