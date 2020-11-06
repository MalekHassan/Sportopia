'use strict';
const express = require('express');
const productModel = require('../models/products/products-collection');
// const client = require('../models/pool');

const router = express.Router();

// Routes
router.post('/add', sellerAddProd);
router.put('/update/:id', sellerUpdateProd);
router.patch('/patch/:id', sellerUpdateProd);
router.delete('/delete/:id', sellerDelete);
async function sellerAddProd(req, res, next) {
  let productInfo = await productModel.create(req.body);
  if (productInfo === 'This product is exist') {
    res.json({
      message: productInfo,
    });
  } else {
    res.status(201);
    console.log(productInfo);
    res.json({
      message: 'A new product has been added',
      user: productInfo,
    });
  }
}

async function sellerUpdateProd(req, res) {
  let productInfo = await productModel.update(req.body, req.params.id);
  res.status(201);
  console.log('gggggggggggggggggggggggggggggg', productInfo);
  res.json({
    message: 'your product has been updated',
    user: productInfo,
  });
}
async function sellerDelete(req, res) {
  let productInfo = await productModel.delete(req.params.id);
  res.status(201);
  console.log(productInfo);
  res.json({
    message: 'This product has been deleted',
    user: productInfo,
  });
}
module.exports = router;
