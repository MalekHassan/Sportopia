'use strict';
const client = require('../models/pool');

module.exports = async (req, res, next) => {
  let sellerId = req.user.id;
  let selectQuery = 'SELECT id from products where seller_id=$1';
  let safeValues = [sellerId];
  let allUserProducts = await client
    .query(selectQuery, safeValues)
    .then((result) => {
      return result.rows.map((item) => item.id);
    });
  if (allUserProducts.includes(parseInt(req.params.id))) {
    next();
  } else {
    res.status(403);
    res.json({
      message: `You don't have Access to this Product
      Or you don't even have this product`,
    });
  }
};
