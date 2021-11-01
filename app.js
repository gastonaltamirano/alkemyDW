const express = require('express');
//se requiere el middleware para validar el token
const { validateToken } = require('./utils/authentication');
const app = express();
require('express-async-errors');
// se requiere y ejecuta la configuración de la base de datos junto con los modelos
require('./db');

//se requieren los controladores
const charactersRouter = require('./controllers/characters');
const moviesRouter = require('./controllers/movies.js');
const authRouter = require('./controllers/auth');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', function (req, res) {
  res.send('Pagina de inicio');
});

//controlador para registrarse y autenticarse
app.use('/auth', authRouter);

//controladores para las películas y los personajes
app.use('/characters', validateToken, charactersRouter);
app.use('/movies', validateToken, moviesRouter);

//error handler
app.use((err, req, res, next) => {
  res.json(err);
  next(err)
});

module.exports = app;