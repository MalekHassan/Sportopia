'use strict';

require('dotenv').config();
const client = require('../pool');

class Favorite {
  async addToFavorite(productID, product) {
    const selectQuery = 'SELECT p_id from buyer_favorite where id=$1';
    let safeValues = [productID.id];
    let productDb = await client.query(selectQuery, safeValues);
    console.log('productDb', productDb.rows[0]);
    if (!productDb.rows[0]) {
      const insertQuery =
        'INSERT INTO buyer_favorite (u_id,is_deleted,p_id) VALUES ($1,$2,$3) RETURNING *';
      let safeValues = [product.u_id, false, product.p_id];
      let productInfo = await client.query(insertQuery, safeValues);
      return productInfo.rows[0];
    } else {
      return 'this product is not bought yet';
    }
  }

  async delete(deleteId, favoriteStatus = true) {
    let deleteQuery = `update buyer_favorite set is_deleted=$2 where id=$1 RETURNING *;`;
    let safeValues = [deleteId, favoriteStatus];
    let productDeleting = await client.query(deleteQuery, safeValues);
    return productDeleting.rows[0];
  }
}
module.exports = new Favorite();
