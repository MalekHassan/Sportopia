'use strict';

require('dotenv').config();
const client = require('../pool');

class Favorite {
  async get(userId) {
    let getQuery = `select name,description,main_img,price,category.category_name,seller.company_name,buyer_favorite.is_deleted,buyer_favorite.p_id from products inner join seller on products.seller_id = seller.id inner join category on products.category_id = category.id inner join buyer_favorite on products.id = buyer_favorite.p_id where buyer_favorite.u_id = $1 and buyer_favorite.is_deleted = false`;
    let safeValues = [userId];
    let favoriteProducts = await client
      .query(getQuery, safeValues)
      .then((result) => result.rows);
    return favoriteProducts;
  }
  async addToFavorite(productID, userId) {
    const selectQuery = 'SELECT * from buyer_favorite where id=$1 and u_id = $2';
    let safeValues = [productID, userId];
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

  async delete(deleteId, userId) {
    let deleteQuery = `update buyer_favorite set is_deleted= not is_deleted where id=$1 and u_id = $2 RETURNING *;`;
    let safeValues = [deleteId];
    let productDeleting = await client
      .query(deleteQuery, safeValues)
      .then((result) => result.rows[0]);
    return productDeleting;
  }
}
module.exports = new Favorite();
