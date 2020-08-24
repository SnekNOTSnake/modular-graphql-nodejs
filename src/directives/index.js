const isAuthenticated = require('./isAuthenticated')

module.exports = {
	typeDefs: [isAuthenticated.typeDef],
	schemaDirectives: {
		isAuthenticated: isAuthenticated.directive,
	},
}
