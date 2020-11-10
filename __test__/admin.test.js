/* eslint-disable comma-dangle */
'use strict';
const { server } = require('../src/server');
const supertest = require('supertest');
require('dotenv').config();
jest.spyOn(global.console, 'log');
const mockRequest = supertest(server);
const client = require('../src/models/pool');

describe('Admin Tests', () => {
  // Objects
  let adminObj = {
    username: 'ahmad',
    password: '12345',
    role: 'admin',
  };
  //Variables
  let adminToken;
  let categoryId;
  let sellerId;

  afterAll(async () => {
    client.end(-1);
  });

  it('The admin can Register and login', async () => {
    await mockRequest
      .post('/signup')
      .send(adminObj)
      .then(async (result) => {
        let authData = `${adminObj.username}:${adminObj.password}`;
        let adminRes = await mockRequest.post('/signin').auth(authData);
        adminToken = adminRes.body.token;
        expect(adminRes.body.token).toBeDefined();
      });
  });
  it('Then admin can see all the buyers each page contain 10 results', async () => {
    await mockRequest
      .get('/buyers')
      .set('Authorization', 'Bearer ' + adminToken)
      .then((result) => {
        expect(result.body.pageNumber).toBe(1);
        expect(result.body.count).toBe(3);
        expect(result.body.result).toBeDefined();
      });
  });

  it('Then admin can see all the sellers each page contain 10 results', async () => {
    await mockRequest
      .get('/sellers')
      .set('Authorization', 'Bearer ' + adminToken)
      .then((result) => {
        expect(result.body.pageNumber).toBe(1);
        expect(result.body.count).toBe(4);
        expect(result.body.result).toBeDefined();
      });
  });
  it('Then admin can see activated buyers each page contain 10 results', async () => {
    await mockRequest
      .get('/activebuyers')
      .set('Authorization', 'Bearer ' + adminToken)
      .then((result) => {
        expect(result.body.pageNumber).toBe(1);
        expect(result.body.count).toBe(3);
        expect(result.body.result).toBeDefined();
      });
  });

  it('Then admin can see activated sellers each page contain 10 results', async () => {
    await mockRequest
      .get('/activesellers')
      .set('Authorization', 'Bearer ' + adminToken)
      .then((result) => {
        expect(result.body.pageNumber).toBe(1);
        expect(result.body.count).toBe(4);
        expect(result.body.result).toBeDefined();
      });
  });
  it('Then admin can see deactivated buyers each page contain 10 results', async () => {
    await mockRequest
      .get('/deactivatedbuyers')
      .set('Authorization', 'Bearer ' + adminToken)
      .then((result) => {
        console.log('deactive buyers ', result.body);
        expect(result.body.count).toBe(0);
        expect(result.body.result).toBeDefined();
      });
  });

  it('Then admin can see deactivated sellers each page contain 10 results', async () => {
    await mockRequest
      .get('/deactivatedsellers')
      .set('Authorization', 'Bearer ' + adminToken)
      .then((result) => {
        expect(result.body.pageNumber).toBe(1);
        expect(result.body.count).toBe(0);
        expect(result.body.result).toBeDefined();
      });
  });
  it('Then admin can see all products, each page contain 10 results', async () => {
    await mockRequest
      .get('/allproducts')
      .set('Authorization', 'Bearer ' + adminToken)
      .then((result) => {
        expect(result.body.pageNumber).toBe(1);
        expect(result.body.count).toBe(10);
        expect(result.body.result).toBeDefined();
      });
  });
  it('Then admin can see deleted products, each page contain 10 results', async () => {
    await mockRequest
      .get('/deletedproducts')
      .set('Authorization', 'Bearer ' + adminToken)
      .then((result) => {
        expect(result.body.pageNumber).toBe(1);
        expect(result.body.count).toBe(0);
        expect(result.body.result).toBeDefined();
      });
  });
  it('Then admin can see active products, each page contain 10 results', async () => {
    await mockRequest
      .get('/activeproducts')
      .set('Authorization', 'Bearer ' + adminToken)
      .then((result) => {
        expect(result.body.pageNumber).toBe(1);
        expect(result.body.count).toBe(10);
        expect(result.body.result).toBeDefined();
      });
  });
  it('Then admin can see bought products, each page contain 10 results', async () => {
    await mockRequest
      .get('/boughtproducts')
      .set('Authorization', 'Bearer ' + adminToken)
      .then((result) => {
        expect(result.body.pageNumber).toBe(1);
        expect(result.body.count).toBe(5);
        expect(result.body.result).toBeDefined();
      });
  });
  it('Then admin can see added to cart but not bought products, each page contain 10 results', async () => {
    await mockRequest
      .get('/incartproducts')
      .set('Authorization', 'Bearer ' + adminToken)
      .then((result) => {
        expect(result.body.pageNumber).toBe(1);
        expect(result.body.count).toBe(10);
        expect(result.body.result).toBeDefined();
      });
  });
  it('Then admin can see how many times a product was favorited, each page contain 10 results', async () => {
    await mockRequest
      .get('/favoriteproduct/15')
      .set('Authorization', 'Bearer ' + adminToken)
      .then((result) => {
        console.log(result.body);
        expect(result.body.count.count).toBe('2');
      });
  });
});
