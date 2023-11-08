const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blog')
const { info, error } = require('./utils/logger')
const config = require('./utils/config')
app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)
const mongoose = require('mongoose')

info('connecting to:', config.mongoUrl)
mongoose.connect(config.mongoUrl)

module.exports = app