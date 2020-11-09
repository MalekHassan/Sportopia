'use strict';

module.exports = (req, res, next) => {
  try {
    res.status(404).send('404/Not-Found');
  } catch (e) {
    res.statusCode = 404;
  }
};
