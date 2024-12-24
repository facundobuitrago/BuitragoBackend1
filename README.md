🛒 API de Carritos y Productos
Este proyecto es una API RESTful desarrollada con Node.js y Express que permite gestionar productos y carritos de compras. Es ideal para un sistema de comercio electrónico básico donde se pueden agregar productos a los carritos, ver productos y realizar otras operaciones CRUD.

🌟 Funcionalidades
Productos
Obtener todos los productos: Obtén una lista de todos los productos disponibles en el sistema.
Obtener un producto por ID: Recupera la información de un producto específico usando su ID.
Crear un producto: Agrega un nuevo producto con detalles como título, descripción, precio, stock, etc.
Actualizar un producto: Modifica la información de un producto existente (excepto el ID).
Eliminar un producto: Elimina un producto del sistema.
Carritos
Crear un carrito: Inicia un nuevo carrito vacío.
Obtener los productos de un carrito: Muestra los productos dentro de un carrito específico.
Eliminar un carrito: Elimina un carrito del sistema.
Agregar un producto al carrito: Añade un producto a un carrito. Si el producto ya está presente, incrementa la cantidad.
🗂 Estructura del Proyecto
scss
Copiar código
/src
    /routes
        - carts.js            (Rutas para gestionar carritos)
        - products.js         (Rutas para gestionar productos)
    /services
        - carts.service.js    (Lógica para gestionar carritos)
        - products.service.js (Lógica para gestionar productos)
    /data
        - carts.json          (Datos persistentes de los carritos)
        - products.json       (Datos persistentes de los productos)
    /public
        - /images             (Carpeta para las imágenes de los productos)
    index.js                 (Archivo principal que ejecuta el servidor)
🛠 Tecnologías Utilizadas
Node.js: Entorno de ejecución para JavaScript en el servidor.
Express: Framework web para Node.js que facilita la creación de rutas y APIs.
File System (fs): Para manejar la persistencia de datos mediante archivos JSON.
🚀 Instrucciones de Instalación
Clona el repositorio:

bash
Copiar código
git clone <url-del-repositorio>
Instala las dependencias:

bash
Copiar código
cd nombre-del-proyecto
npm install
Inicia el servidor:

bash
Copiar código
npm start
El servidor estará corriendo en:
http://localhost:8080.

📡 Endpoints
Productos
GET /api/products: Obtiene todos los productos.
GET /api/products/:id: Obtiene un producto específico por su ID.
POST /api/products: Crea un nuevo producto.
PUT /api/products/:id: Actualiza un producto existente.
DELETE /api/products/:id: Elimina un producto por su ID.
Carritos
POST /api/carts: Crea un nuevo carrito.
GET /api/carts/:cid: Obtiene los productos de un carrito específico.
DELETE /api/carts/:cid: Elimina un carrito.
POST /api/carts/:cid/product/:pid: Agrega un producto a un carrito específico.
📖 Uso de la API
Puedes probar todos los endpoints usando Postman o cualquier cliente de API como Insomnia.

Cada endpoint acepta solicitudes de tipo GET, POST, PUT, y DELETE, según corresponda.

⚙️ Archivos de Datos
Este proyecto utiliza archivos JSON para almacenar la información de los productos y carritos:

products.json: Contiene la lista de productos registrados.
carts.json: Contiene la información de los carritos y sus productos.
¡Gracias por usar esta API! Si tienes alguna pregunta o sugerencia, no dudes en abrir un issue en el repositorio.
