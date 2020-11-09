/* eslint-disable comma-dangle */
'use strict';
const express = require('express');
const adminCollection = require('../models/users/admin-collection');
const router = express.Router();
const bearer = require('../models/middleware/bearerAuth');
const acl = require('../models/middleware/acl');
const getModel = require('../middleware/comment_n_product');
router.param('table', getModel);
let allMiddleware = [bearer, acl('admin')];

// Note add cli here for admin
// Routes
router.get('/buyers', [...allMiddleware], getBuyers);
router.get('/buyers/:page', [...allMiddleware], getBuyers);
router.get('/sellers', [...allMiddleware], getSellers);
router.get('/sellers/:page', [...allMiddleware], getSellers);
router.post('/toggle/:id', [...allMiddleware], activateUser);
router.post(
  '/delete/:table/:id',
  [...allMiddleware],
  getModel,
  toggleCommentsProducts
);
router.post('/category', [...allMiddleware], addCategory);

// Functions
async function getBuyers(req, res, next) {
  let pageNumber = req.params.page;
  let users;
  if (pageNumber) {
    users = await adminCollection.getBuyers(pageNumber);
  } else {
    pageNumber = 0;
    users = await adminCollection.getBuyers();
  }
  res.status(200);
  res.json({
    pageNumber: pageNumber + 1,
    count: users.length,
    result: users,
  });
}
async function getSellers(req, res, next) {
  let pageNumber = req.params.page;
  let users;
  if (pageNumber) {
    users = await adminCollection.getSellers(pageNumber);
  } else {
    pageNumber = 0;
    users = await adminCollection.getSellers();
  }
  res.status(200);
  res.json({
    pageNumber: pageNumber + 1,
    count: users.length,
    result: users,
  });
}

async function activateUser(req, res, next) {
  let userId = req.params.id;
  let activeUser = await adminCollection.toggleUser(userId);
  console.log(activeUser);
  res.status(200);
  res.json({
    message: `This user now is ${
      activeUser.is_activated ? 'Activated' : 'Deactivated'
    }`,
    user: activeUser,
  });
}

async function toggleCommentsProducts(req, res, next) {
  const table = req.table;
  const id = req.params.id;
  let deleted = await adminCollection.toggleComments(table, id);
  res.status(200);
  res.json({
    message: `This Comment now is ${
      deleted.is_activated ? 'Activated' : 'Deleted'
    }`,
    table: deleted,
  });
}

async function addCategory(req, res, next) {
  let newCategory = await adminCollection.insertCategory(req.body.name);
  if (typeof newCategory !== 'string') {
    res.status(201);
    res.json({
      message: 'A new Category has been added',
      category: newCategory,
    });
  } else {
    res.status(200);
    res.json({
      message: newCategory,
    });
  }
}
module.exports = router;
