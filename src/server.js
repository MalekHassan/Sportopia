'use strict';

// Dependencies
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

// Rotes Require
const signing = require('./routes/signing');
const sellerProd = require('./routes/products');

// Middleware
app.use(express.static('./public'));
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// Routes
app.use('/', signing);
app.use('/seller', sellerProd);

// Exporting the server
module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log('Working On', port);
    });
  },
};
