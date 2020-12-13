'use strict';

require('dotenv').config();
const client = require('../pool');

class Cart {
  async getCart(userId) {
    const selectQuery = `select name,description,main_img,price,category.category_name,seller.company_name,is_deleted,id from products inner join seller on products.seller_id = seller.id inner join category on products.category_id = category.id inner join buyer_cart on products.id = buyer_cart.p_id where buyer_cart.u_id = $1`;
    const safeValues = [userId];
    return await client
      .query(selectQuery, safeValues)
      .then((result) => result.rows);
  }
  async insertToCart(productId, userId) {
    const insertQuery =
      'INSERT INTO buyer_cart (p_id,u_id ,quantity,is_bought) VALUES ($1,$2,$3,$4) RETURNING *';
    let safeValues = [productId, userId, 1, false];
    let productInfo = await client.query(insertQuery, safeValues);
    return productInfo.rows[0];
  }
  async buyNow(productId, userId, quantity) {
    const insertQuery =
      'INSERT INTO buyer_cart (p_id,u_id ,quantity,is_bought) VALUES ($1,$2,$3,$4) RETURNING *';
    let safeValues = [parseInt(productId), userId, quantity, true];
    let productInfo = await client.query(insertQuery, safeValues);
    return productInfo.rows[0];
  }

  async update(productId) {
    const selectQuery = 'SELECT is_bought from buyer_cart where id=$1';
    let safeValues = [productId];
    let productDb = await client
      .query(selectQuery, safeValues)
      .then((result) => result.rows[0]);
    if (!productDb.is_bought) {
      let updateQuery = `UPDATE buyer_cart SET is_bought= not is_bought WHERE id=$1 RETURNING *;`;
      safeValues = [productId];
      let productInfo = await client
        .query(updateQuery, safeValues)
        .then((result) => result.rows[0]);
      return productInfo;
    } else {
      return 'This Product already been bought';
    }
  }
  async deleteFromCart(deleteId) {
    let deleteQuery = `delete from buyer_cart where id=$1 RETURNING *;`;
    let safeValues = [deleteId];
    let productDeleting = await client
      .query(deleteQuery, safeValues)
      .then((result) => result.rows[0]);
    return productDeleting;
  }
  
}
module.exports = new Cart();
