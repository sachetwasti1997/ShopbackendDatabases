const express = require('express');
let bodyparser = require('body-parser');
let jsonParser = bodyparser.json();
const productController = require('../controller/admin');

const products = [];

const Router = express.Router();
//Router is as mini express app tied to other express apps, which we can export
/**
 * A route is a section of Express code that associates an HTTP verb 
 * (GET, POST, PUT, DELETE, etc.), a URL path/pattern, and a function that is 
 * called to handle that pattern.
 */

Router.post('/deleteadmin', jsonParser, productController.deleteData);
Router.post('/add-product', jsonParser, productController.getAddProduct);
// Router.get('/admin-product', productController.getAdminProduct);

//the route gets registered on the Router

exports.routes = Router;
exports.products = products;

