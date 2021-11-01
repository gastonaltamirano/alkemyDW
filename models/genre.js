module.exports = (sequelize, type) => {
    return sequelize.define('Genres', {
        idGenre: {
            allowNull: false,
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
          allowNull: false,
          type: type.STRING
        },
        image: {
          allowNull: false,
          type: type.STRING
        }
    });
};