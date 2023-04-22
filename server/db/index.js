const conn = require('./db')
const Product = require('./Product')
const User = require('./User')
const Note = require('./Note')

Note.belongsTo(User);

module.exports = {
	Product,
	User,
	Note,
	conn,
};
