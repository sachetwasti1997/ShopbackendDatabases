const Product = require('../models/products');
const ShopCart = require('../models/cart');

exports.getOrders = (req, res, next) => {
    res.send({message: 'Orders'})
}

exports.getIndex = (req, res, next) => {
    // console.log("called");
    Product.fetchAllproduct((productList)=>{
        products = productList
        // console.log(products, 'Data to send');
        res.send({productName: products});
    });
}

exports.postCart = (req, res, next) => {
    // console.log(req.body, "I am here");
    const { id, price } = {...req.body};
    ShopCart.addProduct(id, price);
}

exports.getCart = (req, res, next) => {
    ShopCart.fetchAll(productList =>{
        // console.log("Printing the data again ", productList)
        res.send(productList);
    });
}

exports.getCheckOut = (req, res, next) => {
    res.send({message: 'CheckOut'});
}

exports.deleteCart = (req, res, next) => {
    console.log(req.body);
    const {idDel} = {...req.body}
    ShopCart.deleteItem(idDel);
}


