'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('my-user', 'lastSignIn', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },
};
