'use strict';
const express = require('express');
const buyerModel = require('../models/products/buyerProduct-collection');
// const client = require('../models/pool');
const bearer = require('../models/middleware/bearerAuth');
const isActivated = require('../middleware/isActivated');
const acl = require('../models/middleware/acl');

let arrayMiddleware = [bearer, isActivated, acl('buyer')];

const router = express.Router();

// Routes
router.post('/add/comment', [...arrayMiddleware], buyerAddComment);
router.put('/update/comment/:id', [...arrayMiddleware], buyerUpdateComment);
router.patch('/patch/comment/:id', [...arrayMiddleware], buyerUpdateComment);
router.delete('/delete/comment/:id', [...arrayMiddleware], buyerDeleteComment);

// functions
async function buyerAddComment(req, res) {
  let productInfo = await buyerModel.create(req.body);
  if (typeof productInfo === 'string') {
    res.json({
      message: productInfo,
    });
  }
  res.status(201);
  console.log(productInfo);
  res.json({
    message: 'A new comment has been added',
    user: productInfo,
  });
}

async function buyerUpdateComment(req, res) {
  let productInfo = await buyerModel.update(req.body, req.params.id);
  if (typeof productInfo === 'string') {
    res.status(201);
    res.json({
      message: productInfo,
    });
  } else {
    res.status(201);
    res.json({
      message: 'your comment has been updated',
      user: productInfo,
    });
  }
}
async function buyerDeleteComment(req, res) {
  let productInfo = await buyerModel.delete(req.params.id);
  res.status(201);
  console.log(productInfo);
  res.json({
    message: 'This comment has been deleted',
    user: productInfo,
  });
}
module.exports = router;
