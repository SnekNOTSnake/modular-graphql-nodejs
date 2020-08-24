const tokenUtils = require('./token')
const User = require('../models/users')

const TOKEN_HEADER_NAME = 'JWT'

const getUser = async (req) => {
	const token = req.get(TOKEN_HEADER_NAME)
	if (!token) return null
	try {
		const decoded = await tokenUtils.decodeToken(token)
		return await User.findById(decoded.userId)
	} catch (err) {
		return null
	}
}

module.exports = {
	getUser,
}
