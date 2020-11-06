'use strict';
const pg = require('pg');
require('dotenv').config();
const server = require('./src/server');
const PORT = process.env.PORT;
const client = new pg.Client(process.env.DATABASE_URL);

client.connect().then(() => {
  server.start(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
  });
});
