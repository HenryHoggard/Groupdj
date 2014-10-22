// set variables for environment
var express = require('express');
//var app = express();
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var app = module.exports.app = express();
var server = http.createServer(app);

mongoose.connect('mongodb://localhost:27017/groupplay', function (error) {
    if (error) {
        console.log(error);
    }
});
var io = require('socket.io').listen(server);  //pass a http.Server instance
server.listen(3000);
// Set server port
//app.listen(3000);
console.log('server is running');

io.sockets.on('connection', function(socket){
  console.log('a user connected');
});
// views as directory for all template files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade'); // use either jade or ejs       
// instruct express to server up static assets
app.use(express.static('public'));

var indexController = require('./index');
var partyController = require('./party');
// set routes
app.get('/', indexController.index);
app.get('/party/:room',partyController.index);


io.on('connection', function(socket){
  socket.on('addsong', function(song,room){
    console.log(room);
    io.sockets.emit('newsong', song);
    partyController.addSong(song, room);
  });
  socket.on('deletesong', function(song,room){
   io.sockets.emit('deletedsong', song);
   partyController.deleteSong(song, room);
  });
});
