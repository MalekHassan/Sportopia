'use strict';

module.exports = (err, req, res, next) => {
  try {
    res.status(500).send(err);
  } catch (e) {
    res.statusCode = 500;
  }
};
