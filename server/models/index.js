
import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

require('dotenv').config();

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/config`)[env];
const db = {};

console.log('env: ', env);
console.log('config: ', config);

let sequelize;
if (config.url) {
  sequelize = new Sequelize(config.url, config);
  console.log('using url');
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
  console.log('not using url');
}

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
