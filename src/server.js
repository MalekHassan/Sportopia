'use strict';

// Dependencies
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.static('./public'));
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// Exporting the server
module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log('Working On', port);
    });
  },
};
