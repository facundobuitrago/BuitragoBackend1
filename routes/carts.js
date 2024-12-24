const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const cartsFile = path.join(__dirname, '../data/carts.json');
const productsFile = path.join(__dirname, '../data/products.json');

// Función para leer los carritos
const readCarts = () => {
    if (!fs.existsSync(cartsFile)) return [];
    
    try {
        const data = fs.readFileSync(cartsFile, 'utf-8');
        return JSON.parse(data || '[]');
    } catch (error) {
        console.error('Error al leer o parsear el archivo de carritos:', error);
        return []; 
    }
};

// Función para guardar los carritos
const saveCarts = (carts) => {
    fs.writeFileSync(cartsFile, JSON.stringify(carts, null, 2));
};

// Crear un nuevo carrito
router.post('/', (req, res) => {
    const carts = readCarts();
    const newCart = {
        id: carts.length + 1,
        products: []
    };
    carts.push(newCart);
    saveCarts(carts);
    res.status(201).json(newCart);
});

// Obtener los productos de un carrito específico
router.get('/:cid', (req, res) => {
    const carts = readCarts();
    const cart = carts.find(c => c.id === parseInt(req.params.cid));
    if (!cart) return res.status(404).send('Carrito no encontrado');
    res.json(cart.products);
});

// Eliminar un carrito
router.delete('/:cid', (req, res) => {
    const carts = readCarts(); // Lee los carritos
    const cartIndex = carts.findIndex(c => c.id === parseInt(req.params.cid)); // Busca el carrito por su ID

    if (cartIndex === -1) {
        return res.status(404).send('Carrito no encontrado');
    }

    // Elimina
    carts.splice(cartIndex, 1);

    saveCarts(carts); // Guarda

    res.status(200).send('Carrito eliminado');
});

// Agregar un producto al carrito
router.post('/:cid/product/:pid', (req, res) => {
    const carts = readCarts();
    const cart = carts.find(c => c.id === parseInt(req.params.cid));
    const products = JSON.parse(fs.readFileSync(productsFile, 'utf-8')); 
    const product = products.find(p => p.id === parseInt(req.params.pid));
    
    if (!cart) return res.status(404).send('Carrito no encontrado');
    if (!product) return res.status(404).send('Producto no encontrado');

    const existingProduct = cart.products.find(p => p.product === product.id);
    
    if (existingProduct) {
        existingProduct.quantity += 1;  // Si el producto ya está incrementa en uno
    } else {
        cart.products.push({ product: product.id, quantity: 1 });  // Si no, agrega el producto
    }

    saveCarts(carts);
    res.status(200).json(cart);
});

module.exports = router;
