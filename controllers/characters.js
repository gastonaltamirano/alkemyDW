const charactersRouter = require('express').Router();

//se requieren los modelos character y movie
const { Character, Movie } = require('../db');
//se requiere la función querysearch, que sirve para manejar las request con query
const { querySearch } = require('../utils/querySearch');

charactersRouter.get('/', async (req, res) => {

    //se crea una constante con la query, y se verifica el largo de la query
    //si el largo es cero devuelve false, es decir que no hay query
    const query = req.query;
    const thereAreEntries = Object.entries(query).length !== 0;

    //se verifica si hay query y se llama al manejador de query
    //el manejador recibe una query (objeto) y un modelo
    //este devuelve una función que cuando se ejecuta
    //se hace la consulta necesaria y se retorna una respuesta con la consulta
    if(thereAreEntries) {
      const result = querySearch(query, Character);
      return res.send(await result());
    }

    //si no hay querys simplemente se busca todos los personajes con los atributos necesarios
    const character = await Character.findAll({attributes: ['idCharacter', 'name', 'image']});

    res.status(200).json(character);
});

charactersRouter.get('/:id', async (req, res) => {
  //en el detalle de personaje se devuelven todos los atributos
  //del personaje junto con sus peliculas
  const character = await Character.findOne({
    where:{ idCharacter: req.params.id },
    include: Movie
  });

  res.status(200).json(character);
});

charactersRouter.post('/', async (req, res) => {
  //se desetructuran todos los atributos
  const { body } = req;
  const { image, name, age, weight, history, movies } = body

  //se crea un personaje
  const newCharacter = await Character.create({
    image,
    name,
    age,
    weight,
    history
  });

  //si hay películas relacionadas, se agregan buscándolas por id,
  //movies es un array con todos los id de las películas relacionadas
  if(movies) {
    await newCharacter.addMovie(movies);
  }

  //se responde con el personaje
  return res.status(201).json(newCharacter);
});

charactersRouter.put('/', async (req, res) => {

  //el body para actualizar tiene dos partes:
  //un id, y el contenido a actualizar, que debería estar tal cual está en la base de datos
  //porque así se hará la consulta
    const { body } = req;
    const { id, content } = body;

    //el contenido a actualizar debería ser igual que el contenido de body.content
    const personajeActualizado = await Character.update(content, {
      where: {idCharacter: id}
    });

    //se responde con el personaje actualizado
    res.status(200).json(personajeActualizado);
});

charactersRouter.delete('/', async (req, res) => {
  const { body } = req;

  const personajeBorrado = await Character.destroy({where: { idCharacter: body.id }});

  res.status(200).json(personajeBorrado);
});

module.exports = charactersRouter;