const express = require('express')
const app = express()
const morgan = require('morgan')
require('dotenv').config()

const Person = require('./models/person')




morgan.token('body', function getBody (req) {
  return JSON.stringify(req.body)
})

app.use(express.static('dist'))
app.use(morgan(':method :url :status :response-time :body'))
app.use(express.json())



let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const generateId = () => {
  return String(Math.floor(Math.random() * 10000))
}

app.post('/api/persons', (request, response) => {

  
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  }

  if (!body.number) {
    return response.status(400).json({ 
      error: 'number missing' 
    })
  }

  if (persons.map(person => person.name).find(name => name == body.name)) {
    return response.status(400).json({
      error: 'the name already exists'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    persons.concat(savedPerson)
    response.json(savedPerson)
  })
})

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
      response.json(persons)
    })
})

app.get('/info', (request, response) => {
  const date = new Date()
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p>` +
    `<p>${date}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
      response.json(person)
    })
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id).then(person => {
      response.json(person)
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})