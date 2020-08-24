const Books = require('../../../models/books')

const book = async (_, { id }) => {
	const availableBook = await Books.findById(id).populate('author')
	return availableBook
}

module.exports = book
