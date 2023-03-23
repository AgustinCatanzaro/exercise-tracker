const mongoose = require('mongoose')

const exerciseSchema = new mongoose.Schema({
	description: {
		type: String,
		required: [true, 'description must be provided'],
	},
	duration: {
		type: Number,
		required: [true, 'duration must be provided'],
	},
	date: {
		type: Date,
		default: new Date().toUTCString(),
	},
	createdBy: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
		required: [true, 'Please provide user _id'],
	},
})

module.exports = mongoose.model('Exercise', exerciseSchema)
