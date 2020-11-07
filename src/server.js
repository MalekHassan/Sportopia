'use strict';

// Dependencies
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

// Rotes Require
const signing = require('./routes/signing');
const sellerProd = require('./routes/sellerproducts');
const buyerProd = require('./routes/buyerpeoducts');
const adminRoute = require('./routes/admin');
const notExist = require('./models/middleware/404');
const serverError = require('./models/middleware/500');

// Middleware
app.use(express.static('./public'));
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// Routes
app.use('/', signing);
app.use('/seller', sellerProd);
app.use('/buyer', buyerProd);
app.use('/', adminRoute);

//Error middleware
app.use('*', notExist);
app.use(serverError);

// Exporting the server
module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log('Working On', port);
    });
  },
};
