var socket = io('/bedding');
var message = document.getElementById('message'),
  handle = document.getElementById('handle'),
  btn = document.getElementById('send'),
  output = document.getElementById('output'),
  feedback = document.getElementById('feedback');

var display = document.querySelector('#time');

let price = document.getElementById('price');
let startDate = document.getElementById('start_time');
let endDate = document.getElementById('end_time');
let products;
var fiveMinutes;
let array = document.URL.split('/');
let productId = array[array.length - 1];

const user_id = document.cookie.split('=')[1];
let sendObj = {
  user: user_id,
  productId: productId,
};
socket.emit('join', sendObj);
// socket.on('joinBidRoom', (payload) => {
//   socket.emit('join', payload);
// });
socket.on('username', (username) => {
  handle.value = username;
});

btn.addEventListener('click', function () {
  socket.emit('chat', {
    message: message.value,
    handle: handle.value,
    productId: productId,
  });
  message.value = '';
});
message.addEventListener('keypress', function () {
  socket.emit('typing', { message: handle.value, productId: productId });
});
// Listen for events
socket.on('chat', function (data) {
  feedback.innerHTML = '';
  output.innerHTML +=
    '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';

  if (parseInt(price.innerHTML) < parseInt(data.message)) {
    price.innerHTML = data.message;
  }
});

socket.on('typing', function (data) {
  feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});

socket.on('joinBidding', (payload) => {
  console.log('inside bid.js', payload);
  socket.emit('join', payload);
});

socket.on('changeTime', (payload) => {});

function startTimer(duration, display) {
  var timer = duration,
    minutes,
    seconds;
  setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    display.textContent = minutes + ':' + seconds;
    if (--timer < 0) {
      timer = duration;
    }
    socket.emit('timer', { timer: timer, productId: productId });
  }, 1000);
}
window.onload = function () {
  // fiveMinutes = 60 * 2;
  // startTimer(fiveMinutes, display);
  startDate.innerHTML = startDate.innerHTML.split('GMT')[0].trim();
  let day = parseInt(startDate.innerHTML.split(' ')[2]) + 1;
  let array = startDate.innerHTML.split(' ');
  array.splice(2, 1, day.toString());
  endDate.innerHTML = array.join(' ');
};
