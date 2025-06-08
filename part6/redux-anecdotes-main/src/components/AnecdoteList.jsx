import { useDispatch, useSelector } from 'react-redux'
import { storeVote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()

    const handleVote = (id) => {
        dispatch(storeVote(id))
    }

    const anecdotesToDisplay = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))

    return(
        <>
            {anecdotesToDisplay.map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => handleVote(anecdote.id)}>vote</button>
            </div>
            </div>
        )}
      </>
    )
}

export default AnecdoteList
