import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const handleClickNext = () => {
    setSelected(Math.floor((Math.random()) * anecdotes.length))
  }

  const handleClickVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <br></br>
      <VoteCounter votes={votes[selected]} />
      <Button onClick={handleClickVote} text="vote"/>
      <Button onClick={handleClickNext} text="next anecdote"/>

      <h2>Anecdote with most votes</h2>
      <MostVotes anecdotes={anecdotes} votes={votes}/>
    </div>
  )
}

const Button = ({onClick, text}) => (<button onClick={onClick}>{text}</button>)

const VoteCounter = ({votes}) => (<p>has {votes} votes</p>)

const MostVotes = ({anecdotes, votes}) => {
  let maxAnecdote = anecdotes[0]
  let maxVotes = 0

  for(let i = 0; i < anecdotes.length; i++){
    if(votes[i] > maxVotes){
      maxAnecdote = anecdotes[i]
      maxVotes = votes[i]
    }
  }

  return(
    <p>{maxAnecdote}</p>
  )
}

export default App