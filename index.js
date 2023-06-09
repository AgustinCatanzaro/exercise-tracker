const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

//connect db
const connectDB = require('./db/connect')

//error handlers
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

//routers
const exerciseRouter = require('./routes/exercise-tracker')

//middleware
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/views/index.html')
})

//endpoints
app.use('/api', exerciseRouter)

//middleware error handlers
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000
const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI)
		app.listen(port, () =>
			console.log(`Server is listening on port ${port}...`)
		)
	} catch (error) {
		console.log(error)
	}
}

start()
