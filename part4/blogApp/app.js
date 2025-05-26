require('dotenv').config()

const config = require('./utils/config')
const express = require('express')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())

const blogsRouter = require('./controllers/blogs')

app.use('/api/blogs', blogsRouter)




const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)

module.exports = app