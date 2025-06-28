import DiaryEntries from "./components/DiaryEntries";
import DiaryEntryForm from "./components/DiaryEntryForm";
import axios from 'axios';
import { useState, useEffect } from "react";

import type { DiaryEntry } from "./types";


const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])

  useEffect(() => {
    axios.get<DiaryEntry[]>('http://localhost:3000/api/diaries').then(response => {
      setDiaries(response.data)
    })
  }, [])

  return (
    <>
      <DiaryEntryForm/>
      <DiaryEntries diaryEntries={diaries}/>
    </>
  )
    
};

export default App;