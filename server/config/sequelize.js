const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: process.env.NODE_ENV === 'production' ? { ssl: { require: true, rejectUnauthorized: false } } : {},
  logging: false,
});

module.exports = sequelize; 