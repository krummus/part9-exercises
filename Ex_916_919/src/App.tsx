import { useState, useEffect } from 'react';
import { DiaryEntry } from './types';
import toNewDiaryEntry from './utils'
import { createDiaryEntry, getAllDiaryEntries } from './services/diaryEntryService';
import Content from './components/Content';
import Notification from './components/Notification';

const App = () => {
  const [ diaryEntries, setDiaryEntries ] = useState<DiaryEntry[]>([]);
  const [ errorMessage, setErrorMessage ] = useState<string>('');
  const [ date, setDate ] = useState('');
  const [ visibility, setVisibility ] = useState('');
  const [ weather, setWeather ] = useState('');
  const [ comment, setComment ] = useState('');

  useEffect(() => {
    getAllDiaryEntries()
    .then(response => setDiaryEntries(response as DiaryEntry[]))
  }, [])

  const diaryEntryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newDiaryEntry:unknown = {
      date: date, 
      visibility: visibility, 
      weather: weather, 
      comment: comment
    };

    try {
      const newDiaryEntryToAdd = toNewDiaryEntry(newDiaryEntry);
      createDiaryEntry(newDiaryEntryToAdd)
        .then(response => {
          setDiaryEntries(diaryEntries.concat(response))
        })
      setDate('');
      setVisibility('');
      setWeather('');
      setComment('');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(`Error: ${error.message}`);
        setTimeout(() => setErrorMessage(''),3000);
      }
    }
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <Notification message={errorMessage} />
      <form onSubmit={diaryEntryCreation}>
        Date: <input value={date} type='date' onChange={(event) => setDate(event.target.value)} /><br />
        Weather: <input type='radio' id='sunny' name='weather' value='sunny' onChange={(event) => setWeather(event.target.value)}/> Sunny
        <input type='radio' id='rainy' name='weather' value='rainy' onChange={(event) => setWeather(event.target.value)}/> Rainy
        <input type='radio' id='cloudy' name='weather' value='cloudy' onChange={(event) => setWeather(event.target.value)}/> Cloudy
        <input type='radio' id='windy' name='weather' value='windy' onChange={(event) => setWeather(event.target.value)}/> Windy
        <input type='radio' id='stormy' name='weather' value='stormy' onChange={(event) => setWeather(event.target.value)}/> Stormy<br />
        Visibility: <input type='radio' id='great' name='visibility' value='great' onChange={(event) => setVisibility(event.target.value)}/> Great
        <input type='radio' id='good' name='visibility' value='good' onChange={(event) => setVisibility(event.target.value)}/> Good
        <input type='radio' id='ok' name='visibility' value='ok' onChange={(event) => setVisibility(event.target.value)}/> Ok
        <input type='radio' id='poor' name='visibility' value='poor' onChange={(event) => setVisibility(event.target.value)}/> Poor<br />
        Comment: <input value={comment} onChange={(event) => setComment(event.target.value)} /><br />
        <button type='submit'>add</button>
      </form>
      <Content entries={diaryEntries} />
    </div>
  )
};

export default App;