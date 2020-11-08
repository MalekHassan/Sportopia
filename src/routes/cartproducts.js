/* eslint-disable comma-dangle */
'use strict';
const express = require('express');
const cartModel = require('../models/products/cartProduct-collection');
const bearer = require('../models/middleware/bearerAuth');
const acl = require('../models/middleware/acl');

let arrayMiddleware = [bearer, acl('buyer')];
const router = express.Router();

// Routes
router.post('/add/:id', [...arrayMiddleware], cartAddProd);
router.post('/buyNow/:id', [...arrayMiddleware], buyNowFun);
router.put('/buyFromCart/:id', [...arrayMiddleware], buyFromCartfunc);
router.delete('/delete/:id', [...arrayMiddleware], cartDeleteProd);

// add products to the cart (table :buyer_cart)
// No need for anything inside the request body
async function cartAddProd(req, res) {
  let productInfo = await cartModel.insertToCart(req.params.id, req.user.id);
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
// quaintitny should be sent in the body
// To buy directly with out a cart (table : buyer_cart)
async function buyNowFun(req, res) {
  let productInfo = await cartModel.buyNow(
    req.params.id,
    req.user.id,
    req.body.quaintitny
  );
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
