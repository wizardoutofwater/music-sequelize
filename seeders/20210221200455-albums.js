'use strict';
const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    var newData = [];

    for(let i = 0; i<10; i++){
     newData.push({
       name: faker.commerce.productName(),
       year: faker.random.number(),
       createdAt: new Date(),
       updatedAt: new Date(),
     })
   }
   await queryInterface.bulkInsert('albums', newData, {});
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
