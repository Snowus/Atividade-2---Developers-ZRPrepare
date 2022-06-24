"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("events", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      data: {
        type: Sequelize.STRING,
      },
      startAt: {
        type: Sequelize.TIME,
      },
      endAt: {
        type: Sequelize.TIME,
      },
      local: {
        type: Sequelize.STRING,
      },
      color: {
        type: Sequelize.STRING,
      },
      calendarID: {
        type: Sequelize.STRING,
      },
      published: {
        type: Sequelize.BOOLEAN,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
