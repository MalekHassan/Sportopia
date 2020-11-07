'use strict';
const express = require('express');
const favModel = require('../models/products/favoriteProduct-collection');
// const client = require('../models/pool');

const router = express.Router();

// Routes
router.post('/add/:id', favoriteAddProd);
router.delete('/delete', favoriteDeleteProd);

// adding function to favorite products (table : buyer_favorite)
async function favoriteAddProd(req, res) {
  let productInfo = await favModel.addToFavorite(req.params, req.body);
  res.status(201);
  console.log(productInfo);
  res.json({
    message: 'A new product has been added to the cart',
    user: productInfo,
  });
}

// To delete products from the cart  (table : buyer_cart)
async function favoriteDeleteProd(req, res) {
  let productInfo = await favModel.deleteFromCart(req.params.id);
  res.status(201);
  console.log(productInfo);
  res.json({
    message: 'A product has been deleted from the cart',
    user: productInfo,
  });
}
module.exports = router;
