'use strict';
const express = require('express');
const paypal = require('paypal-rest-sdk');
const client = require('../../src/models/pool');

// const app = express();
const router = express.Router();

paypal.configure({
  mode: 'sandbox', //sandbox or live
  client_id:
    'Af0qpzA1UD58_YXXb92IIxnjBSHARw7AM-z9NNpTT6eDPuQd1Zg7C8KrVamwb8whEU0Ju0jsP8pOMuAM',
  client_secret:
    'EP9LdiMCH8YkIfemCBaCGIxbo3dNBsAyiMA0EVWX1erlHKKdnbRZVKj8Cn6v29d6M9o-4p_kca_cB2YX',
});

router.post('/paypalpayment/:id', payment);
router.get('/success', succeeded);
router.get('/allproduct', async (req, res) => {
  let sql = `select * from products`;
  await client.query(sql).then((result) => {
    // console.log('result.rows', result.rows);
    res.render('payment', { data: result.rows });
  });
});

router.get('/cancel', (req, res) => res.send('Cancelled'));

let buying;
let quantitys;
async function payment(req, res) {
  const { many } = req.body;
  quantitys = req.body.many;
  let sql = `select * from products WHERE id=$1`;
  let safeValue = [req.params.id];
  let item = await client.query(sql, safeValue);
  buying = item.rows[0];
  let leftItems = buying.quantity - quantitys;
  if (leftItems < 0) {
    res.send('You have entered a larger amount than in the store');
    return;
  } else if (leftItems === 0) {
    let deleteQuery = `update products set is_deleted='true' where id=$1 RETURNING *;`;
    let safeValues = [req.params.id];
    await client.query(deleteQuery, safeValues);
    let updateQuery = `UPDATE products SET quantity=$1 WHERE id=$2 RETURNING *;`;
    safeValue = [leftItems, req.params.id];
    await client.query(updateQuery, safeValue);
  } else {
    let updateQuery = `UPDATE products SET quantity=$1 WHERE id=$2 RETURNING *;`;
    safeValue = [leftItems, req.params.id];
    await client.query(updateQuery, safeValue);
  }
  const create_payment_json = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal',
    },
    redirect_urls: {
      return_url: 'http://localhost:8000/paypal/success',
      cancel_url: 'http://localhost:8000/paypal/cancel',
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: buying.name,
              sku: '001',
              price: buying.price,
              currency: 'USD',
              quantity: quantitys,
            },
          ],
        },
        amount: {
          currency: 'USD',
          total: buying.price * quantitys,
        },
        description: buying.description,
      },
    ],
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === 'approval_url') {
          res.redirect(payment.links[i].href);
        }
      }
    }
  });
  // return 'payment goes well';
}
function succeeded(req, res) {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: 'USD',
          total: buying.price * quantitys,
        },
      },
    ],
  };

  paypal.payment.execute(paymentId, execute_payment_json, function (
    error,
    payment
  ) {
    if (error) {
      console.log(error.response);
      throw error;
    } else {
      // console.log(JSON.stringify(payment));
      res.render('succses', { data: buying });
    }
  });
}

module.exports = router;
