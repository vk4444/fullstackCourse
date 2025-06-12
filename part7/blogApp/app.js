require('dotenv').config()

const config = require('./utils/config')
const express = require('express')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)

module.exports = app