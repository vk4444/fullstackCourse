import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useContext } from 'react'
import NotificationContext from './NotificationContext'


const AnecdoteForm = () => {
  const [notification, dispatchNotification] = useContext(NotificationContext)

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
      mutationFn: newAnecdote => axios.post('http://localhost:3001/anecdotes', newAnecdote).then(res => res.data),
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries({queryKey: ['anecdotes']})
        dispatchNotification({type: 'SET', payload: `${variables.content} was created`})
      },
      onError: (error) => {
        dispatchNotification({type: 'SET', payload: 'too short anecdote, must have length 5 or more'})
      }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    
    newAnecdoteMutation.mutate({content, votes: 0})

}



  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
