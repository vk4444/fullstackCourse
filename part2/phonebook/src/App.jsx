import { useState, useEffect } from 'react'
import axios from 'axios'

import Contacts from './components/Contacts'
import Search from './components/Search'

import contacts from './services/contacts'

import './index.css'



const App = () => {

  // STATES
  const [persons, setPersons] = useState([]) 
  const [newPerson, setNewPerson] = useState({name: '', number: ''})
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    contacts
      .getAll()
      .then(contacts => {
        setPersons(contacts)
      })
  }, [])

  // FORM HANDLERS
  const handleSubmit = (event) => {
    event.preventDefault()

    // Checks if name is already in the list
    if(persons.map(person => person.name).includes(newPerson.name)){
      alert(`${newPerson.name} is already in the phonebook`)
    } else {
      contacts
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })

        setMessage(
          `Contact '${newPerson.name}' was added to the database`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      setNewPerson({name: '', number: ''})
      }
  }

  const handleRemove = (id) => {
    contacts 
      .remove(id)
      .then(returnedPerson => {
        setPersons(persons.filter(person => person.id != returnedPerson.id))
      })
  }

  const handleChangeName = (event) => {  
    setNewPerson({name: event.target.value, number: newPerson.number})
  }

  const handleChangeNumber = (event) => {  
    setNewPerson({name: newPerson.name, number: event.target.value})
  }

  const handleChangeSearch = (event) => {  
    setSearch(event.target.value)
  }

  // NON-STATE CONSTANTS
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Search value={search} onChange={handleChangeSearch} />
      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>name: <input value={newPerson.name} onChange={handleChangeName}/></div>
        <div>number: <input value={newPerson.number} onChange={handleChangeNumber}/></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      <Contacts persons={filteredPersons} removalFunction={handleRemove}/>
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='success'>
      {message}
    </div>
  )
}

export default App