const users = require('../users/users-collection');
module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    next('Invalid Login');
  } else {
    const token = req.headers.authorization.split(' ').pop();
    console.log('__TOKEN__', token);
    users
      .authenticateToken(token)
      .then((validUser) => {
        req.user = validUser;
        next();
      })
      .catch(() => {
        res.send('No authentication');
        next('Invalid Login');
      });
  }
};
