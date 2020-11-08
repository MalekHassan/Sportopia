'use strict';
const express = require('express');
const favModel = require('../models/products/favoriteProduct-collection');
const bearer = require('../models/middleware/bearerAuth');
const acl = require('../models/middleware/acl');

let arrayMiddleware = [bearer, acl('buyer')];
const router = express.Router();

// Routes
router.post('/add/:id', [...arrayMiddleware], favoriteAddProd);
router.delete('/delete/:id', [...arrayMiddleware], favoriteDeleteProd);

// adding function to favorite products (table : buyer_favorite)
// only the product id will be passed, the user already in the request
async function favoriteAddProd(req, res) {
  let productInfo = await favModel.addToFavorite(req.params.id, req.user.id);
  if (typeof productInfo === 'string') {
    res.status(200);
    res.json({
      message: productInfo,
    });
  } else {
    res.status(201);
    res.json({
      message: 'A new product has been added to the cart',
      user: productInfo,
    });
  }
}

// To delete products from the cart  (table : buyer_cart)
async function favoriteDeleteProd(req, res) {
  let productInfo = await favModel.delete(req.params.id);
  res.status(201);
  res.json({
    message: 'A product has been deleted from You Favorite',
    user: productInfo,
  });
}
module.exports = router;
