'use strict';

require('dotenv').config();
const client = require('../pool');

class Default {
  constructor() {}

  // get products
  async getProducts(page = 0) {
    let offset = page * 10;
    const selectQuery = 'select * from products LIMIT 10 OFFSET $1';
    const safeValues = [offset];
    return await client
      .query(selectQuery, safeValues)
      .then((result) => result.rows);
  }

  async getCategories() {
    const selectQuery = 'select * from category';
    return await client.query(selectQuery).then((result) => result.rows);
  }
}

module.exports = new Default();
