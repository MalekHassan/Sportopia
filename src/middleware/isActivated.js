'use strict';
const client = require('../models/pool');

module.exports = async (req, res, next) => {
  if (!req.body) {
    next('Access Denied');
  } else {
    const selectQuery = 'Select * from users WHERE user_name=$1';
    const safeValues = [req.body.username];
    let userDb = await client
      .query(selectQuery, safeValues)
      .then((result) => result.rows[0]);
    if (!userDb) {
      res.status(401);
      res.send('Wrong password or user does not exist');
    } else {
      if (userDb.is_activated) {
        next();
      } else {
        res.status(403);
        res.send('Your Account is not activated');
      }
    }
  }
};
