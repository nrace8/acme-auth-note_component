const Sequelize = require('sequelize');
const { STRING, TEXT } = Sequelize;
const conn = require('./db');

const Note = conn.define('note', {
	name: {
		type: STRING,
	},
	content: {
		type: TEXT,
		allowNull: false,
	},
});

module.exports = Note;
