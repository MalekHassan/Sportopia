'use strict';
const express = require('express');
const favModel = require('../models/products/favoriteProduct-collection');
const bearer = require('../models/middleware/bearerAuth');
const acl = require('../models/middleware/acl');

let arrayMiddleware = [bearer, acl('buyer')];
const router = express.Router();

// Routes
router.get('/get', [...arrayMiddleware], favoriteGetProd);
router.post('/add/:id', [...arrayMiddleware], favoriteAddProd);
router.patch('/delete/:id', [...arrayMiddleware], favoriteDeleteProd);


// adding function to favorite products (table : buyer_favorite)
// only the product id will be passed, the user already in the request
async function favoriteGetProd(req, res) {
  let products = await favModel.get(req.user.id);
  res.status(200);
  res.json({
    id:`your id ${req.user.id}`,
    message: 'Your favorite products',
    product: products,
  });
}

async function favoriteAddProd(req, res) {
  let productInfo = await favModel.addToFavorite(req.params.id, req.user.id);
  if (typeof productInfo === 'string') {
    res.status(200);
    res.json({
      body:req.body,
      message: productInfo,
    });
  } else {
    res.status(201);
    res.json({
      message: 'A new product has been added to your Favorite',
      product: productInfo,
    });
  }
}

// To delete products from the cart  (table : buyer_cart)
async function favoriteDeleteProd(req, res) {
  let productInfo = await favModel.delete(req.params.id,req.user.id);
  res.status(200);
  res.json({
    paramsid:req.params.id,
    req: req.body,
    message: 'A product has been deleted from your Favorite',
    product: productInfo,
  });
}
module.exports = router;
