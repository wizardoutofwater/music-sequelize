'use strict';
const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    var newData = [];

    for(let i = 0; i<30; i++){
     newData.push({
       name: faker.company.catchPhrase(),
       duration: faker.random.number(),
       createdAt: new Date(),
       updatedAt: new Date(),
     })
   }
   await queryInterface.bulkInsert('songs', newData, {});
   },
 

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
