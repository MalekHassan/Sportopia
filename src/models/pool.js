/* eslint-disable comma-dangle */
require('dotenv').config();
const pg = require('pg');
require('colors');

const test = new pg.Client({
  connectionString: process.env.DATABASE_URL,
});

module.exports = test;

test
  .connect()
  .then(() => {
    console.log(
      `Connected to Data base correctly ${test.database} 💾 `.green.bold
    );
  })
  .catch((e) => {
    console.log(`cant connect to database 🔴`.red.bold);
    console.log(e);
  });
