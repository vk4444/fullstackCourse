import DiaryEntryItem from "./DiaryEntryItem";
import type { DiaryEntry } from "../types";

interface DiaryEntriesProps {
    diaryEntries: DiaryEntry[]
}

const DiaryEntries = (props: DiaryEntriesProps) => {

    return (
        <div>
            <h2>Diary Entries</h2>
            {props.diaryEntries.map((entry: DiaryEntry) => (<DiaryEntryItem key={entry.id} diaryEntry={entry}/>))}
        </div>
    )
}

export default DiaryEntries