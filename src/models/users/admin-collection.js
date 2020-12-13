'use strict';

const client = require('../pool');

class AdminCollection {
  constructor() {}

  async getBuyers(page = 0) {
    let offset = page * 10;
    const selectQuery = `select user_name,user_role,first_name,last_name,adress,telephone,gender,card_number,is_activated from buyer inner join users on buyer.u_id = users.u_id where users.user_role ='buyer' LIMIT 10 OFFSET $1`;
    const safeValues = [offset];
    return await client
      .query(selectQuery, safeValues)
      .then((result) => result.rows);
  }
  async getActiveBuyers(page = 0) {
    let offset = page * 10;
    const selectQuery = `select user_name,user_role,first_name,last_name,adress,telephone,gender,card_number,is_activated from buyer inner join users on buyer.u_id = users.u_id where users.user_role ='buyer' and users.is_activated = true LIMIT 10 OFFSET $1`;
    const safeValues = [offset];
    return await client
      .query(selectQuery, safeValues)
      .then((result) => result.rows);
  }
  async getDeactivateBuyers(page = 0) {
    let offset = page * 10;
    const selectQuery = `select user_name,user_role,first_name,last_name,adress,telephone,gender,card_number,is_activated from buyer inner join users on buyer.u_id = users.u_id where users.user_role ='buyer' and users.is_activated = false LIMIT 10 OFFSET $1`;
    const safeValues = [offset];
    return await client
      .query(selectQuery, safeValues)
      .then((result) => result.rows);
  }
  async getSellers(page = 0) {
    let offset = page * 10;
    const selectQuery = `select user_name,user_role,company_name,adress,telephone,is_activated from seller inner join users on seller.u_id = users.u_id where users.user_role ='seller' LIMIT 10 OFFSET $1`;
    const safeValues = [offset];
    return await client
      .query(selectQuery, safeValues)
      .then((result) => result.rows);
  }
  async getActiveSellers(page = 0) {
    let offset = page * 10;
    const selectQuery = `select user_name,user_role,company_name,adress,telephone,is_activated from seller inner join users on seller.u_id = users.u_id where users.user_role ='seller' and users.is_activated = true LIMIT 10 OFFSET $1`;
    const safeValues = [offset];
    return await client
      .query(selectQuery, safeValues)
      .then((result) => result.rows);
  }
  async getDeactivateSellers(page = 0) {
    let offset = page * 10;
    const selectQuery = `select user_name,user_role,company_name,adress,telephone,is_activated from seller inner join users on seller.u_id = users.u_id where users.user_role ='seller' and users.is_activated = false LIMIT 10 OFFSET $1`;
    const safeValues = [offset];
    return await client
      .query(selectQuery, safeValues)
      .then((result) => result.rows);
  }
  async getDeletedProducts(page = 0) {
    let offset = page * 10;
    const selectQuery = `select name,description,main_img,price,category.category_name,seller.company_name,is_deleted from products inner join seller on products.seller_id = seller.id inner join category on products.category_id = category.id where is_deleted = true LIMIT 10 OFFSET $1`;
    const safeValues = [offset];
    return await client
      .query(selectQuery, safeValues)
      .then((result) => result.rows);
  }
  async getInCartProducts(page = 0) {
    let offset = page * 10;
    const selectQuery = `select name,description,main_img,price,category.category_name,seller.company_name,is_bought from products inner join seller on products.seller_id = seller.id inner join category on products.category_id = category.id inner join buyer_cart on products.id = buyer_cart.p_id where is_bought = false LIMIT 10 OFFSET $1`;
    const safeValues = [offset];
    return await client
      .query(selectQuery, safeValues)
      .then((result) => result.rows);
  }
  async getBoughtProducts(page = 0) {
    let offset = page * 10;
    const selectQuery = `select name,description,main_img,price,category.category_name,seller.company_name,is_deleted from products inner join seller on products.seller_id = seller.id inner join category on products.category_id = category.id inner join buyer_cart on products.id = buyer_cart.p_id where is_bought = true LIMIT 10 OFFSET $1`;
    const safeValues = [offset];
    return await client
      .query(selectQuery, safeValues)
      .then((result) => result.rows);
  }
  async getActiveProducts(page = 0) {
    let offset = page * 10;
    const selectQuery = `select name,description,main_img,price,category.category_name,seller.company_name,is_deleted from products inner join seller on products.seller_id = seller.id inner join category on products.category_id = category.id where is_deleted = false LIMIT 10 OFFSET $1`;
    const safeValues = [offset];
    return await client
      .query(selectQuery, safeValues)
      .then((result) => result.rows);
  }
  async getAllProducts(page = 0) {
    let offset = page * 10;
    const selectQuery = `select name,description,main_img,price,category.category_name,seller.company_name,is_deleted from products inner join seller on products.seller_id = seller.id inner join category on products.category_id = category.id LIMIT 10 OFFSET $1`;
    const safeValues = [offset];
    return await client
      .query(selectQuery, safeValues)
      .then((result) => result.rows);
  }
  async getfav(productID) {
    const selectQuery = `SELECT COUNT (*) FROM buyer_favorite WHERE p_id = $1;`;
    const safeValues = [productID];
    return await client
      .query(selectQuery, safeValues)
      .then((result) => result.rows[0]);
  }
  async toggleUser(id) {
    let updateQuery = `UPDATE users set is_activated= NOT is_activated WHERE u_id=$1 Returning user_name,is_activated`;
    let safeValues = [id];
    return await client
      .query(updateQuery, safeValues)
      .then((result) => result.rows[0]);
  }

  async toggleComments(table, id) {
    let updateQuery = `UPDATE ${table} set is_deleted= NOT is_deleted WHERE id=$1 Returning *`;
    let safeValues = [id];
    return await client
      .query(updateQuery, safeValues)
      .then((result) => result.rows[0]);
  }

  async insertCategory(name) {
    let categories = await client
      .query('select category_name from category')
      .then((result) => result.rows.map((item) => item.category_name));
    if (!categories.includes(name)) {
      let insetQuery =
        'INSERT INTO category (category_name) VALUES ($1) Returning *';
      return await client
        .query(insetQuery, [name])
        .then((result) => result.rows[0]);
    } else {
      return 'This Category already existed';
    }
  }

  async numberOfUsers() {
    let countQuery = 'SELECT COUNT(*) FROM users';
    return client.query(countQuery).then((result) => result.rows[0].count);
  }

  async numberOfSellers() {
    let countQuery = 'SELECT COUNT(*) FROM seller';
    return client.query(countQuery).then((result) => result.rows[0].count);
  }

  async numberOfBuyers() {
    let countQuery = 'SELECT COUNT(*) FROM buyer';
    return client.query(countQuery).then((result) => result.rows[0].count);
  }

  async numberOfABuyers() {
    let countQuery = `SELECT COUNT(*) FROM users where user_role = $1 and is_activated = true`;
    let safeValue = ['buyer'];
    return client
      .query(countQuery, safeValue)
      .then((result) => result.rows[0].count);
  }

  async numberOfDBuyers() {
    let countQuery = `SELECT COUNT(*) FROM users where user_role = $1 and is_activated = false`;
    let safeValue = ['buyer'];
    return client
      .query(countQuery, safeValue)
      .then((result) => result.rows[0].count);
  }

  async numberOfDSellers() {
    let countQuery = `SELECT COUNT(*) FROM users where user_role = $1 and is_activated = false`;
    let safeValue = ['seller'];
    return client
      .query(countQuery, safeValue)
      .then((result) => result.rows[0].count);
  }

  async numberOfASellers() {
    let countQuery = `SELECT COUNT(*) FROM users where user_role = $1 and is_activated = true`;
    let safeValue = ['seller'];
    return client
      .query(countQuery, safeValue)
      .then((result) => result.rows[0].count);
  }

  async numberOfProducts() {
    let countQuery = 'SELECT COUNT(*) FROM products';
    return client.query(countQuery).then((result) => result.rows[0].count);
  }

  async numberOfDProducts() {
    let countQuery = `SELECT COUNT(*) FROM products where is_deleted = true`;
    return client.query(countQuery).then((result) => result.rows[0].count);
  }

  async numberOfAProducts() {
    let countQuery = `SELECT COUNT(*) FROM products where is_deleted = false`;
    return client.query(countQuery).then((result) => result.rows[0].count);
  }

  async numberOfBProducts() {
    let countQuery = `SELECT COUNT(*) FROM buyer_cart where is_bought = true`;
    return client.query(countQuery).then((result) => result.rows[0].count);
  }

  async numberOfCProducts() {
    let countQuery = `SELECT COUNT(*) FROM buyer_cart where is_bought = false`;
    return client.query(countQuery).then((result) => result.rows[0].count);
  }
}

module.exports = new AdminCollection();
