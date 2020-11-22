import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = (props) => 
  <button onClick={props.handleClick}>{props.text}</button>

const Anecdote = (props) => {
  return (
    <div>
      <div>{props.quote}</div>
      <div>has {props.votes} votes</div>
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(props.anecdotes.length).fill(0))

  const getNextAnecdote = () => {
    const random = Math.floor(Math.random() * (props.anecdotes.length))
    console.log(random)

    setSelected(random)
  }

  const upvoteAnecdote = () => {
    const updatedVotes = [...votes]
    updatedVotes[selected] += 1

    setVotes(updatedVotes)
  }

  const getMostVotedAnecdote = () => {
    let maxIndex = 0
    let mostVotes = votes[maxIndex]
    
    for (let i = 1; i < props.anecdotes.length; i++) {
      if (votes[i] > mostVotes) {
        maxIndex = i
        mostVotes = votes[i]
      }
    }

    return maxIndex
  }

  const mostVoted = getMostVotedAnecdote()

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote quote={props.anecdotes[selected]} votes={votes[selected]} />
      <Button handleClick={upvoteAnecdote} text="vote" />
      <Button handleClick={getNextAnecdote} text="next anecdote" />

      <h1>Anecdote with most votes</h1>  
      <Anecdote quote={props.anecdotes[mostVoted]} votes={votes[mostVoted]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)