const express = require('express')
const router = express.Router()

const {
	createUser,
	getAllUsers,
	createExercise,
	getLogs,
	staticTesting,
} = require('../controllers/exercise-tracker')

router.route('/users').post(createUser).get(getAllUsers)
router.route('/users/:_id/exercises').post(createExercise)
router.route('/users/:_id/logs').get(getLogs)
router.route('/testing').post(staticTesting)

module.exports = router
