const { UserInputError } = require('apollo-server-express')
const Users = require('../../../models/users')
const bcrypt = require('bcrypt')

const SALT_ROUNDS = 12

const signup = async (_, { email, password, firstName, lastName }) => {
	const existingUser = await Users.findOne({ email })
	if (existingUser) throw new UserInputError('User already exists')

	const encryptedPassword = await bcrypt.hash(password, SALT_ROUNDS)
	const user = new Users({
		email,
		password: encryptedPassword,
		firstName,
		lastName,
	})
	await user.save()

	delete user.password

	return {
		...user._doc,
		id: user.id,
	}
}

module.exports = signup
