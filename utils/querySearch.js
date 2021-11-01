//se requieren los modelos movie y character
const { Movie, Character } = require('../db');

//la función querysearch recibe dos parámetros:
//un objeto que debería ser la query, y un modelo (éste último parametro se podría mejorar)
const querySearch = (query, model) => {

    //esta constante transforma en string la key de la query
    //debería tener solo una key
    const stringQuery = String(Object.keys(query));
  
    //querys es un objeto y sus keys se llaman igual que el contenido de stringQuery
    //cada una de sus keys devuelven una función asíncrona
    //que cuando se ejecutan hacen la consulta necesaria
    const querys = {

      //querys[name] devuelve todas las películas o todos los personajes
      //si el modelo recibido es movie o no, respectivamente
      name: () => {
        return model === Movie
        ? model.findAll({ where: {title : query.name} })
        : model.findAll({where: query});
      },

      //querys[genre] devuelve todas las películas que tengan el id del género solicitado
      genre: () => {
        return model.findAll({
          where: { GenreIdGenre: query.genre}
        });
      },

      //querys[order] devuelve todas las películas en el orden en que se especifique
      order: () => {
        return model.findAll({
          order: [['creationDate', query.order]]
        })
      },

      //querys[age] devuelve todos los personajes con la edad que se especifique
      age: () => model.findAll({where: query}),

      //querys[weight] devuelve todos los personajes con el peso que se especifique
      weight: () => model.findAll({where: query}),

      //query[movie] devuelve un objeto que tiene una key "id" y otra "characters"
      //la key characters contiene todos los personajes relacionados a la película
      movie: () => {
        return Movie.findOne({
          where: {idMovie: query.movie},
          include: Character,
          attributes: ['idMovie']
        });
      }
    };
  
    //se devuelve la función que se necesita de acuerdo a la query
    return querys[stringQuery];
  };

  module.exports = { querySearch };