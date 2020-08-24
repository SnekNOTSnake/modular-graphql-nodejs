const Books = require('../../../models/books')

const books = async (_) => {
	const availableBooks = await Books.find({}).populate('author')
	return availableBooks
}

module.exports = books
