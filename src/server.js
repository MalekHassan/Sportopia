'use strict';

// Dependencies
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const passport = require('../src/models/OAuth/facebook');
// Rotes Require
const signing = require('./routes/signing');
const sellerProd = require('./routes/sellerproducts');
const buyerProd = require('./routes/buyerpeoducts');
const cartProducts = require('./routes/cartproducts');
const favoriteProducts = require('./routes/favoriteproducts');
const adminRoute = require('./routes/admin');
const notExist = require('./models/middleware/404');
const serverError = require('./models/middleware/500');

// Middleware
app.use(express.static('./public'));
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

// Socket
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const beddingNameSpace = io.of('/bedding');
beddingNameSpace.on('connection', (socket) => {
  console.log('welcome', socket.id);
  require('./bedding');
});

// Routes
app.use('/', signing);
app.use('/seller', sellerProd);
app.use('/buyer', buyerProd);
app.use('/cart', cartProducts);
app.use('/favorite', favoriteProducts);
app.use('/', adminRoute);

//Error middleware
app.use('*', notExist);
app.use(serverError);

// Exporting the server
module.exports = {
  server: http,
  start: (port) => {
    http.listen(port, () => {
      console.log('Working On', port);
    });
  },
  io: beddingNameSpace,
};
