const Books = require('../../../models/books')

const createBook = async (_, { id, title }) => {
	const availableBook = await Books.findByIdAndUpdate(
		id,
		{ title, lastChanged: Date.now() },
		{ runValidators: true, new: true },
	)
	return availableBook
}

module.exports = createBook
