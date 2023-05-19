'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('my-user', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'defaultPassword'
      },
      created_at: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      updated_at: {
        type: Sequelize.STRING,
        allowNull: true,
      },

    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('my-user');
  }
};
