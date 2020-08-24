const mongoose = require('mongoose')

const booksSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, 'Title is required'],
	},
	author: {
		type: mongoose.Types.ObjectId,
		required: [true, 'Author is required'],
		ref: 'Users',
	},
	created: {
		type: Date,
		default: Date.now(),
	},
	lastChanged: {
		type: Date,
		default: Date.now(),
	},
})

module.exports = mongoose.model('Books', booksSchema)
