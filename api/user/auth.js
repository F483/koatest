const jwt = require('jsonwebtoken');
const db = require('../../db');
const config = require('../../config');

const auth = async (req, res, next) => {
	let token;
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		try {
			token = req.headers.authorization.split(' ')[1];
			const decoded = jwt.verify(token, config.jwt_secret);
			req.user = await db('users').where({ id: decoded.id }).first();
			next();
		} catch (error) {
			console.log('invalid token')
			res.status(401).json({ message: 'Not authorized, invalid token!' });
		}
	}
	if (!token) {
		console.log('no token')
		res.status(401).json({ message: 'Not authorized, no token!' });
	}
};

module.exports = auth;
