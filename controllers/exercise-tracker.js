const UserCollection = require('../models/User')
const ExerciseCollection = require('../models/Exercise')
const { StatusCodes } = require('http-status-codes')

const createUser = (req, res) => {
	//RETURN json (username: ... _id: ...)
	res.send('createUser controller')
}

const getAllUsers = (req, res) => {
	//RETURN AN ARRAY NO JSON
	//Each element in the array returned from GET /api/users is an object literal containing a user's username and _id.
	res.send('getAllUsers controller')
}

const createExercise = (req, res) => {
	//You can POST to /api/users/:_id/exercises with form data description, duration, and optionally date. If no date is supplied, the current date will be used.
	//The response returned from POST /api/users/:_id/exercises will be the user object with the exercise fields added.
	res.send('createExercise controller')
}

const getLogs = (req, res) => {
	//You can make a GET request to /api/users/:_id/logs to retrieve a full exercise log of any user.
	//A request to a user's log GET /api/users/:_id/logs returns a user object with a count property representing the number of exercises that belong to that user.
	//A GET request to /api/users/:_id/logs will return the user object with a log array of all the exercises added.
	//Each item in the log array that is returned from GET /api/users/:_id/logs is an object that should have a description, duration, and date properties.
	//The description property of any object in the log array that is returned from GET /api/users/:_id/logs should be a string.
	//The duration property of any object in the log array that is returned from GET /api/users/:_id/logs should be a number.
	//The date property of any object in the log array that is returned from GET /api/users/:_id/logs should be a string. Use the dateString format of the Date API.
	//You can add from, to and limit parameters to a GET /api/users/:_id/logs request to retrieve part of the log of any user. from and to are dates in yyyy-mm-dd format. limit is an integer of how many logs to send back.
	res.send('getLogs controller')
}

const staticTesting = (req, res) => {
	res.send('staticTesting controller')
}

module.exports = {
	createUser,
	getAllUsers,
	createExercise,
	getLogs,
	staticTesting,
}
