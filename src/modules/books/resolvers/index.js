const book = require('./book')
const books = require('./books')
const createBook = require('./createBook')
const updateBook = require('./updateBook')
const deleteBook = require('./deleteBook')

const resolvers = {
	Query: {
		book,
		books,
	},

	Mutation: {
		createBook,
		updateBook,
		deleteBook,
	},
}

module.exports = resolvers
