const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
app.use(express.json())

const blogsRouter = require('./controllers/blogs')

app.use('/api/blogs', blogsRouter)




const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl)




const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})