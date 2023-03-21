const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

//connect db

//error handlers

//routers

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/views/index.html')
})

//endpoints

//middleware error handlers

const listener = app.listen(process.env.PORT || 3000, () => {
	console.log('Your app is listening on port ' + listener.address().port)
})
