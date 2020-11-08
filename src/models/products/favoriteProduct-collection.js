'use strict';

require('dotenv').config();
const client = require('../pool');

class Favorite {
  async addToFavorite(productID, userId) {
    const selectQuery = 'SELECT * from buyer_favorite where id=$1';
    let safeValues = [productID];
    let productDb = await client
      .query(selectQuery, safeValues)
      .then((result) => result.rows[0]);
    if (!productDb) {
      const insertQuery =
        'INSERT INTO buyer_favorite (u_id,is_deleted,p_id) VALUES ($1,$2,$3) RETURNING *';
      let safeValues = [userId, false, productID];
      let productInfo = await client
        .query(insertQuery, safeValues)
        .then((result) => result.rows[0]);
      return productInfo;
    } else {
      if (productDb.is_deleted) {
        return await this.delete(productDb.id);
      } else {
        return 'You have this product in your Favorite';
      }
    }
  }

  async delete(deleteId) {
    let deleteQuery = `update buyer_favorite set is_deleted= not is_deleted where id=$1 RETURNING *;`;
    let safeValues = [deleteId];
    let productDeleting = await client
      .query(deleteQuery, safeValues)
      .then((result) => result.rows[0]);
    return productDeleting;
  }
}
module.exports = new Favorite();
