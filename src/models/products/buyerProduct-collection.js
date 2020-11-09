'use strict';

require('dotenv').config();
const client = require('../pool');

class Products {
  async create(cartId, comment) {
    const selectQuery = 'SELECT * from buyer_cart where id=$1';
    let safeValues = [cartId];
    let productDb = await client
      .query(selectQuery, safeValues)
      .then((result) => result.rows[0]);
    if (productDb.is_bought) {
      const insertQuery =
        'INSERT INTO buyer_comments (comment,is_deleted,u_c_id) VALUES ($1,$2,$3) RETURNING *';
      let safeValues = [comment, false, cartId];
      let productInfo = await client
        .query(insertQuery, safeValues)
        .then((result) => result.rows[0]);
      return productInfo;
    } else {
      return 'this product is not bought yet';
    }
  }
  async update(comment, commentId) {
    let productDb = await this.getComment(commentId);
    if (productDb) {
      if (!productDb.is_deleted) {
        let updateQuery = `UPDATE buyer_comments SET comment=$1 WHERE id=$2 RETURNING *;`;
        let safeValues = [comment, commentId];
        let productInfo = await client
          .query(updateQuery, safeValues)
          .then((result) => result.rows[0]);
        return productInfo;
      } else {
        return 'this comment has been deleted';
      }
    } else {
      return 'There in no Comment there';
    }
  }
  async delete(commentId, commentStatus = true) {
    let commentDB = await this.getComment(commentId);
    if (commentDB) {
      if (!commentDB.is_deleted) {
        let deleteQuery = `update buyer_comments set is_deleted=$2 where id=$1 RETURNING *;`;
        let safeValues = [commentId, commentStatus];
        let productDeleting = await client
          .query(deleteQuery, safeValues)
          .then((result) => result.rows[0]);
        return productDeleting;
      } else {
        return 'This Comment is already deleted';
      }
    } else {
      return 'There in no Comment there';
    }
  }

  async getComment(commentId) {
    const selectQuery = 'SELECT * from buyer_comments where id=$1';
    let safeValues = [commentId];
    return await client
      .query(selectQuery, safeValues)
      .then((result) => result.rows[0]);
  }
  async getProducts(page, category) {
    let offset = page * 10;
    const selectQuery = `SELECT * FROM products JOIN category ON products.category_id = category.id where category.id = $2 LIMIT 10 OFFSET $1;`;
    const safeValues = [offset, category];
    return await client
      .query(selectQuery, safeValues)
      .then((result) => result.rows);
  }
}
module.exports = new Products();
