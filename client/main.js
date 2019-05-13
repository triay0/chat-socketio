var socket = io.connect('http://localhost:6677', {
  'forceNew': true
});

socket.on('messages', function(data) {
  console.log(data);
  render(data);
});

function render(data) {
  var html = data.map(function(message, index) {
    return (`
      <div class='message'>
      <strong> ${message.nickname} </strong> says:
      <p>${message.text}</p>
      </div>
      `);
  }).join(' ');

  document.getElementById('messages').innerHTML = html;
}


function addMessage(e) {
  var payload = {
    nickname: document.getElementById('nickname').value,
    text: document.getElementById('text').value
  };

  document.getElementById('nickname').style.display = 'none';
  socket.emit('add-message', payload);
}
