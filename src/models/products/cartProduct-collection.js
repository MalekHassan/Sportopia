'use strict';

require('dotenv').config();
const client = require('../pool');

class Cart {
  async insertToCart(productId, details) {
    const insertQuery =
      'INSERT INTO buyer_cart (p_id,u_id ,quaintitny,is_bought) VALUES ($1,$2,$3,$4) RETURNING *';
    let safeValues = [productId.id, details.u_id, details.quaintitny, false];
    let productInfo = await client.query(insertQuery, safeValues);
    return productInfo.rows[0];
  }
  async buyNow(productId, details) {
    const insertQuery =
      'INSERT INTO buyer_cart (p_id,u_id ,quaintitny,is_bought) VALUES ($1,$2,$3,$4) RETURNING *';
    let safeValues = [productId.id, details.u_id, details.quaintitny, true];
    let productInfo = await client.query(insertQuery, safeValues);
    return productInfo.rows[0];
  }

  async update(productId) {
    const selectQuery = 'SELECT is_bought from buyer_cart where id=$1';
    let safeValues = [productId];
    let productDb = await client.query(selectQuery, safeValues);
    if (!productDb.rows[0].is_bought) {
      let updateQuery = `UPDATE buyer_cart SET is_bought=$1 WHERE id=$2 RETURNING *;`;
      safeValues = [true, productId];
      let productInfo = await client.query(updateQuery, safeValues);
      return productInfo.rows[0];
    } else {
      return 'You bought this product from your cart';
    }
  }
  async deleteFromCart(deleteId) {
    let deleteQuery = `delete from buyer_cart where id=$1 RETURNING *;`;
    let safeValues = [deleteId];
    let productDeleting = await client.query(deleteQuery, safeValues);
    return productDeleting.rows[0];
  }
}
module.exports = new Cart();
