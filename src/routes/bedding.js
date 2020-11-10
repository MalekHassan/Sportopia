'use strict';
// dependencies
const express = require('express');
const router = express.Router();
const ioClient = require('socket.io-client');
const userModel = require('../models/users/users-collection');
const client = require('../models/pool');

// routes

router.get('/', async (req, res) => {
  const userId = parseInt(req.headers.cookie.split(' ')[1].split('=')[1]);
  if (userId) {
    let userDb = await getUser(userId);
    if (userDb) {
      const clientConnection = ioClient.connect(
        'http://localhost:8000/bedding'
      );
      clientConnection.emit('joinBed', {
        userInfo: userDb,
      });
      res.render('bidding');
    } else {
      res.render('sorry');
    }
  } else {
    res.render('sorry');
  }
});

async function getUser(userId) {
  let userRole = await client
    .query('select * from users where u_id=$1', [userId])
    .then((result) => result.rows[0]);
  return await userModel.sellerOBuyer(userRole);
}
module.exports = router;
