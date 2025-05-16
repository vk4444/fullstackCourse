import Contact from './Contact'

const Contacts = ({ persons }) => {
  return persons.map(person => <Contact key={person.id} person={person}/>)
}

export default Contacts
