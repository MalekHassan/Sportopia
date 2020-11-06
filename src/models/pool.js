/* eslint-disable comma-dangle */
require('dotenv').config();
const pg = require('pg');
require('colors');
// Change the DATABASE_URL everyTime you run a test
const test = new pg.Client({
  connectionString: process.env.DATABASE_URL2,
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
