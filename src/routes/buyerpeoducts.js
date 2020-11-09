/* eslint-disable comma-dangle */
'use strict';
const express = require('express');
const buyerModel = require('../models/products/buyerProduct-collection');
// const client = require('../models/pool');
const bearer = require('../models/middleware/bearerAuth');
const acl = require('../models/middleware/acl');

let arrayMiddleware = [bearer, acl('buyer')];

const router = express.Router();

// Routes
router.post('/add/comment/:id', [...arrayMiddleware], buyerAddComment);
router.put('/update/comment/:id', [...arrayMiddleware], buyerUpdateComment);
router.patch('/patch/comment/:id', [...arrayMiddleware], buyerUpdateComment);
router.delete('/delete/comment/:id', [...arrayMiddleware], buyerDeleteComment);

// functions
// Buyer_cart is passed in the request
// the body should contain the comment
async function buyerAddComment(req, res) {
  let commentInfo = await buyerModel.create(req.params.id, req.body.comment);
  if (typeof commentInfo === 'string') {
    res.json({
      message: commentInfo,
    });
  } else {
    res.status(201);
    res.json({
      message: 'A new comment has been added',
      comment: commentInfo,
    });
  }
}

// request body should contain a comment
async function buyerUpdateComment(req, res) {
  let commentInfo = await buyerModel.update(req.body.comment, req.params.id);
  if (typeof commentInfo === 'string') {
    res.status(200);
    res.json({
      message: commentInfo,
    });
  } else {
    res.status(200);
    res.json({
      message: 'your comment has been updated',
      comment: commentInfo,
    });
  }
}

async function buyerDeleteComment(req, res) {
  let commentInfo = await buyerModel.delete(req.params.id);
  if (typeof commentInfo === 'string') {
    res.status(200);
    res.json({
      message: commentInfo,
    });
  } else {
    res.status(200);
    res.json({
      message: 'your comment has been Deleted',
      comment: commentInfo,
    });
  }
}
module.exports = router;
