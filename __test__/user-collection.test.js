/* eslint-disable comma-dangle */
// Each test change the database url to a new database
'use strict';
require('dotenv').config();
const { server } = require('../src/server');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const client = require('../src/models/pool');
const mockRequest = supertest(server);

describe('User collection Tests', () => {
  let userObj = {
    username: 'saif',
    password: '123456',
    role: 'seller',
  };
  afterAll(async () => {
    await client.query('DELETE FROM users');
  });

  it('should insert a new user if the user is new', async () => {
    await mockRequest
      .post('/signup')
      .send(userObj)
      .then((result) => {
        let isHahsed = bcrypt.compareSync(
          userObj.password,
          result.body.user.user_password
        );
        expect(result.body.user).not.toBeUndefined();
        expect(isHahsed).toBeTruthy();
        expect(result.body.message).toBe('A new user has been added');
      });
  });

  it('should Not store the user if it is in the DB', async () => {
    await mockRequest
      .post('/signup')
      .send(userObj)
      .then((result) => {
        expect(result.body.user).toBeUndefined();
        expect(result.body.message).toBe('This username already used');
      });
  });
});
