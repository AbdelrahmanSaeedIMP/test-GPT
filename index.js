// Requires
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const chatGPT = require('./chat-gpt/chat-gpt')

// Initialize app
const app = express()
const port = process.env.APP_PORT

// Global middlewares
app.use(express.json())
app.use(cors({
    origin: '*'
}))

// For checking if the server is running 
app.get('/', (req, res) => {
    res.send({ 'message': 'ok' })
})

// App routes
app.use('/code-doc', chatGPT)

// Running the app
app.listen(port, () => console.log(`Nilewood admin backend app is running on port ${port}`))