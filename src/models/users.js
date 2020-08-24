const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
	firstName: {
		type: String,
		maxlength: 25,
		required: [true, 'First name is required'],
	},
	lastName: {
		type: String,
		maxlength: 25,
		required: [true, 'Last name is required'],
	},
	email: {
		type: String,
		validate: {
			validator: function (val) {
				return /^\w+@\w+\.\w$/
			},
			message: 'Invalid email',
		},
		required: [true, 'Email is required'],
	},
	password: {
		type: String,
		required: true,
	},
	created: {
		type: Date,
		default: Date.now(),
	},
	lastChanged: {
		type: Date,
		default: Date.now(),
	},
	lastActive: Date,
})

module.exports = mongoose.model('Users', usersSchema)
