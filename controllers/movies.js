const moviesRouter = require('express').Router();

//se requieren los modelos movie, character y genre
const { Movie, Character, Genre } = require('../db');
//se requiere la función querysearch, que sirve para manejar las request con query
const { querySearch } = require('../utils/querySearch');

moviesRouter.get('/', async (req, res) => {

    //se crea una constante con la query, y se verifica el largo de la query
    //si el largo es cero devuelve false, es decir que no hay query
    const query = req.query;
    const thereAreEntries = Object.entries(query).length !== 0;

    //se verifica si hay query y se llama al manejador de query
    //el manejador recibe una query (objeto) y un modelo
    //este devuelve una función que cuando se ejecuta
    //se hace la consulta necesaria y se retorna una respuesta con la consulta
    if(thereAreEntries) {
      const result = querySearch(query, Movie);
      return res.send(await result());
    }

    //si no hay querys simplemente se buscan todas los peliculas con los atributos necesarios
    const movie = await Movie.findAll({attributes: ['idMovie', 'Title', 'CreationDate', 'Image']});

    res.status(200).json(movie);
});

moviesRouter.get('/:id', async (req, res) => {
  //en el detalle de pelicula se devuelven todos los atributos
  //de la pelicula junto con sus personajes
  const movie = await Movie.findOne({
    where:{ idMovie: req.params.id },
    include: Character
  });

  res.status(200).json(movie);
});

moviesRouter.post('/', async (req, res) => {

  //se desetructuran todos los atributos
  const { body } = req;
  const { image, title, creationDate, score, associatedCharacters, genre } = body

  //se crea una película
  const newMovie = await Movie.create({
    image,
    title,
    creationDate,
    score,
    GenreIdGenre: genre
  });

  //si hay personajes relacionados, se agregan buscándolos por id,
  //associatedCharacters es un array con todos los id de las películas relacionadas
  if(associatedCharacters) {
    await newMovie.addCharacter(associatedCharacters);
  }

  //se responde con la película
  return res.status(201).json(newMovie);
});

moviesRouter.put('/', async (req, res) => {

  //el body para actualizar tiene dos partes:
  //un id, y el contenido a actualizar, que debería estar tal cual está en la base de datos
  //porque así se hará la consulta
    const { body } = req;
    const { id, content } = body;

    const peliculaActualizada = await Movie.update(content, {
      where: {idMovie: id}
    });

    //se responde con la película actualizado
    res.status(200).json(peliculaActualizada);
});

moviesRouter.delete('/', async (req, res) => {
  const { body } = req;

  const peliculaBorrada = await Movie.destroy({where: { idMovie: body.id }});

  res.status(200).json(peliculaBorrada);
});

moviesRouter.post('/addgenre', async (req, res) => {
  //este endpoint es para agregar géneros
  const genre = await Genre.create({
    name: req.body.name,
    image: req.body.image
  });

  res.status(200).json(genre);
});

module.exports = moviesRouter;