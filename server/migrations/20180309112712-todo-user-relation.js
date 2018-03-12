'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Todos',
      'userId',
      Sequelize.INTEGER,
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Todos', 'userId');
  },
};
