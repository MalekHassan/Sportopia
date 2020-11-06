'use strict';

const base64 = require('base-64');
const userCollection = require('../users/users-collection');

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    // console.log('no auth');
    next('Invalid Login');
  } else {
    // console.log('valid login')
    const basicAuth = req.headers.authorization.split(' ').pop();
    const [username, pass] = base64.decode(basicAuth).split(':');
    let obj = { username: username, password: pass };
    // console.log(obj);
    userCollection
      .authenticateBasic(obj)
      .then((validUser) => {
        req.token = userCollection.generateToken(validUser);
        next();
      })
      .catch((err) => {
        res.send('Wrong password or user does not exist');
        next('Invalid Login');
      });
  }
};
