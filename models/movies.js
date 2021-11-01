module.exports = (sequelize, type) => {
    return sequelize.define('Movies', {
        idMovie: {
            allowNull: false,
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
          allowNull: false,
          type: type.STRING
        },
        creationDate: {
          allowNull: false,
          type: type.DATEONLY
        },
        image: {
            type: type.STRING
        },
        score: {
          allowNull: false,
          type: type.INTEGER
        }
    });
};