import Contact from './Contact'

const Contacts = ({ persons, removalFunction}) => {
  return persons.map(person => <Contact key={person.id} person={person} removalFunction={removalFunction}/>)
}

export default Contacts
