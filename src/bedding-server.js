'use strict';
const server = require('./server');
require('dotenv').config();
const userModel = require('./models/users/users-collection');
const client = require('./models/pool');
const BIDDING_ROOM = process.env.BIDDING_ROOM;
const bedding = server.io;

bedding.on('connection', (socket) => {
  socket.on('joinBed', (payload) => {
    console.log('inside the bedding', payload.userInfo.user_name);
    console.log('inside the bedding', payload.userInfo.u_id);
    bedding.emit('joinBidRoom', BIDDING_ROOM);
  });
  socket.on('join', async (user_id) => {
    let userInfo = await getUser(user_id);
    socket.join(BIDDING_ROOM);
    console.log(userInfo.user_name, ' joined ', BIDDING_ROOM);
    console.log(bedding.adapter.rooms[BIDDING_ROOM]);
  });
});

async function getUser(userId) {
  userId = parseInt(userId);
  let userRole = await client
    .query('select * from users where u_id=$1', [userId])
    .then((result) => result.rows[0]);
  return await userModel.sellerOBuyer(userRole);
}
