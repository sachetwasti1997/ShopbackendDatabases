const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);

getProductsFromFilecart = (cb) =>{
    fs.readFile(p, 'utf-8', (err, data) => {
        if(err){
            cb(null);
        }
        cb(data);
    })
}

module.exports = class Cart{
    
    static addProduct(productId, productPrice){

        //Fetch the cart
        getProductsFromFilecart(data => {
            let mapOfObjects = JSON.parse(data);
            let tp = 0;
            // const idSearch = productId+"";
            if(mapOfObjects.cart[productId]){
                mapOfObjects.cart[productId].qty += 1;  
            }else if(mapOfObjects.cart[productId] === undefined){
                mapOfObjects.cart[productId] = {id: productId, qty: 1};
            }
            mapOfObjects.totalPrice += productPrice;
            console.log(mapOfObjects);
            fs.writeFile(p, JSON.stringify(mapOfObjects), err => {
                if(err) {
                    console.log(err)
                    throw err;
                }
                console.log('Done!');
            })            
        });

        //Add new product/ increase the quantity

    
    }

    static deleteItem(id, productPrice){
        getProductsFromFilecart(data => {
            let mapOfObjects = JSON.parse(data);
            console.log(mapOfObjects.products, " from delete cart item*******");
            if(mapOfObjects.products){
                const quantity = mapOfObjects.products[id].qty;
                const totalPriceDeduct = quantity * productPrice;
                mapOfObjects.totalPrice -= totalPriceDeduct;

                console.log(mapOfObjects);
            }

            fs.writeFile(p, JSON.stringify(mapOfObjects), err => {
                if(err) {
                    console.log(err)
                    throw err;
                }
                console.log('Done!');
            });

        });
    }
    
    static fetchAll(cb){
        getProductsFromFilecart(data => {
            let arr;
            if(data) arr = JSON.parse(data);
            console.log(arr," This is the data fetchAllCart")
            cb(arr)
        })
    }

}