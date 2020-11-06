'use strict';
const express = require('express');
require('dotenv').config();
const userModel = require('../models/users/users-collection');

const router = express.Router();

// Routes
router.post('/signup', createNewUser);

async function createNewUser(req, res, next) {
  let userInfo = await userModel.create(req.body);
  if (typeof userInfo === 'string') {
    res.json({
      message: userInfo,
    });
  } else {
    res.status(201);
    res.json({
      message: 'A new user has been added',
      user: userInfo,
    });
  }
}

module.exports = router;
