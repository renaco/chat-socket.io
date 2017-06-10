var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('client'));

app.get('/hola-mundo', function(req, res){
  res.status(200).send('Hola mundo');
});

var messages = [{
  id: 1,
  text: 'Welcome to chat',
  nickname: 'Bot - renaco'
}]

io.on('connection', function(socket){
  console.log("The node with IP " + socket.handshake.address + " Is connect");
  socket.emit('messages', messages)
  socket.on('add-message', function(data){
    messages.push(data);
    io.sockets.emit('messages', messages);
  })
});

server.listen(6677, function(){
  console.log('Server is running in http://localhost:6677');
});

