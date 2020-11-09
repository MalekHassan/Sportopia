'use strict';

require('dotenv').config();
const client = require('../pool');

class Products {
  async create(product, user, categoryId) {
    const selectQuery = 'SELECT seller_id,name from products where name=$1';
    let safeValues = [product.name];
    let productDb = await client
      .query(selectQuery, safeValues)
      .then((data) => data.rows[0]);
    if (!productDb) {
      const insertQuery =
        'INSERT INTO products (seller_id,name,description,main_img,images,price,category_id,quantity,is_deleted) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *';
      safeValues = [
        user.id,
        product.name,
        product.description,
        product.main_img,
        product.images,
        product.price,
        categoryId,
        product.quantity,
        false,
      ];
      let productInfo = await client.query(insertQuery, safeValues);
      return productInfo.rows[0];
    } else {
      return 'This product is exist';
    }
  }
  async update(product, productID) {
    let productDb = await client
      .query(`select * from products where id=${productID}`)
      .then((result) => result.rows[0]);
    let updateQuery = `UPDATE products SET name=$1, description=$2 ,main_img=$3 ,images=$4,price=$5,category_id=$6,quantity=$7,is_deleted=$8 WHERE id=$9 RETURNING *;`;
    let safeValues = [
      product.name ? product.name : productDb.name,
      product.description ? product.description : productDb.description,
      product.main_img ? product.main_img : productDb.main_img,
      product.images ? product.images : productDb.images,
      product.price ? product.price : productDb.price,
      product.category_id ? product.category_id : productDb.category_id,
      product.quantity ? product.quantity : productDb.quantity,
      productDb.is_deleted,
      productID,
    ];
    let productInfo = await client.query(updateQuery, safeValues);
    return productInfo.rows[0];
  }
  async delete(deleteId) {
    let deleteQuery = `update products set is_deleted='true' where id=$1 RETURNING *;`;
    let safeValues = [deleteId];
    let productDeleting = await client.query(deleteQuery, safeValues);
    return productDeleting.rows[0];
  }
}
module.exports = new Products();
