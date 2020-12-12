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
router.get('/activebuyers', [...allMiddleware], getActivatedBuyers);
router.get('/activebuyers/:page', [...allMiddleware], getActivatedBuyers);
router.get('/deactivatedbuyers', [...allMiddleware], getDeactivatedBuyers);
router.get(
  '/deactivatedbuyers/:page',
  [...allMiddleware],
  getDeactivatedBuyers
);

router.get('/sellers', [...allMiddleware], getSellers);
router.get('/sellers/:page', [...allMiddleware], getSellers);
router.get('/activesellers', [...allMiddleware], getActivatedSellers);
router.get('/activesellers/:page', [...allMiddleware], getActivatedSellers);
router.get('/deactivatedsellers', [...allMiddleware], getDeactivatedSellers);
router.get(
  '/deactivatedsellers/:page',
  [...allMiddleware],
  getDeactivatedSellers
);

router.get('/allproducts', [...allMiddleware], getAllProducts);
router.get('/allproducts/:page', [...allMiddleware], getAllProducts);
router.get('/deletedproducts', [...allMiddleware], getDeletedProducts);
router.get('/deletedproducts/:page', [...allMiddleware], getDeletedProducts);
router.get('/activeproducts', [...allMiddleware], getActiveProducts);
router.get('/activeproducts/:page', [...allMiddleware], getActiveProducts);
router.get('/boughtproducts', [...allMiddleware], getBoughtProducts);
router.get('/boughtproducts/:page', [...allMiddleware], getBoughtProducts);
router.get('/incartproducts', [...allMiddleware], getInCartProducts);
router.get('/incartproducts/:page', [...allMiddleware], getInCartProducts);
router.get('/favoriteproduct/:id', [...allMiddleware], getFavoriteProduct);

router.post('/toggle/:id', [...allMiddleware], activateUser);
router.post(
  '/delete/:table/:id',
  [...allMiddleware],
  getModel,
  toggleCommentsProducts
);
router.post('/category', [...allMiddleware], addCategory);

// get number Of users

router.get('/numberUsers', [...allMiddleware], getNumberUsers);
router.get('/numberproducts', [...allMiddleware], getNumberProducts);

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
async function getActivatedBuyers(req, res, next) {
  let pageNumber = req.params.page;
  let users;
  if (pageNumber) {
    users = await adminCollection.getActiveBuyers(pageNumber);
  } else {
    pageNumber = 0;
    users = await adminCollection.getActiveBuyers();
  }
  console.log(users);
  res.status(200);
  res.json({
    pageNumber: pageNumber + 1,
    count: users.length,
    result: users,
  });
}
async function getDeactivatedBuyers(req, res, next) {
  let pageNumber = req.params.page;
  let users;
  if (pageNumber) {
    users = await adminCollection.getDeactivateBuyers(pageNumber);
  } else {
    pageNumber = 0;
    users = await adminCollection.getDeactivateBuyers();
  }
  console.log(users);
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
async function getActivatedSellers(req, res, next) {
  let pageNumber = req.params.page;
  let users;
  if (pageNumber) {
    users = await adminCollection.getActiveSellers(pageNumber);
  } else {
    pageNumber = 0;
    users = await adminCollection.getActiveSellers();
  }
  res.status(200);
  res.json({
    pageNumber: pageNumber + 1,
    count: users.length,
    result: users,
  });
}
async function getDeactivatedSellers(req, res, next) {
  let pageNumber = req.params.page;
  let users;
  if (pageNumber) {
    users = await adminCollection.getDeactivateSellers(pageNumber);
  } else {
    pageNumber = 0;
    users = await adminCollection.getDeactivateSellers();
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
async function getAllProducts(req, res, next) {
  let pageNumber = req.params.page;
  let users;
  if (pageNumber) {
    users = await adminCollection.getAllProducts(pageNumber);
  } else {
    pageNumber = 0;
    users = await adminCollection.getAllProducts();
  }
  res.status(200);
  res.json({
    pageNumber: pageNumber + 1,
    count: users.length,
    result: users,
  });
}
async function getDeletedProducts(req, res, next) {
  let pageNumber = req.params.page;
  let users;
  if (pageNumber) {
    users = await adminCollection.getDeletedProducts(pageNumber);
  } else {
    pageNumber = 0;
    users = await adminCollection.getDeletedProducts();
  }
  res.status(200);
  res.json({
    pageNumber: pageNumber + 1,
    count: users.length,
    result: users,
  });
}
async function getInCartProducts(req, res, next) {
  let pageNumber = req.params.page;
  let users;
  if (pageNumber) {
    users = await adminCollection.getInCartProducts(pageNumber);
  } else {
    pageNumber = 0;
    users = await adminCollection.getInCartProducts();
  }
  res.status(200);
  res.json({
    pageNumber: pageNumber + 1,
    count: users.length,
    result: users,
  });
}
async function getBoughtProducts(req, res, next) {
  let pageNumber = req.params.page;
  let users;
  if (pageNumber) {
    users = await adminCollection.getBoughtProducts(pageNumber);
  } else {
    pageNumber = 0;
    users = await adminCollection.getBoughtProducts();
  }
  res.status(200);
  res.json({
    pageNumber: pageNumber + 1,
    count: users.length,
    result: users,
  });
}
async function getActiveProducts(req, res, next) {
  let pageNumber = req.params.page;
  let users;
  if (pageNumber) {
    users = await adminCollection.getActiveProducts(pageNumber);
  } else {
    pageNumber = 0;
    users = await adminCollection.getActiveProducts();
  }
  res.status(200);
  res.json({
    pageNumber: pageNumber + 1,
    count: users.length,
    result: users,
  });
}
async function getFavoriteProduct(req, res, next) {
  let productID = req.params.id;
  let productFavorites = await adminCollection.getfav(productID);
  console.log(productFavorites);
  res.status(200);
  res.json({
    message: `This product has been favorited this many times:`,
    count: productFavorites,
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

async function getNumberUsers(req, res) {
  let number = await adminCollection.numberOfUsers();
  res.json({
    number,
  });
}

async function getNumberProducts(req, res) {
  let number = await adminCollection.numberOfProducts();
  res.json({
    number,
  });
}

module.exports = router;
