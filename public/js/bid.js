var socket = io('/bedding');
var message = document.getElementById('message'),
  handle = document.getElementById('handle'),
  btn = document.getElementById('send'),
  output = document.getElementById('output'),
  feedback = document.getElementById('feedback');

let products;

const user_id = document.cookie.split('=')[1];
socket.emit('join', user_id);
socket.on('joinBidRoom', (payload) => {
  socket.emit('join', payload);
});
socket.on('username', (username) => {
  handle.value = username;
});

btn.addEventListener('click', function () {
  socket.emit('chat', {
    message: message.value,
    handle: handle.value,
  });
  message.value = '';
});
message.addEventListener('keypress', function () {
  socket.emit('typing', handle.value);
});
// Listen for events
socket.on('chat', function (data) {
  feedback.innerHTML = '';
  output.innerHTML +=
    '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', function (data) {
  feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});
