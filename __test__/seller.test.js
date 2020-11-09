/* eslint-disable comma-dangle */
'use strict';
const { server } = require('../src/server');
const supertest = require('supertest');
require('dotenv').config();
const mockRequest = supertest(server);
const client = require('../src/models/pool');

describe('Buyer Tests', () => {
  // Test Objects
  let sellerObj = {
    username: 'saif',
    password: '123456',
    role: 'seller',
    companyname: 'nothing',
    adress: 'Amman',
    telephone: '078955220',
  };
  let buyerObj = {
    username: 'mohammed',
    password: '123456',
    role: 'buyer',
    firstname: 'mohammed',
    lastname: 'saif',
    adress: 'Zarqa',
    telephone: '07895555',
    gender: 'male',
  };
  let adminObj = {
    username: 'ahmad',
    password: '12345',
    role: 'admin',
  };

  let productObj = {
    name: 'product1',
    description: 'Just a test description',
    main_img: 'test for the images',
    images: ['test1', 'test2', 'test3'],
    price: 55,
    quantity: 100,
  };

  let productObj2 = {
    name: 'product2',
    description: 'Just a test description',
    main_img: 'test for the images',
    images: ['test1', 'test2', 'test3'],
    price: 55,
    quantity: 100,
  };

  // Test Variables
  let adminToken;
  let sellerToken;
  let buyerToken;
  let sellerId;
  let categoryId;
  let productId;
  let productId2;
  let cartId;
  let favId;
  let commentId;

  // to make sure the data base is clean
  afterAll(async () => {
    await client.query('DELETE FROM users');
    await client.query('DELETE FROM category');
    client.end(-1);
  });

  it('should Register a new seller in the data base, should be unActive', async () => {
    let response = await mockRequest.post('/signup').send(sellerObj);
    sellerId = response.body.user.u_id;
    expect(response.body.message).toBe('A new user has been added');
    expect(response.body.user).not.toBeUndefined();
    expect(response.body.user.is_activated).toBeFalsy();
    expect(response.status).toBe(201);
  });

  it('should Register a new buyer in the data base, should be Active', async () => {
    let response = await mockRequest.post('/signup').send(buyerObj);
    expect(response.body.message).toBe('A new user has been added');
    expect(response.body.user).not.toBeUndefined();
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
        expect(adminRes.body.token).toBeDefined();
      });
  });
  it('Then admin can see all the buyers each page contain 10 results', async () => {
    await mockRequest
      .get('/buyers')
      .set('Authorization', 'Bearer ' + adminToken)
      .then((result) => {
        expect(result.body.pageNumber).toBe(1);
        expect(result.body.count).toBe(1);
        expect(result.body.result).toBeDefined();
      });
  });

  it('Then admin can see all the sellers each page contain 10 results', async () => {
    await mockRequest
      .get('/sellers')
      .set('Authorization', 'Bearer ' + adminToken)
      .then((result) => {
        expect(result.body.pageNumber).toBe(1);
        expect(result.body.count).toBe(1);
        expect(result.body.result).toBeDefined();
      });
  });

  it('The admin can add a new category', async () => {
    await mockRequest
      .post('/category')
      .send({ name: 'category1' })
      .set('Authorization', 'Bearer ' + adminToken)
      .then((result) => {
        categoryId = result.body.category.id;
        expect(result.body.message).toBe('A new Category has been added');
        expect(result.body.category).not.toBeUndefined();
        expect(result.body.category.category_name).toBe('category1');
      });
  });

  it('The admin can not add an already existed category', async () => {
    await mockRequest
      .post('/category')
      .send({ name: 'category1' })
      .set('Authorization', 'Bearer ' + adminToken)
      .then((result) => {
        expect(result.body.message).toBe('This Category already existed');
        expect(result.body.category).toBeUndefined();
      });
  });

  it('The admin can activate a the new seller', async () => {
    await mockRequest
      .post(`/toggle/${sellerId}`)
      .set('Authorization', 'Bearer ' + adminToken)
      .then((result) => {
        expect(result.body.message).toBe('This user now is Activated');
        expect(result.body.user.is_activated).toBeTruthy();
      });
  });

  it('The activated seller can sign in', async () => {
    let authData = `${sellerObj.username}:${sellerObj.password}`;
    await mockRequest
      .post('/signin')
      .auth(authData)
      .then((result) => {
        sellerToken = result.body.token;
        expect(result.status).toBe(200);
        expect(result.body.token).toBeDefined();
      });
  });

  it('The buyer can sign in', async () => {
    let authData = `${buyerObj.username}:${buyerObj.password}`;
    await mockRequest
      .post('/signin')
      .auth(authData)
      .then((result) => {
        buyerToken = result.body.token;
        expect(result.status).toBe(200);
        expect(result.body.token).toBeDefined();
      });
  });

  //Seller TEST Start

  it('The Activated seller can insert a new Product into a specific category', async () => {
    await mockRequest
      .post(`/seller/add/${categoryId}`)
      .set('Authorization', 'Bearer ' + sellerToken)
      .send(productObj)
      .then((result) => {
        productId = result.body.product.id;
        expect(result.body.message).toBe('A new product has been added');
        expect(result.body.product).not.toBeUndefined();
        expect(result.status).toBe(201);
      });
  });

  it('The Activated seller can insert a new Product into a specific category', async () => {
    await mockRequest
      .post(`/seller/add/${categoryId}`)
      .set('Authorization', 'Bearer ' + sellerToken)
      .send(productObj2)
      .then((result) => {
        productId2 = result.body.product.id;
        expect(result.body.message).toBe('A new product has been added');
        expect(result.body.product).not.toBeUndefined();
        expect(result.status).toBe(201);
      });
  });

  it('The Activated seller can not insert an already existed product', async () => {
    await mockRequest
      .post(`/seller/add/${categoryId}`)
      .set('Authorization', 'Bearer ' + sellerToken)
      .send(productObj)
      .then((result) => {
        expect(result.body.message).toBe('This product is exist');
        expect(result.body.product).toBeUndefined();
        expect(result.status).toBe(200);
      });
  });

  it('the seller can update a specific product', async () => {
    await mockRequest
      .put(`/seller/update/${productId}`)
      .set('Authorization', 'Bearer ' + sellerToken)
      .send({ name: 'test to update' })
      .then((result) => {
        expect(result.status).toBe(200);
        expect(result.body.message).toBe('your product has been updated');
        expect(result.body.product).not.toBeUndefined();
        expect(result.body.product.name).not.toEqual(productObj.name);
      });
  });

  it('the seller can delete a specific product', async () => {
    await mockRequest
      .delete(`/seller/delete/${productId}`)
      .set('Authorization', 'Bearer ' + sellerToken)
      .then((result) => {
        expect(result.status).toBe(200);
        expect(result.body.message).toBe('This product has been deleted');
        expect(result.body.product).not.toBeUndefined();
        expect(result.body.product.is_deleted).toBeTruthy();
      });
  });

  //Seller TEST Ends

  // Favorite Test Start

  it('The buyer can add a new product to his favorite ', async () => {
    await mockRequest
      .post(`/favorite/add/${productId}`)
      .set('Authorization', 'Bearer ' + buyerToken)
      .then((result) => {
        favId = result.body.product.id;
        expect(result.status).toBe(201);
        expect(result.body.message).toBe(
          'A new product has been added to your Favorite'
        );
        expect(result.body.product).not.toBeUndefined();
        expect(result.body.product.is_deleted).toBeFalsy();
      });
  });

  it('The buyer can add a new product to his favorite ', async () => {
    await mockRequest
      .delete(`/favorite/delete/${favId}`)
      .set('Authorization', 'Bearer ' + buyerToken)
      .then((result) => {
        expect(result.status).toBe(200);
        expect(result.body.message).toBe(
          'A product has been deleted from You Favorite'
        );
        expect(result.body.product).not.toBeUndefined();
        expect(result.body.product.is_deleted).toBeTruthy();
      });
  });

  // Favorite Test Ends

  // CART TESTS Begin

  it('The buyer can add a product to his cart without buying', async () => {
    await mockRequest
      .post(`/cart/add/${productId}`)
      .set('Authorization', 'Bearer ' + buyerToken)
      .then((result) => {
        cartId = result.body.cart.id;
        expect(result.status).toBe(201);
        expect(result.body.message).toBe(
          'A new product has been added to the cart'
        );
        expect(result.body.cart).not.toBeUndefined();
        expect(result.body.cart.is_bought).toBeFalsy();
      });
  });

  it('The buyer cant comment if the product is not bought', async () => {
    await mockRequest
      .post(`/buyer/add/comment/${cartId}`)
      .set('Authorization', 'Bearer ' + buyerToken)
      .send({ comment: 'this is a comment' })
      .then((result) => {
        expect(result.body.message).toBe('this product is not bought yet');
        expect(result.body.comment).not.toBeDefined();
      });
  });

  it('The buyer can comment if the product is bought', async () => {
    await mockRequest
      .post(`/buyer/add/comment/${cartId}`)
      .set('Authorization', 'Bearer ' + buyerToken)
      .send({ comment: 'this is a comment' })
      .then((result) => {
        expect(result.body.message).toBe('this product is not bought yet');
        expect(result.body.comment).not.toBeDefined();
      });
  });

  it('The buyer can buy the product from the cart', async () => {
    await mockRequest
      .put(`/cart/buyFromCart/${cartId}`)
      .set('Authorization', 'Bearer ' + buyerToken)
      .then((result) => {
        expect(result.status).toBe(201);
        expect(result.body.message).toBe(
          'You bought this product from your cart'
        );
        expect(result.body.cart).not.toBeUndefined();
        expect(result.body.cart.is_bought).toBeTruthy();
      });
  });

  it('The buyer can comment if the product is bought', async () => {
    await mockRequest
      .post(`/buyer/add/comment/${cartId}`)
      .set('Authorization', 'Bearer ' + buyerToken)
      .send({ comment: 'this is a comment' })
      .then((result) => {
        commentId = result.body.comment.id;
        expect(result.status).toBe(201);
        expect(result.body.message).toBe('A new comment has been added');
        expect(result.body.comment).toBeDefined();
      });
  });

  it('The buyer can update his comment if the product is bought', async () => {
    await mockRequest
      .put(`/buyer/update/comment/${commentId}`)
      .set('Authorization', 'Bearer ' + buyerToken)
      .send({ comment: 'this is a new  comment' })
      .then((result) => {
        commentId = result.body.comment.id;
        expect(result.status).toBe(200);
        expect(result.body.message).toBe('your comment has been updated');
        expect(result.body.comment).toBeDefined();
      });
  });

  it('The buyer can not update any comment is not related to him/her ', async () => {
    await mockRequest
      .put(`/buyer/update/comment/${1000}`)
      .set('Authorization', 'Bearer ' + buyerToken)
      .send({ comment: 'this is a new  comment' })
      .then((result) => {
        expect(result.status).toBe(200);
        expect(result.body.message).toBe('There in no Comment there');
        expect(result.body.comment).not.toBeDefined();
      });
  });

  it('The buyer can delete his comment if the product is bought', async () => {
    await mockRequest
      .delete(`/buyer/delete/comment/${commentId}`)
      .set('Authorization', 'Bearer ' + buyerToken)
      .then((result) => {
        expect(result.status).toBe(200);
        expect(result.body.message).toBe('your comment has been Deleted');
        expect(result.body.comment).toBeDefined();
      });
  });

  it('The buyer can not  un delete his comment id it is already deleted', async () => {
    await mockRequest
      .delete(`/buyer/delete/comment/${commentId}`)
      .set('Authorization', 'Bearer ' + buyerToken)
      .then((result) => {
        expect(result.status).toBe(200);
        expect(result.body.message).toBe('This Comment is already deleted');
        expect(result.body.comment).not.toBeDefined();
      });
  });

  it('The buyer can not delete other comment  for other users ', async () => {
    await mockRequest
      .delete(`/buyer/delete/comment/${1000}`)
      .set('Authorization', 'Bearer ' + buyerToken)
      .then((result) => {
        expect(result.status).toBe(200);
        expect(result.body.message).toBe('There in no Comment there');
        expect(result.body.comment).not.toBeDefined();
      });
  });

  it('The buyer can buy the product, it will go to the cart as bought', async () => {
    await mockRequest
      .post(`/cart/buyNow/${productId2}`)
      .set('Authorization', 'Bearer ' + buyerToken)
      .send({ quantity: 5 })
      .then((result) => {
        expect(result.status).toBe(201);
        expect(result.body.message).toBe('A new product has been bought');
        expect(result.body.cart).not.toBeUndefined();
        expect(result.body.cart.is_bought).toBeTruthy();
      });
  });

  it('The buyer can delete a product from the cart', async () => {
    await mockRequest
      .delete(`/cart/delete/${cartId}`)
      .set('Authorization', 'Bearer ' + buyerToken)
      .then((result) => {
        expect(result.status).toBe(200);
        expect(result.body.message).toBe(
          'A product has been deleted from the cart'
        );
        expect(result.body.cart).not.toBeUndefined();
      });
  });
  // CART TESTS ENDS

  // Test middle wares Begins
  it('Only the admin can activate users response with 403', async () => {
    await mockRequest
      .post(`/toggle/${sellerId}`)
      .set('Authorization', 'Bearer ' + buyerToken)
      .then((result) => {
        expect(result.status).toBe(403);
        expect(result.text).toBe(`You don't have access to this page.`);
      });
  });

  it('Only the admin can activate users response with 403', async () => {
    await mockRequest
      .post(`/toggle/${sellerId}`)
      .set('Authorization', 'Bearer ' + sellerToken)
      .then((result) => {
        expect(result.status).toBe(403);
        expect(result.text).toBe(`You don't have access to this page.`);
      });
  });
  // Test middle wares Ends
});
