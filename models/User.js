const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: [true, 'username must be provided'],
	},
})

module.exports = mongoose.model('User', userSchema)
