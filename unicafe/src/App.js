import { useState } from 'react'



const FeedbackCounters = ({ text, feedBack }) => <tr><td>{text} {feedBack}</td></tr>
const Avg = ({allFeedbacks}) => <tr><td> average {getAverage(allFeedbacks)} </td></tr>
const Percentage = ({allFeedbacks}) => <tr><td> positive {getPercentage(allFeedbacks)} % </td></tr>

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Statistics = ({ good, neutral, bad, allFeedbacks }) => {
  if (allFeedbacks.length === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
        <FeedbackCounters text='good' feedBack={good} />
        <FeedbackCounters text='neutral' feedBack={neutral} />
        <FeedbackCounters text='bad' feedBack={bad} />
        <FeedbackCounters text='all' feedBack={allFeedbacks.length} />
        <Avg allFeedbacks={allFeedbacks} />
        <Percentage allFeedbacks={allFeedbacks} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allFeedbacks, setAll] = useState([])

  const handleGoodClick = () => {
    setAll(allFeedbacks.concat(1))
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setAll(allFeedbacks.concat(0))
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setAll(allFeedbacks.concat(-1))
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick}
        text='good'
      />
      <Button handleClick={handleNeutralClick}
        text='neutral'
      />
      <Button handleClick={handleBadClick}
        text='bad'
      />
      <Statistics good={good} neutral={neutral} bad={bad} allFeedbacks={allFeedbacks} />
    </div>
  )
}

const getAverage = (arr) => {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += Number(arr[i]);
  }
  return sum / arr.length;
}

const getPercentage = (arr) => {
  let goodCounter = 0
  arr.forEach(value => {
    if (value === 1) {
      goodCounter++
    }
  });
  return goodCounter * 100 / arr.length
}

export default App