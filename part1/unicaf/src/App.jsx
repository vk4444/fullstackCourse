import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad
  const average = (good - bad) / all
  const positivePercentage = (good / all) * 100

  const statisticsTexts = ["good", "neutral", "bad", "all", "average", "positive"]
  const statisticsValues = [good, neutral, bad, all, average, positivePercentage + " %"]

  return (
    <div>
      <h2>give feedback</h2>

      <Button onClick={() => setGood(good + 1)} text={"good"}/>
      <Button onClick={() => setNeutral(neutral + 1)} text={"neutral"}/>
      <Button onClick={() => setBad(bad + 1)} text={"bad"}/>

      <h2>statistics</h2>

      <Statistics texts={statisticsTexts} values={statisticsValues}/>

    </div>
  )
}

const Button = ({onClick, text}) => (
    <button onClick={onClick}>{text}</button>
)

const Statistic = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({texts, values}) => {
    if(values[3] > 0){
      return(
        <table>
          <tbody>
            <Statistic text={texts[0]} value={values[0]}/>
            <Statistic text={texts[1]} value={values[1]}/>
            <Statistic text={texts[2]} value={values[2]}/>
            <Statistic text={texts[3]} value={values[3]}/>
            <Statistic text={texts[4]} value={values[4]}/>
            <Statistic text={texts[5]} value={values[5]}/>
          </tbody>
        </table>
      )
    } else {
      return(
        <p>No feedback given</p>
      )
    }
}

export default App