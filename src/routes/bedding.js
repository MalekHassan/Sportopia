/* eslint-disable comma-dangle */
'use strict';
// dependencies
const express = require('express');
const router = express.Router();
const ioClient = require('socket.io-client');
const userModel = require('../models/users/users-collection');
const client = require('../models/pool');
const cors = require('cors');

// routes

// This route only for products
let clientConnection;
router.get('/:id', async (req, res) => {
  console.log(req.params);
  const user = req.params.id;

  const userId = user;
  if (userId) {
    let userDb = await getUser(userId);
    if (userDb) {
      let allProducts = await getProducts();
      res.json({
        allProducts,
      });
      // res.render('bidding', { products: allProducts });
    } else {
      res.json({
        message: 'You are not registered',
      });
    }
  } else {
    res.json({
      message: 'You are not registered',
    });
  }
});

router.get('/:id', cors(), async (req, res) => {
  let product = await getProduct(req.params.id);
  res.json({
    product,
  });
  clientConnection = ioClient.connect(
    'https://sportopiav1.herokuapp.com/bidding'
  );
  clientConnection.emit('joinBidding', {
    user: req.headers.authorization,
    productId: req.params.id,
  });
});

async function getUser(userId) {
  let userRole = await client
    .query('select * from users where u_id=$1', [userId])
    .then((result) => result.rows[0]);
  return await userModel.sellerOBuyer(userRole);
}

async function getProducts() {
  return await client
    .query(
      'select * from products  where is_bid = true and is_finished = false and is_deleted = false'
    )
    .then((result) => result.rows);
}

async function getProduct(id) {
  return await client
    .query('select * from products where id=$1', [id])
    .then((result) => result.rows[0]);
}
module.exports = router;
