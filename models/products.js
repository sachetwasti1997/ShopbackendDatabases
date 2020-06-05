const fs = require('fs');
const path = require('path');
const products = [];

const Cart = require('./cart');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'product1.json'
);

getProductsFromFile = (cb) =>{
    fs.readFile(p, 'utf-8', (err, data) => {
        if(err){
            cb(null);
        }
        cb(data);
    })
}

module.exports = class Product{

    constructor(id, title, imageUrl, price, quantity, description) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price; 
        this.quantity = quantity;
        this.description = description;
    }

    generateID() {
        // Math.random should be unique because of its seeding algorithm.
        // Convert it to base 36 (numbers + letters), and grab the first 9 characters
        // after the decimal.
        return '_' + Math.random().toString(36).substr(2, 9);
      };

    save(){
        getProductsFromFile(data => {
            let mapOfObjects = JSON.parse(data);

            if(mapOfObjects.products[this.id]){
                console.log(this, " Product to be edited");
                mapOfObjects.products[this.id] = {...this};
                console.log(mapOfObjects);
                fs.writeFile(p, JSON.stringify(mapOfObjects), (err)=>{
                    if(err) {
                        console.log(err)
                        throw err;
                    }
                    console.log('Done!');
                })
            }else{
                const jsonObject = {
                    id: this.generateID(),
                    title: this.getTitle(),
                    imageUrl: this.getImageURL(),
                    price: this.getPrice(),
                    quantity: this.getQuantity(),
                    description: this.getDescription()
                };
    
                mapOfObjects.products[jsonObject.id] = jsonObject;
    
                console.log(mapOfObjects);
    
                fs.writeFile(p, JSON.stringify(mapOfObjects), (err)=>{
                    if(err) {
                        console.log(err)
                        throw err;
                    }
                    console.log('Done!');
                })
            }
        })
    }

    static deleteItem(id){
        getProductsFromFile(data => {
            let mapOfObjects = JSON.parse(data);
            delete mapOfObjects.products[""+id];
            console.log(mapOfObjects);
            fs.writeFile(p, JSON.stringify(mapOfObjects), (err)=>{
                if(err) {
                    console.log(err)
                    throw err;
                }
                console.log('Done!');
            })
        })            
        Cart.deleteItem(id);
    }

    getTitle(){
        return this.title;
    }

    getPrice(){
        return this.price;
    }

    getQuantity(){
        return this.quantity;
    }

    getDescription(){
        return this.description;
    }

    getImageURL(){
        return this.imageUrl;
    }

    static fetchAllproduct(cb){
        getProductsFromFile(data => {
            let arr;
            if(data) arr = JSON.parse(data);
            // console.log(arr," This is the data")
            if(arr)cb(arr.products)
        })

    }

    static findById(id, cb){
        this.fetchAll(products => {
            const product = products.find(pro => pro.id === id);
            cb(product);
        })
    }

}