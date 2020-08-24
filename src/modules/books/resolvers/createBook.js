const Books = require('../../../models/books')

const createBook = async (_, { title }, { user }) => {
	const newBook = new Books({ title, author: user.id })
	await newBook.save()
	return newBook
}

module.exports = createBook
