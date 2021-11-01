module.exports = (sequelize, type) => {
    return sequelize.define('Characters', {
        idCharacter: {
            allowNull: false,
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        image: {
            type: type.STRING
        },
        name: {
          allowNull: false,
          type: type.STRING,
          unique: true
        },
        age: {
          allowNull: false,
          type: type.INTEGER
        },
        weight: {
            allowNull: false,
            type: type.INTEGER
        },
        history: {
            allowNull: false,
            type: type.STRING
        }
    });
};