"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("companies", "password", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
