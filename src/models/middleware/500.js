'use strict';

module.exports = (req, res, next) => {
  res.status(500);
  res.statusMessage = 'Server Error';
  res.json({ error: 'Server Error' });
};
