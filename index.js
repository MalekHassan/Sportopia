'use strict';
require('dotenv').config();
const server = require('./src/server');
const PORT = process.env.PORT;
const client = require('./src/models/pool');
server.start(PORT);
