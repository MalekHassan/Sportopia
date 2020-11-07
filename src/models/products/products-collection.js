'use strict';

require('dotenv').config();
const client = require('../pool');

class Products {
  async create(product) {
    const selectQuery = 'SELECT seller_id,name from products where name=$1';
    let safeValues = [product.name];
    let productDb = await client
      .query(selectQuery, safeValues)
      .then((data) => data.rows[0]);
    console.log(Boolean(productDb));
    if (!productDb) {
      const insertQuery =
        'INSERT INTO products (name,describtion ,main_img ,images,price,category_id) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *';
      safeValues = [
        product.name,
        product.describtion,
        product.main_img,
        product.images,
        product.price,
        product.category_id,
      ];
      let productInfo = await client.query(insertQuery, safeValues);
      return productInfo.rows[0];
    } else {
      return 'This product is exist';
    }
  }
  async update(product, productID) {
    let updateQuery = `UPDATE products SET name=$1,  describtion=$2 ,main_img=$3 ,images=$4,price=$5,category_id=$6 WHERE id=$7 RETURNING *;`;
    let safeValues = [
      product.name,
      product.describtion,
      product.main_img,
      product.images,
      product.price,
      product.category_id,
      productID,
    ];
    let productInfo = await client.query(updateQuery, safeValues);
    return productInfo.rows[0];
  }
  async delete(deleteId, productStatus = true) {
    let deleteQuery = `update products set is_deleted=$2 where id=$1 RETURNING *;`;
    let safeValues = [deleteId, productStatus];
    let productDeleting = await client.query(deleteQuery, safeValues);
    return productDeleting.rows[0];
  }
}
module.exports = new Products();
