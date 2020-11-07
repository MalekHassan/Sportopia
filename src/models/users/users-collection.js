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
      const insertQuery =
        'INSERT INTO users (user_name,user_password,user_role) VALUES ($1,$2,$3) Returning *';
      let safeValues = [
        user.username,
        bcrypt.hashSync(user.password, 5),
        user.role,
      ];
      let userInfo = await client.query(insertQuery, safeValues);
      return userInfo.rows[0];
    } else {
      return 'This username already used';
    }
  }

  async authenticateBasic(record) {
    let userDB = await this.exists(record);
    if (!userDB) {
      return Promise.reject('User Does not exist');
    }
    const valid = await bcrypt.compare(record.password, userDB.user_password);
    let userObj = { username: userDB.user_name, role: userDB.user_role };
    return valid ? userObj : Promise.reject();
  }

  generateToken(record) {
    const token = jwt.sign(
      { username: record.username, role: record.role },
      SECRET
    );
    return token;
  }

  async authenticateToken(token) {
    try {
      console.log('inside authtoken');
      const tokenObject = jwt.verify(token, SECRET);
      console.log('TOKEN OBJECT', tokenObject);
      let userDB = await this.exists(tokenObject);
      if (userDB) {
        return Promise.resolve(tokenObject);
      } else {
        return Promise.reject();
      }
    } catch (e) {
      return Promise.reject(e.message);
    }
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
