import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'
import { createNotification } from './notificationReducer'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote.content,
    id: anecdote.id,
    votes: 0
  }
}

const initialState = []

const sortedByVotes = (anecdotes) => {
  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)
  return sortedAnecdotes
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    addAnecdote(state, action) {
      const newAnecdote = asObject(action.payload)
      return sortedByVotes([...state, newAnecdote])
    },

    vote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = {...anecdoteToChange, votes: anecdoteToChange.votes + 1}
      return sortedByVotes(state.map(anecdote => anecdote.id === id ? changedAnecdote : anecdote))
    },

    setAnecdotes(state, action) {
      return sortedByVotes(action.payload)
    }
  }
})

export const { addAnecdote, vote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(addAnecdote(newAnecdote))
    dispatch(createNotification(`you created ${content}`))
  }
}

export const storeVote = id => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.addVote(id)
    dispatch(vote(id))
    dispatch(createNotification(`you voted for ${updatedAnecdote.content}`))

  }
}
export default anecdoteSlice.reducer