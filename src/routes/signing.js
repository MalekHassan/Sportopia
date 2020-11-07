'use strict';
const express = require('express');
const userModel = require('../models/users/users-collection');
const basicAuth = require('../models/middleware/basicAuth');
const oauth = require('../models/OAuth/google');
const fbOauth = require('../models/OAuth/facebook');

const isActivated = require('../middleware/isActivated');
const router = express.Router();

// Routes
router.post('/signup', createNewUser);
router.post('/signin', basicAuth, isActivated, signInHandler);
router.get('/oauth', oauth, (req, res) => {
  res.status(200).json({ token_value: req.token });
});
router.get('/auth/facebook', fbOauth.authenticate('facebook'));

router.get(
  '/fbOauth',
  fbOauth.authenticate('facebook', { failureRedirect: '/login' }),
  function (req, res) {
    console.log(req.user);
    res.status(200).send(req.user);
  }
);

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
  res.json({ token: req.token });
}

module.exports = router;
