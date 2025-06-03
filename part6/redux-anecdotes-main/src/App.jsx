import { useSelector } from 'react-redux'

import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'



const App = () => {

  const displayNotification = useSelector(state => state.notification !== null)

  return (
    <div>
      {displayNotification && <Notification />}
      <Filter/>
      <h2>Anecdotes</h2>
      <AnecdoteList/>
      <AnecdoteForm/>
    </div>
  )
}

export default App