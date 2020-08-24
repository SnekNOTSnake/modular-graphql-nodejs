const jwt = require('jsonwebtoken')
const config = require('../config')

const createToken = (userId) =>
	new Promise((resolve, reject) => {
		jwt.sign(
			{ userId },
			config.JWT_SECRET,
			{ expiresIn: config.JWT_EXPIRES_IN },
			(error, token) => {
				if (error) reject(error)
				resolve(token)
			},
		)
	})

const decodeToken = (token) =>
	new Promise((resolve, reject) => {
		jwt.verify(token, config.JWT_SECRET, (error, decoded) => {
			if (error) reject(error)
			if (!decoded.exp || !decoded.iat)
				reject(new Error(`Token has no 'exp' or 'iat'`))
			resolve(decoded)
		})
	})

module.exports = {
	createToken,
	decodeToken,
}
