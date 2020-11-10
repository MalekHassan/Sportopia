const users = require('../users/users-collection');
module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    next('Invalid Login');
  } else {
    const token = req.headers.authorization.split(' ').pop();
    users
      .authenticateToken(token)
      .then(async (validUser) => {
        if (validUser.user_role !== 'admin') {
          validUser = await users.sellerOBuyer(validUser);
        }
        req.user = validUser;
        next();
      })
      .catch(() => {
        res.send('No authentication');
        next('Invalid Login');
      });
  }
};
