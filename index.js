const app = require('./app');
require('dotenv').config();

// Correr el servidor con el puerto.
app.listen(process.env.PORT);
console.log(`App listening on port ${process.env.PORT}`);