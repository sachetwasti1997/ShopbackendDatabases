const express = require('express');
let bodyparser = require('body-parser');
let jsonParser = bodyparser.json();

const Router = express.Router();
const shopController = require('../controller/shop');

Router.get('/', shopController.getIndex);

Router.get('/orders', shopController.getOrders);

Router.get('/cart', shopController.getCart);

Router.post('/cart-add', jsonParser, shopController.postCart);

Router.get('/checkout', shopController.getCheckOut);

module.exports = Router;    
