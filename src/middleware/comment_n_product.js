'use strict';

module.exports = (req, res, next) => {
  const table = req.params.table;
  if (table == 'products') {
    req.table = 'products';
  } else if (table == 'comment') {
    req.table = 'buyer_comments';
  }
  next();
};
