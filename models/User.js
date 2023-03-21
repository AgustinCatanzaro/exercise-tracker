const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, 'username must be provided'],
	},
})

module.exports = mongoose.model('User', userSchema)