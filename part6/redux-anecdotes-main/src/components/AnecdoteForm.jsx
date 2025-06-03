import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const handleSubmit = (event) => {
      event.preventDefault()
      const content = event.target.NewNote.value
      dispatch(addAnecdote(content))
      event.target.NewNote.value = ''

      dispatch(createNotification(`you created ${content}`))
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div><input name='NewNote'/></div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm

