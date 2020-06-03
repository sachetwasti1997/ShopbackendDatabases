const express = require('express');
var cors = require('cors');

const adminData = require('./routes/admin');
//gets Router object from admin.js that is valid middleware

const shopRoutes = require('./routes/shop');

const app = express();//express package seems to export function at the end
// const server = http.createServer(app)

//NodeJs is all about middleware
app.use(cors());

app.use(adminData.routes);

app.use(shopRoutes);

app.listen(8000);

