const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')
const blog = require('./models/blog')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blog')

mongoose.set('strictQuery', false)

logger.info(`Connecting to ${config.DATABASE_URI}`)

mongoose.connect(config.DATABASE_URI)
    .then(() => {
        logger.info("Connected to MongoDB")
    })
    .catch((error) => {
        logger.error(`Error connecting to MongoDB: ${error}`)
    })


app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use('/api/blogs', blogRouter)

module.exports = app