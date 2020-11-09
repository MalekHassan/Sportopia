'use strict';
const { server } = require('../src/server');
const supertest = require('supertest');
require('dotenv').config();
const mockRequest = supertest(server);
const client = require('../src/models/pool');

describe('Buyer Tests', () => {
  let sellerObj = {
    username: 'saif',
    password: '123456',
    role: 'seller',
    companyname: 'nothing',
    adress: 'Amman',
    telephone: '078955220',
  };
  let adminObj = {
    username: 'ahmad',
    password: '12345',
    role: 'admin',
  };
  let adminToken;
  let sellerToken;
  let sellerId;
  afterAll(async () => {
    await client.query('DELETE FROM users');
    client.end(-1);
  });

  it('should Register a new seller in the data base, should be unActive', async () => {
    let response = await mockRequest.post('/signup').send(sellerObj);
    sellerId = response.body.user.id;
    expect(response.body.message).toBe('A new user has been added');
    expect(response.body.user).not.toBeUndefined();
    expect(response.body.user.is_activated).toBeFalsy();
    expect(response.status).toBe(201);
  });

  it('should not Register a new buyer in the data base if it was already there', async () => {
    let response = await mockRequest.post('/signup').send(sellerObj);
    expect(response.body.message).toBe('This username already used');
    expect(response.body.user).toBeUndefined();
    expect(response.status).toBe(200);
  });
  it('Should the seller be activated before signin', async () => {
    let authData = `${sellerObj.username}:${sellerObj.password}`;
    let response = await mockRequest.post('/signin').auth(authData);
    expect(response.body.message).toBe('Your Account in not Activated');
    expect(response.status).toBe(403);
  });
  it('The admin can Register', async () => {
    await mockRequest
      .post('/signup')
      .send(adminObj)
      .then(async (result) => {
        let authData = `${adminObj.username}:${adminObj.password}`;
        let adminRes = await mockRequest.post('/signin').auth(authData);
        adminToken = adminRes.body.token;
        console.log(adminToken);
        expect(adminRes.body.token).toBeDefined();
      });
  });
  it('The Admin can activate the seller', async () => {
    console.log(sellerId);
    console.log(adminToken);
    await mockRequest
      .post(`/toggle/${sellerId}`)
      .auth(adminToken)
      .then((result) => {});
  });
});
