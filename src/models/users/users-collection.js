/* eslint-disable comma-dangle */
'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET = process.env.SECRET;

const client = require('../pool');

class UsersCollection {
  async exists(user) {
    const selectQuery = 'SELECT * from users where user_name=$1';
    let safeValues = [user.username];
    let userDb = await client
      .query(selectQuery, safeValues)
      .then((data) => data.rows[0]);
    return userDb;
  }
  async create(user) {
    let userDb = await this.exists(user);
    if (!userDb) {
      let isActivated;
      user.role === 'admin' || user.role === 'buyer'
        ? (isActivated = true)
        : (isActivated = false);
      let insertQuery =
        'INSERT INTO users (user_name,user_password,user_role,is_activated) VALUES ($1,$2,$3,$4) Returning  u_id,user_name,is_activated,user_role';
      let safeValues = [
        user.username,
        bcrypt.hashSync(user.password, 5),
        user.role,
        isActivated,
      ];
      let userInfo = await client
        .query(insertQuery, safeValues)
        .then((result) => result.rows[0]);
      let userID = userInfo.u_id;
      if (userInfo.user_role !== 'admin') {
        userInfo = await this.insert(userID, user);
      }
      return userInfo;
    } else {
      return 'This username already used';
    }
  }
  async insert(userID, user) {
    let insertQuery;
    let safeValues;
    if (user.role === 'seller') {
      insertQuery = `INSERT INTO seller (u_id,company_name,adress,telephone) VALUES ($1,$2,$3,$4) Returning *`;
      safeValues = [userID, user.companyname, user.adress, user.telephone];
      let seller = await client
        .query(insertQuery, safeValues)
        .then((result) => result.rows[0]);
      return seller;
    } else {
      insertQuery = `INSERT INTO buyer (u_id,first_name,last_name,adress,telephone,gender) VALUES ($1,$2,$3,$4,$5,$6) Returning *`;
      safeValues = [
        userID,
        user.firstname,
        user.lastname,
        user.adress,
        user.telephone,
        user.gender,
      ];
      let buyer = await client
        .query(insertQuery, safeValues)
        .then((result) => result.rows[0]);
      return buyer;
    }
  }
  async authenticateBasic(record) {
    let userDB = await this.exists(record);
    if (!userDB) {
      return Promise.reject('User Does not exist');
    }
    const valid = await bcrypt.compare(record.password, userDB.user_password);
    return valid ? userDB : Promise.reject();
  }

  async generateToken(record) {
    const token = await jwt.sign(
      {
        username: record.user_name,
        role: record.user_role,
        is_activated: record.is_activated,
      },
      SECRET
    );
    await client.query('Update users SET oauth_token=$1 Where user_name=$2', [
      token,
      record.user_name,
    ]);
    return token;
  }

  async authenticateToken(token) {
    try {
      const tokenObject = jwt.verify(token, SECRET);
      let userDB = await this.exists(tokenObject);
      if (userDB) {
        return Promise.resolve(userDB);
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
      // console.log('Created new User');
      this.create(record);
    } else {
      if (this.authenticateBasic(record)) {
        return record;
      }
    }
  }

  async sellerOBuyer(user) {
    let selectQuery;
    let safeValues;
    if (user) {
      if (user.user_role === 'seller') {
        selectQuery = `select user_name,user_role,is_activated,id,users.u_id from seller inner join users on seller.u_id = users.u_id where users.u_id =$1`;
        safeValues = [user.u_id];
        let userDb = await client
          .query(selectQuery, safeValues)
          .then((result) => result.rows[0]);
        return userDb;
      } else {
        selectQuery = `select user_name,user_role,is_activated,id,users.u_id from buyer inner join users on buyer.u_id = users.u_id where users.u_id =$1`;
        safeValues = [user.u_id];
        let userDb = await client
          .query(selectQuery, safeValues)
          .then((result) => result.rows[0]);
        return userDb;
      }
    }
  }
}

module.exports = new UsersCollection();
