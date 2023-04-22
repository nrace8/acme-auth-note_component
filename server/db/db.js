const Sequelize = require('sequelize');
const { STRING, BOOLEAN, INTEGER, TEXT } = Sequelize;
const conn = new Sequelize(
	process.env.DATABASE_URL || 'postgres://localhost/acme_products_search_db'
);

module.exports = conn;
