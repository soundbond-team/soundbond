'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Sounds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      url: {
        type: Sequelize.TEXT
      },
      size: {
        type: Sequelize.INTEGER
      },
      codec: {
        type: Sequelize.STRING
      },
      startTime: {
        type: Sequelize.BIGINT
      },
      stopTime: {
        type: Sequelize.BIGINT
      },
      duration: {
        type: Sequelize.INTEGER
      },
      pubDate: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Sounds');
  }
};