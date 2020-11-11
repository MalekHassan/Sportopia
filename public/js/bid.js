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

window.onload = function () {
  startDate.innerHTML = startDate.innerHTML.split('GMT')[0].trim();
  let day = parseInt(startDate.innerHTML.split(' ')[2]) + 1;
  let array = startDate.innerHTML.split(' ');
  array.splice(2, 1, day.toString());
  endDate.innerHTML = array.join(' ');
  updatePrice(price, productId);
};

// function to update the price in the data base

function updatePrice(price, productId) {
  array = document.URL.split('/');
  productId = array[array.length - 1];
  console.log('first Step ', price, productId);
  socket.emit('updatePrice', { price: price.innerHTML, productId: productId });
  setTimeout(() => {
    updatePrice(price);
  }, 10000);
}

socket.on('updatePrice', (payload) => {
  console.log(payload.price.price);
  price.innerHTML = payload.price.price;
});
