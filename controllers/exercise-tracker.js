const UserCollection = require('../models/User')
const ExerciseCollection = require('../models/Exercise')
const { StatusCodes } = require('http-status-codes')

const createUser = async (req, res) => {
	const { username: newUser } = req.body
	//creating a new User in the DB
	await UserCollection.create({
		username: newUser,
	})
	//Getting that created user from the db to get de generated _id, ***i think that every username should be unique but the example allows ditto entries
	const createdUser = await UserCollection.findOne({
		username: newUser,
	})
	res.status(StatusCodes.OK).json({
		username: createdUser.username,
		_id: createdUser._id,
	})
}

const getAllUsers = async (req, res) => {
	//RETURN AN ARRAY NO JSON
	//Each element in the array returned from GET /api/users is an object literal containing a user's username and _id.
	//Check when sending exercise probably gonna need to change.
	const usersList = await UserCollection.find()
	const usernamesArray = new Array()

	//creating an array with just username and _id from all entries retrieved from the db
	Object.values(usersList).forEach((user) => {
		const newUser = { username: user.username, _id: user._id }
		usernamesArray.push(newUser)
	})

	res.status(StatusCodes.OK).send(usernamesArray)
}

const createExercise = async (req, res) => {
	//You can POST to /api/users/:_id/exercises with form data description, duration, and optionally date. If no date is supplied, the current date will be used.
	//The response returned from POST /api/users/:_id/exercises will be the user object with the exercise fields added.
	const { _id: userId } = req.params
	const { description, duration } = req.body
	let { date } = req.body

	try {
		//if the params received is an unix, we need to parseInt it first to create the date
		;/^\d+$/.test(date)
			? (date = new Date(parseInt(date)))
			: (date = new Date(date))

		//checking if the params received is not valid/empty if it is we use dont give the param to the schema so it use the default one.
		console.log(`date content: ${date}`)
		if (isNaN(date)) {
			await ExerciseCollection.create({
				description: description,
				duration: duration,
				createdBy: userId,
			})
		} else {
			await ExerciseCollection.create({
				description: description,
				duration: duration,
				date: date.toDateString(),
				createdBy: userId,
			})
		}

		const userResponse = await UserCollection.findById({
			_id: userId,
		})
		const exerciseResponse = await ExerciseCollection.findOne({
			description: description,
			createdBy: userId,
		})
		res.status(StatusCodes.OK).json({
			_id: userId,
			username: userResponse.username,
			date: exerciseResponse.date.toDateString(),
			duration: exerciseResponse.duration,
			description: exerciseResponse.description,
		})
	} catch (error) {
		console.log(error)
		res.send('Somethin went wrong')
	}
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
	//Response te Get logs
	//{"_id":"641dc73e47ca29076a13e64e","username":"zTacaTestingUser","count":3,"log":[{"description":"desctest","duration":99,"date":"Fri Mar 24 2023"},{"description":"desctest","duration":99,"date":"Fri Mar 24 2023"},{"description":"desctest","duration":99,"date":"Fri Mar 24 2023"}]}
}

const staticTesting = async (req, res) => {
	//Get All Users testing
	// const usersList = await UserCollection.find()
	// const usernamesArray = new Array()
	// Object.values(usersList).forEach((user) => {
	// 	const newUser = { username: user.username, _id: user._id }
	// 	usernamesArray.push(newUser)
	// })
	// console.log(usernamesArray)
	// res.send(usernamesArray)
	//CREATING EXERCISE TESTING
	// const { description, duration } = req.body
	// try {
	// 	let { date } = req.body
	// 	//if the params received is an unix, we need to parseInt it first to create the date
	// 	;/^\d+$/.test(date)
	// 		? (date = new Date(parseInt(date)))
	// 		: (date = new Date(date))
	// 	//checking if the params received is not valid/empty if it is we use dont give the param to the schema so it use the default one.
	// 	if (isNaN(date)) {
	// 		await ExerciseCollection.create({
	// 			description: description,
	// 			duration: duration,
	// 			createdBy: '641cb4ef73dcc7d460c41e68',
	// 		})
	// 	} else {
	// 		await ExerciseCollection.create({
	// 			description: description,
	// 			duration: duration,
	// 			date: date.toUTCString(),
	// 			createdBy: '641cb4ef73dcc7d460c41e68',
	// 		})
	// 	}
	// } catch (error) {
	// 	console.log(error)
	// }
	// res.send('testing route')
	//Date testing
	// let testDate = new Date().toLocaleDateString('en-us', {
	// 	weekday: 'long',
	// 	year: 'numeric',
	// 	month: 'short',
	// 	day: 'numeric',
	// })
	const testingDate = new Date('Mon Oct 25 1999 21:00:00 GMT-0300')
	console.log(testingDate.toDateString())
	res.send()
}

module.exports = {
	createUser,
	getAllUsers,
	createExercise,
	getLogs,
	staticTesting,
}
