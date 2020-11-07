'use strict';
const express = require('express');
const userModel = require('../models/users/users-collection');
const client = require('../models/pool');
const basicAuth = require('../models/middleware/basicAuth');
const oauth = require('../models/OAuth/google');
const isActivated = require('../middleware/isActivated');
const { sign } = require('jsonwebtoken');
const router = express.Router();

// Routes
router.post('/signup', createNewUser);
router.post('/signin', isActivated, basicAuth, signInHandler);
router.get('/oauth', oauth, (req, res) => {
  res.status(200).json({ token_value: req.token });
});

// Functions
async function createNewUser(req, res, next) {
  let userInfo = await userModel.create(req.body);
  if (typeof userInfo === 'string') {
    res.json({
      message: userInfo,
    });
  } else {
    res.status(201);
    // console.log(userInfo);
    res.json({
      message: 'A new user has been added',
      user: userInfo,
    });
  }
}
async function signInHandler(req, res, next) {
  console.log(req.token);
  res.json({ token: req.token });
}

module.exports = router;
