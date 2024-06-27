/* eslint-disable react/prop-types */
import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>
        {text}
      </td>
      <td>
        {value}
      </td>
    </tr>
  )
}

const Statistics = (props) => {
  const { good, neutral, bad, clicked } = props.stat_combined
  const all = good + neutral + bad
  const average = ((good * 1) + (neutral * 0) + (bad * -1)) / all
  const positive = (good / all) * 100

  if (clicked) {
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive + "%"} />
        </tbody>
      </table>
    )
  }
  return (
    <p>No feedback given</p>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const [clicked, setClicked] = useState(false)

  return (
    <div>
      <h1>give feedback</h1>

      <Button handleClick={() => {
        setGood(good + 1)
        setClicked(true)
      }} text="good" />

      <Button handleClick={() => {
        setNeutral(neutral + 1)
        setClicked(true)
      }
      } text="neutral" />

      <Button handleClick={() => {
        setBad(bad + 1)
        setClicked(true)
      }} text="bad" />

      <h1>Statistics</h1>
      <Statistics stat_combined={{ good, neutral, bad, clicked }} />
    </div>
  )
}

export default App