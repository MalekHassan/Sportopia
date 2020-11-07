'use strict';

module.exports = (req, res, next) => {
  res.status(404);
  res.statusMessage = 'Page not Found';
  res.json({ error: 'Page not Found' });
};
