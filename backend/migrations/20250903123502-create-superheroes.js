'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('superheroes', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nickname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      real_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      origin_description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      superpowers: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      catch_phrase: {
        type: Sequelize.TEXT,
        allowNull: true
      },
         });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('superheroes');
  }
};
