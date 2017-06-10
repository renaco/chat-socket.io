var socket = io.connect('http://192.168.1.41:6677', {'forceNew':true});

socket.on('messages', function(data){
  console.log(data);
//   console.table(data);
  render(data);
});

function render(data) {
  var html = data.map(function(message, index){
      return (`
        <div class="message">
            <strong>${message.nickname}<strong>
            <p>${message.text}</p>
        </div>
      `);
  }).join(' ');

  var getMessage = document.getElementById('messages');
  getMessage.innerHTML = html;
  getMessage.scrollTop = getMessage.scrollHeight;
}

function addMessage(e) {
    var getNickName = document.getElementById('nickname'),
        getText = document.getElementById('text');

    var message = {
        nickname: getNickName.value,
        text: getText.value
    };

    getNickName.style.display = 'none';
    socket.emit('add-message', message);

    text.value = '';

    return false;
}