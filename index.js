const express = require('express');
const path = require('path');
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

const app = express();

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/carts', cartsRouter);

app.use('/api/products', productsRouter);

app.listen(8080, () => {
    console.log('Servidor corriendo en http://localhost:8080');
});
