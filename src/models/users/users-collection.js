/* eslint-disable comma-dangle */
'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET = process.env.SECRET;

const client = require('../pool');

class UsersCollection {
  async exists(user) {
    // console.log('user', user);
    const selectQuery = 'SELECT * from users where user_name=$1';
    let safeValues = [user.username];
    let userDb = await client
      .query(selectQuery, safeValues)
      .then((data) => data.rows[0]);
    return userDb;
  }
  async create(user) {
    let userDb = await this.exists(user);
    // console.log('here',userDb);
    if (!userDb) {
      let isActivated;
      user.role === 'admin' ? (isActivated = true) : (isActivated = false);
      const insertQuery =
        'INSERT INTO users (user_name,user_password,user_role,is_activated) VALUES ($1,$2,$3,$4) Returning *';
      let safeValues = [
        user.username,
        bcrypt.hashSync(user.password, 5),
        user.role,
        isActivated,
      ];
      let userInfo = await client.query(insertQuery, safeValues);
      return userInfo.rows[0];
    } else {
      return 'This username already used';
    }
  }
  async authenticateBasic(record) {
    let userDB = await this.exists(record);
    // console.log('here', userDB);
    if (!userDB) {
      // console.log('user doesnt exist');
      return Promise.reject('User Does not exist');
    }
    // console.log('user exists');
    // console.log(record.password, userDB.user_password);
    const valid = await bcrypt.compare(record.password, userDB.user_password);
    let userObj = { username: userDB.user_name, role: userDB.user_role };
    // console.log('valid', valid);
    // console.log('user obj', userObj);
    return valid ? userObj : Promise.reject();
  }
  async generateToken(record) {
    const token = await jwt.sign(
      { username: record.username, role: record.role },
      SECRET
    );
    await client.query('Update users SET oauth_token=$1 Where user_name=$2', [
      token,
      record.username,
    ]);
    return token;
  }
  async OAuth(record) {
    let userDB = await this.exists(record);
    if (!userDB) {
      this.create(record);
      // console.log('Created new User');
    } else {
      // console.log('User exists');
      if (this.authenticateBasic(record)) {
        return record;
      }
    }
  }
}

module.exports = new UsersCollection();
