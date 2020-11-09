'use strict';

const pgtools = require('pgtools');
require('dotenv').config();
const DROP = process.env.DROP;

// Change the name to your data base

pgtools.dropdb(DROP, 'sports', function (err, res) {
  if (err) {
    console.error(err);
    process.exit(-1);
  }
  console.log(res);

  pgtools.createdb(DROP, 'sports', function (err, res) {
    if (err) {
      console.error(err);
      process.exit(-1);
    }
    console.log(res);
  });
});
