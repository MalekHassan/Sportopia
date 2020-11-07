'use strict';
require('dotenv').config();

const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const users = require('../users/users-collection');

const FB_CLIENT_ID = process.env.FB_CLIENT_ID;
const FB_CLIENT_SECRET = process.env.FB_CLIENT_SECRET;

passport.use(
  new FacebookStrategy(
    {
      clientID: FB_CLIENT_ID,
      clientSecret: FB_CLIENT_SECRET,
      callbackURL: 'http://localhost:8000/fbOauth',
      profileFields: [
        'id',
        'email',
        'gender',
        'link',
        'locale',
        'name',
        'timezone',
        'updated_time',
        'verified',
      ],
    },

    async function (accessToken, refreshToken, profile, cb) {
      try {
        let userRecord = {
          username: profile.id,
          password: process.env.FB_PASSWORD,
          role: 'buyer',
        };
        let user = await users.OAuth(userRecord);
        let token = await users.generateToken(userRecord);

        return cb(null, { user, token });
      } catch (error) {
        cb(error, false, error.message);
      }
    }
  )
);

module.exports = passport;
