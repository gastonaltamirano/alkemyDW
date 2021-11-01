module.exports = (sequelize, type) => {
  return sequelize.define('Users', {
      idUser: {
          allowNull: false,
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      username: {
        allowNull: false,
        type: type.STRING,
        unique: true
      },
      name: {
        allowNull: false,
        type: type.STRING
      },
      email: {
        allowNull: false,
        type: type.STRING,
        unique: true
      },
      passwordHash: {
        allowNull: false,
        type: type.STRING
      }
  });
};