const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blog')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('connecting to:', config.mongoUrl)
mongoose.connect(config.mongoUrl)
  .then( () => logger.info('connected to MongoDB'))
  .catch( error => logger.error('error in connecting to MongoDB:', error.message))

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

module.exports = app