'use strict';

// Dependencies
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const ejs = require('ejs');
const paypal = require('paypal-rest-sdk');
const app = express();
const passport = require('../src/models/OAuth/facebook');
const methodOverride = require('method-override');
const cookie = require('cookie-parser');
app.use(methodOverride('_method'));

// Rotes Require
app.use(express.urlencoded({ extended: true }));
const PayPalPayment = require('./routes/paypal');
const signing = require('./routes/signing');
const sellerProd = require('./routes/sellerproducts');
const buyerProd = require('./routes/buyerpeoducts');
const cartProducts = require('./routes/cartproducts');
const favoriteProducts = require('./routes/favoriteproducts');
const adminRoute = require('./routes/admin');
const beddingRoute = require('./routes/bedding');
const defaultUser = require('./routes/default_users');
const notExist = require('./models/middleware/404');
const serverError = require('./models/middleware/500');

// Middleware
app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
app.use(cookie());

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
  // console.log('welcome', socket.id);
  require('./bedding-server');
});

// Routes
app.use('/', signing);
app.use('/seller', sellerProd);
app.use('/buyer', buyerProd);
app.use('/cart', cartProducts);
app.use('/favorite', favoriteProducts);
app.use('/', adminRoute);
app.use('/bidding', beddingRoute);
app.use('/paypal', PayPalPayment);
app.use('/', defaultUser);

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
