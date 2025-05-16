import { useState } from 'react'
import Contacts from './components/Contacts'
import Search from './components/Search'


const App = () => {

  // STATES
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newPerson, setNewPerson] = useState({name: '', number: '', id: persons.length + 1})
  const [search, setSearch] = useState('')

  // FORM HANDLERS
  const handleSubmit = (event) => {
    event.preventDefault()

    // Checks if name is already in the list
    if(persons.map(person => person.name).includes(newPerson.name)){
      alert(`${newPerson.name} is already in the phonebook`)
    } else {
      setPersons(persons.concat(newPerson))
    }
    setNewPerson({name: '', number: '', id: persons.length + 1})

  }

  const handleChangeName = (event) => {  
    setNewPerson({name: event.target.value, number: newPerson.number, id: persons.length + 1})
  }

  const handleChangeNumber = (event) => {  
    setNewPerson({name: newPerson.name, number: event.target.value, id: persons.length + 1})
  }

  const handleChangeSearch = (event) => {  
    setSearch(event.target.value)
  }

  // NON-STATE CONSTANTS
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Search value={search} onChange={handleChangeSearch} />
      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>name: <input value={newPerson.name} onChange={handleChangeName}/></div>
        <div>number: <input value={newPerson.number} onChange={handleChangeNumber}/></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      <Contacts persons={filteredPersons}/>
    </div>
  )
}

export default App