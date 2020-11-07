'use strict';

module.exports = async (req, res, next) => {
  if (req.user.is_activated) {
    next();
  } else {
    res.status(403);
    res.json({
      message: 'Your Account in not Activated',
    });
  }
};
