const Sequelize = require('sequelize');
const { STRING, INTEGER } = Sequelize;
const conn = require('./db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = conn.define('user', {
	username: {
		type: STRING,
		unique: true,
	},
	password: {
		type: STRING,
	},
	luckyNumber: {
		type: INTEGER,
		allowNull: false,
		defaultValue: 7,
	},
});

User.addHook('beforeSave', async (user) => {
	if (user.changed('password')) {
		user.password = await bcrypt.hash(user.password, 5);
	}
});

User.prototype.generateToken = function () {
	return {
		token: jwt.sign({ id: this.id }, process.env.JWT),
	};
};

User.register = async function (credentials) {
	const user = await this.create(credentials);
	return user.generateToken();
};

User.findByToken = async function (token) {
	const { id } = jwt.verify(token, process.env.JWT);
	const user = await this.findByPk(id);
	if (!user) {
		const error = Error('bad token!');
		error.status = 401;
		throw error;
	}
	return user;
};

User.authenticate = async function (credentials) {
	const { username, password } = credentials;
	const user = await this.findOne({
		where: {
			username,
		},
	});
	if (!user || !(await bcrypt.compare(password, user.password))) {
		const error = Error('bad credentials');
		error.status = 401;
		throw error;
	}
	return user.generateToken();
};

module.exports = User;
