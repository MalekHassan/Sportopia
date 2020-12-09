'use strict';
const express = require('express');
const defaultCollection = require('../models/users/default');
const router = express.Router();

// Routes
router.get('/products', getAllProducts);
router.get('/products/:page', getAllProducts);
router.get('/categories', getAllCategories);

// Function (Handlers)

async function getAllProducts(req, res) {
  let pageNumber = req.params.page;
  let products;
  if (pageNumber) {
    pageNumber = parseInt(pageNumber);
    products = await defaultCollection.getProducts(pageNumber);
  } else {
    pageNumber = 0;
    products = await defaultCollection.getProducts();
  }
  res.status(200);

  res.json({
    pageNumber: pageNumber + 1,
    count: products.length,
    result: products,
  });
}

async function getAllCategories(req, res) {
  const categories = await defaultCollection.getCategories();

  res.status(200);

  res.json({
    count: categories.length,
    result: categories,
  });
}

module.exports = router;
