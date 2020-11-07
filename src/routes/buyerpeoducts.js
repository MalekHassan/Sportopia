'use strict';
const express = require('express');
const buyerModel = require('../models/products/buyerProduct-collection');
// const client = require('../models/pool');
const bearer = require('../models/middleware/bearerAuth');
const acl = require('../models/middleware/acl');

const router = express.Router();

// Routes
router.post('/add/comment', bearer, acl('buyer'), buyerAddComment);
router.put('/update/comment/:id', bearer, acl('buyer'), buyerUpdateComment);
router.patch('/patch/comment/:id', bearer, acl('buyer'), buyerUpdateComment);
router.delete('/delete/comment/:id', bearer, acl('buyer'), buyerDeleteComment);

// functions
async function buyerAddComment(req, res, next) {
  let productInfo = await buyerModel.create(req.body);
  res.status(201);
  console.log(productInfo);
  res.json({
    message: 'A new comment has been added',
    user: productInfo,
  });
}

async function buyerUpdateComment(req, res) {
  let productInfo = await buyerModel.update(req.body, req.params.id);
  res.status(201);
  res.json({
    message: 'your comment has been updated',
    user: productInfo,
  });
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
