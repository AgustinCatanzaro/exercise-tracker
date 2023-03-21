const mongoose = require('mongoose')

const exerciseSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, 'username must be provided'],
	},
	description: {
		type: String,
		required: [true, 'description must be provided'],
	},
	duration: {
		type: Int32Array,
		required: [true, 'duration must be provided'],
	},
	date: {
		type: Date,
		default: Date.now().toDateString(),
	},
	createdBy: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
		required: [true, 'Please provide user _id'],
	},
})

module.exports = mongoose.model('Exercise', exerciseSchema)
