'use strict';

 module.exports = {
   up: (queryInterface, Sequelize) =>
     queryInterface.bulkInsert('Users', [
       {
         email: 'ivan.yarymovych@gmail.com',
         password: 'password',
         profile_id: 1,
         is_activate: true,
         status_state: 'will be',
         created_at: "2017-05-25 15:53:13.815+03",
         updated_at: "2017-05-25 15:53:13.815+03"
       },
       {
         email: 'roma@gmail.com',
         password: '13452',
         profile_id: 2,
         is_activate: true,
         status_state: 'will be',
         created_at: "2017-05-25 15:53:13.815+03",
         updated_at: "2017-05-25 15:53:13.815+03"
       }
     ], {}),
   down: (queryInterface, Sequelize) =>
     queryInterface.bulkDelete('Users', null, {})
 };
