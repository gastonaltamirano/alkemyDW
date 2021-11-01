const Sequelize = require('sequelize');
require('dotenv').config();

const { USERDB, PASSWORDDB, HOST } = process.env

const UserModel = require('./models/users');
const MovieModel = require('./models/movies');
const CharacterModel = require('./models/characters');
const GenreModel = require('./models/genre');

const sequelize = new Sequelize('DisneyDB', USERDB, PASSWORDDB, {
    host: HOST,
    dialect: 'mysql'
});

const User = UserModel(sequelize, Sequelize);
const Movie = MovieModel(sequelize, Sequelize);
const Character = CharacterModel(sequelize, Sequelize);
const Genre = GenreModel(sequelize, Sequelize);

Genre.hasMany(Movie, { as: 'films'});
Movie.belongsTo(Genre);

Movie.belongsToMany(Character, {through: 'CharacterMovie'});
Character.belongsToMany(Movie, {through: 'CharacterMovie'});

sequelize.sync({ force: false })
    .then(() => {
        console.log('tablas sincronizadas');
    }).catch(e => console.log(e));

module.exports = {
    User,
    Movie,
    Character,
    Genre
};