const { AuthenticationError } = require('apollo-server-express')
const bcrypt = require('bcrypt')
const tokenUtils = require('../../../utils/token')
const Users = require('../../../models/users')
const config = require('../../../config')

const login = async (_, { email, password }) => {
	const user = await Users.findOne({ email })
	if (!user) throw new AuthenticationError('No such user with that email')

	const valid = await bcrypt.compare(password, user.password)
	if (!valid) throw new AuthenticationError('Wrong password')

	const token = await tokenUtils.createToken(user.id)

	return {
		user: {
			...user._doc,
			id: user.id,
		},
		token,
		tokenExpiration: config.JWT_EXPIRES_IN,
	}
}

module.exports = login
