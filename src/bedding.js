'use strict';
const server = require('./server');

const bedding = server.io;

bedding.on('connection', (socket) => {
  socket.on('joinBed', (payload) => {
    console.log('inside the bedding', payload.userInfo);
    console.log('inside the bedding', payload.productId);
    bedding.to(payload.userInfo).emit('joinProductBid', payload.productId);
  });
  //   console.log('this is trest', bedding.adapter.rooms);
  socket.on('join', (payload) => {
    socket.join(payload);
    console.log(socket.id, ' joined ', payload);
    console.log(bedding.adapter.rooms[payload]);
  });
});
