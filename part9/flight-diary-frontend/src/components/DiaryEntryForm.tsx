import { useState } from "react"
import axios from "axios"

const DiaryEntryForm = () => {

    const [date, setDate] = useState('')
    const [visibility, setVisibility] = useState('')
    const [weather, setWeather] = useState('')
    const [comment, setComment] = useState('')

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault()
        const newEntry = {
            date,
            visibility,
            weather,
            comment,
        }
        axios.post('http://localhost:3000/api/diaries', newEntry).then(response => {
            console.log(response.data);  
        })
    }

    return (
        <div>
            <h2>Add new entry</h2>
            <form onSubmit={handleSubmit}>
                <p>date <input value={date} type="text" onChange={(event) => setDate(event.target.value)}></input></p>
                <p>visibility <input value={visibility} onChange={(event) => setVisibility(event.target.value)} type="text"></input></p>
                <p>weather <input value={weather} onChange={(event) => setWeather(event.target.value)} type="text"></input></p>
                <p>comment <input value={comment} onChange={(event) => setComment(event.target.value)} type="text"></input></p>
                <button type='submit'>add</button>
            </form>
        </div>
    )
}

export default DiaryEntryForm