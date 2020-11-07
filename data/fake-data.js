'use strict';
const client = require('../src/models/pool');
require('colors');

// Functions

insertCategory();
console.log('Your data is ready 👌'.cyan.bold);

function insertCategory() {
  let arrayCategory = [
    'Sports Clothing',
    'Camping & Hiking',
    'Fitness & Body Building',
    'Sports Accessories',
    'Entertainment',
    'Roller Skates, Skateboards & Scooters',
    'Sneakers, shoes',
    'Horse Racing',
    'Water Sports',
  ];
  arrayCategory.forEach(async (item) => {
    let InsertQuery = 'INSERT INTO category (category_name) VALUES ($1)';
    let safeValues = [item];
    await client.query(InsertQuery, safeValues);
  });
}
