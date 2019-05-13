var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('client'));

app.get('/hello-world', function(req, res){
  res.status(200).send('Hello world.');
});


var messages = [{
  id: 1,
  text: 'Welcome to private chat with NodeJS & socketio of triay0',
  nickname: 'bot / triay0'
}];

io.on('connection', function(socket){
  console.log(socket.handshake.address + ' Has been connected to socket');

  socket.emit('messages', messages);
  socket.on('add-message', function(data){
    messages.push(data);
    io.sockets.emit('messages', messages); //Emitir a todos los clientes conectados
  });
});//Metodo encargado de recibir conexiones de clientes y detectar cuando se conecta un cliente

server.listen(6677, function(){
  console.log('Server running in http://localhost:6677');
});
