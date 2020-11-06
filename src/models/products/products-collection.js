'use strict';

require('dotenv').config();
const client = require('../pool');

class Products {
  async create(product) {
    const selectQuery =
      'SELECT seller_id,describtion from products where describtion=$1';
    let safeValues = [product.describtion];
    let productDb = await client
      .query(selectQuery, safeValues)
      .then((data) => data.rows[0]);
    console.log(Boolean(productDb));
    if (!productDb) {
      const insertQuery =
        'INSERT INTO products (describtion ,main_img ,images,price,category_id) VALUES ($1,$2,$3,$4,$5) RETURNING *';
      safeValues = [
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
    let updateQuery = `UPDATE products SET describtion=$1 ,main_img=$2 ,images=$3,price=$4,category_id=$5 WHERE id=$6 RETURNING *;`;
    let safeValues = [
      product.describtion,
      product.main_img,
      product.images,
      product.price,
      product.category_id,
      productID,
    ];
    let productInfo = await client.query(updateQuery, safeValues);
    // .then(async () => {
    // return await client.query(
    //     `SELECT * FROM products inner join category on products.category_id = category.id where products.id=$1;`
    //     ,[productID]
    //   )
    //   .then((result) => {
    //       console.log('ffffffffff',productID);
    //     return result.rows[0];
    //   });
    //   });
    return productInfo.rows[0];
  }
  async delete(deleteId) {
    let deleteQuery = `delete from products where id=$1 RETURNING *;`;
    let safeValues = [deleteId];
    let productDeleting = await client.query(deleteQuery, safeValues);
    return productDeleting.rows[0];
  }
}
module.exports = new Products();
