const DateTime = require('./dateTime')

module.exports = {
	typeDefs: [DateTime.typeDef],
	resolvers: {
		...DateTime.resolvers,
	},
}
