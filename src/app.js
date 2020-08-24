const express = require('express')

// The reason why apollo-server-express is because later on for testing we use Supertest, which requires an app object
const { ApolloServer } = require('apollo-server-express')

const context = require('./utils/context')
const schema = require('./modules')

const server = new ApolloServer({
	schema,
	// A reminder, `context` is an object or function called with the current request that creates a context shared across all resolvers
	context: async ({ req }) => ({
		user: await context.getUser(req),
	}),
})

const app = express()

server.applyMiddleware({ app })

module.exports = app
