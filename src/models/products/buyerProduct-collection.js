'use strict';

require('dotenv').config();
const client = require('../pool');

class Products {
  async create(product) {
    const insertQuery =
      'INSERT INTO user_product comment VALUES ($1) where p_id = $2 and u_id =$3 RETURNING *';
    safeValues = [product.comment, product.p_id, product.u_id];
    let productInfo = await client.query(insertQuery, safeValues);
    return productInfo.rows[0];
  }
  async update(product, productID) {
    let updateQuery = `UPDATE user_product SET comment=$1 WHERE id=$2 RETURNING *;`;
    let safeValues = [product.comment, productID];
    let productInfo = await client.query(updateQuery, safeValues);
    return productInfo.rows[0];
  }
  async delete(deleteId) {
    let deleteQuery = `delete from user_product where id=$1 RETURNING *;`;
    let safeValues = [deleteId];
    let productDeleting = await client.query(deleteQuery, safeValues);
    return productDeleting.rows[0];
  }
}
module.exports = new Products();
