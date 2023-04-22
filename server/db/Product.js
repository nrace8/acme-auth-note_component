const Sequelize = require('sequelize');
const { STRING, BOOLEAN } = Sequelize;
const conn = require('./db');

const Product = conn.define('product', {
	name: {
		type: STRING,
	},
	inStock: {
		type: BOOLEAN,
		allowNull: false,
		defaultValue: true,
	},
});

module.exports = Product;
