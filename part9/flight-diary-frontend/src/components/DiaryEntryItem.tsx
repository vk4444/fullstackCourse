import type { DiaryEntry } from "../types"

interface DiaryEntryProps {
    diaryEntry: DiaryEntry
}

const DiaryEntryItem = (props: DiaryEntryProps) => {

    return (
        <div>
            <h3>{props.diaryEntry.date}</h3>
            <p>visibility: {props.diaryEntry.visibility}</p>
            <p>weather: {props.diaryEntry.weather}</p>
        </div>
    )
}

export default DiaryEntryItem