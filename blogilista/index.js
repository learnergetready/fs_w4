const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blog')
const { info, error } = require('./utils/logger')
const config = require('./utils/config')
const mongoose = require('mongoose')


info('connecting to:', config.mongoUrl)
mongoose.connect(config.mongoUrl)

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

app.listen(config.PORT, () => {
  info(`Server running on config.PORT ${config.PORT}`)
})