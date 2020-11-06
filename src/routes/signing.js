'use strict';
const express = require('express');
const userModel = require('../models/users/users-collection');
const client = require('../models/pool');

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
    console.log(userInfo);
    res.json({
      message: 'A new user has been added',
      user: userInfo,
    });
  }
}

module.exports = router;
