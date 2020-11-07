module.exports = (role) => {
  return (req, res, next) => {
    try {
      if (req.user.user_role === role) {
        // console.log('role is ', req.user.role);
        // console.log('username is ', req.user.username);
        next();
      } else {
        // console.log(`User isn't`, role);
        res.send(`You don't have access to this page.`);
        next('Access Denied');
      }
    } catch (e) {
      next(e.message);
    }
  };
};
