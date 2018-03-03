
require('dotenv').config();

const config = {
  development: {
    use_env_variable: 'DATABASE_URL',
  },
  test: {
    use_env_variable: 'TEST_DATABASE_URL',
    logging: false,
  },
  production: {
    use_env_variable: 'PRODUCTION_DATABASE_URL',
  },
};

module.exports = config;
