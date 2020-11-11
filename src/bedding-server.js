/* eslint-disable comma-dangle */
'use strict';
const server = require('./server');
require('dotenv').config();
const userModel = require('./models/users/users-collection');
const client = require('./models/pool');
const BIDDING_ROOM = process.env.BIDDING_ROOM;
const bedding = server.io;

bedding.on('connection', (socket) => {
  // socket.on('joinBed', (payload) => {
  //   if (payload.userInfo) {
  //     console.log('inside the bedding', payload.userInfo.user_name);
  //     console.log('inside the bedding', payload.userInfo.u_id);
  //     bedding.emit('joinBidRoom', BIDDING_ROOM);
  //   } else {
  //     console.log('you are not registered');
  //   }
  // });
  socket.on('join', async (payload) => {
    console.log('inside server.js', payload);
    let userInfo = await getUser(payload.user);
    console.log(userInfo);
    if (userInfo) {
      socket.join(payload.productId);
      notifyTheSeller(payload.productId, userInfo.id);
      socket.emit('username', userInfo.user_name);
      console.log(bedding.adapter.rooms[payload.productId]);
    } else {
      console.log('you are not registered');
    }
  });
  // Handle chat event
  socket.on('chat', function (data) {
    // console.log(data);
    bedding.to(data.productId).emit('chat', data);
  });

  // Handle typing event
  socket.on('typing', function (data) {
    bedding.to(data.productId).emit('typing', data.message);
  });
  // Bidding Rooms
  // socket.on('joinBidding', (payload) => {
  //   console.log(payload);
  //   bedding.emit('joinBidding', payload);
  // });

  // socket.on('joinEvent', (payload) => {
  //   console.log(socket.id, payload);
  //   socket.join(payload);
  // });

  //****  Seller events ******//

  socket.on('sellerRooms', async (payload) => {
    let user = await getUser(payload);
    console.group(user);
    if (user.user_role === 'seller') {
      let sellerNotif = await getSellerNotif(user.id);
      socket.join(payload);
      bedding.to(payload).emit('logMessage', sellerNotif);
    }
  });

  // price

  socket.on('updatePrice', async (payload) => {
    let productId = parseInt(payload.productId);
    let price = parseInt(payload.price);
    await client
      .query('update products set price=$1 where id=$2 returning price', [
        price,
        productId,
      ])
      .then((result) => {
        price = result.rows[0];
        bedding.to(payload.productId).emit('updatePrice', { price: price });
      });
  });
});

async function getUser(userId) {
  userId = parseInt(userId);
  let userRole = await client
    .query('select * from users where u_id=$1', [userId])
    .then((result) => result.rows[0]);
  return await userModel.sellerOBuyer(userRole);
}

async function notifyTheSeller(productId, userId) {
  productId = parseInt(productId);
  userId = parseInt(userId);
  let sellerId = parseInt(await getSellerId(productId));
  await client.query(
    'INSERT INTO seller_notify (s_id,p_id,u_id) VALUES ($1,$2,$3)',
    [sellerId, productId, userId]
  );
}

async function getSellerId(productId) {
  return await client
    .query('select seller_id from products where id=$1', [productId])
    .then((result) => result.rows[0].seller_id);
}

async function getSellerNotif(sellerId) {
  sellerId = parseInt(sellerId);
  return await client
    .query(
      'select buyer.first_name,buyer.last_name,products.name,seller_notify.created_at from seller_notify inner join buyer on seller_notify.u_id = buyer.id inner join products on seller_notify.p_id = products.id where s_id=$1',
      [sellerId]
    )
    .then((result) => result.rows);
}
