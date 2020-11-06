/* eslint-disable comma-dangle */
'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET = process.env.SECRET;

const client = require('../pool');

class UsersCollection {
  async create(user) {
    const selectQuery = 'SELECT user_name from users where user_name=$1';
    let safeValues = [user.username];
    let userDb = await client
      .query(selectQuery, safeValues)
      .then((data) => data.rows[0]);
    if (!userDb) {
      const insertQuery =
        'INSERT INTO users (user_name,user_password,user_role) VALUES ($1,$2,$3)';
      safeValues = [
        user.username,
        bcrypt.hashSync(user.password, 5),
        user.role,
      ];
      let userInfo = await client
        .query(insertQuery, safeValues)
        .then(async () => {
          return await client
            .query(
              `SELECT * FROM users ORDER BY u_id DESC LIMIT 1
        `
            )
            .then((result) => {
              return result.rows[0];
            });
        });
      return userInfo;
    } else {
      return 'This username already used';
    }
  }
}

module.exports = new UsersCollection();
