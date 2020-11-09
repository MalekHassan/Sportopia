/* eslint-disable comma-dangle */
'use strict';
const express = require('express');
const productModel = require('../models/products/products-collection');
// const client = require('../models/pool');
const bearer = require('../models/middleware/bearerAuth');
const acl = require('../models/middleware/acl');
const isActivated = require('../middleware/isActivated');
const isAuthoroized = require('../middleware/isAuthoroized');

let arrayMiddleware = [bearer, isActivated, acl('seller')];

const router = express.Router();

// Routes
router.post('/add/:id', [...arrayMiddleware], sellerAddProd);
router.put(
  '/update/:id',
  [...arrayMiddleware],
  isAuthoroized,
  sellerUpdateProd
);
router.delete('/delete/:id', [...arrayMiddleware], isAuthoroized, sellerDelete);

// functions
async function sellerAddProd(req, res, next) {
  let categoryId = req.params.id;
  let productInfo = await productModel.create(req.body, req.user, categoryId);
  if (productInfo === 'This product is exist') {
    res.json({
      message: productInfo,
    });
  } else {
    res.status(201);
    res.json({
      message: 'A new product has been added',
      user: productInfo,
    });
  }
}

async function sellerUpdateProd(req, res) {
  console.log('here');
  let productInfo = await productModel.update(req.body, req.params.id);
  if (productInfo) {
    res.status(201);
    res.json({
      message: 'your product has been updated',
      user: productInfo,
    });
  } else {
    res.status(400);
    res.json({
      message: 'your product id is wrong',
    });
  }
}
async function sellerDelete(req, res) {
  let productInfo = await productModel.delete(req.params.id);
  res.status(201);
  res.json({
    message: 'This product has been deleted',
    user: productInfo,
  });
}
module.exports = router;
