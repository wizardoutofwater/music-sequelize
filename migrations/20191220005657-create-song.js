'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('songs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      duration: {
        type: Sequelize.INTEGER
      },
      album_id: { // Adding Foreign Key within the Column Creation
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'albums'
          },
          key: 'id'
        },
        allowNull: false
      },
      year: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(function (){
      // Adding Foreign Key After Column was created.
      // queryInterface.addConstraint('songs', ['album_id'], {
      //   type: 'FOREIGN KEY',
      //   name: 'song_album_fk',
      //   references: {
      //     table: 'albums',
      //     field: 'id'
      //   },
      //   onDelete: 'cascade',
      //   onUpdate: 'cascade'
      // });
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('songs');
  }
};