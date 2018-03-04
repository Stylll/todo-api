
require('dotenv').config();
console.log('Process Test Database: ',process.env.TEST_DATABASE_URL);
console.log('Process Database: ',process.env.DATABASE_URL);
const config = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    database: 'test_todo_dev',
    username: 'postgres',
    password: null,
    logging: false,
    dialect: 'postgres',
  },
  production: {
    use_env_variable: process.env.PRODUCTION_DATABASE_URL,
    dialect: 'postgres',
    dialectOptions: {
      ssl: true,
    },
  },
};

module.exports = config;
