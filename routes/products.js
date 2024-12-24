const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const productsFile = path.join(__dirname, '../data/products.json');


// Función para leer los productos
const readProducts = () => {
    if (!fs.existsSync(productsFile)) return [];
    const data = fs.readFileSync(productsFile, 'utf-8');
    return JSON.parse(data || '[]');
};

// Función para guardar los productos
const saveProducts = (products) => {
    fs.writeFileSync(productsFile, JSON.stringify(products, null, 2));
};

// Actualizar un producto
router.delete('/:id', (req, res) => {
    const products = readProducts();
    const productosFiltrados = products.filter(p => p.id !== parseInt(req.params.id)); 

    if (productosFiltrados.length === products.length) {
        return res.status(404).send('Producto no encontrado');
    }

    saveProducts(productosFiltrados);
    res.status(204).send(); 
});

// Obtengo todos los productos
router.get('/', (req, res) => {
    const products = readProducts();
    res.json(products);
});

// Obtengo un producto por su ID
router.get('/:id', (req, res) => {
    const products = readProducts();
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Producto no encontrado');
    res.json(product);
});

// Crear un nuevo producto
router.post('/', (req, res) => {
    const products = readProducts();
    const { nombre, descripcion, codigo, precio, stock, categoria, imagenes } = req.body;

// Verifico que todos los campos obligatorios estén presentes
    if (!nombre || !descripcion || !codigo || !precio || !stock || !categoria) {
        return res.status(400).send('Todos los campos son obligatorios.');
    }

    const nuevoProducto = {
        id: products.length + 1,
        nombre,
        descripcion,
        codigo,
        precio,
        stock,
        categoria,
        imagenes: imagenes || []
        

    };

    products.push(nuevoProducto);
    saveProducts(products);
    res.status(201).json(nuevoProducto);
});

module.exports = router;
