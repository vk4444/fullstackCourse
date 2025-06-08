import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useReducer } from 'react'
import NotificationContext from './components/NotificationContext'

const notificationReducer = (state, action) => {
    switch (action.type) {
      case 'SET':
        return action.payload
      case 'CLEAR':
        return null
      default:
        return state
    }
  }

const App = () => {


  const [notification, notificationDispatch] = useReducer(notificationReducer, null)
  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation({
    mutationFn: updatedAnecdote => {
        return axios.put(`http://localhost:3001/anecdotes/${updatedAnecdote.id}`, updatedAnecdote)
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      notificationDispatch({type: 'SET', payload: `you voted for ${variables.content}`})  
    },
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: () => axios.get('http://localhost:3001/anecdotes').then(res => res.data)
  })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if ( result.isError ) {
    return <div>Data could not be loaded</div>
  }

  const anecdotes = result.data

  


  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  )
}

export default App
