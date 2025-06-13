const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {

  const users = await User
    .find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })

  response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
  try {
    const user = await User
      .findById(request.params.id)
      .populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
    
    if (!user) {
      return response.status(404).json({ error: 'user not found' })
    }
    
    response.json(user)
  } catch (error) {
    response.status(400).json({ error: 'malformatted id' })
  }
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter