'use strict';

require('dotenv').config();
const client = require('../pool');

class Products {
  async create(product) {
    const selectQuery = 'SELECT is_bought from buyer_cart where id=$1';
    let safeValues = [product.u_c_id];
    let productDb = await client.query(selectQuery, safeValues);
    console.log('productDb', productDb.rows[0].is_bought);
    if (productDb.rows[0].is_bought) {
      const insertQuery =
        'INSERT INTO buyer_comments (comment,is_deleted,u_c_id) VALUES ($1,$2,$3) RETURNING *';
      let safeValues = [product.comment, false, product.u_c_id];
      let productInfo = await client.query(insertQuery, safeValues);
      return productInfo.rows[0];
    } else {
      return 'this product is not bought yet';
    }
  }
  async update(product, commentId) {
    const selectQuery = 'SELECT is_deleted from buyer_comments where id=$1';
    let safeValues = [commentId];
    let productDb = await client.query(selectQuery, safeValues);
    console.log('productDb', productDb.rows[0].is_deleted);
    if (!productDb.rows[0].is_deleted) {
      let updateQuery = `UPDATE buyer_comments SET comment=$1 WHERE id=$2 RETURNING *;`;
      safeValues = [product.comment, commentId];
      let productInfo = await client.query(updateQuery, safeValues);
      return productInfo.rows[0];
    } else {
      return 'this comment has been deleted';
    }
  }
  async delete(deleteId, commentStatus = true) {
    let deleteQuery = `update buyer_comments set is_deleted=$2 where id=$1 RETURNING *;`;
    let safeValues = [deleteId, commentStatus];
    let productDeleting = await client.query(deleteQuery, safeValues);
    return productDeleting.rows[0];
  }
}
module.exports = new Products();
