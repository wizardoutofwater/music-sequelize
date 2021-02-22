'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('songs', {
      fields: ['album_id'],
      type: 'foreign key',
      references: { 
        table: 'albums',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('songs',)
  }
};
