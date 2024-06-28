/* eslint-disable react/prop-types */
import { useState } from 'react'

const Button = (props) => {
  // console.log(props)
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>

  )
}

const DisplayAnecdote = ({ anecdote, votes }) => {
  return (
    <>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </>
  )
}

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
  const [points, setPoint] = useState(new Array(anecdotes.length).fill(0))

  const addPoints = () => {
    // console.log(props)
    const copy = [...points]
    copy[selected] += 1
    setPoint(copy)
  }

  const handleNextAnecdote = () => {
    const rand_number = Math.floor(Math.random() * anecdotes.length)
    setSelected(rand_number)
  }

  const highest_vote = Math.max(...points)
  const highest_voted = points.indexOf(highest_vote)

  return (
    <div>
      <DisplayAnecdote anecdote={anecdotes[selected]} votes={points[selected]} />
      <div>
        <Button text="vote" selected={selected} onClick={addPoints} />
        <Button text="next anecdote" onClick={handleNextAnecdote} />
      </div>
      <div>
        <h1>Anecdote with most votes </h1>

        <DisplayAnecdote anecdote={anecdotes[highest_voted]} votes={highest_vote} />

      </div>
    </div>
  )
}

export default App
