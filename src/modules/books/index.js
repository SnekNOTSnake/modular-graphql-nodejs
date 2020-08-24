const { gql } = require('apollo-server-express')
const resolvers = require('./resolvers')

const typeDefs = gql`
	extend type Query {
		book(id: ID!): Book
		books: [Book]
	}

	extend type Mutation {
		createBook(title: String!): Book @isAuthenticated
		updateBook(id: ID!, title: String!): Book @isAuthenticated
		deleteBook(id: ID!): ID @isAuthenticated
	}

	type Book {
		id: ID!
		title: String!
		author: User!
		created: DateTime!
		lastChanged: DateTime!
	}
`

module.exports = {
	typeDefs: [typeDefs],
	resolvers,
}
