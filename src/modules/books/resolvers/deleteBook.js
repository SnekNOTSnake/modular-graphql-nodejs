const Books = require('../../../models/books')

const deleteBook = async (_, { id }) => {
	await Books.findByIdAndDelete(id)
	return id
}

module.exports = deleteBook
