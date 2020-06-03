const Product = require('../models/products')

exports.getAddProduct = (req, res, next) => {
    console.log(req.body)
    const { id, itemName, price, quantity, description, imageUrl } = {...req.body};
    console.log(id, itemName, price, quantity, description, imageUrl);
    // console.log(req.body.description +" This is the request obtained")
    const product = new Product(id, itemName, imageUrl, price, quantity, description);
    product.save();
}

exports.deleteData = (req, res, next) => {
    const id = req.body.id;
    console.log(req.body, " data to be deleted*********")
    Product.deleteItem(id);
    // next();
}

// exports.getAdminProduct = (req, res, next) => {
//     res.send({message: 'AdminProduct'})
// }