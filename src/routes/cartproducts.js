'use strict';
const express = require('express');
const { buyNow } = require('../models/products/cartProduct-collection');
const cartModel = require('../models/products/cartProduct-collection');
// const client = require('../models/pool');

const router = express.Router();

// Routes
router.post('/add/:id', cartAddProd);
router.post('/buyNow/:id', buyNowFun);
router.put('/buyFromCart/:id', buyFromCartfunc);
router.delete('/delete', cartDeleteProd);

// add products to the cart (table :buyer_cart)
async function cartAddProd(req, res) {
  let productInfo = await cartModel.insertToCart(req.params, req.body);
  res.status(201);
  console.log(productInfo);
  res.json({
    message: 'A new product has been added to the cart',
    user: productInfo,
  });
}
// function to buy product from the cart (table : buyer_cart)
async function buyFromCartfunc(req, res) {
  let productInfo = await cartModel.update(req.params.id);
  if (typeof productInfo !== 'string') {
    res.status(201);
    res.json({
      message: 'You bought this product from your cart',
      user: productInfo,
    });
  } else {
    res.status(400);
    res.json({
      message: productInfo,
    });
  }
}

// To buy directly with out a cart (table : buyer_cart)
async function buyNowFun(req, res) {
  let productInfo = await cartModel.buyNow(req.params);
  res.status(201);
  console.log(productInfo);
  res.json({
    message: 'A new product has been bought',
    user: productInfo,
  });
}

// To delete products from the cart  (table : buyer_cart)
async function cartDeleteProd(req, res) {
  let productInfo = await cartModel.deleteFromCart(req.params.id);
  res.status(201);
  console.log(productInfo);
  res.json({
    message: 'A product has been deleted from the cart',
    user: productInfo,
  });
}
module.exports = router;
