const UserCollection = require('../models/User')
const ExerciseCollection = require('../models/Exercise')
const { StatusCodes } = require('http-status-codes')
const { restart } = require('nodemon')

const createUser = async (req, res) => {
	try {
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
	} catch (error) {
		res.send(error)
	}
}

const getAllUsers = async (req, res) => {
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

const getLogs = async (req, res) => {
	//getting the user Data
	try {
		const { _id: userId } = req.params
		let {
			from: fromDate,
			to: toDate,
			limit: amountElementsToShow,
		} = req.query
		const { username: name } = await UserCollection.findById(userId)

		//if from/to date where not send in the query we set it to max/min possible date (unix) value.
		if (!fromDate) {
			fromDate = -8640000000000000
		}
		if (!toDate) {
			toDate = 8640000000000000
		}
		const minDateRange = new Date(fromDate)
		const maxDateRange = new Date(toDate)

		//if the limit(amountElementsToShow) doesnt exits, we set it to max and if exist parse it to number
		!amountElementsToShow
			? (amountElementsToShow = Number.MAX_SAFE_INTEGER)
			: (amountElementsToShow = Number(amountElementsToShow))

		//getting user exercise list
		let exerciseList = await ExerciseCollection.find({
			createdBy: userId,
			date: { $gte: minDateRange, $lte: maxDateRange },
		}).select('-_id description duration date')

		//mapping the received exercise list to change the date format to string.
		exerciseList = exerciseList
			.map(({ description, duration, date }) => {
				date = date.toDateString()
				return { description, duration, date }
			})
			.slice(0, amountElementsToShow)

		res.status(StatusCodes.OK).json({
			_id: userId,
			username: name,
			count: exerciseList.length,
			log: exerciseList,
		})
	} catch (error) {
		console.log(error)
		res.send('something went wrong')
	}
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
	const animals = ['ant', 'bison', 'camel', 'duck', 'elephant']

	console.log(animals.slice(0, 3))
	res.send()
}

module.exports = {
	createUser,
	getAllUsers,
	createExercise,
	getLogs,
	staticTesting,
}
