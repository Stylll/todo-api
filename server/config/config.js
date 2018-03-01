
require('dotenv').config();

const config = {
  development: {
    use_env_variable: 'DATABASE_URL',
  },
  test: {
    use_env_variable: 'TEST_DATABASE_URL',
    database: 'test_todo_dev',
    username: 'postgres',
    password: null,
  },
  production: {
    use_env_variable: 'PRODUCTION_DATABASE_URL',
  },
};

module.exports = config;
